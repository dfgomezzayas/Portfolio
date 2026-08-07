import type { IconType } from "react-icons";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  status?: "completed" | "in-progress";
}

export type SkillCategory = "frontend" | "backend" | "tools" | "database";

export interface Skill {
  name: string;
  icon: IconType;
  category: SkillCategory;
  color: string;
  bg: string;
  level?: number;
}

export interface SkillFilter {
  id: SkillCategory | "all";
  key: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  description: string;
  tech?: string[];
  current?: boolean;
  type?: "work" | "education";
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

export interface ContactSocialLink extends SocialLink {
  descKey: string;
  color: string;
}

export interface Sections {
  key: string;
  href: string;
}

export type Locale = "en" | "es";

export interface Language {
  code: Locale;
  label: string;
  flag: string;
}

export interface CoreTech {
  icon: IconType;
  label: string;
  color: string;
}

export interface Pillar {
  icon: IconType;
  key: string;
}
