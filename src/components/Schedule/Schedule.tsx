"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Canvas } from "@react-three/fiber"
import { useGLTF, OrbitControls, useAnimations } from "@react-three/drei"
import * as THREE from "three"

// Dragon model component
const DragonModel = () => {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF("/models/dragon.glb")
  const { actions } = useAnimations(animations, group)

  // Play the first animation if available
  useRef(() => {
    if (animations && animations.length > 0) {
      const actionNames = Object.keys(actions)
      if (actionNames.length > 0) {
        actions[actionNames[1]]?.play()
      }
    }
  })

  // Frame update - rotate if no animations
  useFrame((state, delta) => {
    if (animations.length === 0 && group.current) {
      group.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={group}>
      <primitive 
        object={scene} 
        scale={0.5} 
        position={[0, -0.5, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
    </group>
  )
}

// Missing useFrame declaration
const useFrame = (callback: (state: any, delta: number) => void) => {
  useRef(() => {
    let lastTime = 0
    const animate = (time: number) => {
      const delta = time - lastTime
      lastTime = time
      callback({ clock: { elapsedTime: time / 1000 } }, delta / 1000)
      requestAnimationFrame(animate)
    }
    const id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  })
}


export default function Schedule() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const scheduleData = {
    day1: [
      { time: "9:00 AM", event: "Registration & Check-in", description: "Grab your badges and welcome kit" },
      { time: "10:00 AM", event: "Opening Ceremony", description: "Welcome address by GDG RCCIIT & RCCTechz" },
      { time: "11:00 AM", event: "Team Formation", description: "Find teammates and brainstorm ideas" },
      { time: "12:00 PM", event: "Lunch Break", description: "Fuel up for the challenges ahead" },
      { time: "1:00 PM", event: "Workshop: API Integration", description: "Learn how to leverage popular APIs" },
      { time: "3:00 PM", event: "Hacking Begins", description: "Start building your projects" },
      { time: "8:00 PM", event: "Dinner", description: "Networking dinner with sponsors" },
      { time: "9:00 PM", event: "Night Hacking", description: "Continue working on projects" },
    ],
    day2: [
      { time: "8:00 AM", event: "Breakfast", description: "Start your day with energy" },
      { time: "9:00 AM", event: "Workshop: UI/UX Design", description: "Create better user experiences" },
      { time: "11:00 AM", event: "Checkpoint #1", description: "Share progress and get feedback" },
      { time: "12:00 PM", event: "Lunch Break", description: "Recharge with fellow hackers" },
      { time: "1:00 PM", event: "Workshop: Cloud Deployment", description: "Deploy your apps to the cloud" },
      { time: "3:00 PM", event: "Mentor Sessions", description: "Get help from industry experts" },
      { time: "7:00 PM", event: "Dinner", description: "Continue networking and sharing ideas" },
      { time: "8:00 PM", event: "Gaming Tournament", description: "Take a break with some gaming fun" },
    ],
    day3: [
      { time: "8:00 AM", event: "Breakfast", description: "Final day energy boost" },
      { time: "9:00 AM", event: "Last Push", description: "Finalize your projects" },
      { time: "12:00 PM", event: "Lunch Break", description: "Quick lunch before submissions" },
      { time: "1:00 PM", event: "Project Submission Deadline", description: "All code must be submitted" },
      { time: "2:00 PM", event: "Project Presentations", description: "Demo your creations to judges" },
      { time: "5:00 PM", event: "Judging Period", description: "Judges deliberate on projects" },
      { time: "6:00 PM", event: "Awards Ceremony", description: "Winners announced and prizes awarded" },
      { time: "7:00 PM", event: "Closing Party", description: "Celebrate the amazing weekend" },
    ],
  }

  return (
    <section className="py-32 px-4 sm:px-6 bg-[#000000] relative" ref={ref}>
    <div className="relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          <div className="flex items-center justify-center">
            <div className="w-32 h-32 mr-4 relative">
              <Canvas
                camera={{ position: [0, 0, 3], fov: 45 }}
                style={{ background: 'transparent' }}
              >
                <ambientLight intensity={3} />
                <directionalLight position={[0, 10, 10]} intensity={0.8} />
                <DragonModel />
                <OrbitControls 
                  enableZoom={false}
                  enablePan={false}
                  
                />
              </Canvas>
            </div>
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">EVENT TIMELINE</h2>
              <div className="w-20 h-1 bg-[#3DEFE9] mx-auto mb-6"></div>
            </div>
          </div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Three days of coding, learning, and fun. Plan your HelloWorld Hacks experience.
          </p>
        </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Tabs defaultValue="day1" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/10 p-1">
                <TabsTrigger
                  value="day1"
                  className="text-sm sm:text-base py-4 data-[state=active]:bg-[#3DEFE9] data-[state=active]:text-black "
                >
                  DAY 1: KICKOFF
                </TabsTrigger>
                <TabsTrigger
                  value="day2"
                  className="text-sm sm:text-base py-3 data-[state=active]:bg-[#3DEFE9] data-[state=active]:text-black"
                >
                  DAY 2: BUILD
                </TabsTrigger>
                <TabsTrigger
                  value="day3"
                  className="text-sm sm:text-base py-3 data-[state=active]:bg-[#3DEFE9] data-[state=active]:text-black"
                >
                  DAY 3: FINALE
                </TabsTrigger>
              </TabsList>

              {Object.entries(scheduleData).map(([day, events],) => (
                <TabsContent key={day} value={day} className="mt-0">
                  <Card className="border-2 border-white/10 bg-white/5 backdrop-blur-md">
                    <CardContent className="p-0">
                      <div className="divide-y divide-white/10">
                        {events.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col sm:flex-row py-4 sm:py-6 px-4 sm:px-8 hover:bg-white/10 transition duration-300"
                          >
                            <div className="sm:w-1/4 mb-2 sm:mb-0">
                              <span className="font-mono text-[#3DEFE9] font-bold">{item.time}</span>
                            </div>
                            <div className="sm:w-3/4">
                              <h3 className="text-lg font-bold mb-1 text-white">{item.event}</h3>
                              <p className="text-white/70">{item.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div> */}
          <motion.div 
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ 
    duration: 0.8, 
    type: "spring",
    bounce: 0.4 
  }}
  className="max-w-4xl mx-auto"
>
  <Card className="border-2 border-[#3DEFE9]/30 bg-white/5 backdrop-blur-md overflow-hidden">
    <CardContent className="p-8 text-center">
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: [-5, 5, -5] }}
        transition={{ 
          repeat: Infinity, 
          duration: 4,
          ease: "easeInOut" 
        }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
          Schedule Loading<span className="inline-block">
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.5, 1] }}
            >.</motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.2, times: [0, 0.5, 1] }}
            >.</motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.4, times: [0, 0.5, 1] }}
            >.</motion.span>
          </span>
        </h2>
        
        <div className="w-20 h-1 bg-[#3DEFE9] mx-auto mb-8"></div>
        
        <p className="text-xl text-white/70 max-w-3xl mx-auto mb-6">
          Our team of time-traveling wizards is still carefully crafting the perfect schedule.
        </p>
        
        <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
          Legend has it they're debating whether to include a midnight pizza party or early morning coding with pancakes. Tough choices!
        </p>
        
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut" 
          }}
          className="w-24 h-24 mx-auto mb-8 text-[#3DEFE9]"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        
        <p className="text-md text-white/50 italic">
          Check back soon for the full, action-packed schedule!
        </p>
      </motion.div>
    </CardContent>
  </Card>
</motion.div>
        </div>
      </div>
    </section>
  )
}

