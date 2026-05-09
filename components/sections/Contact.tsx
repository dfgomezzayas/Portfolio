"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiSend,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const EASE: Easing = [0.25, 0.1, 0.25, 1];

const SOCIAL = [
  {
    icon: FiGithub,
    label: "GitHub",
    href: "https://github.com/dfgomezzayas",
    descKey: "github_desc",
    color:
      "hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-white",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/daniel-fernando-g%C3%B3mez-zayas-43a049263/",
    descKey: "linkedin_desc",
    color: "hover:border-blue-500 hover:text-blue-500",
  },
  {
    icon: FiMail,
    label: "Email",
    href: "mailto:you@example.com",
    descKey: "email_desc",
    color: "hover:border-accent-500 hover:text-accent-500",
  },
] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true as const },
    transition: { duration: 0.45, delay, ease: EASE },
  };
}

export default function Contact() {
  const t = useTranslations("contact");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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
          <motion.h2 className="section-title mb-4" {...fadeUp(0.1)}>
            {t("title")}{" "}
            <span className="gradient-text">{t("title_highlight")}</span>
          </motion.h2>
          <motion.p className="section-subtitle" {...fadeUp(0.18)}>
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start max-w-5xl mx-auto">
          {/* Left — form (3 cols) */}
          <motion.div className="lg:col-span-3" {...fadeUp(0.25)}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4"
              noValidate
            >
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
                      focused === "name"
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
                    onBlur={() => setFocused(null)}
                    className={cn(
                      "w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200",
                      "bg-zinc-50 dark:bg-zinc-900/60",
                      "text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
                      "border",
                      focused === "name"
                        ? "border-accent-500 shadow-sm shadow-accent-500/20"
                        : "border-zinc-200/60 dark:border-zinc-800/60",
                    )}
                  />
                </div>
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
                      focused === "email"
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
                    onBlur={() => setFocused(null)}
                    className={cn(
                      "w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200",
                      "bg-zinc-50 dark:bg-zinc-900/60",
                      "text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
                      "border",
                      focused === "email"
                        ? "border-accent-500 shadow-sm shadow-accent-500/20"
                        : "border-zinc-200/60 dark:border-zinc-800/60",
                    )}
                  />
                </div>
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
                      focused === "message"
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
                    onBlur={() => setFocused(null)}
                    className={cn(
                      "w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none",
                      "bg-zinc-50 dark:bg-zinc-900/60",
                      "text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
                      "border",
                      focused === "message"
                        ? "border-accent-500 shadow-sm shadow-accent-500/20"
                        : "border-zinc-200/60 dark:border-zinc-800/60",
                    )}
                  />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-medium text-sm transition-colors duration-200 glow-accent-sm"
              >
                <FiSend className="w-4 h-4" />
                {t("send")}
              </motion.button>
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
              {SOCIAL.map(({ icon: Icon, label, href, descKey, color }) => (
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
