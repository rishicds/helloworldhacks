"use client"
import { useState, useEffect, useRef, useCallback, type ReactNode } from "react"
import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa"

// CSS Styles (would normally be in globals.css)
const styles = {
  keyframes: `
    @keyframes scanline {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100%); }
    }
    @keyframes shine {
      0% { transform: translateX(-100%); }
      20%, 100% { transform: translateX(100%); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes textReveal {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `,
}

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
    name: "Manish Saha",
    role: "Web3",
    github: "https://github.com/Manice18",
    twitter: "https://twitter.com/Manice18heree",
    linkedin: "https://www.linkedin.com/in/manish-saha-076b61221/",
    image: "https://i.postimg.cc/Bv8k8Lnw/manish-saha.jpg",
  },
  {
    name: "Aditya D",
    role: "DevOps and Cloud",
    github: "https://github.com/adi271001",
    twitter: "https://twitter.com/osdevcommunity",
    linkedin: "https://www.linkedin.com/in/aditya-d-23453a179/",
    image: "https://i.postimg.cc/kGNkn0gJ/aditya-d.jpg",
  },
  {
    name: "Debopom Banerjee",
    role: "Web3",
    github: "https://github.com/Debopom-Banerjee",
    linkedin: "https://www.linkedin.com/in/debopom-banerjee-a35123215",
    image: "https://i.postimg.cc/wxhKcmcC/debopom-banerjee.jpg",
  },
  {
    name: "Sayan Chakraborty",
    role: "DevOps",
    github: "https://github.com/sayanC04",
    linkedin: "https://www.linkedin.com/in/sayan-chakraborty-devops",
    image: "https://i.postimg.cc/9QgsFtC7/sayan-chakraborty.jpg",
  },
  {
    name: "Supratim Dhara",
    role: "App Dev",
    github: "https://github.com/supratim1609",
    linkedin: "https://www.linkedin.com/in/supratimdhara/",
    image: "https://i.postimg.cc/KjbHs0rd/supratim-dhara.jpg",
  },
  {
    name: "Nasiruddin Thander",
    role: "AI/ML",
    github: "https://github.com/N-Thander",
    linkedin: "https://www.linkedin.com/in/nasiruddin-thander/",
    image: "https://i.postimg.cc/8PHqxgYw/nasiruddin-thander.jpg",
  },
  {
    name: "Shinjan Sarkar",
    role: "DevOps",
    github: "https://github.com/shinjansarkar",
    linkedin: "https://www.linkedin.com/in/shinjan-sarkar-544323251/",
    image: "https://i.postimg.cc/tJzM0FB7/shinjan-sarkar.jpg",
  },
  {
    name: "Anurag Roy",
    role: "Cyber Security",
    twitter: "https://x.com/anuragroy485/",
    linkedin: "https://www.linkedin.com/in/anuragroy485/",
    image: "https://i.postimg.cc/fLmPKGXc/anurag-roy.jpg",
  },
  {
    name: "Mayukh Haldar",
    role: "AI/ML",
    github: "https://github.com/Mayukh-Haldar",
    linkedin: "https://www.linkedin.com/in/mayukh-haldar-671256287/",
    image: "https://i.postimg.cc/GmmZCSwR/mayukh-halder.jpg",
  },
  {
    name: "Soham Banerjee",
    role: "Cyber Security",
    github: "https://github.com/soham4abc",
    linkedin: "https://www.linkedin.com/in/soham-banerjee-6091831b3/",
    image: "https://i.postimg.cc/d0zXGs7Q/soham-banerjee.jpg",
  },
  {
    name: "Vinay B",
    role: "DevOps and Cloud",
    image: "https://i.postimg.cc/s27F6GCG/vin-formal.jpg",
    github: "https://github.com/vinay-B-V-37",
    linkedin: "https://www.linkedin.com/in/vinay-b-v-742370223/",
  },
  {
    name: "Krishnendu Dasgupta",
    role: "Web Dev",
    github: "https://github.com/KrishnenduDG",
    twitter: "https://x.com/krishnendudg",
    linkedin: "https://www.linkedin.com/in/krishnendudg/",
    image: "https://i.postimg.cc/TYGzk3tp/Krishnendu-Dasgupta.jpg",
  },
  {
    name: "Aman Poddar",
    role: "Web Dev",
    image: "https://i.postimg.cc/hv4HtCzV/Whats-App-Image-2025-04-03-at-22-35-20-96a3e946.jpg",
    github: "https://github.com/Am10aN16",
    linkedin: "https://www.linkedin.com/in/amanpoddar10/",
  },
  {
    name: "Aritra Basu",
    role: "Web Dev",
    github: "https://github.com/aritrakrbasu",
    image: "https://i.postimg.cc/NMk3YhMg/Whats-App-Image-2025-04-03-at-22-36-08-11494699.jpg",
    linkedin: "https://www.linkedin.com/in/aritrakrbasu/",
  },
  {
    name: "Subinoy Biswas",
    role: "Web Dev",
    github: "https://github.com/heysubinoy",
    image: "https://i.postimg.cc/fbW9RhBs/pfp.jpg",
    linkedin: "https://www.linkedin.com/in/heysubinoy/",
  },
  {
    name: "Srishti Majumder",
    role: "Web Dev",
    github: "https://github.com/Srishtihere",
    image: "https://i.postimg.cc/2y1MZFNV/IMG-20250301-WA0181.jpg",
    linkedin: "https://www.linkedin.com/in/srishti-majumder/",
  },
  {
    name: "Om Ashish MIshra",
    role: "AI/ML",
    github: "https://github.com/OmAshish",
    image: "https://i.postimg.cc/FH406ysc/Om-Ashish-Mishra-1.jpg",
    linkedin: "https://www.linkedin.com/in/om-ashish-mishra/",
  },
  {
    name: "Tanisha Bansal",
    role: "AI/ML",
    github: "https://github.com/BTANISHA11",
    image: "https://i.postimg.cc/3Nt75MPV/1000249120.jpg",
    linkedin: "https://www.linkedin.com/in/tanishabansal110902?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Saptadeep Banerjee",
    role: "DevOps & Cloud",
    github: "https://github.com/imSanko",
    image: "https://i.postimg.cc/x8Vrwfx6/1683396607033.jpg",
    linkedin: "https://www.linkedin.com/in/saptadeep-banerjee-2b15bbb0/",
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

// Custom hook for intersection observer
interface UseInViewOptions {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  triggerOnce?: boolean
}

// Fixed useInView hook with proper typing
function useInView<T extends HTMLElement = HTMLDivElement>({
  root = null,
  rootMargin = "0px",
  threshold = 0,
  triggerOnce = false,
}: UseInViewOptions = {}): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null) // ✅ Fix applied
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementInView = entry.isIntersecting
        setIsInView(isElementInView)

        if (isElementInView && triggerOnce && element) {
          observer.unobserve(element)
        }
      },
      { root, rootMargin, threshold },
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [root, rootMargin, threshold, triggerOnce])

  return [ref, isInView]
}

