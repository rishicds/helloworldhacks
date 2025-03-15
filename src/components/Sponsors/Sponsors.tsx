"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Canvas } from "@react-three/fiber"
import { useGLTF, OrbitControls } from "@react-three/drei"
const DragonModel = () => {
    const group = useRef(null)
    const { scene, } = useGLTF("/models/coins.glb")
    
    // Simple rotation animation
    useRef(() => {
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
        <primitive 
          object={scene} 
          scale={0.16}
          position={[0, -0.5, 0]}
          rotation={[0, Math.PI * 0.25, 0]}
        />
      </group>
    )
  }


export default function Sponsors() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const sponsors = [
    { name: "Google", tier: "PLATINUM SPONSORS", imageWidth: 180 },
    { name: "Microsoft", tier: "PLATINUM SPONSORS", imageWidth: 180 },
    { name: "AWS", tier: "GOLD SPONSORS", imageWidth: 150 },
    { name: "GitHub", tier: "GOLD SPONSORS", imageWidth: 150 },
    { name: "Vercel", tier: "GOLD SPONSORS", imageWidth: 150 },
    { name: "MongoDB", tier: "SILVER SPONSORS", imageWidth: 120 },
    { name: "Figma", tier: "SILVER SPONSORS", imageWidth: 120 },
    { name: "Digital Ocean", tier: "SILVER SPONSORS", imageWidth: 120 },
  ]

  // Group sponsors by tier
  const sponsorsByTier = sponsors.reduce((acc, sponsor) => {
    if (!acc[sponsor.tier]) {
      acc[sponsor.tier] = []
    }
    acc[sponsor.tier].push(sponsor)
    return acc
  }, {})

  return (
    <section className="py-32 px-4 sm:px-6 bg-[#0D0221] relative" ref={ref}>
      <div className="relative">
    

        {/* Brutalist background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 right-10 w-40 h-40 border-4 border-[#3DEFE9] rotate-12 opacity-20"></div>
          <div className="absolute bottom-20 left-20 w-60 h-60 border-4 border-[#3DEFE9] -rotate-12 opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto ">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-42 h-42">
                <Canvas
                  camera={{ position: [0, 0, 3], fov: 45 }}
                  style={{ background: 'transparent' }}
                >
                  <ambientLight intensity={3} />
                  <directionalLight position={[0, 10, 10]} intensity={4} />
                  <DragonModel />
                  <OrbitControls 
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={2}
                  />
                </Canvas>
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">OUR SPONSORS</h2>
            <div className="w-20 h-1 bg-[#3DEFE9] mx-auto mb-6"></div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              HelloWorld Hacks is made possible by the generous support of our sponsors. We're grateful for their
              commitment to fostering innovation and supporting the next generation of developers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {Object.entries(sponsorsByTier).map(([tier, tierSponsors], tierIndex) => (
              <div key={tier} className="mb-16 last:mb-0">
                <h3 className="text-center text-sm font-mono tracking-widest mb-8 text-[#3DEFE9]">{tier}</h3>
                <div
                  className={`grid grid-cols-2 md:grid-cols-${Math.min(tierSponsors.length, 4)} gap-8 justify-items-center items-center`}
                >
                  {tierSponsors.map((sponsor, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + tierIndex * 0.2 }}
                      className="bg-white/5 hover:bg-white/10 border-2 border-[#3DEFE9]/30 hover:border-[#3DEFE9] rounded-lg p-8 flex items-center justify-center w-full h-32 transition-all duration-300 backdrop-blur-md"
                    >
                      <Image
                        src={`/placeholder.svg?width=${sponsor.imageWidth}&height=${sponsor.imageWidth / 2}`}
                        alt={sponsor.name}
                        width={sponsor.imageWidth}
                        height={sponsor.imageWidth / 2}
                        className="opacity-80 hover:opacity-100 transition-opacity duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">BECOME A SPONSOR</h3>
            <p className="text-white/70 max-w-2xl mx-auto mb-6">
              Interested in sponsoring HelloWorld Hacks? Reach out to us to learn about our sponsorship packages and how
              you can support the next generation of developers.
            </p>
            <Button className="bg-[#3DEFE9] text-black hover:bg-[#3DEFE9]/90 font-bold">SPONSORSHIP DECK</Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

