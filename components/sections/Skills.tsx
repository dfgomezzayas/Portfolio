"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Easing } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiBootstrap,
  SiPhp,
  SiPython,
  SiFastapi,
  SiNodedotjs,
  SiMysql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiDocker,
  SiJira,
} from "react-icons/si";
import { FiRefreshCw } from "react-icons/fi";
import { BsDatabaseFill } from "react-icons/bs";
import { VscVscode, VscAzureDevops } from "react-icons/vsc";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type Category = "all" | "frontend" | "backend" | "database" | "tools";

interface SkillItem {
  icon: React.ElementType;
  name: string;
  category: Exclude<Category, "all">;
  color: string;
  bg: string;
}

const SKILLS: SkillItem[] = [
  // Frontend
  {
    icon: SiReact,
    name: "React",
    category: "frontend",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
  },
  {
    icon: SiNextdotjs,
    name: "Next.js",
    category: "frontend",
    color: "text-zinc-400",
    bg: "bg-zinc-400/10",
  },
  {
    icon: SiTypescript,
    name: "TypeScript",
    category: "frontend",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: SiJavascript,
    name: "JavaScript",
    category: "frontend",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    icon: SiTailwindcss,
    name: "Tailwind CSS",
    category: "frontend",
    color: "text-teal-400",
    bg: "bg-teal-400/10",
  },
  {
    icon: SiFramer,
    name: "Framer Motion",
    category: "frontend",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
  {
    icon: SiBootstrap,
    name: "Bootstrap",
    category: "frontend",
    color: "text-indigo-300",
    bg: "bg-indigo-400/10",
  },
  // Backend
  {
    icon: SiPython,
    name: "Python",
    category: "backend",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: SiPhp,
    name: "PHP",
    category: "backend",
    color: "text-indigo-300",
    bg: "bg-indigo-400/10",
  },
  {
    icon: SiFastapi,
    name: "FastAPI",
    category: "backend",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: SiNodedotjs,
    name: "Node.js",
    category: "backend",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  // Database
  {
    icon: SiMongodb,
    name: "MongoDB",
    category: "database",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: BsDatabaseFill,
    name: "SQL Server",
    category: "database",
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
  {
    icon: SiMysql,
    name: "MySQL",
    category: "database",
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
  },
  // Tools
  {
    icon: SiGit,
    name: "Git",
    category: "tools",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    icon: SiGithub,
    name: "GitHub",
    category: "tools",
    color: "text-zinc-300",
    bg: "bg-zinc-400/10",
  },
  {
    icon: SiDocker,
    name: "Docker",
    category: "tools",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: VscVscode,
    name: "VS Code",
    category: "tools",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: SiJira,
    name: "Jira",
    category: "tools",
    color: "text-blue-600",
    bg: "bg-blue-600/10",
  },
  {
    icon: FiRefreshCw,
    name: "Scrum",
    category: "tools",
    color: "text-accent-400",
    bg: "bg-accent-400/10",
  },
  {
    icon: SiPython,
    name: "SQLAlchemy",
    category: "tools",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: VscAzureDevops,
    name: "Azure DevOps",
    category: "tools",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
];

type TabKey =
  | "filter_all"
  | "filter_frontend"
  | "filter_backend"
  | "filter_database"
  | "filter_tools";

const TABS: { id: Category; key: TabKey }[] = [
  { id: "all", key: "filter_all" },
  { id: "frontend", key: "filter_frontend" },
  { id: "backend", key: "filter_backend" },
  { id: "database", key: "filter_database" },
  { id: "tools", key: "filter_tools" },
];

const EASE: Easing = [0.25, 0.1, 0.25, 1];

export default function Skills() {
  const [active, setActive] = useState<Category>("all");
  const t = useTranslations("skills");

  const filtered =
    active === "all" ? SKILLS : SKILLS.filter((s) => s.category === active);

  const count = (cat: Category) =>
    cat === "all"
      ? SKILLS.length
      : SKILLS.filter((s) => s.category === cat).length;

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
          transition={{ duration: 0.45, ease: EASE }}
        >
          {t("label")}
        </motion.p>

        <motion.h2
          className="section-title mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
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
          transition={{ duration: 0.45, delay: 0.2, ease: EASE }}
        >
          {TABS.map((tab) => (
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
          transition={{ duration: 0.45, delay: 0.2, ease: EASE }}
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
                transition={{ duration: 0.22, ease: EASE }}
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
