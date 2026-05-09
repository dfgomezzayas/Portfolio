"use client";

import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { useTranslations } from "next-intl";
import { HiBriefcase, HiAcademicCap, HiMapPin } from "react-icons/hi2";
import { experiences } from "@/content/experience";
import { cn } from "@/lib/utils";

const EASE: Easing = [0.25, 0.1, 0.25, 1];

const workItems = experiences.filter((e) => e.type === "work");
const eduItems = experiences.filter((e) => e.type === "education");

type T = ReturnType<typeof useTranslations>;

function TimelineItem({
  item,
  index,
  isLast,
  accent,
  t,
}: {
  item: (typeof experiences)[number];
  index: number;
  isLast: boolean;
  accent: boolean;
  t: T;
}) {
  return (
    <motion.div
      className="relative flex gap-6 group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: EASE }}
    >
      {/* Line + dot column */}
      <div className="flex flex-col items-center shrink-0 w-10">
        {/* Dot */}
        <div
          className={cn(
            "relative z-10 flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-all duration-300",
            accent
              ? "bg-accent-600 group-hover:bg-accent-500 group-hover:shadow-lg group-hover:shadow-accent-500/30"
              : "bg-zinc-200 dark:bg-zinc-700 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-600",
          )}
        >
          {item.type === "work" ? (
            <HiBriefcase
              className={cn(
                "w-4 h-4",
                accent ? "text-white" : "text-zinc-500 dark:text-zinc-300",
              )}
            />
          ) : (
            <HiAcademicCap
              className={cn(
                "w-4 h-4",
                accent ? "text-white" : "text-zinc-500 dark:text-zinc-300",
              )}
            />
          )}
          {/* Pulse for current */}
          {item.current && (
            <span className="absolute inset-0 rounded-full animate-ping bg-accent-500/30" />
          )}
        </div>
        {/* Vertical line */}
        {!isLast && (
          <div className="mt-2 w-px flex-1 bg-gradient-to-b from-zinc-300 dark:from-zinc-700 to-transparent min-h-6" />
        )}
      </div>

      {/* Card */}
      <div
        className={cn(
          "flex-1 mb-10 pb-2 rounded-2xl p-5",
          "bg-white dark:bg-zinc-900/60",
          "border transition-all duration-300",
          accent
            ? "border-accent-500/30 hover:border-accent-500/60 hover:shadow-lg hover:shadow-accent-500/5"
            : "border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700",
        )}
      >
        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white text-base leading-snug">
              {(t as (k: string) => string)(`items.${item.id}.role`) ||
                item.role}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <HiMapPin className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 shrink-0" />
              {item.companyUrl ? (
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent-500 hover:text-accent-400 transition-colors duration-200 font-medium"
                >
                  {item.company}
                </a>
              ) : (
                <span className="text-sm text-accent-500 font-medium">
                  {item.company}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {item.current && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                {t("current")}
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60">
              {item.period}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
          {(t as (k: string) => string)(`items.${item.id}.description`) ||
            item.description}
        </p>

        {/* Tech badges */}
        {item.tech && item.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-md text-xs font-medium bg-accent-500/8 text-accent-600 dark:text-accent-400 border border-accent-500/15"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Column({
  title,
  label,
  items,
  delay,
  t,
}: {
  title: string;
  label: string;
  items: typeof experiences;
  delay: number;
  t: T;
}) {
  return (
    <div>
      <motion.p
        className="section-label mb-2"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay, ease: EASE }}
      >
        {label}
      </motion.p>
      <motion.h3
        className="text-xl font-bold text-zinc-900 dark:text-white mb-8"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 0.08, ease: EASE }}
      >
        {title}
      </motion.h3>

      <div>
        {items.map((item, i) => (
          <TimelineItem
            key={item.id}
            item={item}
            index={i}
            isLast={i === items.length - 1}
            accent={item.type === "work"}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const t = useTranslations("experience");
  return (
    <section
      id="experience"
      className="relative py-24 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-hidden"
    >
      {/* Decorative blob */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-accent-500/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/4"
      />

      <div className="section-container">
        {/* Section header */}
        <motion.p
          className="section-label mb-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {t("label")}
        </motion.p>
        <motion.h2
          className="section-title mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
        >
          {t("title")}{" "}
          <span className="gradient-text">{t("title_highlight")}</span>
        </motion.h2>
        <motion.p
          className="section-subtitle max-w-xl mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.18, ease: EASE }}
        >
          {t("subtitle")}
        </motion.p>

        {/* Two-column layout on desktop */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <Column
            label={t("work_label")}
            title={t("work_title")}
            items={workItems}
            delay={0.25}
            t={t}
          />
          <Column
            label={t("edu_label")}
            title={t("edu_title")}
            items={eduItems}
            delay={0.35}
            t={t}
          />
        </div>
      </div>
    </section>
  );
}
