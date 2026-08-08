"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { HiSun, HiMoon, HiBars3, HiXMark } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { sections } from "@/content/sections";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations("nav");

  useEffect(() => {
    // Hydration-safe "mounted" flag: theme/locale-dependent UI (below) must
    // render identically on server and first client paint, then switch on
    // the next tick to avoid a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll(); // catch scroll position already restored by the browser on reload
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "section-container fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "top-2" : "",
      )}
    >
      <nav
        className={cn(
          "h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8",
          isScrolled
            ? "rounded-xl bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50"
            : "bg-transparent border-transparent",
        )}
      >
        {/* Logo */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cursor-pointer text-xl font-bold text-zinc-900 dark:text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Go to top"
        >
          <span className="text-accent-500">{"<"}</span>
          dfgz
          <span className="text-accent-500">{" />"}</span>
        </motion.button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {sections.map((section) => (
            <li key={section.href}>
              <button
                key={section.key}
                onClick={() => handleNavClick(section.href)}
                className="cursor-pointer text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors duration-200"
              >
                {t(section.key)}
              </button>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          {mounted && <LanguageSwitcher />}

          {/* Theme toggle */}
          {mounted && (
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="cursor-pointer p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-accent-500 dark:hover:text-accent-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <HiSun className="w-5 h-5" />
              ) : (
                <HiMoon className="w-5 h-5" />
              )}
            </motion.button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="cursor-pointer md:hidden p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors duration-200"
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? (
              <HiXMark className="w-5 h-5" />
            ) : (
              <HiBars3 className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50"
          >
            <ul className="section-container py-4 flex flex-col gap-1">
              {sections.map((section, i) => (
                <motion.li
                  key={section.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => handleNavClick(section.href)}
                    className="cursor-pointer w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-accent-500 dark:hover:text-accent-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-200"
                  >
                    {t(section.key)}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
