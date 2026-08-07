import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const isConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

const ratelimit = isConfigured
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      // 1 request / 24h per IP. This is the server-side abuse backstop for
      // anyone bypassing the UI — the actual "one message, ever" UX for
      // real visitors is enforced client-side via localStorage in
      // Contact.tsx (a long time-boxed window is as far as IP-based
      // limiting can reasonably go: IPs are shared/reassigned, so a truly
      // permanent per-IP block would eventually block the wrong person).
      limiter: Ratelimit.slidingWindow(1, "1 d"),
      analytics: true,
      prefix: "contact-form",
    })
  : null;

let warned = false;

/**
 * Best-effort, per-instance-only burst guard: collapses repeated requests
 * from the same identifier within DEBOUNCE_MS into a single check, so
 * someone hammering the submit button (or a simple script looping against
 * one warm instance) doesn't spend a Redis command per attempt. This is NOT
 * a security boundary on its own — serverless can route requests to
 * different instances, and this map resets on cold start — the actual
 * limit is still enforced by Upstash below. Purely a cost/noise reducer.
 */
const recentlySeen = new Map<string, number>();
const DEBOUNCE_MS = 1500;

function isWithinDebounce(identifier: string): boolean {
  const now = Date.now();
  const last = recentlySeen.get(identifier);
  recentlySeen.set(identifier, now);

  // Bound the map's size on a long-lived instance instead of growing forever.
  if (recentlySeen.size > 5000) {
    for (const [key, ts] of recentlySeen) {
      if (now - ts > DEBOUNCE_MS) recentlySeen.delete(key);
    }
  }

  return last !== undefined && now - last < DEBOUNCE_MS;
}

/**
 * Fails OPEN (allows the request) when Upstash isn't configured, so the
 * contact form keeps working in local dev / before the env vars are set.
 * Fails CLOSED (blocks the request) if Upstash is configured but errors out
 * mid-request — safer default than silently letting everything through.
 * Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN (free tier at
 * upstash.com) to actually enforce the limit in production.
 */
export async function checkRateLimit(identifier: string) {
  if (isWithinDebounce(identifier)) {
    return { success: false };
  }

  if (!ratelimit) {
    if (!warned) {
      console.warn(
        "[rate-limit] Upstash env vars missing — rate limiting is disabled (failing open).",
      );
      warned = true;
    }
    return { success: true };
  }

  try {
    return await ratelimit.limit(identifier);
  } catch (error) {
    console.error("[rate-limit] Upstash request failed — failing closed:", error);
    return { success: false };
  }
}
