"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import Image from "next/image"

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
      name: "GDGC GCELT",
      image: "https://i.postimg.cc/TPtq4BMH/20250322-114205-0000-Arijit-Ghosal.png",
    },
    {
      name: "Apex Circle",
      image: "https://i.postimg.cc/fLkjn5MW/Apex-Circle-logo-Apex-Circle.jpg",
    },
    {
      name: "GDGC AOT",
      image: "https://i.postimg.cc/sfvKtf2P/centered-color-t-Debarshee-Chakraborty.png",
    },
    {
      name: "GDGC BBIT",
      image: "https://i.postimg.cc/6QWfztSv/Copy-of-GDG-On-Campus-Centered-Template-Supravat-Paul-1.png",
    },
    {
      name: "GDGC SLIET",
      image: "https://i.postimg.cc/YqFRCXYh/GDG-On-Campus-SLIET-LOGO-Kundan-Kumar.png"
    },
    {
      name: "Postman Community Kolkata",
      image: "https://i.postimg.cc/Nj7x15Nt/image-20250322-19195281f3dce0-fc24-4601-95a3-c261193065e2-Suman-Singha.png",

    },
    {
      name: "GDGC IEM",
      image: "https://i.postimg.cc/Z0z5YDm8/IMG-20250325-WA0006-Ayush-Jha.jpg"
    },
    {
      name: "Tech Masters India",
      image: "https://i.postimg.cc/NGSbYhy3/instagram-dp-Tech-Masters-India-2025-20250115-025844-0000-Aaradhy-Gaur.png",
    },
    {
      name:"LNC Community",
      image: "https://i.postimg.cc/8c6Rs5Fq/LNC-logo-for-websites-Snihita-Nandi.png"
    },
    {
      name: "NooBuild",
      image: "https://i.postimg.cc/NG38S1SY/Noo-Build-Logo-4k-Anurag-Verma.jpg"
    },
    {
      name: "Codasauras",
      image: "https://i.postimg.cc/NG97dNNp/original-logo-Codasauras.png"
    },
    {
      name: "IEI Students' Chapter CSE",
      image: "https://i.postimg.cc/XJhKVFvf/sc-logo-black-text-1-SCCSE-AOT.png"
    },
    {
      name: "Samarth",
      image: "https://i.postimg.cc/bwjTDQ9L/violetlogo-57f93a3bc68d1d4bddd8-Sujay-Dey.webp"
    }
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
                        className="object-contain rounded-lg"
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold text-center mb-1 text-white">{partner.name}</h3>
           
                    
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