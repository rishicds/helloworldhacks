"use client"

import type React from "react"

import { Calendar, MapPin, Clock, ChevronRight, Flame, ExternalLink, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRef, useState } from "react"
import Image from "next/image"

// CSS-based Particle component
const Particle = () => {
  const randomSize = Math.floor(Math.random() * 4) + 1
  const randomDelay = Math.random() * 8
  const randomPath = Math.random() > 0.5

  return (
    <div
      className={`absolute rounded-full bg-gradient-to-r from-blue-500/40 to-cyan-500/40 animate-float`}
      style={{
        width: `${randomSize}px`,
        height: `${randomSize}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        filter: "blur(1px)",
        animationDuration: `${10 + Math.random() * 15}s`,
        animationDelay: `${randomDelay}s`,
        animationDirection: randomPath ? "alternate" : "alternate-reverse",
      }}
    />
  )
}

// CSS-based glowing border
const GlowingBorder = ({ className = "" }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-animate",
        className,
      )}
    />
  )
}

const EventsPage = () => {
  const [isHovering, setIsHovering] = useState(false)

  // Refs for scroll animations
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate particles for background - reduced count for better performance
  const particles = Array.from({ length: 50 }).map((_, i) => <Particle key={i} />)

  // CSS-based floating element
  const FloatingElement = ({
    size,
    color,
    delay,
    duration,
    position,
  }: {
    size: number
    color: string
    delay: number
    duration: number
    position: React.CSSProperties
  }) => (
    <div
      className={`absolute rounded-full bg-${color}-500/20 backdrop-blur-sm z-10 animate-float`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        ...position,
      }}
    />
  )

  return (
    <div ref={containerRef} className="relative bg-black min-h-screen overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Particles with reduced density */}
        <div className="absolute inset-0 z-0">{particles}</div>

        {/* Gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,24,39,0.8)_0%,rgba(0,0,0,1)_70%)] parallax-slow" />

        {/* Background orbs with CSS animations */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse-slow animation-delay-2000" />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[100px] animate-pulse-slow animation-delay-4000" />

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10 parallax-medium">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#grid-gradient)" strokeWidth="0.5" />
              </pattern>
              <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        {/* Hexagonal grid */}
        <div className="absolute inset-0 opacity-5 parallax-fast">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="hexagons-events"
                width="50"
                height="43.4"
                patternUnits="userSpaceOnUse"
                patternTransform="scale(5) rotate(0)"
              >
                <path
                  d="M25,0 L50,14.4 L50,38.6 L25,53 L0,38.6 L0,14.4 Z"
                  fill="none"
                  stroke="url(#hex-gradient)"
                  strokeWidth="0.5"
                />
              </pattern>
              <linearGradient id="hex-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons-events)" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <main className="relative pt-32 pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Event details section */}
          <div className="fade-in mb-20">
            <div className="flex items-center gap-2 mb-6 slide-in-left">
              <div className="h-10 w-1 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full pulse-height" />
              <h2 className="text-2xl md:text-3xl font-bold text-white font-display glow-text">Upcoming Events</h2>
            </div>

            <Card
              className={cn(
                "relative overflow-hidden p-6 sm:p-8 md:p-10",
                "bg-gradient-to-br from-[#000b18] to-black ",
                "border border-blue-900/30 rounded-xl backdrop-blur-sm",
                "transition-all duration-500 hover:border-blue-800/50 hover:shadow-lg hover:shadow-blue-900/20 group",
              )}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Glass effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 pointer-events-none transition-all duration-500 ${isHovering ? "opacity-100" : "opacity-50"}`}
              />

              {/* Floating elements */}
              <FloatingElement size={12} color="blue" delay={0} duration={8} position={{ top: "10%", left: "5%" }} />
              <FloatingElement
                size={8}
                color="purple"
                delay={2}
                duration={10}
                position={{ bottom: "15%", right: "8%" }}
              />
              <FloatingElement size={10} color="cyan" delay={4} duration={12} position={{ top: "20%", right: "10%" }} />

              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-12 h-12">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M47 47V32M47 47H32" stroke="url(#cornerGradient)" strokeWidth="2" className="animate-draw" />
                  <defs>
                    <linearGradient id="cornerGradient" x1="32" y1="32" x2="47" y2="47" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3b82f6" />
                      <stop offset="1" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="absolute bottom-0 right-0 w-12 h-12 rotate-180">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M47 47V32M47 47H32"
                    stroke="url(#cornerGradient)"
                    strokeWidth="2"
                    className="animate-draw animation-delay-200"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative z-10">
                {/* Event details */}
                <div className="stagger-container">
                  <div className="flex items-center mb-6 stagger-item">
                    <div className="p-3 mr-4 h-[50px] mt-4 w-[50px] border border-blue-800/50 flex justify-center items-center rounded-md bg-blue-900/20 backdrop-blur-sm">
                      <div className="icon-pulse">
                        <Flame className="h-6 w-6 text-blue-400" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-[#008cff] font-display glow-text">Tech Verse</h3>
                  </div>

                  <div className="mb-6 stagger-item">
                    <div className="relative">
                      <div className="absolute -left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/30 to-transparent pulse-gradient" />
                      <p className="text-blue-100/80 pl-4">
                        🚀 Tech Verse – Get Industry-Ready with Experts! 🎤
                        <br />
                        <br />
                        Join an exclusive offline session to learn from top tech professionals in Web3, Software
                        Engineering, Product Management, and Developer Relations.
                        <br />
                        <br />
                        Gain real-world insights, essential skills, and valuable connections to excel in the tech
                        industry.
                        <br />
                        <br />🔥 Part of Hello World Hacks – 30 Days, Infinite Possibilities! 🔥
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 stagger-item">
                    <div className="flex items-center group p-3 rounded-lg hover:bg-blue-900/10 transition-colors duration-300 hover:scale-103">
                      <div className="mr-3 p-2 rounded-full bg-blue-900/20 group-hover:bg-blue-800/30 transition-colors duration-300 icon-wiggle">
                        <Calendar className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                      </div>
                      <div>
                        <div className="text-xs text-blue-400/70 mb-0.5">Date</div>
                        <span className="text-blue-100 group-hover:text-white transition-colors duration-300 hover:scale-105">
                          April 4, 2025
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center group p-3 rounded-lg hover:bg-blue-900/10 transition-colors duration-300 hover:scale-103">
                      <div className="mr-3 p-2 rounded-full bg-blue-900/20 group-hover:bg-blue-800/30 transition-colors duration-300 icon-wiggle animation-delay-500">
                        <Clock className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                      </div>
                      <div>
                        <div className="text-xs text-blue-400/70 mb-0.5">Time</div>
                        <span className="text-blue-100 group-hover:text-white transition-colors duration-300 hover:scale-105">
                          10:00 AM - 5:00 PM
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center group p-3 rounded-lg hover:bg-blue-900/10 transition-colors duration-300 sm:col-span-2 hover:scale-103">
                      <div className="mr-3 p-2 rounded-full bg-blue-900/20 group-hover:bg-blue-800/30 transition-colors duration-300 icon-wiggle animation-delay-1000">
                        <MapPin className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                      </div>
                      <div>
                        <div className="text-xs text-blue-400/70 mb-0.5">Location</div>
                        <span className="text-white group-hover:text-blue-100 transition-colors duration-300 hover:scale-102">
                          Dr. Jaya Deb Roy Auditorium, RCC Institute of Information Technology
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 stagger-item">
                    <div className="hover:scale-105 active:scale-95 transition-transform duration-300">
                      <Button
                        size="lg"
                        className="rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white 
                        hover:shadow-xl hover:shadow-blue-500/50 
                        group relative overflow-hidden transition-all duration-300 ease-in-out"
                      >
                        <Link target="_blank" href="https://lu.ma/7gntecu7">
                          <span className="relative z-10 flex items-center">
                            Register Now
                            <div className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform arrow-bounce">
                              <ChevronRight className="h-4 w-4" />
                            </div>
                          </span>
                        </Link>

                        <span className="absolute inset-0 bg-gradient-animate opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <span className="absolute inset-0 -z-10 bg-gradient-animate blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Event visual */}
                <div className="relative flex justify-center items-center fade-in-delay">
                  <div className="relative group perspective max-w-full">
                    {/* Floating elements around the image */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-blue-500/20 backdrop-blur-md z-20 float-element">
                      <div className="w-full h-full flex items-center justify-center">
                        <Star className="h-6 w-6 text-blue-300" />
                      </div>
                    </div>

                    <div className="absolute -bottom-4 -left-4 w-10 h-10 rounded-full bg-purple-500/20 backdrop-blur-md z-20 float-element animation-delay-1000">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-purple-400 rounded-full" />
                      </div>
                    </div>

                    {/* Glow effect behind image */}
                    <div className="absolute -inset-1 bg-gradient-animate rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000" />

                    {/* Image with hover effect */}
                    <div className="relative z-10 rounded-lg overflow-hidden border border-blue-900/30 shadow-lg shadow-blue-900/20 hover-tilt">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <Image
                        src="https://i.postimg.cc/3JX0rXcK/Whats-App-Image-2025-03-31-at-19-14-52-27f70c0a.jpg"
                        alt="Ignitathon event"
                        width={600}
                        height={400}
                        className="w-full h-auto max-h-[400px] object-cover object-center transition-transform duration-700 group-hover:scale-110 hover:brightness-110"
                      />

                      {/* Interactive overlay elements */}
                      <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110">
                        <Button size="sm" className="bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full">
                          <ExternalLink className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Speakers section */}
          <div className="fade-in-delay mb-20">
            <div className="flex items-center gap-2 mb-6 slide-in-left">
              <div className="h-10 w-1 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full pulse-height" />
              <h2 className="text-2xl md:text-3xl font-bold text-white font-display glow-text">Featured Speakers</h2>
            </div>

            {/* Speakers grid with responsive layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Megha Arora",
                  role: "CEO and Founder DevRelSquad, Ex-Microsoft, Apple, MongoDB",
                  image: "https://i.postimg.cc/bw52xKwT/Whats-App-Image-2025-04-01-at-00-34-29-14ed675b.jpg",
                },
                {
                  name: "Harshvardhan Bajoria",
                  role: "Associate Product Manager @Unstop, Github Campus Expert, Microsoft Gold MLSA",
                  image: "https://i.postimg.cc/8CWshc3p/Whats-App-Image-2025-04-01-at-00-34-29-45f3a7cf.jpg",
                },
                {
                  name: "Aritra Basu",
                  role: "Senior Software Engineer @Clirnet, Finalist @SIH2023, Winner of HackOn 2.0 by Infosys",
                  image: "https://i.postimg.cc/5N7HJZLV/Whats-App-Image-2025-04-01-at-00-34-30-62ecfc01.jpg",
                },
                {
                  name: "Swapnendu Banerjee",
                  role: "Campus Advocate @Defang Labs, Beta MLSA",
                  image: "https://i.postimg.cc/XYtpGds1/Whats-App-Image-2025-04-01-at-00-34-30-299371d9.jpg",
                },
              ].map((speaker, index) => (
                <div key={index} className="group fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative h-full rounded-xl overflow-hidden bg-gradient-to-b from-blue-900/20 to-blue-950/40 border border-blue-800/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20 group-hover:border-blue-700/50 hover:translate-y-[-5px]">
                    <GlowingBorder className="rounded-xl" />

                    <div className="relative overflow-hidden">
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10" />

                      {/* Card with hover effect */}
                      <div className="perspective">
                        <div className="relative hover-tilt">
                          <Image
                            src={speaker.image || "/placeholder.svg"}
                            alt={speaker.name}
                            width={400}
                            height={250}
                            className="w-full h-[250px] object-cover object-center transition-transform duration-700 group-hover:scale-110 hover:brightness-110"
                          />
                        </div>
                      </div>

                      {/* Hover action buttons */}
                      <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110">
                        <Button
                          size="icon"
                          className="rounded-full h-8 w-8 bg-white/10 backdrop-blur-md hover:bg-white/20"
                        >
                          <ExternalLink className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-4">
                      <h2
                        className="text-white text-xl font-bold group-hover:text-blue-300 transition-colors duration-300 glow-text"
                        style={{ animationDelay: `${index * 500}ms` }}
                      >
                        {speaker.name}
                      </h2>
                      <div
                        className="h-0.5 w-12 bg-blue-500/50 my-2 group-hover:w-20 transition-all duration-300 pulse-width"
                        style={{ animationDelay: `${index * 300}ms` }}
                      />
                      <p className="text-blue-200/80 text-sm mt-2 line-clamp-3">{speaker.role}</p>
                    </div>

                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 -mt-8 -mr-8 bg-blue-500/20 rotate-45 pulse-color" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default EventsPage