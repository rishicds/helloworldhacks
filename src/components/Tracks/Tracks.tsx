"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Sparkles 
} from "lucide-react"

export default function Tracks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  // Updated Track data based on Tracks.docx
  const tracks = [
    {
      id: "ai-for-good",
      name: "AI for Good",
      icon: <Brain className="w-6 h-6" />, 
      color: "#FF5757",
      description:
        "Building AI-powered solutions that address societal challenges, such as accessibility, sustainability, and education.",
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
      description:
        "Exploring blockchain technology for secure, transparent, and decentralized applications.",
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
      description:
        "Developing applications that improve healthcare accessibility, mental well-being, and fitness.",
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
      description:
        "Using technology to address climate change, sustainability, and environmental protection.",
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
        "Creating innovative financial solutions that improve accessibility, security, and automation in banking and payments.",
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
      description:
        "Enhancing education through interactive, AI-driven, or gamified learning experiences.",
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
        "Leveraging AI, predictive analytics, and decentralized networks to create proactive safety solutions.",
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
        "Innovating tourism through AI, AR/VR experiences, and smart travel planning to enhance exploration and accessibility.",
      fulldescription:
        "Smart Tourism & Cultural Tech leverages AI and AR/VR to enhance travel experiences. Ideal for those passionate about travel tech, UI/UX, and AI-driven personalization.",
      difficulty: "Intermediate",
      tools: ["Google Maps API", "OpenAI APIs", "AR frameworks", "Blockchain"],
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