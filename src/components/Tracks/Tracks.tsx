"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Link,
  Heart,
  Leaf,
  CreditCard,
  Gamepad,
  Shield,
  Plane,
  Code,
  Sparkles,
  ChevronRight,
  X,
} from "lucide-react"

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

// Enhanced Track Modal Component with animations
export function TrackModal({
  track,
  isOpen,
  onClose,
  getDifficultyColor,
}: {
  track: Track
  isOpen: boolean
  onClose: () => void
  getDifficultyColor: (difficulty: string) => string
}) {
  const [animationState, setAnimationState] = useState<"entering" | "entered" | "exiting">("entering")
  const modalRef = useRef<HTMLDivElement>(null)
  const [shouldRender, setShouldRender] = useState(isOpen)

  // Manage animation states based on isOpen prop
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setAnimationState("entering")
      const timer = setTimeout(() => setAnimationState("entered"), 50)
      return () => clearTimeout(timer)
    } else {
      setAnimationState("exiting")
    }
  }, [isOpen])

  // Handle animation end to properly clean up after exit animation
  const handleAnimationEnd = () => {
    if (animationState === "exiting") {
      setShouldRender(false)
      onClose()
    }
  }

  // Add escape key handler
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setAnimationState("exiting")
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [isOpen])

  // Add body scroll lock when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setAnimationState("exiting")
    }
  }

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300 ${
        animationState === "entering" ? "opacity-0" : animationState === "entered" ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
      onAnimationEnd={handleAnimationEnd}
      aria-modal="true"
      role="dialog"
    >
      {/* Animated Background Overlay */}
        <div 
          className="absolute inset-0 bg-black/80 transition-opacity duration-500"
          style={{
            opacity: animationState === "entered" ? 0.8 : 0
          }}
        />

        {/* Animated Particle Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
          background: `radial-gradient(circle at 50% 50%, ${track.color}50, transparent 70%)`,
          animation: "pulse 8s infinite alternate",
            }}
          />
          {[...Array(12)].map((_, i) => (
            <div 
          key={i}
          className="absolute text-3xl" // Added text-3xl class for bigger size
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            color: track.color,
            opacity: 0.2,
            transform: `scale(${Math.random() * 1 + 1})`, // Modified scale range for bigger particles
            animation: `float ${Math.random() * 10 + 10}s infinite linear`,
            animationDelay: `${Math.random() * 5}s`,
          }}
            >
          {track.icon}
            </div>
          ))}
        </div>


      {/* Modal Card with Animation */}
      <div
        ref={modalRef}
        className={`relative max-w-3xl w-full transition-all duration-500 ${
          animationState === "entering" 
            ? "opacity-0 scale-95 translate-y-4" 
            : animationState === "entered" 
              ? "opacity-100 scale-100 translate-y-0" 
              : "opacity-0 scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border-2 border-[#3DEFE9]/30 bg-black/90 backdrop-blur-md overflow-hidden shadow-xl">
          {/* Animated Top Border */}
          <div
            className="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
            style={{ 
              backgroundColor: track.color,
              width: animationState === "entered" ? "100%" : "0%",
            }}
          />

          {/* Content */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-500"
                  style={{ 
                    backgroundColor: `${track.color}20`,
                    transform: animationState === "entered" ? "scale(1) rotate(0)" : "scale(0.8) rotate(-10deg)"
                  }}
                >
                  <div className="text-3xl" style={{ color: track.color }}>
                    {track.icon}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{track.name}</h2>
                  <Badge className={`${getDifficultyColor(track.difficulty)} text-white`}>
                    {track.difficulty}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setAnimationState("exiting")}
                className="rounded-full hover:bg-white/10"
              >
                <X className="h-5 w-5 text-white/70" />
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white/90 mb-2">Description</h3>
                <p className="text-white/70">{track.fulldescription}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white/90 mb-2">Tools & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {track.tools.map((tool) => (
                    <Badge
                      key={tool}
                      className="bg-black/50 border border-white/20 hover:border-white/40 text-white/80"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  className="transition-all duration-300 hover:translate-y-[-2px]"
                  style={{ 
                    backgroundColor: track.color,
                    color: "#000",
                    opacity: animationState === "entered" ? 1 : 0
                  }}
                >
                  Start This Track
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function Tracks() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Updated Track data based on Tracks.docx
  const tracks: Track[] = [
    {
      id: "ai-for-good",
      name: "AI for Good",
      icon: <Brain className="w-6 h-6" />,
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
      name: "Decentralized Future: Blockchain & Web3",
      icon: <Link className="w-6 h-6" />,
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
      icon: <Heart className="w-6 h-6" />,
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
      icon: <Leaf className="w-6 h-6" />,
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
      icon: <CreditCard className="w-6 h-6" />,
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
      icon: <Gamepad className="w-6 h-6" />,
      color: "#00E4FF",
      description: "🎮 Enhancing education through interactive, AI-driven, or gamified learning experiences.",
      fulldescription:
        "The Gamified Learning & EdTech track focuses on enhancing education through interactive and AI-driven experiences. Ideal for those passionate about education, game development, and AI.",
      difficulty: "Beginner",
      tools: ["Unity", "Godot", "Phaser.js", "AI learning engines"],
    },
    {
      id: "safetech",
      name: "SafeTech+: Predictive Safety & Autonomous Response",
      icon: <Shield className="w-6 h-6" />,
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
      icon: <Plane className="w-6 h-6" />,
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
      icon: <Sparkles className="w-6 h-6" />,
      color: "#FF9900",
      description:
        "🌟 Explore groundbreaking ideas beyond predefined tracks, fostering creativity and disruptive tech solutions in any domain.",
      fulldescription:
        "Open Innovation empowers participants to explore groundbreaking ideas beyond predefined tracks, fostering creativity and disruptive tech solutions in any domain.",
      difficulty: "Intermediate",
      tools: ["Any technology", "Your imagination", "Innovation mindset"],
    },
  ]

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

  const openTrackModal = (track: Track) => {
    setSelectedTrack(track)
    setIsModalOpen(true)
  }

  const closeTrackModal = () => {
    setIsModalOpen(false)
    setSelectedTrack(null) // Clear the selected track
  }

  return (
    <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#0a1a2a] to-[#000000] relative min-h-screen">
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-[#3DEFE9]/10 border border-[#3DEFE9]/20 animate-fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#3DEFE9]" />
              <span className="text-[#3DEFE9] font-medium">Choose Your Path</span>
            </div>
          </div>

          <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#3DEFE9] to-[#00a8e8] animate-gradient">
            QUEST TRACKS
          </h2>

          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-20 h-1 bg-[#3DEFE9]/30"></div>
            <Code className="w-6 h-6 text-[#3DEFE9]" />
            <div className="w-20 h-1 bg-[#3DEFE9]/30"></div>
          </div>

          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Select your challenge domain and embark on an epic coding adventure. Each track offers unique quests and
            legendary rewards.
          </p>
        </div>

        {/* List View */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className="relative transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "both",
                animationName: "fadeInUp",
                animationDuration: "600ms",
              }}
            >
              <Card
                className="border-2 border-[#3DEFE9]/20 bg-black/30 backdrop-blur-md overflow-hidden cursor-pointer group"
                onClick={() => openTrackModal(track)}
              >
                {/* Colored left border */}
                <div
                  className="absolute top-0 bottom-0 left-0 w-1 group-hover:w-2 transition-all duration-300"
                  style={{ backgroundColor: track.color }}
                />

                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${track.color}20` }}
                    >
                      <div className="text-2xl" style={{ color: track.color }}>
                        {track.icon}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-white">{track.name}</h3>
                        <Badge className={`${getDifficultyColor(track.difficulty)} text-white`}>
                          {track.difficulty}
                        </Badge>
                      </div>
                      <p className="text-white/70 text-sm line-clamp-2">{track.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#3DEFE9]/20 hover:bg-[#3DEFE9]/10 group-hover:border-[#3DEFE9]/50"
                      style={{
                        color: track.color,
                        borderColor: `${track.color}40`,
                      }}
                    >
                      <span>View Details</span>
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className="mt-16 text-center">
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Can&apos;t decide? You can always participate in multiple tracks. The choice is yours, brave adventurer!
          </p>
        </div>
      </div>

      {/* Track Modal */}
      {selectedTrack && (
        <TrackModal
          track={selectedTrack}
          isOpen={isModalOpen}
          onClose={closeTrackModal}
          getDifficultyColor={getDifficultyColor}
        />
      )}

      {/* Global Animation Styles */}
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0.3; }
        }
        
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(0) translateX(20px); }
          75% { transform: translateY(20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}