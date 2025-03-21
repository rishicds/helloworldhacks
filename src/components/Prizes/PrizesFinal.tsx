"use client"

import type React from "react"
import { useRef, useEffect, useState, Suspense, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, Environment, Float, Stars } from "@react-three/drei"
import { Trophy, Award, Gift, Sparkles } from "lucide-react"
import * as THREE from "three"

// Interfaces
interface ModelProps {
  position?: [number, number, number]
  scale?: number
  rotation?: [number, number, number]
  color?: string
  metalness?: number
  roughness?: number
}

interface PrizeModelProps {
  type: string
  position: [number, number, number]
}

interface PrizeCardProps {
  prize: {
    place: string
    prize: string
    icon: React.ReactNode
    extras: string[]
    color: string
  }
  index: number
  isMobile: boolean
}

// Trophy model that can be reused with different materials
function TrophyModel({
  position = [0, 0, 0],
  scale = 0.5,
  rotation = [0, 0, 0],
  color = "#FFD700", // Default gold color
  metalness = 0.8,
  roughness = 0.2,
}: ModelProps) {
  const group = useRef<THREE.Group>(null)
  const { scene, } = useGLTF("/models/trophy.glb")

  // Fallback if model fails to load
  const [modelLoaded, setModelLoaded] = useState(true)

  useEffect(() => {
    if (!scene) {
      setModelLoaded(false)
    }
  }, [scene])

  // Clone the scene to avoid material sharing issues
  const clonedScene = useMemo(() => (scene ? scene.clone() : null), [scene])

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.3
      group.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1 + position[1]
    }
  })

  useEffect(() => {
    // Apply material to the cloned scene
    if (clonedScene) {
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          if (mesh.material) {
            // Create a new material to avoid sharing
            const newMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color(color),
              metalness: metalness,
              roughness: roughness,
            })
            mesh.material = newMaterial
          }
        }
      })
    }
  }, [clonedScene, color, metalness, roughness])

  // Fallback if model fails to load
  if (!modelLoaded) {
    return (
      <group ref={group} position={position} rotation={rotation}>
        <mesh scale={scale * 1.5}>
          <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
          <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.1, 0.3, 1, 32]} />
            <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
            <mesh position={[0, 0.7, 0]}>
              <sphereGeometry args={[0.3, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
              <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
            </mesh>
          </mesh>
        </mesh>
      </group>
    )
  }

  return (
    <group ref={group} position={position} rotation={rotation}>
      {clonedScene && <primitive object={clonedScene} scale={scale} />}
    </group>
  )
}

// Background scene
function BackgroundScene() {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 2, 8)
    camera.lookAt(0, 0, 0)
  }, [camera])

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <Stars radius={100} depth={50} count={20} factor={4} saturation={0} fade speed={1} />
      <Environment preset="night" />
    </>
  )
}

// Replace the DiamondModel function with a simpler version that doesn't require loading an external file
function DiamondModel() {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF("/models/minecraft_diamond.glb")

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.5

    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={group}>
        <primitive object={scene} scale={0.15} position={[0, -0.5, 0]} rotation={[0, Math.PI * 0.25, 0]} />
      </group>

    </Float>
  )
}

// Prize model display component
function PrizeModel({ type, position }: PrizeModelProps) {
  // Configure trophy based on place
  if (type === "1st") {
    return <TrophyModel position={position} scale={1} color="#FFD700" metalness={0.8} roughness={0.2} /> // Gold
  } else if (type === "2nd") {
    return <TrophyModel position={position} scale={1} color="#C0C0C0" metalness={0.7} roughness={0.3} /> // Silver
  } else {
    return <TrophyModel position={position} scale={1} color="#CD7F32" metalness={0.6} roughness={0.4} /> // Bronze
  }
}

