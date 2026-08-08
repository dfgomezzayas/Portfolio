import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import type { ContactSocialLink } from "@/types";

export const contactSocialLinks: ContactSocialLink[] = [
  {
    icon: FiGithub,
    label: "GitHub",
    href: "https://github.com/dfgomezzayas",
    descKey: "github_desc",
    color:
      "hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-white",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/daniel-fernando-g%C3%B3mez-zayas-43a049263/",
    descKey: "linkedin_desc",
    color: "hover:border-blue-500 hover:text-blue-500",
  },
  {
    icon: FiMail,
    label: "Email",
    href: "mailto:df.gomezzayas@gmail.com",
    descKey: "email_desc",
    color: "hover:border-accent-500 hover:text-accent-500",
  },
];
