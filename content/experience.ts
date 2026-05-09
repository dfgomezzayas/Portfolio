import type { Experience } from "@/types";

export const experiences: Experience[] = [
  // ── Work ─────────────────────────────────────────────
  {
    id: "exp-1",
    role: "FullStack Developer",
    company: "Applus+",
    companyUrl: "https://www.applus.com/co/es/",
    period: "2024 — Present",
    description:
      "Building and maintaining full-stack web applications. Responsible for frontend architecture, API design and database modeling. Focused on delivering performant, accessible and visually polished user interfaces.",
    tech: [
      "React",
      "JavaScript",
      "FastAPI",
      "Python",
      "Tailwind CSS",
      "SQL Server",
      "Docker",
      "Jira",
      "Azure DevOps",
      "Bootstrap",
      "PHP",
      "Git",
      "Scrum",
      "MongoDB",
    ],
    current: true,
    type: "work",
  },

  // ── Education ─────────────────────────────────────────
  {
    id: "edu-1",
    role: "Software Engineering",
    company: "Politécnico Grancolombiano",
    companyUrl: "https://www.poli.edu.co/",
    period: "2025 — Present",
    description:
      "6th semester. Deepening knowledge in software architecture, algorithms, data structures and systems design. Aspiring to pursue a Master's in Software Architecture.",
    current: true,
    type: "education",
  },
  {
    id: "edu-2",
    role: "Technology in Software Analysis and Development",
    company: "SENA",
    companyUrl: "https://www.sena.edu.co/es-co/Paginas/default.aspx",
    period: "2022 — 2024",
    description:
      "Completed the Technologist program in Software Analysis and Development. Acquired solid foundations in programming, databases and software engineering practices.",
    type: "education",
  },
  {
    id: "edu-3",
    role: "Technical Program in Systems",
    company: "SENA",
    companyUrl: "https://www.sena.edu.co/es-co/Paginas/default.aspx",
    period: "2021 — 2022",
    description:
      "Technical certification covering computer fundamentals, web development basics, networking essentials and software maintenance.",
    type: "education",
  },
];
