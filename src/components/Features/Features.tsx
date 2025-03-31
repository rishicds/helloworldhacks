"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"

import { Code, Gamepad2, Trophy, Users, LightbulbIcon, CuboidIcon as Cube } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, OrbitControls } from "@react-three/drei"

// Add this component inside the Features function
const DragonModel = () => {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF("/models/ghostu2.glb")
  
  // Simple rotation animation
  useEffect(() => {
    const animate = () => {
      if (group.current) {
        group.current.rotation.y += 0.01
      }
      requestAnimationFrame(animate)
    }
    const id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [])

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
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const features = [
    {
      icon: <Cube className="w-10 h-10" />,
      title: "BUILD ANYTHING",
      description: "No restrictions on what you can build. Web, mobile, hardware - it's all fair game!",
      color: "#FF5470",
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

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 bg-[#05010E] relative" ref={sectionRef}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0217] to-[#05010E] opacity-80"></div>
      
      {/* Animated particles or stars effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white opacity-20 twinkle-star"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDuration: `${Math.random() * 5 + 3}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center justify-center flex-col md:flex-row">
              <div className="w-32 h-32 md:mr-4 mb-4 md:mb-0">
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white glow-text">WHY PARTICIPATE?</h2>
            </div>
            <div className="w-20 h-1 bg-[#FF5470] mx-auto mb-6 glow-line"></div>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
              HelloWorld Hacks is more than just a coding competition. It&apos;s a platform to learn, network, and showcase
              your skills to the tech community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 sm:p-8 border-2 border-white/5 bg-black/20 backdrop-blur-xl rounded-lg transition-all duration-500 transform hover:-translate-y-2 feature-card ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  borderColor: feature.color + "30",
                  boxShadow: `0 5px 20px -5px ${feature.color}50, 0 0 15px -5px ${feature.color}40 inset`,
                  transitionDelay: `${0.1 * index + 0.3}s`,
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
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
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
        
        .twinkle-star {
          animation: twinkle infinite ease-in-out;
        }
        
        .feature-card {
          position: relative;
          z-index: 1;
        }

        .feature-card:hover {
          box-shadow: 0 10px 30px -10px ${features[0].color}80, 0 0 20px -5px ${features[0].color}60 inset;
        }

        .icon-container {
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }
        
        .feature-card:hover .icon-container {
          transform: translateY(-5px);
        }

        .opacity-0 {
          opacity: 0;
        }

        .opacity-100 {
          opacity: 1;
        }

        .translate-y-0 {
          transform: translateY(0);
        }

        .translate-y-8 {
          transform: translateY(2rem);
        }

        .transition-all {
          transition-property: all;
        }

        .duration-800 {
          transition-duration: 800ms;
        }

        .duration-500 {
          transition-duration: 500ms;
        }
      `}</style>
    </section>
  )
}