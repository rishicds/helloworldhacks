"use client"

import { useRef, useState } from "react"
import { Trophy, Award, Gift, Sparkles } from "lucide-react"

// Interfaces
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

// Prize card component
function PrizeCard({ prize, index }: PrizeCardProps) {
  const [hovered, setHovered] = useState(false)
  const placeType = prize.place.split(" ")[0]

  // Trophy image paths
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
          {/* Display image for both mobile and desktop */}
          <div className="h-full w-full flex items-center justify-center p-4">
            <img
              src={trophyImages[placeType as keyof typeof trophyImages] || "/trophies/gold.png"}
              alt={`${prize.place} Trophy`}
              className="h-full object-contain"
              style={{
                filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))",
                animation: "float 3s ease-in-out infinite",
              }}
            />
          </div>
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

  const mainPrizes = [
    {
      place: "1st PLACE",
      prize: "Rs.8000",
      icon: <Trophy className="w-12 h-12" />,
      extras: [],
      color: "#FFBE0B",
    },
    {
      place: "2nd PLACE",
      prize: "Rs.4000",
      icon: <Award className="w-12 h-12" />,
      extras: [],
      color: "#3DEFE9",
    },
    {
      place: "3rd PLACE",
      prize: "Rs.2500",
      icon: <Gift className="w-12 h-12" />,
      extras: [],
      color: "#FF5470",
    },
  ]

  const specialPrizes = [
    {
      category: "BEST BEGINNERS' TEAM",
      prize: "Rs.2000",
      color: "#8A4FFF",
    },
    {
      category: "BEST GIRLS' TEAM",
      prize: "Rs.2000",
      color: "#FFBE0B",
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
            {/* Replace 3D diamond model with animated sparkles image */}
            <div className="w-24 h-24 flex items-center justify-center">
              <div className="relative w-16 h-16" style={{ animation: "float 3s ease-in-out infinite" }}>
                <Sparkles className="w-16 h-16 text-[#3DEFE9] absolute" />
                <Sparkles className="w-14 h-14 text-[#FFBE0B] absolute inset-1" />
              </div>
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
            <PrizeCard key={index} prize={prize} index={index} />
          ))}
        </div>

        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8A4FFF] to-[#3DEFE9]">
            SPECIAL CATEGORY PRIZES
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-[#8A4FFF] to-[#3DEFE9] mx-auto my-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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