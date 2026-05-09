import type { Skill } from "@/types";

export const skills: Skill[] = [
  // Frontend
  { name: "React", icon: "SiReact", category: "frontend" },
  { name: "Next.js", icon: "SiNextdotjs", category: "frontend" },
  { name: "TypeScript", icon: "SiTypescript", category: "frontend" },
  { name: "JavaScript", icon: "SiJavascript", category: "frontend" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", category: "frontend" },
  { name: "Framer Motion", icon: "SiFramer", category: "frontend" },

  // Backend
  { name: "Python", icon: "SiPython", category: "backend" },
  { name: "FastAPI", icon: "SiFastapi", category: "backend" },
  { name: "Node.js", icon: "SiNodedotjs", category: "backend" },
  { name: "PHP", icon: "SiPhp", category: "backend" },

  // Database
  { name: "MongoDB", icon: "SiMongodb", category: "database" },
  { name: "SQL Server", icon: "SiMicrosoftsqlserver", category: "database" },
  { name: "MySQL", icon: "SiMysql", category: "database" },

  // Tools
  { name: "Git", icon: "SiGit", category: "tools" },
  { name: "GitHub", icon: "SiGithub", category: "tools" },
  { name: "Docker", icon: "SiDocker", category: "tools" },
  { name: "VS Code", icon: "SiVisualstudiocode", category: "tools" },
  { name: "Jira", icon: "SiJira", category: "tools" },
  { name: "Scrum", icon: "SiScrumalliance", category: "tools" },
];
