"use client"

import React, { useRef, useEffect, useState, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, Environment, Float, Stars } from "@react-three/drei"
import { Trophy, Award, Gift, Sparkles } from "lucide-react"

import * as THREE from 'three';
// Interfaces
interface ModelProps {
  position?: [number, number, number]
  scale?: number
  rotation?: [number, number, number]
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
}

// Trophy model for 1st place
function TrophyModel({ position = [0, 0, 0], scale = 0.5, rotation = [0, 0, 0] }: ModelProps) {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF("/models/trophy.glb")

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.3
    }
  })

  return (
    <group ref={group} position={position} rotation={rotation}>
      <primitive object={scene} scale={scale} />
    </group>
  )
}

// Medal model for 2nd place
function MedalModel({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }: ModelProps) {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF("/models/trophys.glb")

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.3
      group.current.position.y = Math.sin(clock.getElapsedTime()) * 0.1 + position[1]
    }
  })
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material && mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.color.setHex(0xC0C0C0); // Silver color
          mesh.material.metalness = 0.3; // Fully metallic
          mesh.material.roughness = 0.2; // Slightly shiny
        }
      }
    });
  }, [scene]);

  return (
    <group ref={group} position={position} rotation={rotation}>
      <primitive object={scene} scale={scale} />
    </group>
  )
}

// Gift box model for 3rd place
function GiftModel({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }: ModelProps) {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF("/models/trophyb.glb")

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.3
      group.current.position.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.1 + position[1]
    }
  })
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material && mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.color.setHex(0xCD7F32); // bronze color
          mesh.material.metalness = 0.3; // Fully metallic
          mesh.material.roughness = 0.2; // Slightly shiny
        }
      }
    });
  }, [scene]);

  return (
    <group ref={group} position={position} rotation={rotation}>
      <primitive object={scene} scale={scale} />
    </group>
  )
}

// Diamond model for header
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
      <Stars radius={100} depth={50} count={100} factor={4} saturation={0} fade speed={1} />
      <Environment preset="night" />
    </>
  )
}

// Prize model display component
function PrizeModel({ type }: PrizeModelProps) {
  if (type === "1st") {
    return <TrophyModel position={[0, -2.4, 0]} scale={1} />
  } else if (type === "2nd") {
    return <MedalModel position={[0, -2.4, 0]} scale={1} />
  } else {
    return <GiftModel position={[0, -2.4, 0]} scale={1} />
  }
}

// Prize card component
function PrizeCard3D({ prize, index }: PrizeCardProps) {
  const [hovered, setHovered] = useState(false)

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
          <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
            <Suspense fallback={null}>
              <PrizeModel type={prize.place.split(" ")[0]} position={[0, 0, 0]} />
              <BackgroundScene />
            </Suspense>
          </Canvas>
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
  const ref = useRef(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

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
      <div className="relative z-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 rounded-full bg-white/5 border border-[#FFBE0B]/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FFBE0B]" />
              <span className="text-[#FFBE0B] font-medium">EPIC REWARDS AWAIT</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="w-32 h-32">
              <Canvas camera={{ position: [0, 0, 3], fov: 45 }} style={{ background: "transparent" }}>
                <ambientLight intensity={3} />
                <directionalLight position={[0, 10, 10]} intensity={0.8} />
                <DiamondModel />
                <Environment preset="night" />
              </Canvas>
            </div>
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
            <PrizeCard3D key={index} prize={prize} index={index} />
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