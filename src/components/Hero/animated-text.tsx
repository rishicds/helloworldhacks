"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
}

export default function AnimatedText({ text, className = "" }: AnimatedTextProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Split text into words
  const words = text.split(" ")

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      rotate: 5,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  if (!isMounted) {
    return <div className={className}>{text}</div>
  }

  return (
    <motion.div
      className={`flex overflow-visible flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ width: "100%", maxWidth: "100%" }}
    >
      {words.map((word, index) => (
        <motion.span key={index} className="mr-2 mb-2 inline-block overflow-visible" variants={child}>
          <span
            className="inline-block"
            style={{
              background: "linear-gradient(90deg, #fff, #f0f0f0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 20px rgba(255,255,255,0.2)",
            }}
          >
            {word}
          </span>
        </motion.span>
      ))}
    </motion.div>
  )
}

