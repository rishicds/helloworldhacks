"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, OrbitControls } from "@react-three/drei"
import type { Group } from "three"

function DragonModel() {
  const group = useRef<Group>(null)
  const { scene } = useGLTF("/models/minecraft_diamond.glb")

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
      <primitive object={scene} scale={0.15} position={[0, -0.5, 0]} rotation={[0, Math.PI * 0.25, 0]} />
    </group>
  )
}

export default function Prizes() {
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

  return (
    <section 
      className="py-32 px-4 sm:px-6 bg-[#0d0916] relative" 
      ref={sectionRef}
    >
      <div className="relative">
        {/* Brutalist background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-10 w-40 h-40 border-4 border-[#FFBE0B] rotate-12 opacity-20"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 border-4 border-[#FFBE0B] -rotate-12 opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-800 ${
              isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-5"
            }`}
          >
            <div className="flex items-center justify-center gap-4 flex-col sm:flex-row">
              <div className="w-32 h-32">
                <Canvas camera={{ position: [0, 0, 3], fov: 45 }} style={{ background: "transparent" }}>
                  <ambientLight intensity={3} />
                  <directionalLight position={[0, 10, 10]} intensity={0.8} />
                  <DragonModel />
                  <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.01} />
                </Canvas>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white">WIN BIG</h2>
            </div>

            <div className="w-20 h-1 bg-[#FFBE0B] mx-auto my-6"></div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Get ready for amazing prizes, plus internship opportunities, software subscriptions, cloud credits, and
              more!
            </p>
          </div>

          {/* Quirky Coming Soon animated card */}
          <div
            className={`flex justify-center mb-16 transition-all duration-800 delay-200 ${
              isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-10"
            }`}
          >
            <div
              className="relative overflow-hidden max-w-2xl w-full transition-transform duration-500 hover:scale-105 coming-soon-card"
            >
              <div
                className="border-4 border-dashed p-8 md:p-12 rounded-lg bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-md text-center"
                style={{
                  borderColor: "#FFBE0B",
                  boxShadow: "0 10px 30px -15px rgba(255, 190, 11, 0.4), inset 0 0 20px rgba(255, 190, 11, 0.2)",
                }}
              >
                {/* Floating glowing orbs */}
                <div className="absolute w-16 h-16 rounded-full bg-blue-500/20 blur-xl floating-orb-1"></div>
                <div className="absolute right-10 bottom-10 w-20 h-20 rounded-full bg-pink-500/20 blur-xl floating-orb-2"></div>

                <div className="relative">
                  {/* Animated "COMING SOON" text */}
                  <div
    className={`mb-6 flex justify-center flex-wrap transition-opacity duration-800 delay-400 ${
      isVisible ? "opacity-100" : "opacity-0"
    }`}
  >
    {"COMING SOON".split("").map((letter, index) => (
      <span
        key={index}
        className={`text-3xl sm:text-6xl font-bold inline-block text-white bounce-letter letter-${index}`}
        style={{
          textShadow: "0 0 10px rgba(255, 190, 11, 0.7)",
          marginRight: letter === " " ? "0.5em" : "0.05em",
          animationDelay: `${index * 0.1}s`,
        }}
      >
        {letter}
      </span>
    ))}
    {/* Conditional line break for mobile devices */}
    <span className="block sm:hidden w-full"></span>
  </div>
                  {/* Bouncing dots */}
                  <div
                    className={`flex justify-center space-x-2 mb-8 transition-opacity duration-800 delay-600 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full bg-[#FFBE0B] bounce-dot"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>

                  <p
                    className={`text-white/80 text-xl pulse-text transition-opacity duration-800 delay-800 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    Prize details will be revealed soon!
                  </p>

                  <div
                    className={`mt-6 inline-block wiggle-text transition-opacity duration-800 delay-1000 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <p className="text-[#3DEFE9] font-semibold">Get ready for something incredible!</p>
                  </div>

                  {/* Countdown timer placeholder */}
                  

                  {/* Notification signup */}
                  <div
                    className={`mt-8 flex flex-col sm:flex-row gap-3 justify-center transition-all duration-800 delay-1400 ${
                      isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-5"
                    }`}
                  >
                   
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float1 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(100px, -50px) scale(1.2); }
          66% { transform: translate(50px, -100px) scale(0.8); }
          100% { transform: translate(0, 0) scale(1); }
        }

        @keyframes float2 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-80px, 60px) scale(0.8); }
          66% { transform: translate(-40px, 30px) scale(1.2); }
          100% { transform: translate(0, 0) scale(1); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes bounceLetter {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-20px); opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        @keyframes wiggle {
          0%, 100% { transform: scale(1) rotate(0); }
          25% { transform: scale(1.05) rotate(2deg); }
          50% { transform: scale(1) rotate(0); }
          75% { transform: scale(1.05) rotate(-2deg); }
        }

        @keyframes glowBox {
          0%, 100% { box-shadow: 0 0 0 rgba(255, 190, 11, 0); }
          50% { box-shadow: 0 0 15px rgba(255, 190, 11, 0.5); }
        }

        @keyframes glowInput {
          0%, 100% { box-shadow: 0 0 0 rgba(255, 190, 11, 0); }
          50% { box-shadow: 0 0 10px rgba(255, 190, 11, 0.3); }
        }

        .coming-soon-card:hover {
          transform: scale(1.05);
        }

        .coming-soon-card:hover .wiggle-text {
          animation: wiggle 2s infinite;
        }

        .floating-orb-1 {
          animation: float1 10s infinite alternate;
        }

        .floating-orb-2 {
          animation: float2 8s infinite alternate;
        }

        .bounce-dot {
          animation: bounce 0.6s infinite alternate;
        }

        .bounce-letter {
          animation: bounceLetter 2s infinite;
          animation-delay: calc(var(--i) * 0.1s);
        }

        .pulse-text {
          animation: pulse 3s infinite;
        }

        .wiggle-text {
          animation: wiggle 5s infinite;
        }

        .countdown-box {
          animation: glowBox 2s infinite alternate;
        }

        .countdown-box-0 { animation-delay: 1.2s; }
        .countdown-box-1 { animation-delay: 1.7s; }
        .countdown-box-2 { animation-delay: 2.2s; }
        .countdown-box-3 { animation-delay: 2.7s; }

        .glow-input {
          animation: glowInput 2s infinite alternate;
          animation-delay: 1.6s;
        }

        .letter-0 { animation-delay: 0.0s; }
        .letter-1 { animation-delay: 0.1s; }
        .letter-2 { animation-delay: 0.2s; }
        .letter-3 { animation-delay: 0.3s; }
        .letter-4 { animation-delay: 0.4s; }
        .letter-5 { animation-delay: 0.5s; }
        .letter-6 { animation-delay: 0.6s; }
        .letter-7 { animation-delay: 0.7s; }
        .letter-8 { animation-delay: 0.8s; }
        .letter-9 { animation-delay: 0.9s; }
        .letter-10 { animation-delay: 1.0s; }
      `}</style>
    </section>
  )
}