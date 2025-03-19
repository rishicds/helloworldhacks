"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import GifLoader from "./Loader";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname(); // Get the current route

  

  useEffect(() => {
    if (pathname !== "/") {
      setLoading(false); // Skip loading for non-homepage routes
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Auto-hide loader after 10 seconds

    return () => clearTimeout(timer);
  }, [pathname]);

  if (loading && pathname === "/") {
    return (
      <div className="fixed inset-0 z-50">
        <GifLoader/>
      </div>
    );
  }

  return <>{children}</>;
}
