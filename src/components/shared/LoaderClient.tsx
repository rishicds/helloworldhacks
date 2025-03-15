"use client";

import { useState, useEffect } from "react";
import CyberpunkLoader from "@/components/shared/Loader";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  const handleComplete = () => {
    setLoading(false);
  };

  // Optional: Auto-hide loader after some time even if button isn't clicked
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000); // Fallback timer - automatically proceed after 8 seconds
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50">
        <CyberpunkLoader onComplete={handleComplete} />
      </div>
    );
  }

  return <>{children}</>;
}