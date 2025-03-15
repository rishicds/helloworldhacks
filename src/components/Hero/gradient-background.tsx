"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create gradient points
    const gradientPoints = [
      { x: canvas.width * 0.1, y: canvas.height * 0.1, radius: 300, color: "rgba(128, 0, 255, 0.5)" },
      { x: canvas.width * 0.8, y: canvas.height * 0.2, radius: 250, color: "rgba(0, 128, 255, 0.5)" },
      { x: canvas.width * 0.2, y: canvas.height * 0.8, radius: 350, color: "rgba(255, 0, 128, 0.5)" },
      { x: canvas.width * 0.7, y: canvas.height * 0.7, radius: 300, color: "rgba(0, 255, 128, 0.5)" },
    ]

    // Animation variables
    let animationFrameId: number
    const time = { value: 0 }

    // Draw function
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Fill with dark background
      ctx.fillStyle = "rgb(10, 10, 15)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update time
      time.value += 0.005

      // Draw each gradient point
      gradientPoints.forEach((point, index) => {
        // Update position with perlin noise
        const xOffset = Math.sin(time.value + index) * 100
        const yOffset = Math.cos(time.value * 0.8 + index) * 100

        const x = point.x + xOffset
        const y = point.y + yOffset

        // Create radial gradient
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, point.radius)

        gradient.addColorStop(0, point.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        // Draw gradient
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })

      // Add noise overlay
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)"
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 2
        ctx.fillRect(x, y, size, size)
      }

      // Continue animation
      animationFrameId = requestAnimationFrame(draw)
    }

    // Start animation
    draw()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
    </>
  )
}

