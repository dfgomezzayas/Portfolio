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

export interface Skill {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "tools" | "database";
  level?: number;
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
  icon: string;
}
