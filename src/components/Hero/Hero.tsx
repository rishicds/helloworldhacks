"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage, Float } from "@react-three/drei"
import { motion, useScroll, useTransform } from "framer-motion"
import { Suspense, useRef, useState, useEffect } from "react"
import Model from "./Model"
import AnimatedText from "./animated-text"
import GradientBackground from "./gradient-background"

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const [isModelHovered, setIsModelHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Load Devfolio SDK dynamically
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://apply.devfolio.co/v2/sdk.js"
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
      <GradientBackground />

      {/* Content Section */}
      <div className={`absolute inset-0 z-10 flex flex-col items-start ${isMobile ? "justify-start pt-16" : "justify-center"} px-6 sm:px-10 md:px-20 max-w-7xl mx-auto`}>
        <div className={`${isMobile ? "w-full" : "w-full md:w-3/5"}`}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="mb-4">
            <span className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-400 font-medium">
              Welcome to
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <AnimatedText
              text="HELLO WORLD HACKS"
              className={`${isMobile ? "text-5xl" : "text-6xl sm:text-7xl md:text-8xl"} font-black leading-none tracking-tighter`}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-6 md:mt-8 max-w-xl"
          >
            <p className={`${isMobile ? "text-base" : "text-lg md:text-2xl"} text-gray-300 font-light`}>
              Hosted by <span className="font-medium text-white">GDG RCCIIT</span> &{" "}
              <span className="font-medium text-white">RCCTECHZ</span>
            </p>
          </motion.div>

          

          {/* Devfolio Apply Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-6 md:mt-8"
          >
            <div
              className="apply-button"
              data-hackathon-slug="hello-world-hacks"
              data-button-theme="light"
              style={{ height: "44px", width: "312px" }}
            ></div>
          </motion.div>
        </div>
      </div>

      {/* 3D Model Section */}
      <motion.div
        className={`absolute ${isMobile ? "bottom-0 left-0 w-full h-1/2" : "right-0 w-full md:w-1/2 h-full"} z-0`}
        style={{ opacity }}
        onMouseEnter={() => setIsModelHovered(true)}
        onMouseLeave={() => setIsModelHovered(false)}
      >
        <Canvas
          camera={{ position: [15, 5, 10], fov: 25 }}
          style={{
            position: "fixed",
            ...(isMobile
              ? { bottom: 0, left: 0, width: "100%", height: "50%" }
              : { right: 0, width: "70%", height: "100%" }),
          }}
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
      </motion.div>

      {/* Scroll Indicator */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400 mb-2">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <motion.div
                className="w-1 h-2 bg-white rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}
