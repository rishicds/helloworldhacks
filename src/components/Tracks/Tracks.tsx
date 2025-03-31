"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Link,
  Heart,
  Leaf,
  CreditCard,
  Gamepad,
  Shield,
  Plane,
  
  Sparkles,
  ChevronRight,
  X,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

// Track data type
export type Track = {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  description: string
  fulldescription: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  tools: string[]
}

export default function UnconventionalTracks() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null)

  // Updated Track data based on Tracks.docx
  const tracks: Track[] = [
    {
      id: "ai-for-good",
      name: "AI for Good",
      icon: <Brain className="w-5 h-5" />,
      color: "#FF5757",
      description:
        "🚀 Building AI-powered solutions that address societal challenges, such as accessibility, sustainability, and education.",
      fulldescription:
        "AI for Good focuses on leveraging artificial intelligence to create positive societal impact. This track is perfect for those looking to apply AI in solving real-world problems in accessibility, education, and sustainability.",
      difficulty: "Intermediate",
      tools: ["Python", "TensorFlow", "PyTorch", "OpenAI APIs"],
    },
    {
      id: "blockchain-web3",
      name: "Decentralized Future",
      icon: <Link className="w-5 h-5" />,
      color: "#9945FF",
      description: "🔗 Exploring blockchain technology for secure, transparent, and decentralized applications.",
      fulldescription:
        "The Decentralized Future track focuses on blockchain and Web3 technologies to create transparent and secure applications. Ideal for participants interested in fintech, cybersecurity, and decentralized systems.",
      difficulty: "Advanced",
      tools: ["Solidity", "Ethereum", "Polygon", "IPFS"],
    },
    {
      id: "healthtech",
      name: "HealthTech & Wellness",
      icon: <Heart className="w-5 h-5" />,
      color: "#FF00E5",
      description: "🏥 Developing applications that improve healthcare accessibility, mental well-being, and fitness.",
      fulldescription:
        "The HealthTech & Wellness track is for creating solutions that enhance healthcare accessibility and mental well-being. Perfect for students interested in health-tech innovation and AI in healthcare.",
      difficulty: "Intermediate",
      tools: ["React Native", "Firebase", "OpenAI APIs", "Twilio"],
    },
    {
      id: "greentech",
      name: "Green Tech & Sustainability",
      icon: <Leaf className="w-5 h-5" />,
      color: "#14F195",
      description: "🌱 Using technology to address climate change, sustainability, and environmental protection.",
      fulldescription:
        "Green Tech & Sustainability track focuses on leveraging technology to combat climate change and promote environmental protection. Great for innovators passionate about creating a sustainable future.",
      difficulty: "Intermediate",
      tools: ["IoT APIs", "Python", "ML models", "Blockchain"],
    },
    {
      id: "fintech",
      name: "FinTech & Smart Transactions",
      icon: <CreditCard className="w-5 h-5" />,
      color: "#FFC107",
      description:
        "🏦 Creating innovative financial solutions that improve accessibility, security, and automation in banking and payments.",
      fulldescription:
        "The FinTech track focuses on developing innovative financial solutions that enhance accessibility, security, and automation in banking and payments.",
      difficulty: "Intermediate",
      tools: ["Stripe API", "Plaid API", "Solidity", "Firebase"],
    },
    {
      id: "edtech",
      name: "Gamified Learning & EdTech",
      icon: <Gamepad className="w-5 h-5" />,
      color: "#00E4FF",
      description: "🎮 Enhancing education through interactive, AI-driven, or gamified learning experiences.",
      fulldescription:
        "The Gamified Learning & EdTech track focuses on enhancing education through interactive and AI-driven experiences. Ideal for those passionate about education, game development, and AI.",
      difficulty: "Beginner",
      tools: ["Unity", "Godot", "Phaser.js", "AI learning engines"],
    },
    {
      id: "safetech",
      name: "SafeTech+",
      icon: <Shield className="w-5 h-5" />,
      color: "#14F195",
      description:
        "🛡️ Leveraging AI, predictive analytics, and decentralized networks to create proactive safety solutions.",
      fulldescription:
        "SafeTech+ focuses on creating proactive safety solutions using AI and predictive analytics. Perfect for those interested in AI-driven security and emergency response systems.",
      difficulty: "Advanced",
      tools: ["GPS APIs", "AI detection", "Twilio", "Blockchain"],
    },
    {
      id: "smarttourism",
      name: "Smart Tourism & Cultural Tech",
      icon: <Plane className="w-5 h-5" />,
      color: "#00a8e8",
      description:
        "✈️ Innovating tourism through AI, AR/VR experiences, and smart travel planning to enhance exploration and accessibility.",
      fulldescription:
        "Smart Tourism & Cultural Tech leverages AI and AR/VR to enhance travel experiences. Ideal for those passionate about travel tech, UI/UX, and AI-driven personalization.",
      difficulty: "Intermediate",
      tools: ["Google Maps API", "OpenAI APIs", "AR frameworks", "Blockchain"],
    },
    {
      id: "open-innovation",
      name: "Open Innovation",
      icon: <Sparkles className="w-5 h-5" />,
      color: "#FF9900",
      description:
        "🌟 Explore groundbreaking ideas beyond predefined tracks, fostering creativity and disruptive tech solutions in any domain.",
      fulldescription:
        "Open Innovation empowers participants to explore groundbreaking ideas beyond predefined tracks, fostering creativity and disruptive tech solutions in any domain.",
      difficulty: "Intermediate",
      tools: ["Any technology", "Your imagination", "Innovation mindset"],
    },
  ]

  // Filter tracks based on active filter
  const filteredTracks = activeFilter ? tracks.filter((track) => track.difficulty === activeFilter) : tracks

  // Get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500"
      case "Intermediate":
        return "bg-yellow-500"
      case "Advanced":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <section className="py-8 px-4 bg-gradient-to-b from-[#0a1a2a] to-[#000000] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[10%] left-[5%] w-32 h-32 rounded-full bg-[#3DEFE9]/20 blur-xl"></div>
          <div className="absolute top-[40%] right-[10%] w-40 h-40 rounded-full bg-[#FF5757]/20 blur-xl"></div>
          <div className="absolute bottom-[20%] left-[20%] w-36 h-36 rounded-full bg-[#9945FF]/20 blur-xl"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Unconventional Header - Diagonal design */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-3 md:mb-4 px-3 py-1 rounded-full bg-[#3DEFE9]/10 border border-[#3DEFE9]/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#3DEFE9]" />
              <span className="text-sm md:text-base text-[#3DEFE9] font-medium">Choose Your Path</span>
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#3DEFE9] to-[#00a8e8]">
            QUEST TRACKS
          </h2>
        </div>

        {/* Difficulty filters - Hexagonal design */}
        <div className="flex justify-center mb-6 relative">
          <div className="flex space-x-1">
            {["Beginner", "Intermediate", "Advanced"].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setActiveFilter(activeFilter === difficulty ? null : difficulty)}
                className={`relative h-8 px-3 flex items-center justify-center transition-all duration-300 
                  ${
                    activeFilter === difficulty
                      ? getDifficultyColor(difficulty) + " text-white"
                      : "bg-black/30 text-white/70 hover:bg-black/50"
                  }
                  clip-path-hex`}
              >
                <span className="text-xs font-medium">{difficulty}</span>
              </button>
            ))}
            {activeFilter && (
              <button
                onClick={() => setActiveFilter(null)}
                className="relative h-8 w-8 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all duration-300 clip-path-hex"
              >
                <X className="w-3 h-3 text-white/70" />
              </button>
            )}
          </div>
        </div>

        {/* Unconventional Track Grid - Staggered layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
  <AnimatePresence>
    {filteredTracks.map((track, index) => (
      <motion.div
        key={track.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className={`${index % 3 === 1 ? "mt-6" : index % 3 === 2 ? "mt-3" : ""}`}
        onMouseEnter={() => setHoveredTrack(track.id)}
        onMouseLeave={() => setHoveredTrack(null)}
      >
        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer group">
              <div className="relative">
                {/* Glowing border effect on hover */}
                <div
                  className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
                    hoveredTrack === track.id ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    boxShadow: `0 0 20px ${track.color}80`,
                    background: `linear-gradient(45deg, ${track.color}30, transparent)`,
                  }}
                ></div>

                <Card className="border border-[#3DEFE9]/30 bg-black/40 backdrop-blur-md overflow-hidden relative z-10 p-6 rounded-xl">
                  {/* Diagonal color accent */}
                  <div
                    className="absolute top-0 left-0 w-20 h-20 -translate-x-10 -translate-y-10 rotate-45 transform origin-bottom-right transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: track.color }}
                  ></div>

                  <div className="p-4 relative">
                    {/* Icon in top-left */}
                    <div className="flex justify-between items-start mb-3">
                      <div
                        className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                      >
                        <div className="text-lg" style={{ color: track.color }}>
                          {track.icon}
                        </div>
                      </div>

                      <Badge className={`${getDifficultyColor(track.difficulty)} text-white text-xs px-3 py-1`}>
                        {track.difficulty.substring(0, 3)}
                      </Badge>
                    </div>

                    {/* Track name */}
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{track.name}</h3>

                    {/* Description - always visible on mobile, hover effect on larger screens */}
                    <div
                      className="overflow-hidden transition-all duration-300 md:hidden"
                    >
                      <p className="text-white/80 text-sm line-clamp-3">{track.description}</p>
                    </div>

                    <div
                      className="overflow-hidden transition-all duration-300 hidden md:block"
                      style={{
                        maxHeight: hoveredTrack === track.id ? "100px" : "0",
                        opacity: hoveredTrack === track.id ? 1 : 0,
                      }}
                    >
                      <p className="text-white/80 text-sm line-clamp-3">{track.description}</p>
                    </div>

                    {/* View details button */}
                    <div
                      className="flex justify-end mt-3 transition-all duration-300"
                      style={{
                        opacity: hoveredTrack === track.id ? 1 : 0.5,
                      }}
                    >
                      <div className="flex items-center text-sm" style={{ color: track.color }}>
                        <span>Details</span>
                        <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </DialogTrigger>

          <DialogContent className="max-w-[95vw] sm:max-w-lg bg-black/90 backdrop-blur-lg border border-[#3DEFE9]/40 rounded-xl overflow-hidden p-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${track.color}30` }}
                >
                  <div className="text-2xl" style={{ color: track.color }}>
                    {track.icon}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{track.name}</h2>
                  <Badge className={`${getDifficultyColor(track.difficulty)} text-white text-sm mt-1 px-4 py-1`}>
                    {track.difficulty}
                  </Badge>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white/90 mb-2">Description</h3>
                <p className="text-base text-white/80">{track.fulldescription}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white/90 mb-2">Suggested Tools & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {track.tools.map((tool) => (
                    <Badge
                      key={tool}
                      className="bg-black/50 border border-white/30 hover:border-white/50 text-white/80 text-sm px-3 py-1"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    ))}
  </AnimatePresence>
</div>



        {/* Bottom message */}
        <div className="mt-4 text-center">
          <p className="text-xs text-white/70">Can&apos;t decide? You can always participate in multiple tracks.</p>
        </div>
      </div>

      {/* Custom CSS for hexagonal buttons and animations */}
      <style jsx global>{`
        .clip-path-hex {
          clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(61, 239, 233, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(61, 239, 233, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(61, 239, 233, 0);
          }
        }
      `}</style>
    </section>
  )
}

