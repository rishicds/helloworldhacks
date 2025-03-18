"use client"

import { useRef ,useEffect} from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Canvas } from "@react-three/fiber"
import { useGLTF, OrbitControls, useAnimations } from "@react-three/drei"
import * as THREE from "three"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"

// Dragon model component
const DragonModel = () => {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF("/models/celebi.glb")
  const { actions } = useAnimations(animations, group)

  // Play the first animation if available
  useEffect(() => {
    if (actions && animations.length > 0 && animations[0]) {
      const action = actions[animations[1].name];
      if (action) {
        action.reset().fadeIn(0.5).play();
        action.clampWhenFinished = true;
        action.loop = THREE.LoopRepeat;
      }
    }
  }, [actions, animations, animations[0]]);

  // Frame update - rotate if no animations
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useFrame((state, delta) => {
    if (animations.length === 0 && group.current) {
      group.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={group}>
      <primitive 
        object={scene} 
        scale={2} 
        position={[0, -0.5, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
    </group>
  )
}

// Missing useFrame declaration
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      { time: "March 20- April 18", event: "Registration Period", description: "Devfolio" },
      
      { time: "April 4 10:00AM-5:00PM", event: "Tech Verse ( Multiple Speakers Offline Session making the Participants ready for Industry Exposure )", description: "Offline Session by1. Harshavardhan Bajoria ( APM @ Unstop , GitHub Campus Expert , Gold MLSA )2. Hrittik Roy ( DevRel @LoftLabs, Ex- GitHub Campus Expert , DevOps Expert )3. Subhankar Mitra ( FullStack Developer @ Hoichoi Tech )4. Aritra Basu ( Senior Software Engineer @ Clirnet , Finalist @ SIH2023, Winner at HackOn 2.0 by Infosys )                                                                                                                                                                                                                                            " },
      { time: "April 10 1:00AM-5:00PM", event: "What is Hackathon(Session)", description: "Offline Session" },
      { time: "April 12", event: "Opening Ceremony", description: "Online Session" },
      { time: "April 14 12:01AM", event: "Proposal Writing Starts", description: "Learn how to leverage popular APIs" },
      { time: "April 18 11:59PM", event: "Proposal Submission Deadline", description: "" },
      { time: "April 16-20", event: "Proposal Filtering", description: "Networking dinner with sponsors" },
      { time: "April 19", event: "Github Session", description: "Online Session by Subinoy Biswas ( Intern @ ISRO , Winner @ SIH 2025 )" },
      { time: "April 21 12:00AM-May 5 12:59PM", event: " Hacking Period", description: "Start your day with energy" },
      { time: "April 21", event: "Web3 Session", description: "Online Session by Manish Saha ( Core Member at SuperTeam DAO Kolkata , One of the Top Web3 Developers in West Bengal )" },
      { time: "April 22", event: "App Dev Session", description: "Online Session by Supratim Dhara ( Founding Engineer @ Pegman India )" },
      { time: "April 23", event: "GenAI Session", description: "Online Session Mayukh Haldar ( 2x Intern @ Webel )" },
      { time: "April 22-25", event: "Mentor Mentee MatchMaking", description: "Mentors Connection will be matched with the Participants based on Projects Proposal" },
    ],
    day2: [
     
      { time: "April 25", event: "Light Gaming Session ( Mood Uplifter )", description: "Online" },
      { time: "April 27", event: "Cyber Security Session", description: "Online Session by Anurag Roy ( CyberSecurity Expert @ Kolkata Police STF )" },
      { time: "April 28-29", event: "Mid Evaluation", description: "Mentors will go through the progress and the development of the Projects and accordingly Evaluate the Current implementation station of the Projects." },
      { time: "April 28", event: "OpenSource Session", description: "Online Session by Soham Banerjee ( GSOC Mentor, Ex- LFX Mentee , Ex- GSOC Contributor 2x)" },
      { time: "April 30", event: "Entrepreneurship Session", description: "Online Session by Sankha Ray ( Program Manager @ IIM Calcutta Innovation Park )" },
      { time: "May 1", event: "Devops Session", description: "Online Session by Sourav Tiwari ( Senior Associate @ PWC , Lead Organiser @ Flutter Kolkata )" },
      { time: "", event: "Sponser Session", description: "" },
      { time: "May 1-5", event: "Documentation Writing Period (Participants will document the Entire Project Development Process and will write articles in Technical Blogs to enhance their Technical Outlook and have a Documentation of their Project.)", description: "Dev.to / Hashnode / Medium" },
      { time: "May 2", event: "Technical Writing Session", description: "Online Session" },
      { time: "May 3", event: "Networking and PR Session for Participant’s connection development", description: "Online Session" },
      { time: "May 5 11:59PM", event: "Final Submission Deadline", description: "Final day" },
      { time: "May 6-8", event: "Judging", description: "Finalize your projects" },
      { time: "May 12", event: "Pitching Ideas and Prototype in Front of Judges", description: "Offline ( Online for Distant Participants )" },
      { time: "May 12", event: "Closing Ceremony", description: "Online" },

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

          { <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Tabs defaultValue="day1" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/10 p-1">
                <TabsTrigger
                  value="day1"
                  className="text-sm sm:text-base py-4 data-[state=active]:bg-[#3DEFE9] data-[state=active]:text-black "
                >
                  DAY 1: Plan and Build
                </TabsTrigger>
                <TabsTrigger
                  value="day2"
                  className="text-sm sm:text-base py-3 data-[state=active]:bg-[#3DEFE9] data-[state=active]:text-black"
                >
                  DAY 2: Evolve and Launch
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
          </motion.div>}
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
        
        
      </motion.div>
    </CardContent>
  </Card>
</motion.div>
        </div>
      </div>
    </section>
  )
}

