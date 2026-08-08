"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { languages } from "@/content/languages";
import type { Locale } from "@/types";

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === locale) ?? languages[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLang = (code: Locale) => {
    setOpen(false);
    // Replace the locale segment at the start of the path: /en/... → /es/...
    const newPath = pathname.replace(/^\/(en|es)/, `/${code}`);
    startTransition(() => router.push(newPath));
  };

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isPending}
        aria-label="Change language"
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          "cursor-pointer flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
          "text-zinc-500 dark:text-zinc-400",
          "hover:text-zinc-900 dark:hover:text-zinc-100",
          "hover:bg-zinc-100 dark:hover:bg-zinc-800/60",
          "disabled:opacity-60",
          open &&
            "bg-zinc-100 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100",
        )}
      >
        <span className="text-base leading-none" aria-hidden>
          {current.flag}
        </span>
        <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center"
        >
          <HiChevronDown className="w-3.5 h-3.5" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Select language"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute right-0 mt-2 w-36 rounded-xl overflow-hidden z-50",
              "bg-white dark:bg-zinc-900",
              "border border-zinc-200/60 dark:border-zinc-800",
              "shadow-lg shadow-black/10 dark:shadow-black/30",
            )}
          >
            {languages.map((lang) => {
              const isActive = lang.code === locale;
              return (
                <li key={lang.code}>
                  <button
                    role="option"
                    aria-selected={isActive}
                    onClick={() => switchLang(lang.code)}
                    className={cn(
                      "cursor-pointer w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors duration-150",
                      isActive
                        ? "text-accent-500 bg-accent-500/5 font-medium"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100",
                    )}
                  >
                    <span className="text-base" aria-hidden>
                      {lang.flag}
                    </span>
                    <span>{lang.label}</span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-500" />
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
