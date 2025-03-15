"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CyberpunkLoaderProps {
  onComplete?: () => void;
}

export default function CyberpunkLoader({ onComplete }: CyberpunkLoaderProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 1;
      });

      // Random glitch effect
      if (Math.random() > 0.9) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleEnterSystem = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden">
      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] z-50 opacity-20"></div>

      {/* Grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(25,25,25,1)_0%,_rgba(0,0,0,1)_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(0deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Animated glow */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500"
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            filter: "blur(100px)",
            transform: "translate(-50%, -50%)",
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-fuchsia-500"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
          style={{
            filter: "blur(100px)",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <AnimatePresence>
        {loading ? (
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center gap-8"
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Main title with glitch effect */}
            <motion.h1
              className={`text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 tracking-tight relative ${glitchActive ? "glitch" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span
                className={`relative inline-block ${glitchActive ? 'before:content-["HELLO_WORLD_HACKS"] before:absolute before:left-[2px] before:text-cyan-400 before:top-0 before:clip-path-inset after:content-["HELLO_WORLD_HACKS"] after:absolute after:left-[-2px] after:text-fuchsia-500 after:top-0 after:clip-path-inset' : ""}`}
              >
                HELLO WORLD HACKS
              </span>
            </motion.h1>

            {/* Loading bar */}
            <div className="w-64 md:w-80 h-2 bg-gray-800 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-yellow-500"
                style={{ width: `${progress}%` }}
                initial={{ width: "0%" }}
              />

              {/* Digital noise on the loading bar */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-full flex-1 bg-white"
                    animate={{ opacity: [0, 0.1, 0] }}
                    transition={{
                      duration: 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      delay: Math.random() * 5,
                      repeatDelay: Math.random() * 5,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Loading text */}
            <motion.div
              className="text-sm text-cyan-400 font-mono"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="mr-2">[</span>
              <span>{progress < 100 ? "LOADING" : "COMPLETE"}</span>
              <span className="ml-2">]</span>
              <span className="ml-2">{progress}%</span>
            </motion.div>

            {/* Circuit decoration */}
            <div className="absolute bottom-10 left-10 right-10 h-[1px] bg-cyan-900 hidden md:block">
              <div className="absolute left-1/4 top-0 w-[1px] h-10 bg-cyan-900"></div>
              <div className="absolute left-1/4 top-10 w-4 h-4 rounded-full border-2 border-cyan-500 transform -translate-x-1/2 -translate-y-1/2"></div>

              <div className="absolute left-2/4 top-0 w-[1px] h-20 bg-cyan-900"></div>
              <div className="absolute left-2/4 top-20 w-6 h-6 rounded-full border-2 border-fuchsia-500 transform -translate-x-1/2 -translate-y-1/2"></div>

              <div className="absolute left-3/4 top-0 w-[1px] h-15 bg-cyan-900"></div>
              <div className="absolute left-3/4 top-15 w-5 h-5 rounded-full border-2 border-yellow-500 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="text-center z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 mb-6">
              HELLO WORLD HACKS
            </h1>
            <p className="text-xl text-cyan-400 font-mono">SYSTEM READY</p>

            <motion.button
              className="mt-8 px-8 py-3 bg-transparent border-2 border-fuchsia-500 text-fuchsia-500 font-mono rounded-sm relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnterSystem}
            >
              <span className="relative z-10">ENTER SYSTEM</span>
              <motion.div
                className="absolute inset-0 bg-fuchsia-500 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 text-black font-mono"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                ENTER SYSTEM
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Additional cyberpunk elements */}
      <div className="absolute top-5 left-5 text-xs text-cyan-500 font-mono opacity-70">
        SYS:// {new Date().toISOString()}
      </div>

      <div className="absolute top-5 right-5 text-xs text-fuchsia-500 font-mono opacity-70">
        NODE:// {Math.floor(Math.random() * 1000)}.{Math.floor(Math.random() * 1000)}
      </div>

      {/* Add custom CSS for glitch effect */}
      <style jsx global>{`
        @keyframes glitch {
          0% {
            clip-path: inset(40% 0 61% 0);
            transform: translate(-2px, 2px);
          }
          20% {
            clip-path: inset(92% 0 1% 0);
            transform: translate(1px, -3px);
          }
          40% {
            clip-path: inset(43% 0 1% 0);
            transform: translate(-1px, 3px);
          }
          60% {
            clip-path: inset(25% 0 58% 0);
            transform: translate(3px, 1px);
          }
          80% {
            clip-path: inset(54% 0 7% 0);
            transform: translate(-3px, -2px);
          }
          100% {
            clip-path: inset(58% 0 43% 0);
            transform: translate(2px, 2px);
          }
        }
        
        .glitch::before {
          animation: glitch 500ms infinite linear alternate-reverse;
        }
        
        .glitch::after {
          animation: glitch 375ms infinite linear alternate-reverse;
        }
      `}</style>
    </div>
  );
}