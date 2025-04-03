"use client"
import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

// Interface for team member data
interface TeamMember {
  name: string
  role: string
  image?: string
  linkedin?: string
  instagram?: string
  twitter?: string
  github?: string
}

// Sample data
const mentors: TeamMember[] = [
  {
    name: "",
    role: "",
    image: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    github: "",
  },
  {
    name: "",
    role: "",
    image: "",
    linkedin: "",
    github: "",
  },
  {
    name: "Alex Chen",
    role: "Blockchain Expert",
    image: "/images/mentors/alex-chen.jpg",
    linkedin: "https://linkedin.com/in/alexchen",
    twitter: "https://twitter.com/alexchen",
  },
  {
    name: "Priya Sharma",
    role: "UX/UI Mentor",
    image: "/images/mentors/priya-sharma.jpg",
    linkedin: "https://linkedin.com/in/priyasharma",
    instagram: "https://instagram.com/priyasharma",
  },
]

const evangelists: TeamMember[] = [
  {
    name: "John Doe",
    role: "Developer Advocate",
    image: "/images/evangelists/john-doe.jpg",
    linkedin: "https://linkedin.com/in/johndoe",
    instagram: "https://instagram.com/johndoe",
    twitter: "https://twitter.com/johndoe",
  },
  {
    name: "Sarah Williams",
    role: "Community Manager",
    image: "/images/evangelists/sarah-williams.jpg",
    linkedin: "https://linkedin.com/in/sarahwilliams",
    instagram: "https://instagram.com/sarahwilliams",
  },
  {
    name: "David Kim",
    role: "Tech Evangelist",
    image: "/images/evangelists/david-kim.jpg",
    linkedin: "https://linkedin.com/in/davidkim",
    twitter: "https://twitter.com/davidkim",
  },
]

const judges: TeamMember[] = [
  {
    name: "Robert Johnson",
    role: "Industry Expert",
    image: "/images/judges/robert-johnson.jpg",
    linkedin: "https://linkedin.com/in/robertjohnson",
    twitter: "https://twitter.com/robertjohnson",
  },
  {
    name: "Patricia Lee",
    role: "Startup Investor",
    image: "/images/judges/patricia-lee.jpg",
    linkedin: "https://linkedin.com/in/patricialee",
  },
  {
    name: "Samuel Wong",
    role: "CTO, TechVentures",
    image: "/images/judges/samuel-wong.jpg",
    linkedin: "https://linkedin.com/in/samuelwong",
    github: "https://github.com/samuelwong",
  },
  {
    name: "Emma Garcia",
    role: "Innovation Director",
    image: "/images/judges/emma-garcia.jpg",
    linkedin: "https://linkedin.com/in/emmagarcia",
    twitter: "https://twitter.com/emmagarcia",
  },
]

// Card Component for Team Members
const TeamMemberCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
  // We'll keep isHovered state but use it in the hover effects
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white group"
      style={{ height: "320px", width: "260px" }}
      
    >
      <div className="h-48 w-full relative overflow-hidden">
        {member.image ? (
          <Image
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, 260px"
            className="object-cover transition-all duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-700">
            <span className="text-gray-400">Image coming soon</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
      </div>

      <div className="p-4 relative z-10 h-28 flex flex-col">
        <h3 className="text-xl font-bold mb-1 transition-colors duration-300 group-hover:text-cyan-400">
          {member.name}
        </h3>
        <p className="text-sm text-gray-300 mb-3">{member.role}</p>

        {/* Social media icons now positioned at the bottom of the card with proper spacing */}
        <div className="mt-auto flex justify-center space-x-3 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
          {member.linkedin && (
            <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
              <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-cyan-600 flex items-center justify-center transition-colors duration-200 hover:scale-110">
                <FaLinkedin className="text-white" />
              </div>
            </Link>
          )}
          {member.instagram && (
            <Link href={member.instagram} target="_blank" rel="noopener noreferrer">
              <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-colors duration-200 hover:scale-110">
                <FaInstagram className="text-white" />
              </div>
            </Link>
          )}
          {member.twitter && (
            <Link href={member.twitter} target="_blank" rel="noopener noreferrer">
              <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-blue-400 flex items-center justify-center transition-colors duration-200 hover:scale-110">
                <FaTwitter className="text-white" />
              </div>
            </Link>
          )}
          {member.github && (
            <Link href={member.github} target="_blank" rel="noopener noreferrer">
              <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors duration-200 hover:scale-110">
                <FaGithub className="text-white" />
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-2 h-0 bg-cyan-400 transition-all duration-300 group-hover:h-full"></div>
      <div className="absolute bottom-0 right-0 w-0 h-2 bg-cyan-400 transition-all duration-300 group-hover:w-full"></div>
    </motion.div>
  )
}

// Team Section Component
const TeamSection: React.FC<{
  members: TeamMember[]
}> = ({ members }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center"
    >
      {members.map((member, index) => (
        <TeamMemberCard key={index} member={member} index={index} />
      ))}
    </motion.div>
  )
}

// Tab Button Component
const TabButton: React.FC<{
  active: boolean
  onClick: () => void
  children: React.ReactNode
  color: string
  icon: React.ReactNode
}> = ({ active, onClick, children, icon }) => {
  // Removed 'color' from the destructuring since it's not used
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 rounded-full font-bold text-white transition-all duration-300 overflow-hidden group ${
        active ? "scale-105" : "opacity-70 hover:opacity-100"
      }`}
      style={{
        boxShadow: active ? "0 0 15px rgba(6, 182, 212, 0.5)" : "none",
      }}
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 ${active ? "bg-gradient-to-r from-cyan-500 to-blue-500" : "bg-gray-800"} transition-all duration-300`}
      ></div>

      {/* Animated shine effect */}
      <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

      {/* Border effect */}
      <div className={`absolute inset-0 rounded-full ${active ? "border-2 border-cyan-300" : ""} opacity-70`}></div>

      {/* Content */}
      <div className="relative flex items-center justify-center gap-2 z-10">
        <span className={`transform transition-transform duration-300 ${active ? "scale-110" : ""}`}>{icon}</span>
        <span className="ml-1">{children}</span>
      </div>

      {/* Animated underline indicator */}
      {active && (
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-white rounded-full"></div>
      )}
    </button>
  )
}

