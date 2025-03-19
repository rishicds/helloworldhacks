"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const isMobile = window.innerWidth < 768; // Adjust settings for mobile

    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.2, // Lower duration for mobile
      easing: (t) => 1 - Math.pow(1 - t, 3), // Smoother easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: isMobile ? 0.8 : 1, // Reduce for mobile
      touchMultiplier: isMobile ? 1.5 : 1, // Slightly more responsive for mobile
      autoResize: true,
    });

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    if (!document.hidden) {
      rafId = requestAnimationFrame(raf);
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(raf);
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <>{children}</>;
}
