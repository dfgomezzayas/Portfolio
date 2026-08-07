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
import type { Skill, SkillFilter } from "@/types";

export const skills: Skill[] = [
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

export const skillFilters: SkillFilter[] = [
  { id: "all", key: "filter_all" },
  { id: "frontend", key: "filter_frontend" },
  { id: "backend", key: "filter_backend" },
  { id: "database", key: "filter_database" },
  { id: "tools", key: "filter_tools" },
];
