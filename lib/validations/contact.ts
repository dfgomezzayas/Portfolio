import * as z from "zod";

/**
 * Server-side source of truth for the contact form shape.
 * Kept structurally in sync with the client schema in Contact.tsx (which
 * adds translated error messages) — update both when constraints change.
 *
 * `company` is a honeypot: real users never see or fill this field, so any
 * non-empty value marks the submission as a bot.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.email().max(100),
  message: z.string().trim().min(10).max(1000),
  company: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
