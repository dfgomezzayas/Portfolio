"use client";

import { useState, useEffect } from "react";

/**
 * Returns the current scroll Y position, updated on scroll.
 * Useful for scroll-based animations and navbar effects.
 */
export function useScrollY(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}
