import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Project Alpha",
    description:
      "A short, impactful description of what this project does and the problem it solves.",
    longDescription:
      "Detailed overview of the project: the challenge, your approach, key decisions, and measurable outcomes.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "FastAPI"],
    image: "/images/project-1.png",
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/yourusername/project-alpha",
    featured: true,
    status: "completed",
  },
  {
    id: "project-2",
    title: "Project Beta",
    description: "Another great project description goes here.",
    tech: ["React", "Python", "PostgreSQL", "Docker"],
    image: "/images/project-2.png",
    githubUrl: "https://github.com/yourusername/project-beta",
    featured: true,
    status: "completed",
  },
  {
    id: "project-3",
    title: "Project Gamma",
    description: "A third project that showcases a different skill set.",
    tech: ["React", "FastAPI", "Redis"],
    githubUrl: "https://github.com/yourusername/project-gamma",
    featured: false,
    status: "in-progress",
  },
];
