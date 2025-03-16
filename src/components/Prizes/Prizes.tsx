"use client"

import { useRef, useEffect } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import type { Group } from "three"

import { Zap } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, OrbitControls } from "@react-three/drei"

function DragonModel() {
  const group = useRef<Group>(null)
  const { scene } = useGLTF("/models/minecraft_diamond.glb")

  // Simple rotation animation
  useEffect(() => {
    const animate = () => {
      if (group.current) {
        group.current.rotation.y += 0.2
      }
      requestAnimationFrame(animate)
    }
    const id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  })

  return (
    <group ref={group}>
      <primitive object={scene} scale={0.15} position={[0, -0.5, 0]} rotation={[0, Math.PI * 0.25, 0]} />
    </group>
  )
}
export default function Prizes() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  /* Commented out prizes data
  const mainPrizes = [
    {
      place: "1st PLACE",
      prize: "₹50,000",
      icon: <Trophy className="w-12 h-12" />,
      extras: ["Internship opportunities", "1-year software subscriptions", "Mentorship from industry experts"],
      color: "#FFBE0B",
    },
    {
      place: "2nd PLACE",
      prize: "₹30,000",
      icon: <Award className="w-12 h-12" />,
      extras: ["6-month software subscriptions", "Cloud credits worth ₹20,000", "Exclusive swag kit"],
      color: "#3DEFE9",
    },
    {
      place: "3rd PLACE",
      prize: "₹20,000",
      icon: <Gift className="w-12 h-12" />,
      extras: ["3-month software subscriptions", "Cloud credits worth ₹10,000", "Swag kit"],
      color: "#FF5470",
    },
  ]

  const specialPrizes = [
    {
      category: "BEST UI/UX",
      prize: "₹10,000 + Design Software Licenses",
      color: "#8A4FFF",
    },
    {
      category: "MOST INNOVATIVE",
      prize: "₹10,000 + Innovation Lab Access",
      color: "#FFBE0B",
    },
    {
      category: "BEST USE OF AI",
      prize: "₹10,000 + AI Platform Credits",
      color: "#3DEFE9",
    },
    {
      category: "COMMUNITY CHOICE",
      prize: "₹10,000 + Feature on Tech Blogs",
      color: "#FF5470",
    },
  ]
  */

  // Animation variants

  // Letters animation for "COMING SOON"
  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "mirror" as const,
        repeatDelay: 2,
      },
    }),
  }

  const letters = "COMING SOON".split("")

  return (
    <section className="py-32 px-4 sm:px-6 bg-[#0d0916] relative" ref={ref}>
      <div className="relative">
        {/* Brutalist background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-10 w-40 h-40 border-4 border-[#FFBE0B] rotate-12 opacity-20"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 border-4 border-[#FFBE0B] -rotate-12 opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-32 h-32">
                <Canvas camera={{ position: [0, 0, 3], fov: 45 }} style={{ background: "transparent" }}>
                  <ambientLight intensity={3} />
                  <directionalLight position={[0, 10, 10]} intensity={0.8} />
                  <DragonModel />
                  <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
                </Canvas>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white">WIN BIG</h2>
            </div>

            <div className="w-20 h-1 bg-[#FFBE0B] mx-auto my-6"></div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Get ready for amazing prizes, plus internship opportunities, software subscriptions, cloud credits, and
              more!
            </p>
          </motion.div>

          {/* Commented out prize cards
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {mainPrizes.map((prize, index) => (
              <motion.div key={index} variants={item} className="group">
                <div
                  className="relative overflow-hidden border-2 border-white/10 bg-white/5 backdrop-blur-md rounded-lg p-8 transform transition-all duration-500 hover:scale-105 text-center"
                  style={{
                    borderColor: prize.color,
                    boxShadow: `0 10px 30px -15px ${prize.color}40`,
                  }}
                >
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-white/5 opacity-20 rounded-full group-hover:opacity-30 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ color: prize.color, backgroundColor: `${prize.color}20` }}
                    >
                      {prize.icon}
                    </div>

                    <h3 className="text-xl font-bold mb-2" style={{ color: prize.color }}>
                      {prize.place}
                    </h3>
                    <p className="text-4xl font-bold mb-4 text-white">{prize.prize}</p>

                    <ul className="text-white/70 text-sm space-y-2">
                      {prize.extras.map((extra, i) => (
                        <li key={i}>{extra}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl font-bold text-center mb-8 text-white"
          >
            SPECIAL CATEGORY PRIZES
          </motion.h3>

          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {specialPrizes.map((prize, index) => (
              <motion.div key={index} variants={item} className="group">
                <div
                  className="relative overflow-hidden border-2 border-white/10 bg-white/5 backdrop-blur-md rounded-lg p-6 transform transition-all duration-300 hover:scale-105 text-center"
                  style={{
                    borderColor: prize.color,
                    boxShadow: `0 5px 15px -10px ${prize.color}40`,
                  }}
                >
                  <h3 className="text-lg font-bold mb-2" style={{ color: prize.color }}>
                    {prize.category}
                  </h3>
                  <p className="text-white/90 text-sm">{prize.prize}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          */}

          {/* Quirky Coming Soon animated card */}
          <motion.div
            className="flex justify-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                rotate: [0, -2, 2, -2, 0],
                transition: { duration: 0.5 },
              }}
              className="relative overflow-hidden max-w-2xl w-full"
            >
              <div
                className="border-4 border-dashed p-12 rounded-lg bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-md text-center"
                style={{
                  borderColor: "#FFBE0B",
                  boxShadow: "0 10px 30px -15px rgba(255, 190, 11, 0.4), inset 0 0 20px rgba(255, 190, 11, 0.2)",
                }}
              >
                {/* Floating glowing orbs */}
                <motion.div
                  className="absolute w-16 h-16 rounded-full bg-blue-500/20 blur-xl"
                  animate={{
                    x: [0, 100, 50, 0],
                    y: [0, -50, -100, 0],
                    scale: [1, 1.2, 0.8, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
                <motion.div
                  className="absolute right-10 bottom-10 w-20 h-20 rounded-full bg-pink-500/20 blur-xl"
                  animate={{
                    x: [0, -80, -40, 0],
                    y: [0, 60, 30, 0],
                    scale: [1, 0.8, 1.2, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />

                <div className="relative">
                  {/* Animated "COMING SOON" text */}
                  <motion.div
                    className="mb-6 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {letters.map((letter, index) => (
                      <motion.span
                        key={index}
                        custom={index}
                        variants={letterAnimation}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="text-5xl sm:text-6xl font-bold inline-block text-white"
                        style={{
                          textShadow: "0 0 10px rgba(255, 190, 11, 0.7)",
                          marginRight: letter === " " ? "0.5em" : "0.05em",
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Bouncing dots */}
                  <motion.div
                    className="flex justify-center space-x-2 mb-8"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 rounded-full bg-[#FFBE0B]"
                        animate={
                          isInView
                            ? {
                                y: [0, -10, 0],
                              }
                            : {}
                        }
                        transition={{
                          duration: 0.6,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>

                  <motion.p
                    className="text-white/80 text-xl"
                    initial={{ opacity: 0 }}
                    animate={
                      isInView
                        ? {
                            opacity: [0.7, 1, 0.7],
                          }
                        : { opacity: 0 }
                    }
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      delay: 0.8,
                    }}
                  >
                    Prize details will be revealed soon!
                  </motion.p>

                  <motion.div
                    className="mt-6 inline-block"
                    initial={{ opacity: 0 }}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                            scale: [1, 1.05, 1],
                            rotate: [0, 2, 0, -2, 0],
                          }
                        : { opacity: 0 }
                    }
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      delay: 1,
                    }}
                  >
                    <p className="text-[#3DEFE9] font-semibold">Get ready for something incredible!</p>
                  </motion.div>

                  {/* Countdown timer placeholder */}
                  <motion.div
                    className="mt-8 p-4 bg-white/5 rounded-lg inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex gap-4 justify-center">
                      {["DAYS", "HOURS", "MINS", "SECS"].map((unit, i) => (
                        <div key={i} className="text-center">
                          <motion.div
                            className="text-2xl font-bold text-white bg-white/10 w-14 h-14 rounded flex items-center justify-center mb-1"
                            animate={
                              isInView
                                ? {
                                    boxShadow: [
                                      "0 0 0 rgba(255, 190, 11, 0)",
                                      "0 0 15px rgba(255, 190, 11, 0.5)",
                                      "0 0 0 rgba(255, 190, 11, 0)",
                                    ],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                              delay: i * 0.5 + 1.2,
                            }}
                          >
                            {i === 0 ? "00" : i === 1 ? "00" : i === 2 ? "00" : "00"}
                          </motion.div>
                          <p className="text-xs text-white/60">{unit}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Notification signup */}
                  <motion.div
                    className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                  >
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#FFBE0B] focus:border-transparent"
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        animate={
                          isInView
                            ? {
                                boxShadow: [
                                  "0 0 0 rgba(255, 190, 11, 0)",
                                  "0 0 10px rgba(255, 190, 11, 0.3)",
                                  "0 0 0 rgba(255, 190, 11, 0)",
                                ],
                              }
                            : {}
                        }
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          delay: 1.6,
                        }}
                      />
                    </div>
                    <motion.button
                      className="px-6 py-2 rounded-full bg-[#FFBE0B] text-black font-medium hover:bg-[#ffca3a] transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Notify Me
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-[#FFBE0B]">
              <Zap className="w-5 h-5 text-[#FFBE0B]" />
              <p className="text-white/90 text-sm">All participants will receive certificates and swag kits!</p>
            </div>

            {/* Social media sharing */}
            <motion.div
              className="mt-8 flex justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <p className="text-white/60 text-sm">Share the excitement:</p>
              <div className="flex gap-3">
                {["Twitter", "Facebook", "Instagram"].map((platform, i) => (
                  <motion.button
                    key={i}
                    className="text-white/80 hover:text-[#FFBE0B] transition-colors text-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {platform}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

