"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Cpu, Database, Globe, Lightbulb, Shield, Sparkles, Zap } from "lucide-react"

export default function Tracks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  // Track data
  const tracks = [
    {
      id: "web3",
      name: "Web3 & Blockchain",
      icon: <Database className="w-6 h-6" />, 
      color: "#9945FF",
      description:
        "Build decentralized applications, smart contracts, or blockchain solutions that push the boundaries of what's possible in the Web3 space.",
      fulldescription:
        "Web3 & Blockchain is for developers interested in decentralization. This track focuses on building dApps, smart contracts, and leveraging blockchain technology to create secure, trustless, and innovative solutions.",
      difficulty: "Advanced",
      tools: ["Ethereum", "Solidity", "IPFS", "Hardhat"],
    },
    {
      id: "ai",
      name: "AI & Machine Learning",
      icon: <Cpu className="w-6 h-6" />, 
      color: "#FF5757",
      description:
        "Create intelligent applications using machine learning, natural language processing, computer vision, or other AI technologies.",
      fulldescription:
        "AI & Machine Learning is for those who want to build intelligent systems. Whether it's natural language processing, computer vision, deep learning, or AI-powered applications, this track is perfect for bringing smart solutions to life.",
      difficulty: "Intermediate",
      tools: ["TensorFlow", "PyTorch", "Hugging Face", "OpenAI API"],
    },
    {
      id: "gamedev",
      name: "Game Development",
      icon: <Zap className="w-6 h-6" />, 
      color: "#00E4FF",
      description:
        "Design and develop games that are innovative, engaging, and showcase technical excellence across any platform.",
      fulldescription:
        "Game Development is the track for those passionate about creating interactive and immersive gaming experiences. Build games for mobile, PC, VR, or AR using top game engines and innovative mechanics.",
      difficulty: "Intermediate",
      tools: ["Unity", "Unreal Engine", "Godot", "PlayCanvas"],
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity",
      icon: <Shield className="w-6 h-6" />, 
      color: "#14F195",
      description:
        "Build tools, systems, or solutions that address security challenges, vulnerabilities, or enhance digital safety.",
      fulldescription:
        "Cybersecurity is for developers and ethical hackers who want to tackle security threats. Create tools and solutions to protect systems, identify vulnerabilities, and enhance digital security using industry-standard tools.",
      difficulty: "Advanced",
      tools: ["Kali Linux", "Wireshark", "Metasploit", "Burp Suite"],
    },
    {
      id: "webdev",
      name: "Web Development",
      icon: <Globe className="w-6 h-6" />, 
      color: "#FFC107",
      description:
        "Create innovative web applications that solve real-world problems using modern frameworks and technologies.",
      fulldescription:
        "Web Development is the track for building dynamic and responsive web applications. Use modern frameworks and tools to develop full-stack solutions that solve real-world problems in an efficient and scalable way.",
      difficulty: "Beginner",
      tools: ["React", "Next.js", "Node.js", "Vercel"],
    },
    {
      id: "openinnovation",
      name: "Open Innovation",
      icon: <Lightbulb className="w-6 h-6" />, 
      color: "#FF00E5",
      description:
        "Have a unique idea that doesn't fit other categories? This track welcomes all innovative solutions to real-world problems.",
      fulldescription:
        "Open Innovation is a track that welcomes all innovative solutions to real-world problems. If you have a unique idea that doesn't fit other categories, this is the track for you. You can work on any type of project, use any technology stack, and explore new ideas without any restrictions. Let your creativity shine and build something amazing!",
      difficulty: "Any",
      tools: ["Any Technology", "No Restrictions"],
    },
];

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

  // List item animations
  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: {
      backgroundColor: "rgba(61, 239, 233, 0.1)",
      transition: { duration: 0.2 },
    },
  }

  return (
    <section
      className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#0a1a2a] to-[#000000] relative overflow-hidden"
      ref={ref}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-10 bg-gradient-to-b from-transparent via-[#3DEFE9] to-transparent opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              height: Math.random() * 100 + 50,
            }}
            animate={{
              y: [0, 500],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
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
            Select your challenge domain and embark on an epic coding adventure. Each track offers unique quests and
            legendary rewards.
          </p>
        </motion.div>

        {/* List View */}
        <motion.div
          className="space-y-4 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          {tracks.map((track) => (
            <motion.div
              key={track.id}
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Tabs defaultValue="overview" className="w-full">
                <Card className="border-2 border-[#3DEFE9]/20 bg-black/30 backdrop-blur-md overflow-hidden">
                  {/* Colored left border */}
                  <div className="absolute top-0 bottom-0 left-0 w-1" style={{ backgroundColor: track.color }} />

                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
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
                        <p className="text-white/70 text-sm line-clamp-1 md:line-clamp-2">{track.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 md:justify-end">
                      <TabsList className="bg-black/50 border border-[#3DEFE9]/20 h-9">
                        <TabsTrigger
                          value="overview"
                          className="data-[state=active]:bg-[#3DEFE9] data-[state=active]:text-black"
                        >
                          Overview
                        </TabsTrigger>
                        <TabsTrigger
                          value="details"
                          className="data-[state=active]:bg-[#3DEFE9] data-[state=active]:text-black"
                        >
                          Details
                        </TabsTrigger>
                      </TabsList>
                    </div>
                  </div>

                  <TabsContent value="overview" className="m-0 border-t border-[#3DEFE9]/20">
                    <div className="p-4">
                      <div>
                        <h4 className="text-sm font-medium text-[#3DEFE9] mb-2">Suggested Tools</h4>
                        <div className="flex flex-wrap gap-2">
                          {track.tools.map((tool, i) => (
                            <Badge key={i} variant="secondary" className="bg-white/80">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="m-0 border-t border-[#3DEFE9]/20">
                    <div className="p-4">
                      <p className="text-white/80 mb-4">{track.fulldescription}</p>
                      <div>
                        <h4 className="text-sm font-medium text-[#3DEFE9] mb-2">All Suggested Tools</h4>
                        <div className="flex flex-wrap gap-2">
                          {track.tools.map((tool, i) => (
                            <Badge key={i} variant="secondary" className="bg-white">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Card>
              </Tabs>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom message */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Can&apos;t decide? You can always participate in multiple tracks. The choice is yours, brave adventurer!
          </p>
        </motion.div>
      </div>
    </section>
  )
}