// Prize card component
function PrizeCard({ prize, index, isMobile }: PrizeCardProps) {
  const [hovered, setHovered] = useState(false)
  const placeType = prize.place.split(" ")[0]

  // Trophy image paths for mobile
  const trophyImages = {
    "1st": "/trophies/gold.png",
    "2nd": "/trophies/silver.png",
    "3rd": "/trophies/bronze.png",
  }

  return (
    <div
      className="relative h-[500px] md:h-[600px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: 0,
        animation: `fadeIn 0.8s ease ${index * 0.2}s forwards`,
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, ${prize.color}20, transparent)`,
          border: `2px solid ${prize.color}40`,
          boxShadow: hovered ? `0 0 30px ${prize.color}40` : `0 10px 30px -15px ${prize.color}40`,
          transition: "all 0.3s ease",
        }}
      >
        <div className="h-[50%] w-full">
          {isMobile ? (
            // Display image on mobile
            <div className="h-full w-full flex items-center justify-center p-4">
              <img
                src={trophyImages[placeType as keyof typeof trophyImages] || "/images/gold-trophy.png"}
                alt={`${prize.place} Trophy`}
                className="h-full object-contain"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))",
                  animation: "float 3s ease-in-out infinite",
                }}
              />
            </div>
          ) : (
            // Display 3D model on desktop
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
              <Suspense fallback={null}>
                <PrizeModel type={placeType} position={[0, -2.4, 0]} />
                <BackgroundScene />
              </Suspense>
            </Canvas>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center bg-gradient-to-t from-black/80 to-transparent">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ color: prize.color, backgroundColor: `${prize.color}20` }}
          >
            {prize.icon}
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: prize.color }}>
            {prize.place}
          </h3>
          <p className="text-4xl font-bold mb-4 text-white">{prize.prize}</p>
          <ul className="text-white/70 text-sm space-y-2">
            {prize.extras.map((extra, i) => (
              <li key={i} className="flex items-center justify-center gap-2">
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: prize.color }}></span>
                {extra}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function PrizesFinal() {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDeviceType = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 1024; // Covers mobile + tablets
  
      const isMobileDevice =
        /android|iphone|ipad|ipod/i.test(userAgent) || isTouchScreen;
  
      setIsMobile(isMobileDevice && isSmallScreen);
    };
  
    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);
  
    return () => {
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []);
  

  const mainPrizes = [
    {
      place: "1st PLACE",
      prize: "Coming soon",
      icon: <Trophy className="w-12 h-12" />,
      extras: ["Coming soon"],
      color: "#FFBE0B",
    },
    {
      place: "2nd PLACE",
      prize: "Coming soon",
      icon: <Award className="w-12 h-12" />,
      extras: ["Coming soon"],
      color: "#3DEFE9",
    },
    {
      place: "3rd PLACE",
      prize: "Coming soon",
      icon: <Gift className="w-12 h-12" />,
      extras: ["Coming soon"],
      color: "#FF5470",
    },
  ]

  const specialPrizes = [
    {
      category: "BEST UI/UX",
      prize: "Coming soon",
      color: "#8A4FFF",
    },
    {
      category: "MOST INNOVATIVE",
      prize: "Coming soon",
      color: "#FFBE0B",
    },
    {
      category: "BEST USE OF AI",
      prize: "Coming soon",
      color: "#3DEFE9",
    },
    {
      category: "COMMUNITY CHOICE",
      prize: "Coming soon",
      color: "#FF5470",
    },
  ]

  return (
    <section
      className="py-32 px-4 sm:px-6 bg-gradient-to-b from-[#0d0916] to-[#050505] relative overflow-hidden"
      ref={ref}
    >
      {/* Add floating animation keyframes */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      <div className="relative z-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 rounded-full bg-white/5 border border-[#FFBE0B]/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FFBE0B]" />
              <span className="text-[#FFBE0B] font-medium">EPIC REWARDS AWAIT</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {!isMobile ? (
              <div className="w-32 h-32">
                <Canvas camera={{ position: [0, 0, 3], fov: 45 }} style={{ background: "transparent" }}>
                  <ambientLight intensity={3} />
                  <directionalLight position={[0, 10, 10]} intensity={0.8} />
                  <DiamondModel />
                  <Environment preset="night" />
                </Canvas>
              </div>
            ) : (
              <div className="w-24 h-24 flex items-center justify-center">
                <div className="relative w-16 h-16" style={{ animation: "float 3s ease-in-out infinite" }}>
                  <Sparkles className="w-16 h-16 text-[#3DEFE9] absolute" />
                  <Sparkles className="w-14 h-14 text-[#FFBE0B] absolute inset-1" />
                </div>
              </div>
            )}
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFBE0B] via-[#3DEFE9] to-[#FF5470]">
              GRAND PRIZES
            </h2>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-[#FFBE0B] via-[#3DEFE9] to-[#FF5470] mx-auto my-6"></div>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
            Compete for extraordinary rewards, prestigious recognition, and career-changing opportunities!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {mainPrizes.map((prize, index) => (
            <PrizeCard key={index} prize={prize} index={index} isMobile={isMobile} />
          ))}
        </div>

        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8A4FFF] to-[#3DEFE9]">
            SPECIAL CATEGORY PRIZES
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-[#8A4FFF] to-[#3DEFE9] mx-auto my-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialPrizes.map((prize, index) => (
            <div
              key={index}
              className="relative overflow-hidden border-2 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 text-center h-full"
              style={{
                background: `linear-gradient(135deg, ${prize.color}10, transparent)`,
                borderColor: `${prize.color}40`,
                boxShadow: `0 5px 20px -10px ${prize.color}60`,
              }}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: prize.color }}>
                {prize.category}
              </h3>
              <p className="text-white/90 text-lg">{prize.prize}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