// Main Team Page Component
const TeamPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"mentors" | "evangelists" | "judges">("mentors")
  
  // We'll keep these states but actually use them for future implementation
 

 

  return (
    <div
      className="min-h-screen bg-gray-900 text-white overflow-hidden relative"
      
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 via-cyan-900/30 to-gray-900 py-20 px-4 relative overflow-hidden">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight p-12">
            <span className="text-white">HELLO</span>
            <span className="text-cyan-400">WORLDHACKS</span>
            <span className="text-white"> EXPERTS</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            &ldquo;Meet our expert panel of mentors and judges, ready to guide and inspire you throughout the hackathon.&rdquo;
          </p>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-30 border-b border-gray-800/50">
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-center gap-6 flex-wrap">
            <TabButton
              active={activeTab === "mentors"}
              onClick={() => setActiveTab("mentors")}
              color="bg-gradient-to-r from-cyan-500 to-blue-500"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              }
            >
              Mentors
            </TabButton>

            <TabButton
              active={activeTab === "evangelists"}
              onClick={() => setActiveTab("evangelists")}
              color="bg-gradient-to-r from-cyan-500 to-blue-500"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
              }
            >
              Evangelists
            </TabButton>

            <TabButton
              active={activeTab === "judges"}
              onClick={() => setActiveTab("judges")}
              color="bg-gradient-to-r from-cyan-500 to-blue-500"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              }
            >
              Judges
            </TabButton>
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 relative z-10">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-200">
                  {activeTab === "mentors" && "Mentors"}
                  {activeTab === "evangelists" && "Evangelists"}
                  {activeTab === "judges" && "Judges"}
                </span>
              </h2>

              {/* Glow effect */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl rounded-full transform scale-150"></div>

              {/* Animated dots */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    delay: 0,
                  }}
                  className="w-2 h-2 rounded-full bg-cyan-400"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    delay: 0.5,
                  }}
                  className="w-2 h-2 rounded-full bg-cyan-400"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    delay: 1,
                  }}
                  className="w-2 h-2 rounded-full bg-cyan-400"
                />
              </div>
            </div>

            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6 rounded-full"></div>

            <p className="text-gray-400 max-w-2xl mx-auto">
              {activeTab === "mentors" &&
                "Experienced professionals offering guidance and expertise to help you succeed in the hackathon."}
              {activeTab === "evangelists" &&
                "Passionate advocates of innovation, here to inspire and motivate participants with their insights."}
              {activeTab === "judges" &&
                "With years of experience in various tech domains, our judges are excited to see the creativity, innovation, and problem-solving skills that participants bring to the table."}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === "mentors" && <TeamSection key="mentors" members={mentors} />}

            {activeTab === "evangelists" && <TeamSection key="evangelists" members={evangelists} />}

            {activeTab === "judges" && <TeamSection key="judges" members={judges} />}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer with gradient */}
      <div className="h-20 bg-gradient-to-t from-cyan-900/20 to-transparent"></div>
    </div>
  )
}

export default TeamPage