"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import Image from "next/image"
import { Globe, Mail } from "lucide-react"

const SectionTitle = () => (
  <Canvas className="absolute top-0 left-0 right-0 h-40 -mt-20 z-10 pointer-events-none">
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
  </Canvas>
)

export default function CommunityPartners() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const partners = [
    {
      name: "InnovateNow Foundation",
      category: "Education",
      image: "/placeholder.svg?height=300&width=300",
      description: "Supporting tech education and digital literacy programs for underserved communities.",
      links: {
        website: "#",
        contact: "contact@innovatenow.org",
      },
    },
    {
      name: "TechDiversity Alliance",
      category: "Diversity & Inclusion",
      image: "/placeholder.svg?height=300&width=300",
      description: "Working to increase representation of underrepresented groups in technology fields.",
      links: {
        website: "#",
        contact: "info@techdiversity.org",
      },
    },
    {
      name: "GreenTech Initiative",
      category: "Sustainability",
      image: "/placeholder.svg?height=300&width=300",
      description: "Promoting sustainable technology solutions for environmental challenges.",
      links: {
        website: "#",
        contact: "partnerships@greentech.org",
      },
    },
    {
      name: "StartUp Hub",
      category: "Entrepreneurship",
      image: "/placeholder.svg?height=300&width=300",
      description: "Accelerating early-stage tech ventures through mentorship and resources.",
      links: {
        website: "#",
        contact: "hello@startuphub.co",
      },
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <section className="py-32 px-4 sm:px-6 bg-[#0D0221] relative" ref={ref}>
      <div className="relative">
        <SectionTitle />
        
        {/* Brutalist background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 right-10 w-40 h-40 border-4 border-[#3BCEAC] rotate-12 opacity-20"></div>
          <div className="absolute bottom-20 left-20 w-60 h-60 border-4 border-[#3BCEAC] -rotate-12 opacity-20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">COMMUNITY PARTNERS</h2>
            <div className="w-20 h-1 bg-[#3BCEAC] mx-auto mb-6"></div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              These organizations help make our event possible through their support,
              resources, and shared commitment to technological innovation.
            </p>
          </motion.div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {partners.map((partner, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="group"
              >
                <div className="relative overflow-hidden border-2 border-[#3BCEAC] bg-white/5 backdrop-blur-md rounded-lg p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,206,172,0.3)]">
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-[#3BCEAC] opacity-20 rounded-full group-hover:opacity-30 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="w-24 h-24 rounded-lg overflow-hidden mx-auto mb-4 border-2 border-[#3BCEAC] bg-white/10 flex items-center justify-center">
                      <Image
                        src={partner.image || "/placeholder.svg"}
                        alt={partner.name}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold text-center mb-1 text-white">{partner.name}</h3>
                    <div className="inline-block px-3 py-1 bg-[#3BCEAC]/20 rounded-full text-[#3BCEAC] text-center text-xs font-semibold mb-3 mx-auto block w-max">
                      {partner.category}
                    </div>
                    <p className="text-white/70 text-center text-sm mb-4">{partner.description}</p>
                    
                    <div className="flex justify-center space-x-4">
                      <a href={partner.links.website} className="text-white/70 hover:text-[#3BCEAC] transition-colors flex items-center gap-1 text-sm">
                        <Globe size={16} />
                        <span>Website</span>
                      </a>
                      <a href={`mailto:${partner.links.contact}`} className="text-white/70 hover:text-[#3BCEAC] transition-colors flex items-center gap-1 text-sm">
                        <Mail size={16} />
                        <span>Contact</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-block bg-white/10 border border-[#3BCEAC]/30 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-2xl font-medium text-white mb-2">Become a Partner</h3>
              <p className="text-white/70 mb-4">
                Interested in supporting our community? Reach out to explore partnership opportunities.
              </p>
              <a 
                href="#" 
                className="inline-block px-6 py-2 bg-[#3BCEAC] text-[#0D0221] font-bold rounded-md hover:bg-[#3BCEAC]/80 transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}