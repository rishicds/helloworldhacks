"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage, Float } from "@react-three/drei"
import { Suspense, useRef, useState, useEffect } from "react"
import Model from "./Model"
import GradientBackground from "./gradient-background"
import { LiaDiscord } from "react-icons/lia";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

// Simple CSS animation replacement for AnimatedText component
const TextReveal: React.FC<TextRevealProps> = ({ text, className = "", delay = 0 }) => {
  return (
    <div
      className={`${className} reveal-text`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {text}
    </div>
  )
}

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null)
  const [scrollY, setScrollY] = useState<number>(1) // Initialize to 1 for full opacity
  const [isModelHovered, setIsModelHovered] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = (): void => {
      const scrollPosition = window.scrollY
      const containerHeight = containerRef.current?.offsetHeight || 0
      const progress = Math.min(scrollPosition / (containerHeight * 0.5), 1)
      setScrollY(1 - progress) // For opacity calculation
    }

    // Initialize scroll position
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Ensure Devfolio SDK is loaded properly
  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script")
    script.src = "https://apply.devfolio.co/v2/sdk.js"
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    script.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).devfolio) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).devfolio.init()
      }
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
      <GradientBackground />

      {/* Content Section */}
      <div className={`absolute inset-0 z-10 flex flex-col items-start ${isMobile ? "justify-start pt-16" : "justify-center"} px-6 sm:px-10 md:px-20 max-w-7xl mx-auto`}>
        <div className={`${isMobile ? "w-full pt-8" : "w-full md:w-3/5"}`}>
          <div className="mb-4 fade-in">
            <span className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-400 font-medium">
              Welcome to
            </span>
          </div>

          <TextReveal
            text="HELLO WORLD"
            className={`${isMobile ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl md:text-7xl"} overflow-visible font-bold`}
            delay={400}
          />
          <TextReveal
            text="HACKS"
            className={`${isMobile ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl md:text-7xl"}  overflow-visible leading-none tracking-tighter`}
            delay={800}
          />

          <p className="mt-6 md:mt-8 max-w-xl text-gray-300 text-lg md:text-2xl font-light fade-in slide-up" style={{ animationDelay: "1200ms" }}>
            Hosted by <span className="font-medium text-white">GDG RCCIIT</span> &{" "}
            <span className="font-medium text-white">RCCTECHZ</span>
          </p>

          {/* Devfolio Apply Button */}
          <div className="mt-6 md:mt-8 z-20 relative fade-in slide-up" style={{ animationDelay: "1800ms" }}>
            <div
              className="apply-button"
              data-hackathon-slug="hello-world-hacks"
              data-button-theme="light"
              style={{ height: "44px", width: "312px", maxWidth: "100%" }}
            ></div>
          </div>


          <div className="mt-4 fade-in slide-up" style={{ animationDelay: "2000ms" }}>
            <a
              href="https://discord.gg/AV65TSa8"
              className="discord-button relative text-center rounded-md"
              target="_blank"
              rel="noopener noreferrer"
              style={{ height: "44px", width: "320px", maxWidth: "100%", display: "inline-block" }}
            >
              <span className="absolute inset-0 bg-white rounded-sm"></span>
              <span className="relative inline-flex items-center rounded-sm justify-center h-full w-full bg-gradient-to-r from-[#5865F2] to-[#4752C4] text-white font-medium px-4">
                <LiaDiscord size={32} className="mr-2" />
                Join Discord
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* 3D Model Section */}
      <div
        className={`absolute ${isMobile ? "bottom-0 left-0 w-full h-1/2" : "right-18 w-full md:w-1/2 h-full"} z-0 fade-in`}
        style={{ opacity: scrollY }}
        onMouseEnter={() => setIsModelHovered(true)}
        onMouseLeave={() => setIsModelHovered(false)}
      >
        <Canvas
          camera={{ position: [15, 5, 10], fov: 25 }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <Stage environment="lobby" intensity={1}>
              <Float
                speed={isModelHovered ? 3 : 1}
                rotationIntensity={isModelHovered ? 0.4 : 0.2}
                floatIntensity={isModelHovered ? 0.6 : 0.3}
              >
                <Model />
              </Float>
            </Stage>
            <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Scroll Indicator */}
      {!isMobile && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 fade-in" style={{ animationDelay: "2000ms" }}>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400 mb-2">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white rounded-full mt-2 scroll-dot-animation" />
            </div>
          </div>
        </div>
      )}

      {/* CSS for animations - add to your global CSS or as a style tag */}
      <style jsx>{`
        .fade-in {
          opacity: 0;
          animation: fadeIn 1s forwards;
        }
        
        .slide-up {
          transform: translateY(20px);
          animation: slideUp 0.8s forwards;
        }
        
        .reveal-text {
          opacity: 0;
          transform: translateY(20px);
          animation: revealText 0.8s forwards;
        }
        
        .scroll-dot-animation {
          animation: scrollDot 1.5s infinite;
        }
        
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes revealText {
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(12px); }
        }
      `}</style>
    </section>
  )
}

export default Hero;