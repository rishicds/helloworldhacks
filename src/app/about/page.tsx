"use client"
import { useState, useEffect, useRef } from "react"
import { Shield, Radio, Zap, AlertTriangle, Activity } from "lucide-react"

const TeamPage = () => {
  const [activeTeam, setActiveTeam] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Animation effect when component mounts
  useEffect(() => {
    // Simulate loading sequence
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
      setActiveTeam(0)
    }
  }, [])

  // Play SPD alert sound on team change
  const playAlertSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((e) => console.log("Audio play prevented:", e))
    }
  }

  const handleTeamChange = (index: number) => {
    setActiveTeam(index)
    playAlertSound()
  }

  const teams = [
    {
      name: "S.P.D. COMMANDERS",
      description: "The strategic leaders who guide our missions",
      color: "bg-red-600",
      borderColor: "border-red-600",
      textColor: "text-red-500",
      icon: <Shield className="w-6 h-6" />,
      members: [
        { name: "Alex Wright", role: "Lead Organizer", image: "/placeholder.svg?height=400&width=300" },
        { name: "Sarah Chen", role: "Lead Organizer", image: "/placeholder.svg?height=400&width=300" },
      ],
    },
    {
      name: "A-SQUAD RANGERS",
      description: "The elite co-organizers who coordinate our operations",
      color: "bg-blue-600",
      borderColor: "border-blue-600",
      textColor: "text-blue-500",
      icon: <Radio className="w-6 h-6" />,
      members: [
        { name: "Priya Patel", role: "Co-Organizer", image: "/placeholder.svg?height=400&width=300" },
        { name: "Jake Robinson", role: "Co-Organizer", image: "/placeholder.svg?height=400&width=300" },
        { name: "Mei Lin", role: "Co-Organizer", image: "/placeholder.svg?height=400&width=300" },
        { name: "Carlos Mendez", role: "Co-Organizer", image: "/placeholder.svg?height=400&width=300" },
      ],
    },
    {
      name: "DELTA SQUAD",
      description: "The technical geniuses behind our digital infrastructure",
      color: "bg-green-600",
      borderColor: "border-green-600",
      textColor: "text-green-500",
      icon: <Zap className="w-6 h-6" />,
      members: [
        { name: "Raj Sharma", role: "Tech Lead", image: "/placeholder.svg?height=400&width=300" },
        { name: "Emma Wilson", role: "Full-Stack Developer", image: "/placeholder.svg?height=400&width=300" },
      ],
    },
    {
      name: "OMEGA RANGERS",
      description: "The creative visual artists of our community",
      color: "bg-yellow-500",
      borderColor: "border-yellow-500",
      textColor: "text-yellow-500",
      icon: <Activity className="w-6 h-6" />,
      members: [
        { name: "Olivia Lee", role: "Graphics Lead", image: "/placeholder.svg?height=400&width=300" },
        { name: "Daniel Wong", role: "UI/UX Designer", image: "/placeholder.svg?height=400&width=300" },
        { name: "Zoe Thompson", role: "Illustrator", image: "/placeholder.svg?height=400&width=300" },
        { name: "Ethan Clark", role: "Motion Designer", image: "/placeholder.svg?height=400&width=300" },
      ],
    },
    {
      name: "SHADOW RANGERS",
      description: "The communication specialists who amplify our message",
      color: "bg-purple-600",
      borderColor: "border-purple-600",
      textColor: "text-purple-500",
      icon: <AlertTriangle className="w-6 h-6" />,
      members: [
        { name: "Ava Martinez", role: "PR Lead", image: "/placeholder.svg?height=400&width=300" },
        { name: "Benjamin Foster", role: "Social Media Manager", image: "/placeholder.svg?height=400&width=300" },
        { name: "Isabella Brown", role: "Content Creator", image: "/placeholder.svg?height=400&width=300" },
        { name: "Lucas White", role: "Community Manager", image: "/placeholder.svg?height=400&width=300" },
      ],
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-75 animate-ping"></div>
          <div
            className="absolute inset-0 rounded-full border-4 border-red-500 opacity-75 animate-ping"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-3xl font-bold">SPD</div>
          </div>
        </div>
        <div className="mt-8 text-xl font-mono">INITIALIZING SPD DATABASE...</div>
        <div className="mt-4 w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 animate-[loading_2s_ease-in-out]"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-4 relative overflow-hidden">
      {/* Audio element for SPD alert sound */}
      <audio ref={audioRef} preload="auto">
        <source src="https://www.soundjay.com/buttons/sounds/button-35.mp3" type="audio/mpeg" />
      </audio>

      {/* SPD Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')]"></div>

        {/* Circular tech elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border-4 border-blue-500 opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full border-4 border-red-500 opacity-10 animate-pulse delay-300"></div>

        {/* Animated scanner lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-blue-500/30 animate-[scanline_4s_linear_infinite]"></div>
          <div className="absolute top-0 bottom-0 left-0 w-px bg-red-500/30 animate-[scanline-vertical_6s_linear_infinite]"></div>
        </div>

        {/* SPD Badge */}
        <div className="absolute top-10 right-10 w-32 h-32 opacity-20 animate-pulse">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 border-4 border-white rounded-full"></div>
            <div className="absolute inset-2 border-2 border-blue-500 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold">S.P.D.</span>
            </div>
          </div>
        </div>

        {/* Animated data streams */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"
              style={{
                top: `${Math.random() * 100}%`,
                left: 0,
                right: 0,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 transform transition-all duration-1000 hover:scale-105">
          <div className="inline-block relative">
            <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-500 to-yellow-500 animate-gradient-x">
              HELLOWORLD HACKS TEAM
            </h1>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-pink-500 to-yellow-500 animate-gradient-x"></div>
          </div>
          <p className="text-xl text-gray-300 mt-6">Meet the squad that protects and serves our hackathon!</p>

          {/* SPD Badge/Logo - Enhanced */}
          <div className="mt-8 inline-block relative group">
            <div className="w-28 h-28 rounded-full border-4 border-blue-500 flex items-center justify-center bg-gray-800 shadow-lg shadow-blue-500/20 relative overflow-hidden group-hover:scale-110 transition-all duration-300">
              <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-3xl font-bold">SPD</span>
                <span className="text-xs mt-1">EARTH DIVISION</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-red-500 to-transparent"></div>

              {/* Rotating border effect */}
              <div className="absolute inset-0 border-2 border-dashed border-blue-300/50 rounded-full animate-spin-slow"></div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-500 rounded-full animate-ping opacity-75"></div>

            {/* Radar ping effect */}
            <div className="absolute inset-0 rounded-full border border-blue-500/50 animate-[radar-ping_3s_ease-out_infinite]"></div>
          </div>
        </div>

        {/* Team Tabs - Enhanced with icons and animations */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {teams.map((team, index) => (
            <button
              key={`tab-${index}`}
              onClick={() => handleTeamChange(index)}
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 border-b-4 flex items-center gap-2 ${
                activeTeam === index
                  ? `${team.borderColor} ${team.textColor} bg-gray-800 shadow-lg shadow-${team.textColor}/20`
                  : "border-gray-600 text-gray-400 bg-gray-800/50"
              }`}
            >
              <span className={`${activeTeam === index ? team.textColor : "text-gray-400"}`}>{team.icon}</span>
              {team.name}
              {activeTeam === index && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent"></span>
              )}
            </button>
          ))}
        </div>

        {/* Teams Content - Enhanced with better animations and card layout */}
        {teams.map((team, index) => (
          <div
            key={`team-${index}`}
            className={`transition-all duration-700 transform ${
              activeTeam === index ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full absolute -z-10"
            } mb-24`}
          >
            <div className="flex items-center mb-8">
              <div className={`w-2 h-16 ${team.color} mr-4 animate-pulse`}></div>
              <div>
                <h2 className={`text-3xl font-bold mb-1 ${team.textColor} flex items-center gap-2`}>
                  {team.icon}
                  {team.name}
                </h2>
                <p className="text-gray-400">{team.description}</p>
              </div>
              {/* SPD-style emblem - Enhanced */}
              <div className={`ml-auto border-2 ${team.borderColor} rounded-full p-2 animate-spin-slow relative group`}>
                <div className="w-12 h-12 flex items-center justify-center">
                  <span className="text-xs font-bold">SPD</span>
                  <span className="absolute inset-0 border border-dashed rounded-full opacity-50"></span>
                </div>
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-30"
                  style={{ animationDuration: "3s" }}
                ></div>
              </div>
            </div>

            {/* Enhanced card grid with SPD-style layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.members.map((member, memberIndex) => (
                <div
                  key={memberIndex}
                  className={`rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl group`}
                  style={{
                    background: `linear-gradient(135deg, #1a202c 0%, #2d3748 100%)`,
                    boxShadow: `0 10px 20px rgba(0,0,0,0.3)`,
                  }}
                >
                  <div className="relative">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-64 object-cover object-center"
                    />

                    {/* SPD ID card effect - Enhanced */}
                    <div className="absolute top-0 left-0 bg-gray-900/80 px-3 py-1 text-xs font-mono flex items-center gap-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      SPD ID: {Math.floor(Math.random() * 9000) + 1000}
                    </div>

                    {/* Animated border */}
                    <div className={`absolute bottom-0 left-0 right-0 ${team.color} h-1`}>
                      <div className="absolute inset-0 bg-white opacity-30 animate-[scan_2s_ease-in-out_infinite]"></div>
                    </div>

                    {/* SPD scanner overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40"></div>
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-px bg-blue-500/50 animate-[scanline_2s_linear_infinite]"></div>
                    </div>

                    {/* Morpher effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-70 flex items-center justify-center transition-opacity duration-300">
                      <div
                        className={`w-12 h-12 ${team.color} rounded-full opacity-0 group-hover:opacity-100 animate-ping`}
                      ></div>
                    </div>

                    {/* SPD badge overlay */}
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[8px] font-bold">SPD</span>
                    </div>
                  </div>

                  <div className={`p-6 border-l-4 relative group ${team.borderColor}`}>
                    {/* Tech scanner effect */}
                    <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-75 animate-scanner"></div>

                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-gray-300">{member.role}</p>

                    {/* SPD-style tech details - Enhanced */}
                    <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-500 font-mono">
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        STATUS: ACTIVE
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>CLEARANCE: LEVEL {Math.floor(Math.random() * 5) + 1}</span>
                        <span className="text-blue-400 animate-pulse">[AUTHORIZED]</span>
                      </div>
                      <div className="mt-1 text-[10px] opacity-50">
                        LOCATION: SECTOR {Math.floor(Math.random() * 20) + 1}-
                        {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
                      </div>
                    </div>

                    {/* Animated tech button */}
                    <button
                      className={`mt-3 px-3 py-1 text-xs ${team.textColor} border border-current rounded-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-800`}
                    >
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                      VIEW PROFILE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Control panel footer - Enhanced */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 border-t border-gray-700 py-3 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="text-sm text-gray-400 flex items-center gap-2">
            <span className="text-green-500 animate-pulse">●</span>
            <span>SYSTEM ONLINE</span>
            <span className="text-xs opacity-50 ml-2">[{new Date().toLocaleTimeString()}]</span>
          </div>

          <div className="flex space-x-3">
            {teams.map((team, index) => (
              <button key={`indicator-${index}`} onClick={() => handleTeamChange(index)} className={`relative group`}>
                <div
                  className={`w-3 h-3 rounded-full ${activeTeam === index ? team.color : "bg-gray-600"} transition-colors duration-300`}
                ></div>
                {activeTeam === index && (
                  <div className={`absolute -inset-1 rounded-full ${team.color} opacity-30 animate-ping`}></div>
                )}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {team.name}
                </span>
              </button>
            ))}
          </div>

          <div className="text-sm text-gray-400 font-mono flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-[blink_1.5s_ease-in-out_infinite]"></span>
            SPD COMMAND • EARTH DIVISION
          </div>
        </div>
      </div>

      {/* Add CSS for custom animations */}
      <style jsx>{`
        @keyframes scanner {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes scanline-vertical {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        @keyframes scan {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes radar-ping {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-scanner {
          animation: scanner 3s infinite;
        }
        .animate-spin-slow {
          animation: spin 15s linear infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  )
}

export default TeamPage

