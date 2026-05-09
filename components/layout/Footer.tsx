"use client";

import { useTranslations } from "next-intl";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const SOCIAL_LINKS = [
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
  //   {
  //     icon: FaXTwitter,
  //     href: "https://x.com/yourtwitterhandle",
  //     label: "X (Twitter)",
  //   },
  {
    icon: FiMail,
    href: "mailto:you@example.com",
    label: "Email",
  },
];

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800/60 py-8">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          © {year}{" "}
          <span className="text-zinc-700 dark:text-zinc-300 font-medium">
            Daniel Gómez
          </span>
          . {t("built")}
        </p>

        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                href.startsWith("mailto") ? undefined : "noopener noreferrer"
              }
              aria-label={label}
              className="p-2 rounded-lg text-zinc-500 dark:text-zinc-500 hover:text-accent-500 dark:hover:text-accent-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-200"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
