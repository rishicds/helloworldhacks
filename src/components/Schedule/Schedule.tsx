"use client"

import { useRef, useEffect, useState } from "react"
import { useInView, motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Canvas } from "@react-three/fiber"
import { useGLTF, OrbitControls, useAnimations, Stars } from "@react-three/drei"
import * as THREE from "three"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Trophy,Clock, Star } from "lucide-react"

// Dragon model component
const DragonModel = () => {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF("/models/celebi.glb")
  const { actions } = useAnimations(animations, group)

  // Play the first animation if available
  useEffect(() => {
    if (actions && animations.length > 0 && animations[1]) {
      const action = actions[animations[1].name]
      if (action) {
        action.reset().fadeIn(0.5).play()
        action.clampWhenFinished = true
        action.loop = THREE.LoopRepeat
      }
    }
  }, [actions, animations])

  // Frame update - rotate if no animations
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useFrame((state, delta) => {
    if (animations.length === 0 && group.current) {
      group.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={group}>
      <primitive object={scene} scale={3} position={[0, -1.4, 0]} rotation={[0, Math.PI * 0.25, 0]} />
    </group>
  )
}

// Missing useFrame declaration
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useFrame = (callback: (state: any, delta: number) => void) => {
  useEffect(() => {
    let lastTime = 0
    const animate = (time: number) => {
      const delta = time - lastTime
      lastTime = time
      callback({ clock: { elapsedTime: time / 1000 } }, delta / 1000)
      requestAnimationFrame(animate)
    }
    const id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [callback])
}

// 3D Title component


export default function Schedule() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [activeTab, setActiveTab] = useState("day1")
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)

  const scheduleData = {
    day1: [
      { time: "March 20- April 18", event: "Registration Period", description: "Devfolio" },
      {
        time: "April 4 10:00AM-5:00PM",
        event: "Tech Verse ( Multiple Speakers Offline Session making the Participants ready for Industry Exposure )",
        description: "Offline Session by TBD",
      },
      { time: "April 10 1:00AM-5:00PM", event: "What is Hackathon(Session)", description: "Offline Session by TBD" },
      { time: "April 12", event: "Opening Ceremony", description: "Online Session by TBD" },
      {
        time: "April 14 12:01AM",
        event: "Proposal Writing Starts",
        description: "Learn how to leverage popular APIs by TBD",
      },
      { time: "April 18 11:59PM", event: "Proposal Submission Deadline", description: "TBD" },
      { time: "April 16-20", event: "Proposal Filtering", description: "Networking dinner with sponsors by TBD" },
      { time: "April 19", event: "Github Session", description: "Online Session by TBD" },
      {
        time: "April 21 12:00AM-May 5 12:59PM",
        event: "Hacking Period",
        description: "Start your day with energy by TBD",
      },
      { time: "April 21", event: "Web3 Session", description: "Online Session by TBD" },
      { time: "April 22", event: "App Dev Session", description: "Online Session by TBD" },
      { time: "April 23", event: "GenAI Session", description: "Online Session by TBD" },
      {
        time: "April 22-25",
        event: "Mentor Mentee MatchMaking",
        description: "Mentors Connection will be matched with the Participants based on Projects Proposal by TBD",
      },
    ],
    day2: [
      { time: "April 25", event: "Light Gaming Session ( Mood Uplifter )", description: "Online by TBD" },
      { time: "April 27", event: "Cyber Security Session", description: "Online Session by TBD" },
      {
        time: "April 28-29",
        event: "Mid Evaluation",
        description:
          "Mentors will go through the progress and the development of the Projects and accordingly Evaluate the Current implementation station of the Projects by TBD.",
      },
      { time: "April 28", event: "OpenSource Session", description: "Online Session by TBD" },
      { time: "April 30", event: "Entrepreneurship Session", description: "Online Session by TBD" },
      { time: "May 1", event: "Devops Session", description: "Online Session by TBD" },
      { time: "", event: "Sponsor Session", description: "TBD" },
      {
        time: "May 1-5",
        event:
          "Documentation Writing Period (Participants will document the Entire Project Development Process and will write articles in Technical Blogs to enhance their Technical Outlook and have a Documentation of their Project.)",
        description: "Dev.to / Hashnode / Medium by TBD",
      },
      { time: "May 2", event: "Technical Writing Session", description: "Online Session by TBD" },
      {
        time: "May 3",
        event: "Networking and PR Session for Participant's connection development",
        description: "Online Session by TBD",
      },
      { time: "May 5 11:59PM", event: "Final Submission Deadline", description: "Final day by TBD" },
      { time: "May 6-8", event: "Judging", description: "Finalize your projects by TBD" },
      {
        time: "May 12",
        event: "Pitching Ideas and Prototype in Front of Judges",
        description: "Offline ( Online for Distant Participants ) by TBD",
      },
      { time: "May 12", event: "Closing Ceremony", description: "Online by TBD" },
    ],
  }

  // Gaming-themed event types with corresponding colors
  const eventTypes = {
    Session: "#FF5722",
    Ceremony: "#FFC107",
    Period: "#4CAF50",
    Deadline: "#F44336",
    Evaluation: "#9C27B0",
    Filtering: "#2196F3",
    MatchMaking: "#00BCD4",
    Judging: "#E91E63",
    Pitching: "#FFEB3B",
  }

  // Get event type color based on event name
  const getEventColor = (eventName: string) => {
    for (const [type, color] of Object.entries(eventTypes)) {
      if (eventName.includes(type)) {
        return color
      }
    }
    return "#3DEFE9" // Default color
  }

  return (
    <section
      className="py-32 px-4 sm:px-6 bg-gradient-to-b from-[#000000] to-[#0a1a2a] relative overflow-hidden"
      ref={ref}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#3DEFE9] opacity-20"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 relative"
          >
            {/* Decorative elements */}
            <motion.div
              className="absolute left-0 top-1/2 w-16 h-16 -translate-y-1/2 hidden md:block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="w-full h-full relative">
                <div className="absolute inset-0 bg-[#3DEFE9] opacity-20 rounded-full animate-ping" />
                <div className="absolute inset-2 bg-[#3DEFE9] opacity-30 rounded-full" />
              </div>
            </motion.div>

            <motion.div
              className="absolute right-0 top-1/2 w-16 h-16 -translate-y-1/2 hidden md:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="w-full h-full relative">
                <div className="absolute inset-0 bg-[#3DEFE9] opacity-20 rounded-full animate-ping" />
                <div className="absolute inset-2 bg-[#3DEFE9] opacity-30 rounded-full" />
              </div>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="w-40 h-40 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3DEFE9] to-[#00a8e8] opacity-20 animate-pulse" />
                <Canvas camera={{ position: [0, 0, 3], fov: 45 }} style={{ background: "transparent" }}>
                  <ambientLight intensity={3} />
                  <directionalLight position={[0, 10, 10]} intensity={0.8} />
                  <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
                  <DragonModel />
                  <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                >
                  <h2 className="text-5xl sm:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#3DEFE9] to-[#00a8e8]">
                    QUEST LOG
                  </h2>
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="w-20 h-1 bg-[#3DEFE9]"></div>
                    <Trophy className="w-6 h-6 text-[#FFC107]" />
                    <div className="w-20 h-1 bg-[#3DEFE9]"></div>
                  </div>
                </motion.div>
                <motion.p
                  className="text-xl text-white/70 max-w-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  A month of coding, learning, and fun. Plan your{" "}
                  <span className="text-[#3DEFE9] font-bold">HelloWorld Hacks</span> adventure.
                </motion.p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative corner elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-l-2 border-t-2 border-[#3DEFE9] opacity-70" />
            <div className="absolute -top-4 -right-4 w-16 h-16 border-r-2 border-t-2 border-[#3DEFE9] opacity-70" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border-l-2 border-b-2 border-[#3DEFE9] opacity-70" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-r-2 border-b-2 border-[#3DEFE9] opacity-70" />

            <Tabs defaultValue="day1" className="w-full  max-w-4xl mx-auto" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-black/50 border-2 border-[#3DEFE9]/30 rounded-xl p-1 ">
                <TabsTrigger
                  value="day1"
                  className="relative text-sm sm:text-base py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#3DEFE9] data-[state=active]:to-[#00a8e8] data-[state=active]:text-black font-bold rounded-lg transition-all duration-300"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-lg"
                    initial={false}
                    animate={{ opacity: activeTab === "day1" ? 0 : 1 }}
                    whileHover={{ opacity: 0.2 }}
                  />
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-4 h-4" />
                    <span>THE FIRST QUEST</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="day2"
                  className="relative text-sm sm:text-base py-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#3DEFE9] data-[state=active]:to-[#00a8e8] data-[state=active]:text-black font-bold rounded-lg transition-all duration-300"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-lg"
                    initial={false}
                    animate={{ opacity: activeTab === "day2" ? 0 : 1 }}
                    whileHover={{ opacity: 0.2 }}
                  />
                  <div className="flex items-center justify-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span>THE FINAL QUEST</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              {Object.entries(scheduleData).map(([day, events]) => (
                <TabsContent key={day} value={day} className="mt-0">
                  <Card className="border-2 border-[#3DEFE9]/30 bg-black/30 backdrop-blur-md overflow-hidden">
                    <CardContent className="p-0">
                      <div className="divide-y divide-[#3DEFE9]/20">
                        <AnimatePresence>
                          {events.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ duration: 0.5, delay: index * 0.05 }}
                              className="relative"
                              onMouseEnter={() => setHoveredEvent(index)}
                              onMouseLeave={() => setHoveredEvent(null)}
                            >
                              <motion.div
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-transparent to-transparent"
                                style={{
                                  width: hoveredEvent === index ? "100%" : "0%",
                                  background:
                                    hoveredEvent === index
                                      ? `linear-gradient(90deg, transparent, ${getEventColor(item.event)}10, transparent)`
                                      : "transparent",
                                }}
                                transition={{ duration: 0.3 }}
                              />

                              <div className="flex flex-col sm:flex-row py-4 sm:py-6 px-4 sm:px-8 relative z-10">
                                <div className="sm:w-1/4 mb-2 sm:mb-0 flex items-start gap-2">
                                  <div className="mt-1 flex-shrink-0">
                                    <Clock className="w-4 h-4 text-[#3DEFE9]" />
                                  </div>
                                  <span className="font-mono text-[#3DEFE9] font-bold">{item.time}</span>
                                </div>
                                <div className="sm:w-3/4">
                                  <div className="flex items-center gap-2 mb-1">
                                    <div
                                      className="w-3 h-3 rounded-full"
                                      style={{ backgroundColor: getEventColor(item.event) }}
                                    />
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                      {item.event}
                                      <motion.div
                                        animate={{
                                          opacity: hoveredEvent === index ? 1 : 0,
                                          x: hoveredEvent === index ? 0 : -10,
                                        }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <ChevronRight className="w-4 h-4 text-[#3DEFE9]" />
                                      </motion.div>
                                    </h3>
                                  </div>
                                  <p className="text-white/70">{item.description}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          
        </div>
      </div>
    </section>
  )
}

