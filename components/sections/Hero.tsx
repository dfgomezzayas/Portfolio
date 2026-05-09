"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { FiArrowDown, FiGithub, FiLinkedin } from "react-icons/fi";

export default function Hero() {
  const t = useTranslations("hero");

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % technologies.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const technologies = [
    "React",
    "JavaScript",
    "Tailwind CSS",
    "Python",
    "FastAPI",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-accent-50/30 to-white dark:from-zinc-950 dark:via-accent-950/20 dark:to-zinc-950"
      />

      {/* Decorative blobs */}
      <div
        aria-hidden
        className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl -z-10"
      />
      <div
        aria-hidden
        className="absolute bottom-1/4 -right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -z-10"
      />

      <div className="section-container w-full text-center py-32">
        {/* Label */}
        <motion.p
          className="section-label mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("greeting")}
        </motion.p>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Daniel <span className="gradient-text">Gómez</span>
        </motion.h1>

        {/* Role */}
        <motion.p
          className="text-xl sm:text-2xl lg:text-3xl text-zinc-500 dark:text-zinc-400 font-light mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t("role")}
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="max-w-xl mx-auto text-base sm:text-lg text-zinc-500 dark:text-zinc-400 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t("tagline")}{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-zinc-700 dark:text-zinc-200 font-medium"
            >
              {technologies[index]}
            </motion.span>
          </AnimatePresence>
          .
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button
            onClick={() => scrollTo("#projects")}
            className="cursor-pointer px-6 py-3 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-medium text-sm transition-colors duration-200 glow-accent-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {t("cta_projects")}
          </motion.button>

          <motion.button
            onClick={() => scrollTo("#contact")}
            className="cursor-pointer px-6 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-accent-500 dark:hover:border-accent-500 hover:text-accent-500 dark:hover:text-accent-400 font-medium text-sm transition-all duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {t("cta_contact")}
          </motion.button>
        </motion.div>

        {/* Social quick links */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a
            href="https://github.com/dfgomezzayas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-zinc-400 dark:text-zinc-500 hover:text-accent-500 dark:hover:text-accent-400 transition-colors duration-200"
          >
            <FiGithub className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/daniel-fernando-g%C3%B3mez-zayas-43a049263/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-zinc-400 dark:text-zinc-500 hover:text-accent-500 dark:hover:text-accent-400 transition-colors duration-200"
          >
            <FiLinkedin className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-zinc-400 dark:text-zinc-600"
          >
            <button
              onClick={() => scrollTo("#about")}
              className="cursor-pointer text-zinc-400 dark:text-zinc-600"
            >
              <FiArrowDown className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
