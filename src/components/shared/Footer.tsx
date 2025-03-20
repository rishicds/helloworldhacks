"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Github, Linkedin, Twitter, Instagram, Facebook, Hexagon, Code, Cpu } from "lucide-react"

const Footer = () => {
  const container = useRef<HTMLDivElement>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  // Animation variants for the futuristic text
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      },
    },
  }

  const letterVariants = {
    hidden: {
      y: 20,
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 100,
      },
    },
  }

  const logoText = "HELLOWORLDHACKS"

  return (
    <footer
      className="relative h-full pt-12 bg-gradient-to-b from-[#050510] to-[#0a0a20] text-white overflow-hidden"
      ref={container}
    >
      {/* Tech-inspired background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(0deg, transparent 24%, rgba(61, 239, 233, 0.3) 25%, rgba(61, 239, 233, 0.3) 26%, transparent 27%, transparent 74%, rgba(61, 239, 233, 0.3) 75%, rgba(61, 239, 233, 0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(61, 239, 233, 0.3) 25%, rgba(61, 239, 233, 0.3) 26%, transparent 27%, transparent 74%, rgba(61, 239, 233, 0.3) 75%, rgba(61, 239, 233, 0.3) 76%, transparent 77%, transparent)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Glowing orbs */}
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-[#3DEFE9] blur-[100px] opacity-20"></div>
        <div className="absolute top-1/2 -right-20 w-60 h-60 rounded-full bg-[#6D5AE6] blur-[120px] opacity-20"></div>
      </div>

      <div className="sm:container px-4 mx-auto relative z-10">
        <div className="md:flex justify-between w-full">
          <div>
            <h1 className="md:text-4xl text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3DEFE9] to-[#6D5AE6]">
              Let&lsquo;s build the future together
            </h1>

            {/* Contact Us section */}
            <div className="pt-2 pb-6 md:w-99">
              <p className="md:text-2xl text-xl py-4 text-gray-300">Connect with our network</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="rounded-md bg-gradient-to-r from-[#3DEFE9] to-[#6D5AE6] text-black hover:opacity-90 flex items-center gap-2 px-6 border border-[#3DEFE9]/30"
                  asChild
                >
                  <Link href="mailto:helloworldhacks6@gmail.com">
  <Mail className="h-4 w-4" />
  Contact Us
  <ArrowRight className="h-4 w-4 ml-2" />
</Link>
                </Button>
              
              </div>
            </div>
          </div>

          <div className="flex gap-10">
            <ul>
              <li className="text-xl pb-2 text-[#3DEFE9] font-bold flex items-center gap-2">
                <Hexagon className="h-4 w-4" />
                NAVIGATION
              </li>
              <li className="text-lg font-medium hover:text-[#3DEFE9] transition-colors">
                <Link href="/" className="flex items-center gap-2 py-1">
                  <span className="text-xs text-[#3DEFE9]">01</span>
                  Home
                </Link>
              </li>
              <li className="text-lg font-medium hover:text-[#3DEFE9] transition-colors">
                <Link href="/about" className="flex items-center gap-2 py-1">
                  <span className="text-xs text-[#3DEFE9]">02</span>
                  About us
                </Link>
              </li>
            </ul>

            <ul>
              <li className="text-xl pb-2 text-[#3DEFE9] font-bold flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                CONNECT
              </li>
              <li className="text-lg font-medium">
                <a
                  href="https://www.linkedin.com/company/hello-world-hacks/"
                  target="_blank"
                  className="hover:text-[#3DEFE9] transition-colors flex items-center gap-2 py-1"
                  rel="noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
              <li className="text-lg font-medium">
                <a
                  href="https://x.com/HelloWorldHacks"
                  target="_blank"
                  className="hover:text-[#3DEFE9] transition-colors flex items-center gap-2 py-1"
                  rel="noreferrer"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </a>
              </li>
              <li className="text-lg font-medium">
                <a
                  href="https://www.instagram.com/hello.world.hacks?igsh=MTJqcXU5MDJ4dDZmcQ=="
                  target="_blank"
                  className="hover:text-[#3DEFE9] transition-colors flex items-center gap-2 py-1"
                  rel="noreferrer"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </li>
              <li className="text-lg font-medium">
                <a
                  href="https://www.facebook.com/profile.php?id=61573844267737"
                  target="_blank"
                  className="hover:text-[#3DEFE9] transition-colors flex items-center gap-2 py-1"
                  rel="noreferrer"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Futuristic logo text with animation */}
        <div className="border-y border-[#3DEFE9]/20 md:py-8 py-6 my-8 overflow-hidden relative">
          {/* Tech circuit lines */}
          <div className="absolute inset-0 pointer-events-none">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-10"
            >
              <path d="M0 50H800" stroke="#3DEFE9" strokeWidth="0.5" />
              <path d="M100 0V100" stroke="#3DEFE9" strokeWidth="0.5" />
              <path d="M200 0V100" stroke="#3DEFE9" strokeWidth="0.5" />
              <path d="M300 0V100" stroke="#3DEFE9" strokeWidth="0.5" />
              <path d="M400 0V100" stroke="#3DEFE9" strokeWidth="0.5" />
              <path d="M500 0V100" stroke="#3DEFE9" strokeWidth="0.5" />
              <path d="M600 0V100" stroke="#3DEFE9" strokeWidth="0.5" />
              <path d="M700 0V100" stroke="#3DEFE9" strokeWidth="0.5" />
              <circle cx="100" cy="50" r="5" fill="#3DEFE9" fillOpacity="0.5" />
              <circle cx="200" cy="50" r="5" fill="#3DEFE9" fillOpacity="0.5" />
              <circle cx="300" cy="50" r="5" fill="#3DEFE9" fillOpacity="0.5" />
              <circle cx="400" cy="50" r="5" fill="#3DEFE9" fillOpacity="0.5" />
              <circle cx="500" cy="50" r="5" fill="#3DEFE9" fillOpacity="0.5" />
              <circle cx="600" cy="50" r="5" fill="#3DEFE9" fillOpacity="0.5" />
              <circle cx="700" cy="50" r="5" fill="#3DEFE9" fillOpacity="0.5" />
            </svg>
          </div>

          <div ref={ref} className="flex justify-center items-center">
            <motion.div
              className="flex justify-center overflow-hidden"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {logoText.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  className="text-4xl md:text-6xl lg:text-7xl font-black tracking-wider"
                  variants={letterVariants}
                  style={{
                    display: "inline-block",
                    fontFamily: "monospace", // Fallback font
                    background: "linear-gradient(135deg, #3DEFE9 0%, #6D5AE6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 15px rgba(61, 239, 233, 0.5)",
                    padding: "0 1px",
                    position: "relative",
                  }}
                >
                  {letter}
                  {/* Digital glitch effect */}
                  <motion.span
                    className="absolute inset-0 text-[#3DEFE9] opacity-30"
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                      x: [0, 1, -1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      delay: index * 0.1,
                    }}
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% 5%, 0 5%, 0 10%, 100% 10%, 100% 15%, 0 15%, 0 45%, 100% 45%, 100% 60%, 0 60%, 0 65%, 100% 65%, 100% 80%, 0 80%)",
                    }}
                  >
                    {letter}
                  </motion.span>
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Code brackets decoration */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3DEFE9] opacity-50 text-4xl md:text-6xl font-mono">{`<`}</div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3DEFE9] opacity-50 text-4xl md:text-6xl font-mono">{`/>`}</div>
        </div>

        <div className="flex md:flex-row flex-col-reverse gap-3 justify-between py-4 border-t border-[#3DEFE9]/20">
          <span className="font-medium text-gray-400 flex items-center gap-2">
            <Code className="h-4 w-4 text-[#3DEFE9]" />
            &copy; 2025 HelloWorldHacks. All Rights Reserved.
          </span>
          
        </div>
      </div>
    </footer>
  )
}

export default Footer