// Custom hook for animation on scroll
const useAnimateOnScroll = <T extends HTMLElement = HTMLDivElement>(threshold = 0.1) => {
  return useInView<T>({
    triggerOnce: true,
    threshold,
  })
}

// Custom hook for mouse position
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  return mousePosition
}

// Tilt component
const Tilt = ({
  children,
  perspective = 1000,
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
  scale = 1.05,
  gyroscope = true,
}: {
  children: ReactNode
  perspective?: number
  tiltMaxAngleX?: number
  tiltMaxAngleY?: number
  scale?: number
  gyroscope?: boolean
}) => {
  const tiltRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [tiltAngleX, setTiltAngleX] = useState(0)
  const [tiltAngleY, setTiltAngleY] = useState(0)

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current || !isHovered) return

    const rect = tiltRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const angleX = ((y - centerY) / centerY) * tiltMaxAngleX
    const angleY = ((centerX - x) / centerX) * tiltMaxAngleY

    setTiltAngleX(angleX)
    setTiltAngleY(angleY)
  }

  // Handle device orientation for mobile
  useEffect(() => {
    if (!gyroscope) return

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!tiltRef.current || !isHovered || !e.beta || !e.gamma) return

      // Adjust tilt based on device orientation
      const beta = Math.min(Math.max(e.beta, -45), 45) // -45 to 45 degrees
      const gamma = Math.min(Math.max(e.gamma, -45), 45) // -45 to 45 degrees

      const angleX = (beta / 45) * tiltMaxAngleX
      const angleY = (gamma / 45) * tiltMaxAngleY

      setTiltAngleX(angleX)
      setTiltAngleY(angleY)
    }

    if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleDeviceOrientation)
    }

    return () => {
      if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", handleDeviceOrientation)
      }
    }
  }, [gyroscope, isHovered, tiltMaxAngleX, tiltMaxAngleY])

  // Reset tilt when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false)
    setTiltAngleX(0)
    setTiltAngleY(0)
  }

  return (
    <div
      ref={tiltRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: isHovered
          ? `perspective(${perspective}px) rotateX(${tiltAngleX}deg) rotateY(${tiltAngleY}deg) scale3d(${scale}, ${scale}, ${scale})`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s ease-out",
      }}
    >
      {children}
    </div>
  )
}

