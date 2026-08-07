import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import type { SocialLink } from "@/types";

export const socialLinks: SocialLink[] = [
  {
    icon: FiGithub,
    href: "https://github.com/dfgomezzayas",
    label: "GitHub",
  },
  {
    icon: FiLinkedin,
    href: "https://www.linkedin.com/in/daniel-fernando-g%C3%B3mez-zayas-43a049263/",
    label: "LinkedIn",
  },
  {
    icon: FiMail,
    href: "mailto:df.gomezzayas@gmail.com",
    label: "Email",
  },
];
