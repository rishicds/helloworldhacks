"use client"

import React, { useState } from "react"
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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

export default function Tracks() {
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
      case "Beginner": return "bg-green-500"
      case "Intermediate": return "bg-yellow-500"
      case "Advanced": return "bg-red-500"
      default: return "bg-blue-500"
    }
  }

  return (
    <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#0a1a2a] to-[#000000] relative min-h-screen">
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-[#3DEFE9]/10 border border-[#3DEFE9]/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#3DEFE9]" />
              <span className="text-[#3DEFE9] font-medium">Choose Your Path</span>
            </div>
          </div>

          <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#3DEFE9] to-[#00a8e8]">
            QUEST TRACKS
          </h2>

          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-20 h-1 bg-[#3DEFE9]/30"></div>
            <Code className="w-6 h-6 text-[#3DEFE9]" />
            <div className="w-20 h-1 bg-[#3DEFE9]/30"></div>
          </div>

          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Select your challenge domain and embark on an epic coding adventure.
          </p>
        </div>

        {/* List View */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {tracks.map((track, index) => (
            <Dialog key={track.id}>
              <DialogTrigger asChild>
                <div
                  className="relative transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "both",
                    animationName: "fadeInUp",
                    animationDuration: "600ms",
                  }}
                >
                  <Card className="border-2 border-[#3DEFE9]/20 bg-black/30 backdrop-blur-md overflow-hidden cursor-pointer group">
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
              </DialogTrigger>

              <DialogContent className="max-w-3xl bg-black/90 backdrop-blur-md border-2 border-[#3DEFE9]/30 rounded-lg overflow-hidden">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${track.color}20` }}
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
                  </DialogTitle>
                </DialogHeader>

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
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Bottom message */}
        <div className="mt-16 text-center">
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Can't decide? You can always participate in multiple tracks.
          </p>
        </div>
      </div>

      {/* Global Animation Styles */}
      <style jsx global>{`
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