// Text Reveal component
const TextReveal = ({
  children,
  delay = 0,
  duration = 0.8,
}: {
  children: ReactNode
  delay?: number
  duration?: number
}) => {
  const [ref, inView] = useInView<HTMLDivElement>({ triggerOnce: true, threshold: 0.1 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!inView || !containerRef.current) return

    const container = containerRef.current
    const textElements = container.querySelectorAll("span, h1, h2, h3, h4, h5, h6, p")

    textElements.forEach((element, index) => {
      // Set animation styles
      const el = element as HTMLElement
      el.style.opacity = "0"
      el.style.transform = "translateY(20px)"
      el.style.animation = `textReveal ${duration}s cubic-bezier(0.215, 0.61, 0.355, 1) forwards`
      el.style.animationDelay = `${delay + index * 0.1}s`
    })
  }, [inView, delay, duration])

  return (
    <div ref={ref}>
      <div ref={containerRef} className="overflow-hidden">
        {children}
      </div>
    </div>
  )
}

// Glowing Button component
const GlowingButton = ({
  active,
  onClick,
  children,
  icon,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
  icon: ReactNode
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative px-6 py-3 rounded-full font-bold text-white transition-all duration-500 overflow-hidden group ${
        active ? "scale-105" : "opacity-70 hover:opacity-100"
      }`}
      style={{
        boxShadow: active ? "0 0 25px rgba(6, 182, 212, 0.6)" : isHovered ? "0 0 15px rgba(6, 182, 212, 0.3)" : "none",
      }}
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 ${
          active
            ? "bg-gradient-to-r from-cyan-500 to-blue-500"
            : isHovered
              ? "bg-gradient-to-r from-gray-800 to-gray-700"
              : "bg-gray-800"
        } transition-all duration-500`}
      />

      {/* Animated shine effect */}
      <div
        className="absolute inset-0 opacity-30 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        style={{
          animation: active ? "shine 3s infinite" : "none",
        }}
      />

      {/* Animated border */}
      <div
        className={`absolute inset-0 rounded-full ${
          active ? "border-2 border-cyan-300" : isHovered ? "border border-cyan-500/50" : ""
        } opacity-70`}
      />

      {/* Animated glow dots */}
      {active && (
        <>
          <div
            className="absolute w-1 h-1 rounded-full bg-cyan-300 top-1 left-1/4"
            style={{ animation: "pulse 2s infinite" }}
          />
          <div
            className="absolute w-1 h-1 rounded-full bg-cyan-300 bottom-1 right-1/4"
            style={{ animation: "pulse 2s infinite", animationDelay: "0.5s" }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative flex items-center justify-center gap-2 z-10">
        <span className={`transform transition-transform duration-300 ${active ? "scale-110" : ""}`}>{icon}</span>
        <span className="ml-1">{children}</span>
      </div>

      {/* Animated underline indicator */}
      {active && (
        <div
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-white rounded-full"
          style={{
            animation: "pulse 2s infinite",
          }}
        />
      )}
    </button>
  )
}

// Particle Background component
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<
    Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      growing: boolean
    }>
  >([])
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Initialize particles
    const initParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 150)
      particlesRef.current = []

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: `hsl(${180 + Math.random() * 60}, 100%, 70%)`,
          alpha: Math.random() * 0.5 + 0.1,
          growing: Math.random() > 0.5,
        })
      }
    }

    initParticles()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }

        // Pulse size
        if (particle.growing) {
          particle.size += 0.01
          if (particle.size > 2.5) {
            particle.growing = false
          }
        } else {
          particle.size -= 0.01
          if (particle.size < 0.5) {
            particle.growing = true
          }
        }

        // Interact with mouse
        const dx = mousePositionRef.current.x - particle.x
        const dy = mousePositionRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)

          // Push particles away from mouse
          particle.x -= Math.cos(angle) * force * 0.5
          particle.y -= Math.sin(angle) * force * 0.5

          // Increase brightness near mouse
          ctx.globalAlpha = particle.alpha + force * 0.5
        } else {
          ctx.globalAlpha = particle.alpha
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Connect nearby particles with lines
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const otherParticle = particlesRef.current[j]
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.6 }} />
  )
}

