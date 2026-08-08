"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { skills, skillFilters } from "@/content/skills";
import type { SkillCategory } from "@/types";
import { EASE, DURATION, STAGGER } from "@/lib/animations";

export default function Skills() {
  const [active, setActive] = useState<SkillCategory | "all">("all");
  const t = useTranslations("skills");

  const filtered =
    active === "all" ? skills : skills.filter((s) => s.category === active);

  const count = (cat: SkillCategory | "all") =>
    cat === "all"
      ? skills.length
      : skills.filter((s) => s.category === cat).length;

  return (
    <section
      id="skills"
      className="relative py-24 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-hidden"
    >
      {/* Decorative blob */}
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 w-[32rem] h-[32rem] bg-accent-500/5 rounded-full blur-3xl -z-10"
      />

      <div className="section-container">
        {/* Header */}
        <motion.p
          className="section-label mb-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION, ease: EASE }}
        >
          {t("label")}
        </motion.p>

        <motion.h2
          className="section-title mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION, delay: STAGGER, ease: EASE }}
        >
          {t("title")}{" "}
          <span className="gradient-text">{t("title_highlight")}</span>
        </motion.h2>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION, delay: STAGGER * 2, ease: EASE }}
        >
          {skillFilters.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "cursor-pointer relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                active === tab.id
                  ? "text-white"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200",
              )}
            >
              {active === tab.id && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-accent-600"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{t(tab.key)}</span>
              <span
                className={cn(
                  "relative z-10 ml-1.5 text-xs tabular-nums",
                  active === tab.id
                    ? "text-white/60"
                    : "text-zinc-400 dark:text-zinc-600",
                )}
              >
                {count(tab.id)}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION, delay: STAGGER * 2, ease: EASE }}
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: DURATION, ease: EASE }}
                whileHover={{ y: -5, scale: 1.04 }}
                className={cn(
                  "flex flex-col items-center gap-3 px-3 py-5 rounded-2xl cursor-default select-none",
                  "bg-white dark:bg-zinc-900/60",
                  "border border-zinc-200/60 dark:border-zinc-800/60",
                  "hover:border-accent-500/40 dark:hover:border-accent-500/30",
                  "hover:shadow-md dark:hover:shadow-accent-500/5",
                  "transition-colors duration-300",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    skill.bg,
                  )}
                >
                  <skill.icon className={cn("w-5 h-5", skill.color)} />
                </div>
                <span className="text-xs font-medium text-center text-zinc-700 dark:text-zinc-300 leading-tight">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
