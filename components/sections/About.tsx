"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  SiReact,
  SiTailwindcss,
  SiPython,
  SiFastapi,
  SiJavascript,
} from "react-icons/si";
import { BsDatabaseFill } from "react-icons/bs";
import { FiCode, FiLayers, FiZap } from "react-icons/fi";
import type { Easing } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE: Easing = "easeOut";

const CORE_TECH = [
  { icon: SiReact, label: "React", color: "text-sky-400" },
  { icon: SiJavascript, label: "JavaScript", color: "text-yellow-400" },
  { icon: SiTailwindcss, label: "Tailwind CSS", color: "text-teal-400" },
  { icon: SiPython, label: "Python", color: "text-blue-400" },
  { icon: SiFastapi, label: "FastAPI", color: "text-emerald-400" },
  { icon: BsDatabaseFill, label: "SQL Server", color: "text-green-400" },
] as const;

const PILLARS = [
  { icon: FiCode, key: "clean" },
  { icon: FiLayers, key: "ownership" },
  { icon: FiZap, key: "perf" },
] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
  transition: { duration: 0.5, delay, ease: EASE },
});

export default function About() {
  const t = useTranslations("about");
  return (
    <section
      id="about"
      className="relative py-24 border-t border-zinc-100 dark:border-zinc-800/50 overflow-hidden"
    >
      {/* Subtle background blob */}
      <div
        aria-hidden
        className="absolute -top-32 right-0 w-[28rem] h-[28rem] bg-accent-500/5 rounded-full blur-3xl -z-10"
      />

      <div className="section-container">
        {/* Header */}
        <motion.p className="section-label mb-3" {...fadeUp(0)}>
          {t("label")}
        </motion.p>

        <motion.h2 className="section-title mb-16" {...fadeUp(0.1)}>
          {t("title")}{" "}
          <span className="gradient-text">{t("title_highlight")}</span>
        </motion.h2>

        {/* Main grid */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left — bio (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <motion.p
              className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300"
              {...fadeUp(0.2)}
            >
              {t.rich("bio_1", {
                strong: (chunks) => (
                  <span className="text-zinc-900 dark:text-white font-semibold">
                    {chunks}
                  </span>
                ),
              })}
            </motion.p>

            <motion.p
              className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400"
              {...fadeUp(0.3)}
            >
              {t.rich("bio_2", {
                accent: (chunks) => (
                  <span className="text-accent-500 font-medium">{chunks}</span>
                ),
              })}
            </motion.p>

            {/* <motion.p
              className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400"
              {...fadeUp(0.4)}
            >
              {t("bio_3")}
            </motion.p> */}

            {/* Pillars */}
            <motion.div
              className="grid sm:grid-cols-3 gap-4 pt-4"
              {...fadeUp(0.5)}
            >
              {PILLARS.map(({ icon: Icon, key }) => (
                <div
                  key={key}
                  className={cn(
                    "glass-card p-4 space-y-2 group",
                    "hover:border-accent-500/40 dark:hover:border-accent-500/30 transition-colors duration-300",
                  )}
                >
                  <div className="w-8 h-8 rounded-lg bg-accent-500/10 flex items-center justify-center group-hover:bg-accent-500/20 transition-colors duration-300">
                    <Icon className="w-4 h-4 text-accent-500" />
                  </div>
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                    {t(`pillars.${key}_title`)}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {t(`pillars.${key}_desc`)}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — photo + tech stack (2 cols) */}
          <motion.div className="lg:col-span-2 space-y-6" {...fadeUp(0.3)}>
            {/* Profile photo */}
            <motion.div
              className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto lg:mx-0"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Outer glow ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-accent-500 via-purple-500 to-accent-700 opacity-40 blur-md" />

              {/* Gradient border */}
              <div className="h-full relative rounded-3xl p-[2px] bg-gradient-to-br from-accent-500/80 via-purple-500/60 to-accent-700/80">
                <div className="h-full relative overflow-hidden rounded-[22px] bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src="/images/profile.png"
                    alt="Daniel Gómez — FullStack Developer"
                    width={224}
                    height={224}
                    priority
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Subtle inner overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-md flex items-center gap-1.5">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                  {t("open_to_work")}
                </span>
              </div>
            </motion.div>

            <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              {t("core_tech")}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {CORE_TECH.map(({ icon: Icon, label, color }, i) => (
                <motion.div
                  key={label}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl",
                    "bg-zinc-50 dark:bg-zinc-900/60",
                    "border border-zinc-200/60 dark:border-zinc-800/60",
                    "hover:border-accent-500/40 dark:hover:border-accent-500/30",
                    "transition-all duration-300 group cursor-default",
                  )}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.06 }}
                  whileHover={{ y: -2 }}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110",
                      color,
                    )}
                  />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
