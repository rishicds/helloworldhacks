"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"

import { Trophy, Award, Gift, Zap } from "lucide-react"



export default function Prizes() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const mainPrizes = [
    {
      place: "1st PLACE",
      prize: "₹50,000",
      icon: <Trophy className="w-12 h-12" />,
      extras: ["Internship opportunities", "1-year software subscriptions", "Mentorship from industry experts"],
      color: "#FFBE0B",
    },
    {
      place: "2nd PLACE",
      prize: "₹30,000",
      icon: <Award className="w-12 h-12" />,
      extras: ["6-month software subscriptions", "Cloud credits worth ₹20,000", "Exclusive swag kit"],
      color: "#3DEFE9",
    },
    {
      place: "3rd PLACE",
      prize: "₹20,000",
      icon: <Gift className="w-12 h-12" />,
      extras: ["3-month software subscriptions", "Cloud credits worth ₹10,000", "Swag kit"],
      color: "#FF5470",
    },
  ]

  const specialPrizes = [
    {
      category: "BEST UI/UX",
      prize: "₹10,000 + Design Software Licenses",
      color: "#8A4FFF",
    },
    {
      category: "MOST INNOVATIVE",
      prize: "₹10,000 + Innovation Lab Access",
      color: "#FFBE0B",
    },
    {
      category: "BEST USE OF AI",
      prize: "₹10,000 + AI Platform Credits",
      color: "#3DEFE9",
    },
    {
      category: "COMMUNITY CHOICE",
      prize: "₹10,000 + Feature on Tech Blogs",
      color: "#FF5470",
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
    <section className="py-32 px-4 sm:px-6 bg-[#0d0916] relative" ref={ref}>
      <div className="relative">
        {/* Brutalist background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-10 w-40 h-40 border-4 border-[#FFBE0B] rotate-12 opacity-20"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 border-4 border-[#FFBE0B] -rotate-12 opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">WIN BIG</h2>
            <div className="w-20 h-1 bg-[#FFBE0B] mx-auto mb-6"></div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Over ₹1,00,000 in cash prizes, plus internship opportunities, software subscriptions, cloud credits, and
              more!
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {mainPrizes.map((prize, index) => (
              <motion.div key={index} variants={item} className="group">
                <div
                  className="relative overflow-hidden border-2 border-white/10 bg-white/5 backdrop-blur-md rounded-lg p-8 transform transition-all duration-500 hover:scale-105 text-center"
                  style={{
                    borderColor: prize.color,
                    boxShadow: `0 10px 30px -15px ${prize.color}40`,
                  }}
                >
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-white/5 opacity-20 rounded-full group-hover:opacity-30 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
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
                        <li key={i}>{extra}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl font-bold text-center mb-8 text-white"
          >
            SPECIAL CATEGORY PRIZES
          </motion.h3>

          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {specialPrizes.map((prize, index) => (
              <motion.div key={index} variants={item} className="group">
                <div
                  className="relative overflow-hidden border-2 border-white/10 bg-white/5 backdrop-blur-md rounded-lg p-6 transform transition-all duration-300 hover:scale-105 text-center"
                  style={{
                    borderColor: prize.color,
                    boxShadow: `0 5px 15px -10px ${prize.color}40`,
                  }}
                >
                  <h3 className="text-lg font-bold mb-2" style={{ color: prize.color }}>
                    {prize.category}
                  </h3>
                  <p className="text-white/90 text-sm">{prize.prize}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-[#FFBE0B]">
              <Zap className="w-5 h-5 text-[#FFBE0B]" />
              <p className="text-white/90 text-sm">All participants will receive certificates and swag kits!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

