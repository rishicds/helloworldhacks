"use client";

import { useEffect, ReactNode, useState } from "react";
import Lenis from "lenis";

interface LenisProviderProps {
  children: ReactNode;
  mobileBreakpoint?: number;
  disableOnTouch?: boolean;
}

export default function LenisProvider({ 
  children, 
  mobileBreakpoint = 768,
  disableOnTouch = true
}: LenisProviderProps) {
  // Don't set initial state to avoid hydration mismatch
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [shouldEnableLenis, setShouldEnableLenis] = useState<boolean | null>(null);
  
  useEffect(() => {
    // More comprehensive check for mobile/touch devices
    const isMobileByWidth = window.innerWidth < mobileBreakpoint;
    const isTouchDevice = disableOnTouch && (
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 ||
      
      navigator.maxTouchPoints > 0
    );
    
    // Disable Lenis on mobile width OR touch devices (if disableOnTouch is true)
    const shouldDisable = isMobileByWidth || isTouchDevice;
    setShouldEnableLenis(!shouldDisable);
    
    // Set up a debounced resize handler
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newIsMobileByWidth = window.innerWidth < mobileBreakpoint;
        setShouldEnableLenis(!(newIsMobileByWidth || isTouchDevice));
      }, 250); // Debounce resize events
    };
    
    window.addEventListener("resize", handleResize);
    
    // Only initialize Lenis if we should enable it
    if (!shouldDisable) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        autoResize: true,
      });
      
      let rafId: number;
      
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      
      // Handle page visibility
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
        window.removeEventListener("resize", handleResize);
        clearTimeout(resizeTimer);
      };
    }
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [mobileBreakpoint, disableOnTouch]);
  
  // Only render once we've determined if Lenis should be enabled
  return <>{children}</>;
}