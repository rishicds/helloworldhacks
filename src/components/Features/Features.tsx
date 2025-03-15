"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import * as THREE from "three"

import { Code, Gamepad2, Trophy, Users, LightbulbIcon, CuboidIcon as Cube } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, OrbitControls } from "@react-three/drei"


// Add this component inside the Features function
const DragonModel = () => {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF("/models/ghostu2.glb")
  
  // Simple rotation animation
  useRef(() => {
    const animate = () => {
      if (group.current) {
        group.current.rotation.y += 0.01
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
        scale={1.4}
        position={[0, -0.5, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
    </group>
  )
}


export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const features = [
    {
      icon: <Cube className="w-10 h-10" />,
      title: "BUILD ANYTHING",
      description: "No restrictions on what you can build. Web, mobile, hardware - it's all fair game!",
      color: "#FF5470",
    },
    {
      icon: <Gamepad2 className="w-10 h-10" />,
      title: "GAME DEVELOPMENT",
      description: "Special tracks for game developers with dedicated mentors and resources.",
      color: "#3DEFE9",
    },
    {
      icon: <Code className="w-10 h-10" />,
      title: "CODING CHALLENGES",
      description: "Solve mini-challenges throughout the event to win bonus prizes and swag.",
      color: "#FFBE0B",
    },
    {
      icon: <LightbulbIcon className="w-10 h-10" />,
      title: "INNOVATION FOCUS",
      description: "We value creative solutions to real-world problems. Think outside the box!",
      color: "#8A4FFF",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "TEAM BUILDING",
      description: "Don't have a team? No problem! We'll help you find the perfect teammates.",
      color: "#FF5470",
    },
    {
      icon: <Trophy className="w-10 h-10" />,
      title: "AMAZING PRIZES",
      description: "Win cash prizes, gadgets, software subscriptions, and more!",
      color: "#3DEFE9",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <section className="py-32 px-4 sm:px-6 bg-[#05010E] relative" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0217] to-[#05010E] opacity-80"></div>
      
      {/* Animated particles or stars effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animation: `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative">
      

        <div className="max-w-7xl mx-auto ">
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
  transition={{ duration: 0.8 }}
  className="text-center mb-16"
>
  <div className="flex items-center justify-center">
    <div className="w-32 h-32 mr-4">
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
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
    <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white glow-text">WHY PARTICIPATE?</h2>
  </div>
  <div className="w-20 h-1 bg-[#FF5470] mx-auto mb-6 glow-line"></div>
  <p className="text-xl text-white/70 max-w-3xl mx-auto">
    HelloWorld Hacks is more than just a coding competition. It&apos;s a platform to learn, network, and showcase
    your skills to the tech community.
  </p>
</motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                className="p-8 border-2 border-white/5 bg-black/20 backdrop-blur-xl rounded-lg hover:border-opacity-100 transition-all duration-300 transform hover:-translate-y-2 feature-card"
                style={{
                  borderColor: feature.color + "30",
                  boxShadow: `0 5px 20px -5px ${feature.color}50, 0 0 15px -5px ${feature.color}40 inset`,
                }}
                whileHover={{
                  boxShadow: `0 10px 30px -10px ${feature.color}80, 0 0 20px -5px ${feature.color}60 inset`
                }}
              >
                <div
                  className="rounded-full w-16 h-16 flex items-center justify-center mb-6 icon-container"
                  style={{ 
                    color: feature.color,
                    boxShadow: `0 0 10px ${feature.color}50`,
                    background: `radial-gradient(circle at center, ${feature.color}20, transparent 70%)`
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 glow-text" style={{ color: feature.color }}>
                  {feature.title}
                </h3>
                <p className="text-white/80">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .glow-text {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
        
        .glow-line {
          box-shadow: 0 0 10px #FF5470, 0 0 20px #FF5470;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.7; }
        }
        
        .feature-card {
          position: relative;
          z-index: 1;
        }

        .icon-container {
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }
        
        .feature-card:hover .icon-container {
          transform: translateY(-5px);
        }
      `}</style>
    </section>
  )
}