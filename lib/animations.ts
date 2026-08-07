import type { Easing } from "framer-motion";

/** Shared easing curve for every entrance/load animation across the site. */
export const EASE: Easing = [0.25, 0.1, 0.25, 1];

/** Shared duration for every entrance/load animation across the site. */
export const DURATION = 0.45;

/** Delay step between sequential elements within the same reveal (e.g. label → title → subtitle). */
export const STAGGER = 0.1;

/** Standard scroll-reveal: fade in while sliding up, once per viewport entry. */
export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
  transition: { duration: DURATION, delay, ease: EASE },
});
