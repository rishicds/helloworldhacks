"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage, Float } from "@react-three/drei"
import { motion, useScroll, useTransform } from "framer-motion"
import { Suspense, useRef, useState } from "react"
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
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const [isModelHovered, setIsModelHovered] = useState(false)

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
      <GradientBackground />

      <div className="absolute inset-0 z-10 flex flex-col items-start justify-center px-6 sm:px-10 md:px-20 max-w-7xl mx-auto">
        <div className="w-full md:w-3/5">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="mb-4">
            <span className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-400 font-medium">
              Welcome to
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <AnimatedText
              text="HELLO WORLD HACKS"
              className="text-6xl sm:text-7xl md:text-8xl font-black leading-none tracking-tighter"
            />
            
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-6 md:mt-8 max-w-xl"
          >
            <p className="text-lg md:text-2xl text-gray-300 font-light">
              Hosted by <span className="font-medium text-white">GDG RCCIIT</span> &{" "}
              <span className="font-medium text-white">RCCTECHZ</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-10 md:mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-black font-bold text-lg rounded-full"
            >
              Register Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="ml-4 px-8 py-4 border border-white text-white font-bold text-lg rounded-full"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute right-0 w-full md:w-1/2 h-full z-0"
        style={{ opacity, scale }}
        onMouseEnter={() => setIsModelHovered(true)}
        onMouseLeave={() => setIsModelHovered(false)}
      >
        <Canvas camera={{ position: [15, 5, 10], fov:10 }}>
          <Suspense fallback={null}>
            
            <Stage environment="lobby" intensity={1} >
              <Float
                speed={isModelHovered ? 3 : 1}
                rotationIntensity={isModelHovered ? 0.4 : 0.2}
                floatIntensity={isModelHovered ? 0.6 : 0.3}
              >
                <Model />
              </Float>
            </Stage>
            <OrbitControls enableZoom={false}  autoRotateSpeed={isModelHovered ? 2 : 0.5} />
          </Suspense>
        </Canvas>
      </motion.div>

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
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

