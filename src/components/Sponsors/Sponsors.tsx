"use client"

import { useRef, useState ,useEffect} from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { Card } from "../ui/card"
import Image from "next/image"
import { Group } from "three";

const DragonModel = () => {
  const group = useRef<Group>(null)
  const { scene, } = useGLTF("/models/coins.glb")
  
  // Simple rotation animation
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      if (group.current) {
        group.current.rotation.y += 0.01; // Reduced rotation speed
      }
      frameId = requestAnimationFrame(animate);
    };

    // Start the animation
    frameId = requestAnimationFrame(animate);

    // Cleanup function to cancel the animation frame
    return () => cancelAnimationFrame(frameId);
  }, []);
  
  

  return (
    <group ref={group}>
      <primitive 
        object={scene} 
        scale={0.006}
        position={[0, -0.5, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
    </group>
  )
}
  


export default function Sponsors() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  // You can change this to true when needed
  const [isHovered, setIsHovered] = useState(false);
  
  const quirkySlogans = [
    "Sponsors get the coolest swag!",
    "Join the cool kids' table!",
    "Your logo could be here →",
    "Support awesome, be awesome!",
    "High-five your marketing budget!"
  ];

  const downloadBrochure = () => {
    const link = document.createElement('a');
    link.href = '/sponsorshipbrochure.pdf';
    link.download = 'sponsorshipbrochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const sponsors = [
    { name: "LLMWARE", tier: "TITLE SPONSORS", imageWidth: 120 },
    { name: "DEVFOLIO", tier: "GOLD SPONSORS", imageWidth: 180 },
    { name: "ETHINDIA", tier: "SILVER SPONSORS", imageWidth: 150 },
    { name: "PIECES", tier: "EDUCATION SPONSORS", imageWidth: 220 },
    { name: "INTERVIEW", tier: "EDUCATION SPONSORS", imageWidth: 200 },
    { name: "DEVREL", tier: "TECHNICAL SPONSORS", imageWidth: 180 },
    
   
  ]

  // Group sponsors by tier
  const sponsorsByTier = sponsors.reduce<Record<string, typeof sponsors>>((acc, sponsor) => {
    if (!acc[sponsor.tier]) {
      acc[sponsor.tier] = []
    }
    acc[sponsor.tier].push(sponsor)
    return acc
  }, {})

  return (
    <section className="py-32 px-4 sm:px-6 bg-[#0D0221] relative" ref={ref}>
      <div className="relative">
      <div className="max-w-7xl mx-auto">
          {/* Keep 3D Coin Model and Title */}
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
                  <ambientLight intensity={4} />
                  <directionalLight position={[10, 10, 10]} intensity={40} />
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
            
   
    
    
      
      
      
      </motion.div>

         
        </div> 

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
              
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">OUR SPONSORS</h2>
            <div className="w-20 h-1 bg-[#3DEFE9] mx-auto mb-6"></div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              HelloWorld Hacks is made possible by the generous support of our sponsors. We&apos;re grateful for their
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
                <h3 className="text-center text-xl font-mono tracking-widest mb-8 text-[#3DEFE9]">{tier}</h3>
                <div
                  className={`grid grid-cols-1 md:grid-cols-${Math.min(tierSponsors.length, 4)} gap-8 justify-items-center items-center`}
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
  src={`/sponsors/${sponsor.name.toLowerCase()}.svg`} 
  alt={`${sponsor.name.toUpperCase()} LOGO`}
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
            <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="inline-block"
      >
        {isHovered && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -5 }}
            animate={{ opacity: 1, y: -60, rotate: -5 }}
            className="absolute z-10"
          >
            <Card className="bg-pink-100 p-3 shadow-md max-w-xs">
              <p className="text-sm font-medium">🚀 Unlock VIP perks & premium visibility!</p>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 5 }}
            animate={{ opacity: 1, y: -100, x: 50, rotate: 5 }}
            className="absolute z-10"
          >
            <Card className="bg-purple-100 p-3 shadow-md">
              <p className="text-sm font-medium">💎 Limited spots available!</p>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -3 }}
            animate={{ opacity: 1, y: -130, x: -70, rotate: -3 }}
            className="absolute z-10"
          >
            <Card className="bg-yellow-100 p-3 shadow-md">
              <p className="text-sm font-medium">🎯 200% ROI for early birds!</p>
            </Card>
          </motion.div>
        </>
      )}
<Button 
  className="bg-[#3DEFE9] text-black hover:bg-[#3DEFE9]/90 font-bold 
    text-sm sm:text-lg md:text-2xl 
    px-3 sm:px-8 md:px-16 lg:px-[8.5rem]
    py-6 sm:py-6 md:py-8 lg:py-[3.5rem] 
    rounded-lg
    shadow-[0_0_15px_rgba(61,239,233,0.3)] hover:shadow-[0_0_25px_rgba(61,239,233,0.5)]
    transition-all duration-300 
    w-full max-w-full sm:w-auto sm:min-w-[280px] md:min-w-[320px]"
  onClick={downloadBrochure}
>
  <div className="flex flex-col items-center justify-center">
    <motion.span
      animate={{ 
        opacity: [1, 0.7, 1],
        scale: [1, 1.02, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="text-center whitespace-normal px-1"
    >
      Download Sponsorship Deck
    </motion.span>
    
    <motion.p 
      className="text-[10px] sm:text-sm font-medium 
                mt-2
                text-center whitespace-normal 
                px-1 
                overflow-visible 
                mb-1"
      animate={{ opacity: [0, 1, 0] }}
      transition={{ 
        duration: 4, 
        repeat: Infinity,
        repeatType: "reverse" 
      }}
    >
      {quirkySlogans[Math.floor(Math.random() * quirkySlogans.length)]}
    </motion.p>
  </div>
</Button>
      </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

