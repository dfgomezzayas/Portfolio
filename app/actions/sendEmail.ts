// app/actions/sendEmail.ts
"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/validations/contact";
import { checkRateLimit } from "@/lib/rate-limit";

export async function sendContactEmail(data: unknown) {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "invalid_input" };
  }

  const { name, email, message, company } = parsed.data;

  // Honeypot: real users never see/fill this field. Bots that fill every
  // input get a fake success so they don't adapt — we just skip sending.
  if (company) {
    return { success: true };
  }

  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const { success: withinLimit } = await checkRateLimit(ip);
  if (!withinLimit) {
    return { success: false, error: "rate_limited" };
  }

  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        service_id: process.env.EMAILJS_SERVICE_KEY,
        template_id: process.env.EMAILJS_TEMPLATE_KEY,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
          title: `New message from ${name} via portfolio contact form`,
          name,
          email,
          message,
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    return { success: true };
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return { success: false, error: "send_failed" };
  }
}
