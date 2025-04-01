"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Clock, ChevronRight, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function UpcomingEvent() {
    return (
        <section id="events" className="relative py-24 px-6 bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Background elements with multicolored blurry circles */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="absolute inset-0 -z-10 overflow-hidden"
                >
                    {/* Multicolored blurry circles */}
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[100px] animate-pulse"></div>
                    <div
                        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/20 blur-[100px] animate-pulse"
                        style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-purple-500/20 blur-[100px] animate-pulse"
                        style={{ animationDelay: "2s" }}
                    ></div>
                    <div
                        className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] rounded-full bg-pink-500/20 blur-[100px] animate-pulse"
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
                    className="relative text-center mb-16"
                >

                    <h2 className="h-[60px] text-3xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3defe9] via-[#3defe9] to-[#80e3ff] font-display">
                        Upcoming Events
                    </h2>
                </motion.div>

                {/* Featured Event */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="relative">
                        <div className="flex items-center gap-2 mb-3">
                            <Calendar className="w-5 h-5 text-[3defe9]" />
                            <div className="text-xl bg-clip-text font-bold bg-gradient-to-br from-[#3defe9] via-[#3defe9] to-[#80e3ff] text-transparent shadow-2xl shadow-[#80e3ff]">
                                Featured Event
                            </div>
                        </div>

                        <Card
                            className={cn(
                                "relative overflow-hidden p-8 md:p-10",
                                "bg-gradient-to-br from-[#000b18] to-black ",
                                "border-2 border-[#00072caa] rounded-[5px] backdrop-blur-sm",
                            )}
                        >
                            {/* Inner glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 relative z-10">
                                {/* Event details */}
                                <div>
                                    <div className="flex items-center mb-6">
                                        <div className="p-3 mr-3 h-[50px] w-[50px] border-2 border-[#002c5f7b] flex justify-center items-center rounded-md ">
                                            <Flame className="h-6 w-6 text-blue-400" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-[#008cff] font-display">Tech Verse</h3>
                                    </div>

                                    <p className="text-blue-100/80 mb-8">
                                        🚀 Tech Verse – Get Industry-Ready with Experts! 🎤

                                        Join an exclusive offline session to learn from top tech professionals in Web3, Software Engineering, Product Management, and Developer Relations.

                                        Gain real-world insights, essential skills, and valuable connections to excel in the tech industry.

                                        🔥 Part of Hello World Hacks – 30 Days, Infinite Possibilities! 🔥
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                        <div className="flex items-center">
                                            <Calendar className="h-5 w-5 text-blue-400 mr-3" />
                                            <span className="text-blue-100">April 4, 2025</span>
                                        </div>

                                        <div className="flex items-center">
                                            <Clock className="h-5 w-5 text-blue-400 mr-3" />
                                            <span className="text-blue-100">10:00 AM - 5:00 PM</span>
                                        </div>

                                        <div className="flex items-center w-[800px] mt-2 ">
                                            <MapPin className="h-5 w-5 text-blue-400 mr-3" />
                                            <span className="text-white ">Dr. Jaya Deb Roy Auditorium, RCC Institute of Information Technology
                                            </span>
                                        </div>

                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        <Button
                                            size="lg"
                                            className="rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white 
                                            hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 
                                            group relative overflow-hidden transition-all duration-300 ease-in-out"
                                        >
                                            <Link target="_blank" href="https://lu.ma/7gntecu7">
                                                <span className="relative z-10 flex items-center">
                                                    Register Now
                                                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </Link>

                                            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-cyan-600 
                                                opacity-0 group-hover:opacity-100 transition-opacity"></span>

                                            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/60 via-purple-600/60 to-cyan-500/60 
                                                blur-xl opacity-0 group-hover:opacity-70 transition-opacity"></span>
                                        </Button>

                                        <Button
                                            size="lg"
                                            className="bg-transparent hover:group relative overflow-hidden transition-all duration-300 ease-in-out hover:bg-transparent"
                                        >
                                            <Link target="_blank" href="https://lu.ma/7gntecu7">
                                                <span className="relative z-10 flex items-center">
                                                    Learn More
                                                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </Link>

                                            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-cyan-600 
                                                opacity-0 group-hover:opacity-100 transition-opacity"></span>

                                            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/60 via-purple-600/60 to-cyan-500/60 
                                                blur-xl opacity-0 group-hover:opacity-70 transition-opacity"></span>
                                        </Button>

                                        

                                    </div>
                                </div>

                                {/* Event visual - centered */}
                                <div className="relative flex justify-center items-center">
                                    <div className="relative group">
                                        {/* Glow effect behind image */}
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>

                                        <img
                                            src="https://i.postimg.cc/3JX0rXcK/Whats-App-Image-2025-03-31-at-19-14-52-27f70c0a.jpg"
                                            alt="Ignitathon event"
                                            className="h-[330px] w-auto rounded-md object-center relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-0 right-0 w-12 h-12 rotate-180">
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