// Card Component for Team Members
const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const [ref, inView] = useAnimateOnScroll<HTMLDivElement>(0.1)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Calculate staggered animation delay
  const staggerDelay = (index % 4) * 0.1 // Different delay for each column
  const rowDelay = Math.floor(index / 4) * 0.15 // Additional delay for each row
  const totalDelay = staggerDelay + rowDelay

  // Random rotation for initial state
  const randomRotation = useRef(Math.random() * 10 - 5)

  // Random animation duration for more organic feel
  const animDuration = useRef(0.7 + Math.random() * 0.3)

  // Flip card on click
  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev)
  }, [])

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-1000 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-40"
      }`}
      style={{
        transitionDelay: `${totalDelay}s`,
        perspective: "1000px",
      }}
    >
      <Tilt>
        <div
          ref={cardRef}
          className="relative w-64 h-96 cursor-pointer transition-all duration-700 ease-out transform-gpu"
          style={{
            transformStyle: "preserve-3d",
            transform: inView
              ? `rotateY(${isFlipped ? "180deg" : "0deg"}) rotateZ(0deg)`
              : `rotateY(0deg) rotateZ(${randomRotation.current}deg)`,
            transition: `transform ${animDuration.current}s cubic-bezier(0.34, 1.56, 0.64, 1), 
                        box-shadow 0.3s ease-out,
                        transform-origin 0.3s ease-out`,
            boxShadow: isHovered
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px 5px rgba(6, 182, 212, 0.3)"
              : "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
          }}
          onClick={handleFlip}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Front of card */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700"
            style={{
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Card content container with 3D effect */}
            <div className="absolute inset-0 flex flex-col" style={{ transform: "translateZ(2px)" }}>
              {/* Image section */}
              <div className="h-3/5 w-full relative overflow-hidden">
                {member.image ? (
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 260px"
                      className={`object-cover transition-all duration-700 ease-out ${isHovered ? "scale-110" : "scale-100"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

                    {/* Animated overlay effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 transition-opacity duration-500 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    {/* Scan line effect */}
                    <div
                      className={`
                      }`}
                    >
                      <div
                        className="h-full w-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
                        style={{
                          animation: isHovered ? "scanline 2s linear infinite" : "none",
                          height: "200%",
                          transform: "translateY(-50%)",
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-800">
                    <span className="text-gray-400">Image coming soon</span>
                  </div>
                )}
              </div>

              {/* Info section */}
              <div className="flex-1 p-5 flex flex-col justify-between relative">
                {/* Glowing border effect */}
                <div
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-30"
                  }`}
                />

                <div>
                  <h3
                    className={`text-xl font-bold mb-1 transition-all duration-300 ${
                      isHovered ? "text-cyan-400 translate-y-0" : "text-white translate-y-0"
                    }`}
                  >
                    {member.name}
                  </h3>
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium transition-all duration-500 ${
                      isHovered
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                        : "bg-gray-800 text-gray-300"
                    }`}
                  >
                    {member.role}
                  </div>
                </div>

                {/* Social icons */}
                <div
                  className={`flex justify-center space-x-3 transition-all duration-500 ease-in-out ${
                    isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                >
                  {member.linkedin && (
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-cyan-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12">
                        <FaLinkedin className="text-white" />
                      </div>
                    </Link>
                  )}
                  {member.instagram && (
                    <Link
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12">
                        <FaInstagram className="text-white" />
                      </div>
                    </Link>
                  )}
                  {member.twitter && (
                    <Link
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-blue-400 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12">
                        <FaTwitter className="text-white" />
                      </div>
                    </Link>
                  )}
                  {member.github && (
                    <Link
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12">
                        <FaGithub className="text-white" />
                      </div>
                    </Link>
                  )}
                </div>
              </div>

              {/* Corner decorations */}
              <div
                className={`absolute top-0 left-0 w-10 h-10 transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-50"}`}
              >
                <div className="absolute top-0 left-0 w-1 h-10 bg-gradient-to-b from-cyan-400 to-transparent" />
                <div className="absolute top-0 left-0 h-1 w-10 bg-gradient-to-r from-cyan-400 to-transparent" />
              </div>

              <div
                className={`absolute bottom-0 right-0 w-10 h-10 transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-50"}`}
              >
                <div className="absolute bottom-0 right-0 w-1 h-10 bg-gradient-to-t from-cyan-400 to-transparent" />
                <div className="absolute bottom-0 right-0 h-1 w-10 bg-gradient-to-l from-cyan-400 to-transparent" />
              </div>

              {/* Flip indicator */}
              <div
                className={`absolute bottom-3 right-3 text-xs text-gray-400 flex items-center gap-1 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <span>Flip</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3v10"></path>
                  <path d="m21 7-4-4-4 4"></path>
                  <path d="M7 21v-10"></path>
                  <path d="m3 17 4 4 4-4"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Back of card */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 p-6 flex flex-col justify-between"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0,transparent_70%)]" />

            {/* Back content */}
            <div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">{member.name}</h3>
              <div className="space-y-4">
                <p className="text-gray-300">Expert in {member.role} with a passion for innovation and technology.</p>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Connect</h4>
                  <div className="flex flex-wrap gap-3">
                    {member.linkedin && (
                      <Link
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-cyan-900 flex items-center gap-2 transition-colors duration-300">
                          <FaLinkedin className="text-cyan-400" />
                          <span className="text-sm">LinkedIn</span>
                        </div>
                      </Link>
                    )}
                    {member.github && (
                      <Link
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-purple-900 flex items-center gap-2 transition-colors duration-300">
                          <FaGithub className="text-purple-400" />
                          <span className="text-sm">GitHub</span>
                        </div>
                      </Link>
                    )}
                    {member.twitter && (
                      <Link
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-blue-900 flex items-center gap-2 transition-colors duration-300">
                          <FaTwitter className="text-blue-400" />
                          <span className="text-sm">Twitter</span>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Flip back indicator */}
            <div className="text-center">
              <button
                className="px-4 py-2 rounded-full bg-gray-800 hover:bg-cyan-900 text-sm text-gray-300 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 mx-auto"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFlipped(false)
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12h18"></path>
                  <path d="M3 6h18"></path>
                  <path d="M3 18h18"></path>
                </svg>
                <span>View Photo</span>
              </button>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-10 h-10">
              <div className="absolute top-0 left-0 w-1 h-10 bg-gradient-to-b from-cyan-400 to-transparent" />
              <div className="absolute top-0 left-0 h-1 w-10 bg-gradient-to-r from-cyan-400 to-transparent" />
            </div>

            <div className="absolute bottom-0 right-0 w-10 h-10">
              <div className="absolute bottom-0 right-0 w-1 h-10 bg-gradient-to-t from-cyan-400 to-transparent" />
              <div className="absolute bottom-0 right-0 h-1 w-10 bg-gradient-to-l from-cyan-400 to-transparent" />
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  )
}

// Team Section Component
const TeamSection = ({ members }: { members: TeamMember[] }) => {
  const [ref, inView] = useAnimateOnScroll<HTMLDivElement>(0.1)

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center transition-all duration-1000 ease-out ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      {members.map((member, index) => (
        <TeamMemberCard key={index} member={member} index={index} />
      ))}
    </div>
  )
}

// Main Team Page Component
const TeamPage = () => {
  const [activeTab, setActiveTab] = useState<"mentors" | "evangelists" | "judges">("mentors")
  const [currentMembers, setCurrentMembers] = useState<TeamMember[]>(mentors)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [heroRef, heroInView] = useAnimateOnScroll<HTMLDivElement>(0.1)
  const [titleRef, titleInView] = useAnimateOnScroll<HTMLDivElement>(0.1)
  const mousePosition = useMousePosition()
  const cursorRef = useRef<HTMLDivElement>(null)

  // Add keyframes to document
  useEffect(() => {
    // Add keyframes to document
    const styleElement = document.createElement("style")
    styleElement.textContent = styles.keyframes
    document.head.appendChild(styleElement)

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  // Handle tab change with smooth transition
  const handleTabChange = (tab: "mentors" | "evangelists" | "judges") => {
    if (tab === activeTab) return

    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTab(tab)
      switch (tab) {
        case "mentors":
          setCurrentMembers(mentors)
          break
        case "evangelists":
          setCurrentMembers(evangelists)
          break
        case "judges":
          setCurrentMembers(judges)
          break
      }
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 500)
  }

  // Update custom cursor position
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`
    }
  }, [mousePosition])

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative">
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          background: "rgba(6, 182, 212, 0.5)",
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.1s ease-out, width 0.2s, height 0.2s",
          boxShadow: "0 0 20px 5px rgba(6, 182, 212, 0.3)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Particle background */}
      <ParticleBackground />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 via-cyan-900/30 to-gray-900 py-20 px-4 relative overflow-hidden">
        <div
          ref={heroRef}
          className={`container mx-auto text-center relative z-10 transition-all duration-1000 ease-out ${
            heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <TextReveal>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight p-4 sm:p-8 md:p-12">
              <span className="text-white">HELLO</span>
              <span className="text-cyan-400">WORLDHACKS</span>
              <span className="text-white"> EXPERTS</span>
            </h1>
          </TextReveal>

          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            &ldquo;Meet our expert panel of mentors and judges, ready to guide and inspire you throughout the hackathon
            journey.&rdquo;
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-30 border-b border-gray-800/50">
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-center gap-6 flex-wrap">
            <TabButton
              active={activeTab === "mentors"}
              onClick={() => handleTabChange("mentors")}
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

            {/* Uncomment if you want to use these tabs */}
            {/*
            <TabButton
              active={activeTab === "evangelists"}
              onClick={() => handleTabChange("evangelists")}
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
              onClick={() => handleTabChange("judges")}
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
            */}
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div
            ref={titleRef}
            className={`text-center mb-16 transition-all duration-700 ease-out ${
              titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
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
          </div>

          <div
            className={`transition-opacity duration-500 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
          >
            <TeamSection members={currentMembers} />
          </div>
        </div>
      </section>

      {/* Footer with gradient */}
      <div className="h-20 bg-gradient-to-t from-cyan-900/20 to-transparent"></div>
    </div>
  )
}

interface TabButtonProps {
  active: boolean
  onClick: () => void
  children: ReactNode
  icon: ReactNode
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children, icon }) => {
  return (
    <GlowingButton active={active} onClick={onClick} icon={icon}>
      {children}
    </GlowingButton>
  )
}

export default TeamPage
