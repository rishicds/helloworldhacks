"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Calendar, MapPin, Clock, ChevronRight, Flame, ExternalLink, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRef, useState } from "react"

// Enhanced Particle component with more dynamic animations
const Particle = ({ index }: { index: number }) => {
  const randomSize = Math.floor(Math.random() * 4) + 1
  const randomDuration = Math.floor(Math.random() * 25) + 10
  const randomDelay = Math.random() * 8
  const randomPath = Math.random() > 0.5

  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-r from-blue-500/40 to-cyan-500/40"
      style={{
        width: `${randomSize}px`,
        height: `${randomSize}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        filter: "blur(1px)",
      }}
      animate={{
        y: randomPath ? [-100, 100, -100] : [100, -100, 100],
        x: randomPath ? [50, -50, 50] : [-50, 50, -50],
        opacity: [0, 0.9, 0],
        scale: [0, 1.2, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Number.POSITIVE_INFINITY,
        delay: randomDelay,
        ease: "easeInOut",
      }}
    />
  )
}

// New component for animated glowing border
const GlowingBorder = ({ className = "" }) => {
  return (
    <motion.div
      className={cn(
        "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        className,
      )}
      animate={{
        background: [
          "linear-gradient(90deg, rgba(59,130,246,0.3) 0%, rgba(139,92,246,0.3) 50%, rgba(6,182,212,0.3) 100%)",
          "linear-gradient(90deg, rgba(6,182,212,0.3) 0%, rgba(59,130,246,0.3) 50%, rgba(139,92,246,0.3) 100%)",
          "linear-gradient(90deg, rgba(139,92,246,0.3) 0%, rgba(6,182,212,0.3) 50%, rgba(59,130,246,0.3) 100%)",
        ],
      }}
      transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    />
  )
}

const EventsPage = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  // Refs for scroll animations
  const containerRef = useRef<HTMLDivElement>(null)
  const speakersRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Enhanced parallax values for scroll effects
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"])
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  // Generate particles for background - increased count for more density
  const particles = Array.from({ length: 100 }).map((_, i) => <Particle key={i} index={i} />)

  // Floating elements for enhanced visual interest
  const FloatingElement = ({
    size,
    color,
    delay,
    duration,
    position,
  }: {
    size: number;
    color: string;
    delay: number;
    duration: number;
    position: React.CSSProperties;
  }) => (
    <motion.div
      className={`absolute rounded-full bg-${color}-500/20 backdrop-blur-sm z-10`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        ...position,
      }}
      animate={{
        y: [0, -15, 0],
        x: [0, 10, 0],
        rotate: [0, 360],
        scale: [1, 1.2, 1],
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  );


  return (
    <div ref={containerRef} className="relative bg-black min-h-screen overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Animated particles with increased density */}
        <div className="absolute inset-0 z-0">{particles}</div>

        {/* Enhanced animated gradient background with parallax */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,24,39,0.8)_0%,rgba(0,0,0,1)_70%)]"
          style={{ y: bgY }}
        />

        {/* Dynamic background orbs with different sizes and positions */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 5 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[100px]"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        />

        {/* Enhanced animated grid lines with parallax */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{ y: parallaxY2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#grid-gradient)" strokeWidth="0.5" />
              </pattern>
              <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </motion.div>

        {/* Enhanced animated hexagonal grid with parallax */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{ y: parallaxY1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2 }}
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="hexagons-events"
                width="50"
                height="43.4"
                patternUnits="userSpaceOnUse"
                patternTransform="scale(5) rotate(0)"
              >
                <path
                  d="M25,0 L50,14.4 L50,38.6 L25,53 L0,38.6 L0,14.4 Z"
                  fill="none"
                  stroke="url(#hex-gradient)"
                  strokeWidth="0.5"
                />
              </pattern>
              <linearGradient id="hex-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons-events)" />
          </svg>
        </motion.div>
      </div>

      {/* Main content */}
      <main className="relative pt-32 pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Event details section with enhanced card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="h-10 w-1 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"
                animate={{
                  height: ["40px", "45px", "40px"],
                  background: [
                    "linear-gradient(to bottom, #3b82f6, #06b6d4)",
                    "linear-gradient(to bottom, #8b5cf6, #3b82f6)",
                    "linear-gradient(to bottom, #3b82f6, #06b6d4)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-white font-display"
                animate={{
                  color: ["#ffffff", "#93c5fd", "#ffffff"],
                  textShadow: [
                    "0 0 5px rgba(59, 130, 246, 0)",
                    "0 0 10px rgba(59, 130, 246, 0.5)",
                    "0 0 5px rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                Upcoming Events
              </motion.h2>
            </motion.div>

            <Card
              className={cn(
                "relative overflow-hidden p-6 sm:p-8 md:p-10",
                "bg-gradient-to-br from-[#000b18] to-black ",
                "border border-blue-900/30 rounded-xl backdrop-blur-sm",
                "transition-all duration-500 hover:border-blue-800/50 hover:shadow-lg hover:shadow-blue-900/20 group",
              )}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Enhanced animated glass effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 pointer-events-none"
                animate={{
                  background: isHovering
                    ? "linear-gradient(to bottom right, rgba(59,130,246,0.1), rgba(139,92,246,0.1), rgba(6,182,212,0.1))"
                    : "linear-gradient(to bottom right, rgba(59,130,246,0.05), rgba(139,92,246,0.05), rgba(6,182,212,0.05))",
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Floating elements */}
              <FloatingElement size={12} color="blue" delay={0} duration={8} position={{ top: "10%", left: "5%" }} />
              <FloatingElement
                size={8}
                color="purple"
                delay={2}
                duration={10}
                position={{ bottom: "15%", right: "8%" }}
              />
              <FloatingElement size={10} color="cyan" delay={4} duration={12} position={{ top: "20%", right: "10%" }} />

              {/* Enhanced animated corner decorations */}
              <div className="absolute top-0 left-0 w-12 h-12">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <motion.path
                    d="M47 47V32M47 47H32"
                    stroke="url(#cornerGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
                  />
                  <defs>
                    <linearGradient id="cornerGradient" x1="32" y1="32" x2="47" y2="47" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3b82f6" />
                      <stop offset="1" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="absolute bottom-0 right-0 w-12 h-12 rotate-180">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <motion.path
                    d="M47 47V32M47 47H32"
                    stroke="url(#cornerGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
                  />
                </svg>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative z-10">
                {/* Event details with staggered animations */}
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <motion.div variants={itemVariants} className="flex items-center mb-6">
                    <div className="p-3 mr-4 h-[50px] mt-4 w-[50px] border border-blue-800/50 flex justify-center items-center rounded-md bg-blue-900/20 backdrop-blur-sm">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.2, 0.9, 1],
                          filter: [
                            "drop-shadow(0 0 0px #3b82f6)",
                            "drop-shadow(0 0 5px #3b82f6)",
                            "drop-shadow(0 0 0px #3b82f6)",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Flame className="h-6 w-6 text-blue-400" />
                      </motion.div>
                    </div>
                    <motion.h3
                      className="text-3xl font-bold text-[#008cff] font-display"
                      animate={{
                        color: ["#008cff", "#38bdf8", "#008cff"],
                        textShadow: [
                          "0 0 0px rgba(59, 130, 246, 0)",
                          "0 0 10px rgba(59, 130, 246, 0.5)",
                          "0 0 0px rgba(59, 130, 246, 0)",
                        ],
                      }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      Tech Verse
                    </motion.h3>
                  </motion.div>

                  <motion.div variants={itemVariants} className="mb-6">
                    <div className="relative">
                      <motion.div
                        className="absolute -left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/30 to-transparent"
                        animate={{
                          background: [
                            "linear-gradient(to bottom, rgba(59,130,246,0.5), rgba(139,92,246,0.3), transparent)",
                            "linear-gradient(to bottom, rgba(139,92,246,0.5), rgba(59,130,246,0.3), transparent)",
                            "linear-gradient(to bottom, rgba(59,130,246,0.5), rgba(139,92,246,0.3), transparent)",
                          ],
                          height: ["100%", "95%", "100%"],
                        }}
                        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      />
                      <p className="text-blue-100/80 pl-4">
                        🚀 Tech Verse – Get Industry-Ready with Experts! 🎤
                        <br />
                        <br />
                        Join an exclusive offline session to learn from top tech professionals in Web3, Software
                        Engineering, Product Management, and Developer Relations.
                        <br />
                        <br />
                        Gain real-world insights, essential skills, and valuable connections to excel in the tech
                        industry.
                        <br />
                        <br />🔥 Part of Hello World Hacks – 30 Days, Infinite Possibilities! 🔥
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <motion.div
                      className="flex items-center group p-3 rounded-lg hover:bg-blue-900/10 transition-colors duration-300"
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 0 15px rgba(59, 130, 246, 0.2)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <motion.div
                        className="mr-3 p-2 rounded-full bg-blue-900/20 group-hover:bg-blue-800/30 transition-colors duration-300"
                        animate={{
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.1, 0.95, 1],
                        }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      >
                        <Calendar className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                      </motion.div>
                      <div>
                        <div className="text-xs text-blue-400/70 mb-0.5">Date</div>
                        <motion.span
                          className="text-blue-100 group-hover:text-white transition-colors duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          April 4, 2025
                        </motion.span>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center group p-3 rounded-lg hover:bg-blue-900/10 transition-colors duration-300"
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 0 15px rgba(59, 130, 246, 0.2)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <motion.div
                        className="mr-3 p-2 rounded-full bg-blue-900/20 group-hover:bg-blue-800/30 transition-colors duration-300"
                        animate={{
                          rotate: [0, -5, 5, 0],
                          scale: [1, 1.1, 0.95, 1],
                        }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                      >
                        <Clock className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                      </motion.div>
                      <div>
                        <div className="text-xs text-blue-400/70 mb-0.5">Time</div>
                        <motion.span
                          className="text-blue-100 group-hover:text-white transition-colors duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          10:00 AM - 5:00 PM
                        </motion.span>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center group p-3 rounded-lg hover:bg-blue-900/10 transition-colors duration-300 sm:col-span-2"
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 0 15px rgba(59, 130, 246, 0.2)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <motion.div
                        className="mr-3 p-2 rounded-full bg-blue-900/20 group-hover:bg-blue-800/30 transition-colors duration-300"
                        animate={{
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.1, 0.95, 1],
                        }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                      >
                        <MapPin className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                      </motion.div>
                      <div>
                        <div className="text-xs text-blue-400/70 mb-0.5">Location</div>
                        <motion.span
                          className="text-white group-hover:text-blue-100 transition-colors duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          Dr. Jaya Deb Roy Auditorium, RCC Institute of Information Technology
                        </motion.span>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        className="rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white 
                        hover:shadow-xl hover:shadow-blue-500/50 
                        group relative overflow-hidden transition-all duration-300 ease-in-out"
                      >
                        <Link target="_blank" href="https://lu.ma/7gntecu7">
                          <span className="relative z-10 flex items-center">
                            Register Now
                            <motion.div
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                            >
                              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </motion.div>
                          </span>
                        </Link>

                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-cyan-600 
                            opacity-0 group-hover:opacity-100 transition-opacity"
                          animate={{
                            background: [
                              "linear-gradient(to right, #1d4ed8, #7e22ce, #0891b2)",
                              "linear-gradient(to right, #0891b2, #1d4ed8, #7e22ce)",
                              "linear-gradient(to right, #7e22ce, #0891b2, #1d4ed8)",
                            ],
                          }}
                          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />

                        <motion.span
                          className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/60 via-purple-600/60 to-cyan-500/60 
                            blur-xl opacity-0 group-hover:opacity-70 transition-opacity"
                          animate={{
                            background: [
                              "linear-gradient(to right, rgba(37,99,235,0.6), rgba(126,34,206,0.6), rgba(8,145,178,0.6))",
                              "linear-gradient(to right, rgba(8,145,178,0.6), rgba(37,99,235,0.6), rgba(126,34,206,0.6))",
                              "linear-gradient(to right, rgba(126,34,206,0.6), rgba(8,145,178,0.6), rgba(37,99,235,0.6))",
                            ],
                          }}
                          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Event visual with enhanced 3D effects */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative flex justify-center items-center"
                >
                  <div className="relative group perspective max-w-full">
                    {/* Floating elements around the image */}
                    <motion.div
                      className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-blue-500/20 backdrop-blur-md z-20"
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.6, 1, 0.6],
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          "0 0 0px rgba(59, 130, 246, 0)",
                          "0 0 15px rgba(59, 130, 246, 0.5)",
                          "0 0 0px rgba(59, 130, 246, 0)",
                        ],
                      }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <Star className="h-6 w-6 text-blue-300" />
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute -bottom-4 -left-4 w-10 h-10 rounded-full bg-purple-500/20 backdrop-blur-md z-20"
                      animate={{
                        y: [0, 10, 0],
                        opacity: [0.6, 1, 0.6],
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          "0 0 0px rgba(139, 92, 246, 0)",
                          "0 0 15px rgba(139, 92, 246, 0.5)",
                          "0 0 0px rgba(139, 92, 246, 0)",
                        ],
                      }}
                      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-purple-400 rounded-full" />
                      </div>
                    </motion.div>

                    {/* Enhanced glow effect behind image */}
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000"
                      animate={{
                        background: [
                          "linear-gradient(to right, #3b82f6, #a855f7, #06b6d4)",
                          "linear-gradient(to right, #06b6d4, #3b82f6, #a855f7)",
                          "linear-gradient(to right, #a855f7, #06b6d4, #3b82f6)",
                        ],
                        boxShadow: [
                          "0 0 20px rgba(59, 130, 246, 0.3)",
                          "0 0 30px rgba(168, 85, 247, 0.3)",
                          "0 0 20px rgba(6, 182, 212, 0.3)",
                        ],
                      }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                    />

                    {/* Image with 3D hover effect */}
                    <motion.div
                      className="relative z-10 rounded-lg overflow-hidden border border-blue-900/30 shadow-lg shadow-blue-900/20"
                      whileHover={{
                        rotateY: [-2, 2, -2],
                        rotateX: [2, -2, 2],
                        transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <motion.img
                        src="https://i.postimg.cc/3JX0rXcK/Whats-App-Image-2025-03-31-at-19-14-52-27f70c0a.jpg"
                        alt="Ignitathon event"
                        className="w-full h-auto max-h-[400px] object-cover object-center transition-transform duration-700 group-hover:scale-110"
                        initial={{ filter: "brightness(0.9)" }}
                        whileHover={{
                          filter: "brightness(1.1)",
                          transition: { duration: 0.3 },
                        }}
                      />

                      {/* Interactive overlay elements */}
                      <motion.div
                        className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Button size="sm" className="bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full">
                          <ExternalLink className="h-4 w-4 text-white" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>

          {/* Speakers section with enhanced cards and 3D effects */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="h-10 w-1 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"
                animate={{
                  height: ["40px", "45px", "40px"],
                  background: [
                    "linear-gradient(to bottom, #3b82f6, #06b6d4)",
                    "linear-gradient(to bottom, #8b5cf6, #3b82f6)",
                    "linear-gradient(to bottom, #3b82f6, #06b6d4)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-white font-display"
                animate={{
                  color: ["#ffffff", "#93c5fd", "#ffffff"],
                  textShadow: [
                    "0 0 5px rgba(59, 130, 246, 0)",
                    "0 0 10px rgba(59, 130, 246, 0.5)",
                    "0 0 5px rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                Featured Speakers
              </motion.h2>
            </motion.div>

            {/* Speakers grid with responsive layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Megha Arora",
                  role: "CEO and Founder DevRelSquad, Ex-Microsoft, Apple, MongoDB",
                  image: "https://i.postimg.cc/bw52xKwT/Whats-App-Image-2025-04-01-at-00-34-29-14ed675b.jpg",
                },
                {
                  name: "Harshvardhan Bajoria",
                  role: "Associate Product Manager @Unstop, Github Campus Expert, Microsoft Gold MLSA",
                  image: "https://i.postimg.cc/8CWshc3p/Whats-App-Image-2025-04-01-at-00-34-29-45f3a7cf.jpg",
                },
                {
                  name: "Aritra Basu",
                  role: "Senior Software Engineer @Clirnet, Finalist @SIH2023, Winner of HackOn 2.0 by Infosys",
                  image: "https://i.postimg.cc/5N7HJZLV/Whats-App-Image-2025-04-01-at-00-34-30-62ecfc01.jpg",
                },
                {
                  name: "Swapnendu Banerjee",
                  role: "Campus Advocate @Defang Labs, Beta MLSA",
                  image: "https://i.postimg.cc/XYtpGds1/Whats-App-Image-2025-04-01-at-00-34-30-299371d9.jpg",
                },
              ].map((speaker, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-full rounded-xl overflow-hidden bg-gradient-to-b from-blue-900/20 to-blue-950/40 border border-blue-800/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20 group-hover:border-blue-700/50">
                    <GlowingBorder className="rounded-xl" />

                    <div className="relative overflow-hidden">
                      {/* Animated gradient overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                        whileHover={{ opacity: 0.6 }}
                      />

                      {/* 3D card effect */}
                      <div className="perspective">
                        <motion.div
                          className="relative"
                          whileHover={{
                            rotateY: [-2, 2, -2],
                            rotateX: [1, -1, 1],
                            transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                          }}
                        >
                          <motion.img
                            src={speaker.image}
                            alt={speaker.name}
                            className="w-full h-[250px] object-cover object-center transition-transform duration-700 group-hover:scale-110"
                            initial={{ filter: "brightness(0.9)" }}
                            whileHover={{
                              filter: "brightness(1.1)",
                              transition: { duration: 0.3 },
                            }}
                          />
                        </motion.div>
                      </div>

                      {/* Hover action buttons */}
                      <motion.div
                        className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Button
                          size="icon"
                          className="rounded-full h-8 w-8 bg-white/10 backdrop-blur-md hover:bg-white/20"
                        >
                          <ExternalLink className="h-4 w-4 text-white" />
                        </Button>
                      </motion.div>
                    </div>

                    <div className="p-4">
                      <motion.h2
                        className="text-white text-xl font-bold group-hover:text-blue-300 transition-colors duration-300"
                        animate={{
                          textShadow: [
                            "0 0 0px rgba(59, 130, 246, 0)",
                            "0 0 5px rgba(59, 130, 246, 0.3)",
                            "0 0 0px rgba(59, 130, 246, 0)",
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: index * 0.5,
                        }}
                      >
                        {speaker.name}
                      </motion.h2>
                      <motion.div
                        className="h-0.5 w-12 bg-blue-500/50 my-2 group-hover:w-20 transition-all duration-300"
                        animate={{
                          width: ["48px", "60px", "48px"],
                          opacity: [0.5, 0.8, 0.5],
                          background: ["rgba(59, 130, 246, 0.5)", "rgba(6, 182, 212, 0.5)", "rgba(59, 130, 246, 0.5)"],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: index * 0.3,
                        }}
                      />
                      <p className="text-blue-200/80 text-sm mt-2 line-clamp-3">{speaker.role}</p>
                    </div>

                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                      <motion.div
                        className="absolute top-0 right-0 w-16 h-16 -mt-8 -mr-8 bg-blue-500/20 rotate-45"
                        animate={{
                          backgroundColor: [
                            "rgba(59, 130, 246, 0.2)",
                            "rgba(139, 92, 246, 0.2)",
                            "rgba(59, 130, 246, 0.2)",
                          ],
                          rotate: ["45deg", "45deg"],
                        }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default EventsPage

