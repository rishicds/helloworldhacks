"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Canvas } from "@react-three/fiber"
import { useGLTF, OrbitControls, useAnimations, Stars } from "@react-three/drei"
import * as THREE from "three"
import {
  ChevronDown,
  Trophy,
  Clock,
  Calendar,
  Pause,
  Play,
  Info,
  ArrowLeft,
  ArrowRight,
  ChevronUp,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Improved Dragon model component with proper type safety
const DragonModel = () => {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF("/models/celebi.glb")
  const { actions } = useAnimations(animations, group)

  // Play animation with error handling
  useEffect(() => {
    try {
      if (actions && animations.length > 0) {
        // Choose the second animation if available, otherwise use the first
        const animationName = animations[1]?.name || animations[0]?.name

        if (animationName && actions[animationName]) {
          const action = actions[animationName]
          action.reset().fadeIn(0.5).play()
          action.clampWhenFinished = true
          action.loop = THREE.LoopRepeat
        }
      }
    } catch (error) {
      console.error("Error playing dragon animation:", error)
    }
  }, [actions, animations])

  // Frame update - rotate model if no animations available
  useFrame((state, delta) => {
    if ((animations.length === 0 || !actions) && group.current) {
      group.current.rotation.y += delta * 0.5 // Smoother rotation based on time delta
    }
  })

  return (
    <group ref={group}>
      <primitive object={scene} scale={3} position={[0, -1.5, 0]} rotation={[0, Math.PI * 2, 0]} />
    </group>
  )
}

// Properly typed useFrame hook
const useFrame = (callback: (state: { clock: { elapsedTime: number } }, delta: number) => void) => {
  const callbackRef = useRef(callback)

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    let lastTime = 0
    let frameId: number

    const animate = (time: number) => {
      const delta = lastTime === 0 ? 0 : time - lastTime
      lastTime = time
      callbackRef.current({ clock: { elapsedTime: time / 1000 } }, delta / 1000)
      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [])
}

// Type definitions for events
interface EventItem {
  time: string
  event: string
  description: string
  type?: string
}

// Event category definitions with colors
const EVENT_CATEGORIES = {
  Session: { color: "#FF5722", icon: "graduation-cap" },
  Ceremony: { color: "#FFC107", icon: "party-popper" },
  Period: { color: "#4CAF50", icon: "calendar" },
  Deadline: { color: "#F44336", icon: "alert-circle" },
  Evaluation: { color: "#9C27B0", icon: "clipboard-check" },
  Filtering: { color: "#2196F3", icon: "filter" },
  MatchMaking: { color: "#00BCD4", icon: "users" },
  Judging: { color: "#E91E63", icon: "gavel" },
  Pitching: { color: "#FFEB3B", icon: "presentation" },
}

export default function CheckpointTimeline() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Organize events by categories
  const allEvents: EventItem[] = [
    { time: "March 20 - April 18", event: "Registration Period", description: "Sign up for the hackathon on Devfolio" },
    {
      time: "April 4 10:00AM-5:00PM",
      event: "Tech Verse Session",
      description: "Multiple speakers offline session preparing participants for industry exposure",
    },
    {
      time: "April 10 1:00PM-5:00PM",
      event: "Hackathon Orientation Session",
      description: "Learn what to expect during the hackathon event",
    },
    { time: "April 12", event: "Opening Ceremony", description: "Official kickoff for HelloWorld Hacks" },
    {
      time: "April 14 12:01AM",
      event: "Proposal Writing Starts",
      description: "Begin crafting your project proposals and learn how to leverage popular APIs",
    },
    {
      time: "April 16-20",
      event: "Proposal Filtering",
      description: "Selection committee reviews submitted proposals",
    },
    {
      time: "April 18 11:59PM",
      event: "Proposal Submission Deadline",
      description: "Last chance to submit your project ideas",
    },
    { time: "April 19", event: "Github Session", description: "Best practices for version control and collaboration" },
    {
      time: "April 21 12:00AM-May 5 12:59PM",
      event: "Hacking Period",
      description: "Two weeks of intensive development and building your project",
    },
    {
      time: "April 21",
      event: "Web3 Session",
      description: "Introduction to blockchain and decentralized applications",
    },
    { time: "April 22", event: "App Dev Session", description: "Building cross-platform mobile applications" },
    {
      time: "April 22-25",
      event: "Mentor Mentee MatchMaking",
      description: "Connect with industry mentors based on your project proposal",
    },
    { time: "April 23", event: "GenAI Session", description: "Leveraging generative AI in your projects" },
    { time: "April 25", event: "Light Gaming Session", description: "Take a break with fun multiplayer games" },
    { time: "April 27", event: "Cyber Security Session", description: "Securing your applications and data" },
    {
      time: "April 28-29",
      event: "Mid Evaluation",
      description: "Progress check with mentors to evaluate current implementation",
    },
    { time: "April 28", event: "OpenSource Session", description: "Contributing to and building open source projects" },
    {
      time: "April 30",
      event: "Entrepreneurship Session",
      description: "Turning your hackathon project into a startup",
    },
    { time: "May 1", event: "Devops Session", description: "CI/CD pipelines and deployment strategies" },
    {
      time: "May 1-5",
      event: "Documentation Writing Period",
      description: "Create technical documentation on Dev.to/Hashnode/Medium",
    },
    { time: "May 2", event: "Technical Writing Session", description: "Effective technical documentation techniques" },
    {
      time: "May 3",
      event: "Networking and PR Session",
      description: "Develop professional connections and promote your project",
    },
    { time: "May 5 11:59PM", event: "Final Submission Deadline", description: "Submit your completed projects" },
    { time: "May 6-8", event: "Judging", description: "Judges review all submitted projects" },
    {
      time: "May 12",
      event: "Project Pitching",
      description: "Present your ideas and prototypes to judges (online options available for remote participants)",
    },
    { time: "May 12", event: "Closing Ceremony", description: "Awards announcement and hackathon conclusion" },
  ]

  // Identify event types programmatically
  const processedEvents = allEvents.map((event) => {
    let type = "Other"
    for (const category in EVENT_CATEGORIES) {
      if (event.event.includes(category)) {
        type = category
        break
      }
    }
    return { ...event, type }
  })

  // Calculate total number of pages based on events per page
  const eventsPerPage = 5
  const totalPages = Math.ceil(processedEvents.length / eventsPerPage)

  // Get current events for continuous sliding
  const getEventsForIndex = useCallback(
    (index: number) => {
      const normalizedIndex = ((index % totalPages) + totalPages) % totalPages
      const start = normalizedIndex * eventsPerPage
      const end = Math.min(start + eventsPerPage, processedEvents.length)
      return processedEvents.slice(start, end)
    },
    [processedEvents, totalPages, eventsPerPage],
  )

  // Current, previous and next sets of events for smooth transitions
  const currentEvents = getEventsForIndex(currentIndex)
  
  // Handle continuous sliding
  const slideToNext = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }, [isTransitioning])

  const slideToPrev = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prev) => prev - 1)

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }, [isTransitioning])

  // Setup continuous auto-scrolling
  useEffect(() => {
    if (!isAutoScrolling) return

    const interval = setInterval(() => {
      slideToNext()
    }, 5000) // Slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoScrolling, slideToNext])

  // Pause auto-scroll when user interacts with the timeline
  const handleManualInteraction = () => {
    setIsAutoScrolling(false)
  }

  // Toggle auto-scrolling
  const toggleAutoScroll = () => {
    setIsAutoScrolling((prevState) => !prevState)
  }

  // Get event type color based on event name
  const getEventColor = (eventName: string) => {
    for (const [type, details] of Object.entries(EVENT_CATEGORIES)) {
      if (eventName.includes(type)) {
        return details.color
      }
    }
    return "#3DEFE9" // Default color
  }

  return (
    <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-[#000000] to-[#0a1a2a] relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12 relative">
          {/* Decorative elements with improved animations */}
          <motion.div
            className="absolute left-0 top-1/2 w-16 h-16 -translate-y-1/2 hidden md:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full h-full relative">
              <motion.div
                className="absolute inset-0 bg-[#3DEFE9] opacity-20 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <div className="absolute inset-2 bg-[#3DEFE9] opacity-30 rounded-full" />
            </div>
          </motion.div>

          <motion.div
            className="absolute right-0 top-1/2 w-16 h-16 -translate-y-1/2 hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full h-full relative">
              <motion.div
                className="absolute inset-0 bg-[#3DEFE9] opacity-20 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              />
              <div className="absolute inset-2 bg-[#3DEFE9] opacity-30 rounded-full" />
            </div>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <motion.div
              className="w-32 h-32 md:w-40 md:h-40 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3DEFE9] to-[#00a8e8] opacity-20"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
              <Canvas camera={{ position: [0, 0, 3], fov: 45 }} style={{ background: "transparent" }}>
                <ambientLight intensity={3} />
                <directionalLight position={[0, 10, 10]} intensity={0.8} />
                <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={1} />
                <DragonModel />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              </Canvas>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 2, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <h2 className="text-4xl sm:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#3DEFE9] to-[#00a8e8]">
                  QUEST LOG
                </h2>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="w-20 h-1 bg-[#3DEFE9]"></div>
                  <Trophy className="w-6 h-6 text-[#FFC107]" />
                  <div className="w-20 h-1 bg-[#3DEFE9]"></div>
                </div>
              </div>
              <p className="text-lg text-white/70 max-w-3xl">
                A month of coding, learning, and fun. Plan your{" "}
                <span className="text-[#3DEFE9] font-bold">HelloWorld Hacks</span> adventure.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Decorative corner elements */}
          <div className="absolute -top-4 -left-4 w-16 h-16 border-l-2 border-t-2 border-[#3DEFE9] opacity-70" />
          <div className="absolute -top-4 -right-4 w-16 h-16 border-r-2 border-t-2 border-[#3DEFE9] opacity-70" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 border-l-2 border-b-2 border-[#3DEFE9] opacity-70" />
          <div className="absolute -bottom-4 -right-4 w-16 h-16 border-r-2 border-b-2 border-[#3DEFE9] opacity-70" />

          {/* Timeline header with auto-scroll toggle */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#3DEFE9]" />
              <h3 className="text-xl font-bold text-white">Schedule</h3>
              <div className="text-sm text-white/60 hidden sm:block">
                Page {(((currentIndex % totalPages) + totalPages) % totalPages) + 1} of {totalPages}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#3DEFE9] mr-1 hidden sm:block" />
              <span className="text-xs text-[#3DEFE9]/80 mr-2 hidden sm:block">Click events for details</span>
              <button
                onClick={toggleAutoScroll}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3DEFE9]/10 hover:bg-[#3DEFE9]/20 transition-all"
                aria-label={isAutoScrolling ? "Pause auto-scroll" : "Enable auto-scroll"}
              >
                {isAutoScrolling ? (
                  <>
                    <Pause className="w-4 h-4 text-[#3DEFE9]" />
                    <span className="text-sm text-[#3DEFE9]">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-[#3DEFE9]" />
                    <span className="text-sm text-[#3DEFE9]">Auto-scroll</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <Card className="border-2 border-[#3DEFE9]/30 bg-black/30 backdrop-blur-md overflow-hidden">
            <CardContent className="p-4">
              {/* Pagination controls */}
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={slideToPrev}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#3DEFE9]/10 hover:bg-[#3DEFE9]/20 transition-all"
                  disabled={isTransitioning}
                  aria-label="Previous page"
                >
                  <ArrowLeft className="w-4 h-4 text-[#3DEFE9]" />
                  <span className="text-sm text-[#3DEFE9] hidden sm:inline">Previous</span>
                </button>
                <div className="text-sm text-[#3DEFE9] sm:hidden">
                  {(((currentIndex % totalPages) + totalPages) % totalPages) + 1}/{totalPages}
                </div>
                <button
                  onClick={slideToNext}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#3DEFE9]/10 hover:bg-[#3DEFE9]/20 transition-all"
                  disabled={isTransitioning}
                  aria-label="Next page"
                >
                  <span className="text-sm text-[#3DEFE9] hidden sm:inline">Next</span>
                  <ArrowRight className="w-4 h-4 text-[#3DEFE9]" />
                </button>
              </div>

              {/* Event timeline with continuous sliding */}
              <div
                ref={scrollContainerRef}
                className="relative overflow-hidden"
                onMouseDown={handleManualInteraction}
                onTouchStart={handleManualInteraction}
                onWheel={handleManualInteraction}
              >
                <div className="relative w-full">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={currentIndex}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                      initial={{
                        x: isTransitioning ? (currentIndex > currentIndex - 1 ? "100%" : "-100%") : 0,
                        opacity: 0,
                      }}
                      animate={{
                        x: 0,
                        opacity: 1,
                      }}
                      exit={{
                        x: currentIndex > currentIndex - 1 ? "-100%" : "100%",
                        opacity: 0,
                      }}
                      transition={{
                        type: "tween",
                        ease: "easeInOut",
                        duration: 0.5,
                      }}
                    >
                      {currentEvents.map((item, index) => {
                        const globalIndex =
                          (((currentIndex % totalPages) + totalPages) % totalPages) * eventsPerPage + index
                        const isExpanded = expandedEvent === globalIndex
                        const isHovered = hoveredEvent === globalIndex
                        const eventColor = getEventColor(item.event)

                        return (
                          <motion.div
                            key={`${currentIndex}-${index}`}
                            className="relative z-10 h-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredEvent(globalIndex)}
                            onMouseLeave={() => setHoveredEvent(null)}
                          >
                            {/* Card for each event */}
                            <div
                              className={`
                                border border-[#3DEFE9]/30 rounded-lg p-4 h-full bg-black/50 backdrop-blur-sm
                                transition-all duration-300 cursor-pointer
                                ${isExpanded ? "border-[#3DEFE9] shadow-[0_0_15px_rgba(61,239,233,0.3)]" : ""}
                                ${isHovered && !isExpanded ? "border-[#3DEFE9]/70" : ""}
                              `}
                              onClick={() => setExpandedEvent(isExpanded ? null : globalIndex)}
                            >
                              {/* Checkpoint node */}
                              <div className="flex items-center justify-between mb-3">
                                <div
                                  className={`
                                    w-6 h-6 rounded-full flex items-center justify-center
                                    transition-all duration-300 border-2
                                    ${isExpanded ? "border-[#3DEFE9] scale-110" : "border-[#3DEFE9]/50"}
                                  `}
                                >
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: eventColor }} />
                                </div>

                                <div className="text-xs font-mono text-[#3DEFE9]/90">{item.time}</div>
                              </div>

                              {/* Event title */}
                              <h4 className="text-base font-bold text-white mb-2">{item.event}</h4>

                              {/* Event description (always visible) */}
                             

                              {/* Expandable content */}
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden mt-3"
                                  >
                                    <div className="border-t border-[#3DEFE9]/30 pt-3 mt-3">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-3 h-3 text-[#3DEFE9]" />
                                        <span className="text-xs text-[#3DEFE9] font-mono">{item.time}</span>
                                      </div>
                                      <p className="text-white/90 text-sm">{item.description}</p>

                                      {/* Interaction hint */}
                                      <div className="flex justify-center mt-3">
                                        <ChevronUp className="w-4 h-4 text-[#3DEFE9] animate-bounce" />
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              {/* Expand indicator when not expanded */}
                              {!isExpanded && (
                                <div className="flex justify-center mt-3">
                                  <ChevronDown className="w-4 h-4 text-[#3DEFE9] opacity-50" />
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            {Object.entries(EVENT_CATEGORIES).map(([type, { color }]) => (
              <div key={type} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs text-white/70">{type}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        .shadow-glow {
          box-shadow: 0 0 15px rgba(61, 239, 233, 0.4);
        }
      `}</style>
    </section>
  )
}

