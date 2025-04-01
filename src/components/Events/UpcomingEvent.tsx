"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, ChevronRight, Flame, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function UpcomingEvent() {
    return (
        <section id="events" className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Background elements with multicolored blurry circles */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="absolute inset-0 -z-10 overflow-hidden"
                >
                    {/* Multicolored blurry circles - Adjusted for mobile */}
                    <div className="absolute top-1/4 left-1/4 w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] rounded-full bg-blue-500/20 blur-[50px] sm:blur-[75px] md:blur-[100px] animate-pulse"></div>
                    <div
                        className="absolute bottom-1/3 right-1/4 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] rounded-full bg-cyan-500/20 blur-[50px] sm:blur-[75px] md:blur-[100px] animate-pulse"
                        style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                        className="absolute top-1/2 right-1/3 w-[150px] sm:w-[200px] md:w-[300px] h-[150px] sm:h-[200px] md:h-[300px] rounded-full bg-purple-500/20 blur-[50px] sm:blur-[75px] md:blur-[100px] animate-pulse"
                        style={{ animationDelay: "2s" }}
                    ></div>
                    <div
                        className="absolute bottom-1/4 left-1/3 w-[175px] sm:w-[250px] md:w-[350px] h-[175px] sm:h-[250px] md:h-[350px] rounded-full bg-pink-500/20 blur-[50px] sm:blur-[75px] md:blur-[100px] animate-pulse"
                        style={{ animationDelay: "1.5s" }}
                    ></div>

                    {/* Hexagonal grid background */}
                    <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
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
                                    stroke="#3b82f6"
                                    strokeWidth="0.5"
                                />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#hexagons-events)" />
                    </svg>

                    {/* Radial gradient overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,rgba(0,0,0,0.8)_70%)]"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative text-center mb-8 sm:mb-12 md:mb-16 flex flex-col items-center gap-4 sm:gap-6 px-4 md:px-8 py-4 sm:py-6 md:py-10 w-full max-w-3xl mx-auto"
                >
                    <div className="relative flex items-center justify-center py-4 w-full">
                        <div className="absolute -left-8 sm:-left-12 md:-left-20 top-8 h-[30px] sm:h-[40px] md:h-[60px] w-[2px] md:w-[3px] bg-[#3defe9] rounded-full hidden sm:block"></div>
                        <div className="absolute -right-8 sm:-right-12 md:-right-20 top-8 h-[30px] sm:h-[40px] md:h-[60px] w-[2px] md:w-[3px] bg-[#3defe9] rounded-full hidden sm:block"></div>

                        <h2 className="text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold mt-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3defe9] via-[#3defe9] to-[#80e3ff] font-display drop-shadow-[0_0_10px_rgba(61,239,233,0.8)] relative px-3 md:px-4">
                            <span className="relative">
                                <span className="absolute -left-4 sm:-left-6 md:-left-8 -top-2 md:-top-3 text-[#3defe9] text-base sm:text-lg md:text-2xl">⌜</span>
                                <span className="absolute -right-4 sm:-right-6 md:-right-8 -top-2 md:-top-3 text-[#3defe9] text-base sm:text-lg md:text-2xl">⌝</span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3defe9] via-[#3defe9] to-[#80e3ff]">Upcoming Events</span>
                                <span className="absolute -left-4 sm:-left-6 md:-left-8 -bottom-2 md:-bottom-3 text-[#3defe9] text-base sm:text-lg md:text-2xl">⌞</span>
                                <span className="absolute -right-4 sm:-right-6 md:-right-8 -bottom-2 md:-bottom-3 text-[#3defe9] text-base sm:text-lg md:text-2xl">⌟</span>
                            </span>
                        </h2>
                    </div>
                </motion.div>

                {/* Featured Event */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-8 sm:mb-12 md:mb-16"
                >
                    <div className="relative">
                        <Card
                            className={cn(
                                "relative overflow-hidden p-4 sm:p-6 md:p-8 lg:p-10",
                                "bg-gradient-to-br from-[#000b18] to-black",
                                "border-2 border-[#00072caa] rounded-xl backdrop-blur-sm"
                            )}
                        >
                            {/* Inner glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 relative z-10">
                                {/* Event details */}
                                <div>
                                    <div className="flex items-center mb-4 sm:mb-6">
                                        <div className="p-2 sm:p-3 mr-2 sm:mr-3 h-[40px] sm:h-[50px] w-[40px] sm:w-[50px] border-2 border-[#3defe9] flex justify-center items-center rounded-md">
                                            <Flame className="h-5 sm:h-6 w-5 sm:w-6 text-[#3defe9]" />
                                        </div>
                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3defe9] via-[#3defe9] to-[#80e3ff] font-display">Tech Verse</h3>
                                    </div>

                                    <p className="text-sm sm:text-base text-blue-100/80 mb-6 sm:mb-8">
                                        🚀 Tech Verse – Get Industry-Ready with Experts! 🎤

                                        Join an exclusive offline session to learn from top tech professionals in Web3, Software Engineering, Product Management, and Developer Relations.

                                        Gain real-world insights, essential skills, and valuable connections to excel in the tech industry.

                                        🔥 Part of Hello World Hacks – 30 Days, Infinite Possibilities! 🔥
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 sm:h-5 w-4 sm:w-5 text-[#3defe9] mr-2 sm:mr-3" />
                                            <span className="text-sm sm:text-base text-blue-100">April 4, 2025</span>
                                        </div>

                                        <div className="flex items-center">
                                            <Clock className="h-4 sm:h-5 w-4 sm:w-5 text-[#3defe9] mr-2 sm:mr-3" />
                                            <span className="text-sm sm:text-base text-blue-100">10:00 AM - 5:00 PM</span>
                                        </div>

                                        <div className="flex items-center col-span-1 sm:col-span-2 mt-1 sm:mt-2">
                                            <MapPin className="h-4 sm:h-5 w-4 sm:w-5 text-[#3defe9] mr-2 sm:mr-3 flex-shrink-0" />
                                            <span className="text-sm sm:text-base text-white">
                                                Dr. Jaya Deb Roy Auditorium, RCC Institute of Information Technology
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-3 sm:gap-4">
                                        <Button
                                            size="lg"
                                            className="rounded-full bg-gradient-to-r from-[#3dc8ef] via-[#3dbaef] to-[#80e3ff] 
                                            hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 
                                            group relative overflow-hidden transition-all duration-300 ease-in-out
                                            text-sm sm:text-base"
                                        >
                                            <Link target="_blank" href="https://lu.ma/7gntecu7">
                                                <span className="relative z-10 flex items-center">
                                                    Register Now
                                                    <ChevronRight className="ml-1 sm:ml-2 h-3 sm:h-4 w-3 sm:w-4 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </Link>

                                            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-cyan-600 
                                                opacity-0 group-hover:opacity-100 transition-opacity"></span>

                                            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/60 via-purple-600/60 to-cyan-500/60 
                                                blur-xl opacity-0 group-hover:opacity-70 transition-opacity"></span>
                                        </Button>

                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button
                                                size="lg"
                                                variant="outline"
                                                className="text-white border-none rounded-full bg-none bg-transparent
                                                group relative overflow-hidden transition-all duration-300 ease-in-out 
                                                hover:bg-transparent hover:text-white text-sm sm:text-base"
                                            >
                                                <Link href="/events" passHref>
                                                    <span className="relative z-10 flex items-center">
                                                        Learn More
                                                        <motion.div
                                                            animate={{ rotate: [0, 15, 0] }}
                                                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                                                        >
                                                            <ExternalLink className="ml-1 sm:ml-2 h-3 sm:h-4 w-3 sm:w-4 group-hover:rotate-12 transition-transform" />
                                                        </motion.div>
                                                    </span>
                                                </Link>
                                            </Button>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Event visual - centered */}
                                <div className="relative flex justify-center items-center mt-6 lg:mt-0">
                                    <div className="relative group">
                                        {/* Glow effect behind image */}
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>

                                        <img
                                            src="https://i.postimg.cc/3JX0rXcK/Whats-App-Image-2025-03-31-at-19-14-52-27f70c0a.jpg"
                                            alt="Ignitathon event"
                                            className="w-full h-auto sm:h-[280px] md:h-[330px] rounded-md object-cover object-center relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-0 right-0 w-8 sm:w-12 h-8 sm:h-12 rotate-180">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <motion.path
                                        d="M1 1V16M1 1H16"
                                        stroke="url(#cornerGradient)"
                                        strokeWidth="2"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1 }}
                                    />
                                </svg>
                            </div>
                        </Card>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}