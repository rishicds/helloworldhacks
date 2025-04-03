"use client"

import { useRef, useState, useEffect } from "react"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"

import Image from "next/image"
import type { Group } from "three"

// CSS animations directly in the component
const SponsorsStyles = () => (
  <style jsx global>{`
    /* Sponsor item animation */
    @keyframes fadeInScale {
      0% {
        opacity: 0;
        transform: scale(0.9);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    .sponsor-item {
      opacity: 0;
      transform: scale(0.9);
    }

    .sponsor-item.visible {
      animation: fadeInScale 0.5s ease forwards;
    }

    /* Card popup animation */
    @keyframes popIn {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .card-popup-1 {
      animation: popIn 0.3s ease forwards;
      transform: translateY(-60px) rotate(-5deg);
    }

    .card-popup-2 {
      animation: popIn 0.3s ease forwards;
      transform: translateY(-100px) translateX(50px) rotate(5deg);
    }

    .card-popup-3 {
      animation: popIn 0.3s ease forwards;
      transform: translateY(-130px) translateX(-70px) rotate(-3deg);
    }

    /* Pulse animation for button text */
    @keyframes pulse {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.7;
        transform: scale(1.02);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    .pulse-animation {
      animation: pulse 2s infinite ease-in-out;
    }

    /* Fade animation for slogan */
    @keyframes fadeInOut {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    .fade-animation {
      animation: fadeInOut 4s infinite alternate;
    }

    /* Fade in animation for sections */
    .fade-in {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .fade-in-delay-200 {
      transition-delay: 0.2s;
    }

    .fade-in-delay-600 {
      transition-delay: 0.6s;
    }
  `}</style>
)

const DragonModel = () => {
  const group = useRef<Group>(null)
  const { scene } = useGLTF("/models/coins.glb")

  // Simple rotation animation
 

  return (
    <group ref={group}>
      <primitive object={scene} scale={0.006} position={[0, -0.5, 0]} rotation={[0, Math.PI * 0.25, 0]} />
    </group>
  )
}

export default function Sponsors() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          // Once it's in view, we don't need to observe anymore
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current)
          }
        }
      },
      { threshold: 0.1 },
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

  const quirkySlogans = [
    "Sponsors get the coolest swag!",
    "Join the cool kids' table!",
    "Your logo could be here →",
    "Support awesome, be awesome!",
    "High-five your marketing budget!",
  ]

  

  const sponsors = [
    { name: "LLMWARE", tier: "TITLE SPONSORS", imageWidth: 120 },
    { name: "DEVFOLIO", tier: "GOLD SPONSORS", imageWidth: 180 },
    { name: "ETHINDIA", tier: "SILVER SPONSORS", imageWidth: 150 },
    { name: "PIECES", tier: "EDUCATION SPONSORS", imageWidth: 220 },
    { name: "DESKREE", tier: "GOLD SPONSORS", imageWidth: 180 },
    { name: "APTOS", tier: "SILVER SPONSORS", imageWidth: 180 },
    { name: "STELLAR", tier: "SILVER SPONSORS", imageWidth: 180 },
    { name: "RISEIN", tier: "EDUCATION SPONSORS", imageWidth: 180 },
    { name: "DEFANG", tier: "SILVER SPONSORS", imageWidth: 180 },
    { name: "DEVREL", tier: "TECHNICAL SPONSORS", imageWidth: 180 },
    { name: "XYZLOGO", tier: "DOMAIN SPONSORS", imageWidth: 140 },
    { name: "INTERVIEWLOGO", tier: "INTERVIEW SPONSORS", imageWidth: 270 },
    { name: "INTERVIEW", tier: "INTERVIEW SPONSORS", imageWidth: 200 },
  ]

  // Group sponsors by tier
  const sponsorsByTier = sponsors.reduce<Record<string, typeof sponsors>>((acc, sponsor) => {
    if (!acc[sponsor.tier]) {
      acc[sponsor.tier] = []
    }
    acc[sponsor.tier].push(sponsor)
    return acc
  }, {})

  // Random slogan
  const [, setSlogan] = useState(quirkySlogans[Math.floor(Math.random() * quirkySlogans.length)])

  // Rotate slogans
  useEffect(() => {
    const interval = setInterval(() => {
      setSlogan(quirkySlogans[Math.floor(Math.random() * quirkySlogans.length)])
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-32 px-4 sm:px-6 bg-[#0D0221] relative" ref={sectionRef}>
      <SponsorsStyles />
      <div className="relative">
        <div className="max-w-7xl mx-auto">
          {/* 3D Coin Model and Title */}
          <div className={`text-center mb-16 fade-in ${isInView ? "visible" : ""}`}>
            <div className="flex items-center justify-center gap-4">
              <div className="w-42 h-42">
              <Canvas camera={{ position: [0, 1.3, 3], fov: 45 }} style={{ background: "transparent" }}>
  {/* Softer ambient light */}
  <ambientLight intensity={0.8} />

  {/* Softer directional light */}
  <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />

  {/* Optional point light for additional soft lighting */}
  <pointLight position={[-5, 5, 5]} intensity={0.8} />

  <DragonModel />
  <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
</Canvas>
              </div>
            </div>
          </div>
        </div>

        {/* Brutalist background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 right-10 w-40 h-40 border-4 border-[#3DEFE9] rotate-12 opacity-20"></div>
          <div className="absolute bottom-20 left-20 w-60 h-60 border-4 border-[#3DEFE9] -rotate-12 opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 fade-in ${isInView ? "visible" : ""}`}>
            <div className="flex items-center justify-center gap-4"></div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">OUR SPONSORS</h2>
            <div className="w-20 h-1 bg-[#3DEFE9] mx-auto mb-6"></div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              HelloWorld Hacks is made possible by the generous support of our sponsors. We&apos;re grateful for their
              commitment to fostering innovation and supporting the next generation of developers.
            </p>
          </div>

          <div className={`fade-in fade-in-delay-200 ${isInView ? "visible" : ""}`}>
            {Object.entries(sponsorsByTier).map(([tier, tierSponsors], tierIndex) => (
              <div key={tier} className="mb-16 last:mb-0">
                <h3 className="text-center text-xl font-mono tracking-widest mb-8 text-[#3DEFE9]">{tier}</h3>
                <div
                  className={`grid grid-cols-1 md:grid-cols-${Math.min(tierSponsors.length, 2)} gap-8 justify-items-center items-center`}
                >
                  {tierSponsors.map((sponsor, index) => (
                    <div
                      key={index}
                      className={`sponsor-item ${isInView ? "visible" : ""} bg-white/5 hover:bg-white/10 border-2 border-[#3DEFE9]/30 hover:border-[#3DEFE9] 
                        rounded-lg p-8 flex items-center justify-center w-full h-32 transition-all duration-300 
                        backdrop-blur-md`}
                      style={{
                        animationDelay: `${index * 100 + tierIndex * 200}ms`,
                      }}
                    >
                      <Image
                        src={`/sponsors/${sponsor.name.toLowerCase()}.svg`}
                        alt={`${sponsor.name.toUpperCase()} LOGO`}
                        width={sponsor.imageWidth}
                        height={sponsor.imageWidth / 2}
                        className="opacity-80 hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          
              
            </div>
          </div>
        
      
    </section>
  )
}

