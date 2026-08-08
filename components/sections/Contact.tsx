"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiUser, FiMessageSquare, FiMail } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useFormValidation } from "@/hooks/useFormValidation";
import * as z from "zod";
import { sendContactEmail } from "@/app/actions/sendEmail";
import { contactSocialLinks } from "@/content/contact";
import { fadeUp, STAGGER } from "@/lib/animations";

// Persisted client-side so a page reload can't be used to send another
// message — this is the actual "one message, ever" UX for real visitors.
// The server-side rate limit (lib/rate-limit.ts) is the backstop for anyone
// who bypasses this (clears storage, calls the Server Action directly).
const ALREADY_SENT_KEY = "contact_form_sent";

export default function Contact() {
  const t = useTranslations("contact");
  const [hasSentBefore, setHasSentBefore] = useState(false);

  useEffect(() => {
    // localStorage doesn't exist during SSR, so this can only be read
    // client-side after mount — the standard reason this pattern needs an
    // effect at all.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasSentBefore(localStorage.getItem(ALREADY_SENT_KEY) === "true");
  }, []);

  const userSchema = z.object({
    name: z
      .string()
      .min(2, t("name_error_short"))
      .max(50, t("name_error_long")),
    email: z.email(t("email_error_invalid")),
    message: z
      .string()
      .min(10, t("message_error_short"))
      .max(1000, t("message_error_long")),
    // Honeypot: hidden from real users, only bots fill every input they find.
    company: z.string().optional(),
  });

  const {
    formState,
    errors,
    focused,
    isSubmitting,
    submitted,
    submitError,
    handleChange,
    handleBlur,
    handleSubmit,
    setFocused,
  } = useFormValidation({
    schema: userSchema,
    initialValues: { name: "", email: "", message: "", company: "" },
    onSubmit: async (data) => {
      if (hasSentBefore) return;
      const result = await sendContactEmail(data);
      if (!result.success) throw new Error(result.error);
    },
    onSubmitSuccess: () => {
      localStorage.setItem(ALREADY_SENT_KEY, "true");
      setHasSentBefore(true);
    },
  });

  return (
    <section
      id="contact"
      className="relative py-24 border-t border-zinc-100 dark:border-zinc-800/50 overflow-hidden"
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-accent-500/5 rounded-full blur-3xl -z-10"
      />
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-accent-500/30 to-transparent"
      />

      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p className="section-label mb-3" {...fadeUp(0)}>
            {t("label")}
          </motion.p>
          <motion.h2 className="section-title mb-4" {...fadeUp(STAGGER)}>
            {t("title")}{" "}
            <span className="gradient-text">{t("title_highlight")}</span>
          </motion.h2>
          <motion.p className="section-subtitle" {...fadeUp(STAGGER * 2)}>
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start max-w-5xl mx-auto">
          {/* Left — form (3 cols) */}
          <motion.div className="lg:col-span-3" {...fadeUp(0.25)}>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Honeypot — hidden from real users, catches basic bots */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] w-px h-px opacity-0"
                value={formState.company}
                onChange={handleChange}
              />

              {/* Name */}
              <div className="relative">
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1"
                >
                  {t("name_label")}
                </label>
                <div className="relative">
                  <FiUser
                    className={cn(
                      "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200",
                      errors.name
                        ? "text-red-500"
                        : focused === "name"
                          ? "text-accent-500"
                          : "text-zinc-400 dark:text-zinc-500",
                    )}
                  />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder={t("name_placeholder")}
                    value={formState.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200",
                      "bg-zinc-50 dark:bg-zinc-900/60",
                      "text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
                      "border",
                      errors.name
                        ? "border-red-500 shadow-sm shadow-red-500/20"
                        : focused === "name"
                          ? "border-accent-500 shadow-sm shadow-accent-500/20"
                          : "border-zinc-200/60 dark:border-zinc-800/60",
                    )}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1.5 ml-1">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1"
                >
                  {t("email_label")}
                </label>
                <div className="relative">
                  <FiMail
                    className={cn(
                      "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200",
                      errors.email
                        ? "text-red-500"
                        : focused === "email"
                          ? "text-accent-500"
                          : "text-zinc-400 dark:text-zinc-500",
                    )}
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("email_placeholder")}
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200",
                      "bg-zinc-50 dark:bg-zinc-900/60",
                      "text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
                      "border",
                      errors.email
                        ? "border-red-500 shadow-sm shadow-red-500/20"
                        : focused === "email"
                          ? "border-accent-500 shadow-sm shadow-accent-500/20"
                          : "border-zinc-200/60 dark:border-zinc-800/60",
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1.5 ml-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1"
                >
                  {t("message_label")}
                </label>
                <div className="relative">
                  <FiMessageSquare
                    className={cn(
                      "absolute left-4 top-4 w-4 h-4 transition-colors duration-200",
                      errors.message
                        ? "text-red-500"
                        : focused === "message"
                          ? "text-accent-500"
                          : "text-zinc-400 dark:text-zinc-500",
                    )}
                  />
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={t("message_placeholder")}
                    value={formState.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none",
                      "bg-zinc-50 dark:bg-zinc-900/60",
                      "text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
                      "border",
                      errors.message
                        ? "border-red-500 shadow-sm shadow-red-500/20"
                        : focused === "message"
                          ? "border-accent-500 shadow-sm shadow-accent-500/20"
                          : "border-zinc-200/60 dark:border-zinc-800/60",
                    )}
                  />
                </div>
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1.5 ml-1">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={
                  hasSentBefore || isSubmitting || Object.keys(errors).length > 0
                }
                whileHover={
                  !hasSentBefore && !isSubmitting && Object.keys(errors).length === 0
                    ? { scale: 1.02 }
                    : {}
                }
                whileTap={
                  !hasSentBefore && !isSubmitting && Object.keys(errors).length === 0
                    ? { scale: 0.97 }
                    : {}
                }
                className={cn(
                  "cursor-pointer w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-medium text-sm transition-all duration-200",
                  hasSentBefore || isSubmitting || Object.keys(errors).length > 0
                    ? "bg-zinc-400 dark:bg-zinc-700 cursor-not-allowed opacity-60"
                    : "bg-accent-600 hover:bg-accent-500 glow-accent-sm",
                )}
              >
                {submitted ? (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Sent!
                  </>
                ) : isSubmitting ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    {t("send")}
                  </>
                )}
              </motion.button>

              {submitError && (
                <p className="text-xs text-red-500 text-center" role="alert">
                  {submitError === "rate_limited"
                    ? t("submit_error_rate_limited")
                    : t("submit_error")}
                </p>
              )}

              {hasSentBefore && !submitted && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
                  {t("already_sent")}
                </p>
              )}
            </form>
          </motion.div>

          {/* Right — info (2 cols) */}
          <motion.div className="lg:col-span-2 space-y-8" {...fadeUp(0.35)}>
            {/* Availability */}
            <div className="glass-card p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                  {t("available")}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed pl-4">
                {t("available_desc")}
              </p>
            </div>

            {/* Social links */}
            <div className="space-y-3">
              <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                {t("find_me")}
              </p>
              {contactSocialLinks.map(
                ({ icon: Icon, label, href, descKey, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={
                    href.startsWith("mailto")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl",
                    "bg-white dark:bg-zinc-900/60",
                    "border border-zinc-200/60 dark:border-zinc-800/60",
                    "text-zinc-600 dark:text-zinc-400",
                    "transition-all duration-200 group",
                    color,
                  )}
                >
                  <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 leading-none">
                      {label}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                      {t(
                        descKey as
                          | "github_desc"
                          | "linkedin_desc"
                          | "email_desc",
                      )}
                    </p>
                  </div>
                  <svg
                    className="w-4 h-4 ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
