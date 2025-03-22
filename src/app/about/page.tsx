"use client"
import { useState, useEffect, useRef } from "react"
import { Shield, Radio, Zap, AlertTriangle, Activity, Github, Instagram, Linkedin } from "lucide-react"

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
        { 
          name: "Sagnik Datta", 
          role: "Lead Organizer", 
          image: "https://i.postimg.cc/NM0WQZ6S/sagnikda-organiser.jpg",
          social: {
            github: "sagnik-datta-02",
            linkedin: "sagnik-datta-96bb8a265",
          }
        },
        { 
          name: "Adrita Chakraborty", 
          role: "Lead Organizer", 
          image: "https://i.postimg.cc/y8cK5qjT/adritadi-organiser.jpg",
          social: {
            github: "ADRITA-art",
            linkedin: "adrita-chakraborty-ba9b2a24b",
            instagram: ""
          }
        },
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
        { 
          name: "Swapnendu Banerjee", 
          role: "Co-Organizer", 
          image: "https://i.postimg.cc/wvfYJ9x9/swapnenduda-coorganiser.jpg",
          social: {
            github: "Swapnendu003",
            linkedin: "swapnendu-banerjee-36ba06219",
            instagram: "swapno_banerjee/profilecard/?igsh=MWQxemFodG1kdjMwNA=="
          }
        },
        { 
          name: "Moyukh Chowdhury", 
          role: "Co-Organizer", 
          image: "https://i.postimg.cc/qRZWqQQR/moyukhda-coorganiser.jpg",
          social: {
            github: "Moyukh999",
            linkedin: "moyukh-chowdhury-07b03224b",
            instagram: "moyukh_chowdhury?igsh=bjMyZGNuanlyd3Bh"
          }
        },
        { 
          name: "Swastika Bose", 
          role: "Co-Organizer", 
          image: "https://i.postimg.cc/fy14250F/swastikadi-coorganiser.jpg",
          social: {
            github: "swastika07bose",
            linkedin: "swastika-bose-25x25",
            instagram: "_swaastikab_?igsh=MXMzNjlhczJrYmo="
          }
        },
        { 
          name: "Hirak Sabui", 
          role: "Co-Organizer", 
          image: "https://i.postimg.cc/QNzrdNnb/hirakda-coorganiser.jpg",
          social: {
            github: "HirakSabui",
            linkedin: "hirak-sabui-5540b8257",
            instagram: "hirak_5603"
          }
        },

        { 
          name: "Debayudh Basu", 
          role: "Co-Organizer", 
          image: "https://i.postimg.cc/nrXbGNMB/debayudh-tech.jpg",
          social: {
            github: "debayudh07",
            linkedin: "debayudh-basu-5280562b2",
            instagram: "debayudh___?igsh=MWEwYXlucDNwMXh6aA=="
          }
        },
        { 
          name: "Rishi Paul", 
          role: "Co-Organizer", 
          image: "https://i.postimg.cc/y8mqjm6Q/rishi-tech.png",
          social: {
            github: "rishicds",
            linkedin: "rishi-paul04",
            instagram: "goodbai_17"
          }
        },
        { 
          name: "Smaranika Porel", 
          role: "Co-Organizer", 
          image: "https://i.postimg.cc/1XdPxsbv/Smaranika-pr.jpg",
          social: {
            github: "Smaranika2005",
            linkedin: "smaranika-porel-43a11b291",
            instagram: "smaranika.porel/profilecard/?igsh=MXNjdWhoanNjNHR4eQ=="
          }
        },
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
        { 
          name: "Rishi Paul", 
          role: "Tech Lead", 
          image: "https://i.postimg.cc/y8mqjm6Q/rishi-tech.png",
          social: {
            github: "rishicds",
            linkedin: "rishi-paul04",
            instagram: "goodbai_17"
          }
        },
        { 
          name: "Debayudh Basu", 
          role: "Tech Vice Lead", 
          image: "https://i.postimg.cc/nrXbGNMB/debayudh-tech.jpg",
          social: {
            github: "debayudh07",
            linkedin: "debayudh-basu-5280562b2",
            instagram: "debayudh___?igsh=MWEwYXlucDNwMXh6aA=="
          }
        },
        
        { 
          name: "Pragya Singh", 
          role: "Tech Team Member", 
          image: "https://i.postimg.cc/0yRR7WvK/pragya-tech.jpg",
          social: {
            github: "Pragya79645",
            linkedin: "pragya-singh-71884b30b",
            instagram: "pragyasingh1340"
          }
        },

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
        { 
          name: "Soumi Khanra", 
          role: "Graphics Team", 
          image: "https://i.postimg.cc/J4yMNHBv/soumi-graphics.jpg",
          social: {
            github: "Soumi-10",
            linkedin: "soumi-khanra-b1b723325",
            instagram: "soumi08_?igsh=MXN2d2hxN3I4M21vdA=="
          }
        },
        { 
          name: "Anirban Kar", 
          role: "Graphics Team", 
          image: "https://i.postimg.cc/yNKKCfrC/anirban-graphics.webp",
          social: {
            github: "",
            linkedin: "anirban-kar-3100b2250/",
            instagram: "anirbank12/"
          }
        },


        { 
          name: "Ankur Bag", 
          role: "Graphics Team", 
          image: "https://i.postimg.cc/LsVp9zrY/ankur-graphics.jpg",
          social: {
            github: "ankur-bag",
            linkedin: "ankur-bag-017664314",
            instagram: "coxmos.co"
          }
        },
        { 
          name: "Tirtha Bhattacharya", 
          role: "Graphics Team", 
          image: "https://i.postimg.cc/J49mP7Nn/tirtha-graphics.jpg",
          social: {
            github: "Tirtha28",
            linkedin: "tirtha-bhattacharyya-372b26297?trk=contact-info",
            instagram: "tameyourbrain28?igsh=cHFlZHg3amtjcnFu"
          }
        },
        { 
          name: "Sreyashi Dubey", 
          role: "Graphics Team", 
          image: "https://i.postimg.cc/XN1nBkX9/Sreyashi-graphics.jpg",
          social: {
            github: "shrey0781",
            linkedin: " sreyashi-dubey-b4abaa315",
            instagram: "shrey_0781?igsh=MWx0ZHFydmszZmdobw=="
          }
        },
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
        { 
          name: "Smaranika Porel", 
          role: "PR and Social Media team", 
          image: "https://i.postimg.cc/1XdPxsbv/Smaranika-pr.jpg",
          social: {
            github: "Smaranika2005",
            linkedin: "smaranika-porel-43a11b291",
            instagram: "smaranika.porel/profilecard/?igsh=MXNjdWhoanNjNHR4eQ=="
          }
        },
        { 
          name: "Nirjhar Barma", 
          role: "PR and Social Media team", 
          image: "https://i.postimg.cc/kXtP6r0d/nirjhar-pr.jpg",
          social: {
            github: "0M4NU4L",
            linkedin: "nirjhar-barma-aa268a226/",
            instagram: "penguininsidethehoodie/"
          }
        },



        { 
          name: "Debjoy Sarkar", 
          role: "PR and Social Media team",  
          image: "https://i.postimg.cc/jjcp0R7y/debjoy-pr.jpg",
          social: {
            github: "Debjoy26",
            linkedin: "debjoysarkar",
            instagram: "pause_lemniscate"
          }
        },
        { 
          name: "Tanisa Dey", 
          role: "PR and Social Media team", 
          image: "https://i.postimg.cc/zBX1Vyrd/tanisha-pr.jpg",
          social: {
            github: "TanisaDey05 ",
            linkedin: "tanisa-dey-286769287",
            instagram: "xxtanisaxx?igsh=Z2J0NzQ3MWVnYmlo"
          }
        },
        { 
          name: "Meghna Santra", 
          role: "PR and Social Media team", 
          image: "https://i.postimg.cc/mrBv5Ptb/meghna-pr.jpg",
          social: {
            github: " ",
            linkedin: "meghna-santra-9a3623324",
            instagram: "_itz_meghnaa_?igsh=bm5mYmdweDc3OG16"
          }
        },
        
      ],
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32">
          <div className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-75 animate-ping"></div>
          <div
            className="absolute inset-0 rounded-full border-4 border-red-500 opacity-75 animate-ping"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl sm:text-3xl font-bold">SPD</div>
          </div>
        </div>
        <div className="mt-8 text-lg sm:text-xl font-mono">INITIALIZING SPD DATABASE...</div>
        <div className="mt-4 w-52 sm:w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 animate-[loading_2s_ease-in-out]"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 sm:py-16 px-2 sm:px-4 relative overflow-hidden">
      {/* Audio element for SPD alert sound */}
      <audio ref={audioRef} preload="auto">
        <source src="https://www.soundjay.com/buttons/sounds/button-35.mp3" type="audio/mpeg" />
      </audio>

      {/* SPD Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')]"></div>

        {/* Circular tech elements */}
        <div className="absolute top-1/4 left-1/4 w-32 sm:w-64 h-32 sm:h-64 rounded-full border-4 border-blue-500 opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 sm:w-96 h-48 sm:h-96 rounded-full border-4 border-red-500 opacity-10 animate-pulse delay-300"></div>

        {/* Animated scanner lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-blue-500/30 animate-[scanline_4s_linear_infinite]"></div>
          <div className="absolute top-0 bottom-0 left-0 w-px bg-red-500/30 animate-[scanline-vertical_6s_linear_infinite]"></div>
        </div>

        {/* SPD Badge */}
        <div className="absolute top-6 right-6 w-16 sm:w-32 h-16 sm:h-32 opacity-20 animate-pulse">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 border-4 border-white rounded-full"></div>
            <div className="absolute inset-2 border-2 border-blue-500 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] sm:text-xs font-bold">S.P.D.</span>
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
        {/* Enhanced SPD-themed heading */}
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-block relative bg-gray-800/80 border-2 border-blue-600 rounded-lg px-4 sm:px-8 py-4 sm:py-6 shadow-lg shadow-blue-500/20 max-w-full sm:max-w-3xl mx-auto">

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              {/* Enhanced SPD Logo */}
              <div className="relative w-16 h-16 sm:w-24 sm:h-24">
                <div className="absolute inset-0 bg-blue-900 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-950 rounded-full border-2 border-blue-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-gray-900 flex flex-col items-center justify-center border border-blue-400">
                    <span className="text-xl sm:text-2xl font-bold text-white">SPD</span>
                    <div className="w-full h-px bg-blue-400 my-1"></div>
                    <span className="text-[6px] sm:text-[8px] text-blue-300">EARTH DIVISION</span>
                  </div>
                </div>
                <div className="absolute inset-0 border-4 border-red-600 rounded-full clip-path-badge"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center text-[6px] sm:text-[8px] font-bold animate-pulse">
                  E-1
                </div>
                <div className="absolute inset-0 rounded-full border border-blue-400 animate-[radar-ping_3s_ease-out_infinite]"></div>
              </div>

              <div className="text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <h1 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white uppercase font-mono border-b-2 border-red-500 pb-1">
                    SPD PERSONNEL
                  </h1>
                </div>
                <div className="mt-2 flex items-center gap-2 justify-center sm:justify-start">
                  <span className="text-[10px] sm:text-xs font-mono text-gray-400">FILE:</span>
                  <span className="text-xs sm:text-sm font-bold text-blue-300">HELLOWORLD-TEAM</span>
                  <span className="hidden sm:inline-block ml-auto text-[10px] sm:text-xs font-mono text-gray-400 animate-blink">ACTIVE</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 mt-2 font-mono border-l-2 border-blue-500 pl-2">
                  AUTHORIZED PERSONNEL ONLY
                </p>
              </div>
            </div>

            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-red-500 to-blue-600"></div>

            {/* Scanner line effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-px bg-blue-500/50 animate-[scanline_2s_linear_infinite]"></div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500"></div>
          </div>
        </div>

        {/* Team Tabs - Responsive scrollable container for mobile */}
        <div className="overflow-x-auto pb-4 mb-8 sm:mb-12">
          <div className="flex flex-nowrap justify-start sm:justify-center gap-2 min-w-max px-2">
            {teams.map((team, index) => (
              <button
                key={`tab-${index}`}
                onClick={() => handleTeamChange(index)}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-base font-bold transition-all duration-300 transform hover:scale-105 border-b-4 flex items-center gap-2 ${
                  activeTeam === index
                    ? `${team.borderColor} ${team.textColor} bg-gray-800 shadow-lg shadow-${team.textColor}/20`
                    : "border-gray-600 text-gray-400 bg-gray-800/50"
                }`}
              >
                <span className={`${activeTeam === index ? team.textColor : "text-gray-400"}`}>
                  {team.icon}
                </span>
                <span className="whitespace-nowrap">{team.name}</span>
                {activeTeam === index && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Teams Content - Enhanced with better responsive layout */}
        {teams.map((team, index) => (
          <div
            key={`team-${index}`}
            className={`transition-all duration-700 transform ${
              activeTeam === index ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full absolute -z-10"
            } mb-24`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8 gap-4 sm:gap-0">
              <div className={`w-2 h-8 sm:h-16 ${team.color} sm:mr-4`}></div>
              <div className="flex-1">
                <h2 className={`text-xl sm:text-3xl font-bold mb-1 ${team.textColor} flex items-center gap-2`}>
                  {team.icon}
                  <span className="line-clamp-1">{team.name}</span>
                </h2>
                <p className="text-gray-400 text-sm sm:text-base">{team.description}</p>
              </div>
              {/* SPD-style emblem - Enhanced */}
              <div className={`hidden sm:block ml-auto border-2 ${team.borderColor} rounded-full p-2 animate-spin-slow relative group`}>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {team.members.map((member, memberIndex) => (
                <div
                  key={memberIndex}
                  className={`rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl group`}
                  style={{
                    background: `linear-gradient(135deg, #1a202c 0%, #2d3748 100%)`,
                    boxShadow: `0 10px 20px rgba(0,0,0,0.3)`,
                  }}
                >
                 <div className="relative w-full pb-[75%]"> 
  <img
    src={member.image || "/placeholder.svg"}
    alt={member.name}
    className="absolute inset-0 w-full h-full object-cover object-center"
  />
 


                    {/* SPD ID card effect - Enhanced */}
                    <div className="absolute top-0 left-0 bg-gray-900/80 px-2 py-1 text-[10px] sm:text-xs font-mono flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse"></span>
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
                        className={`w-8 h-8 sm:w-12 sm:h-12 ${team.color} rounded-full opacity-0 group-hover:opacity-100 animate-ping`}
                      ></div>
                    </div>

                    {/* SPD badge overlay */}
                    <div className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[6px] sm:text-[8px] font-bold">SPD</span>
                    </div>
                  </div>

                  <div className={`p-2 sm:p-3 border-l-4 relative group ${team.borderColor}`}>
                    {/* Tech scanner effect */}
                    <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-75 animate-scanner"></div>

                    <h3 className="text-base sm:text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-gray-300 text-sm">{member.role}</p>

                    {/* Social Links */}
                    <div className="mt-2 flex items-center gap-2">
                      {member.social?.github && (
                        <a 
                          href={`https://github.com/${member.social.github}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`text-gray-400 hover:${team.textColor} transition-colors duration-300`}
                        >
                          <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                      )}
                      {member.social?.linkedin && (
                        <a 
                          href={`https://linkedin.com/in/${member.social.linkedin}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                        >
                          <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                      )}
                      {member.social?.instagram && (
                        <a 
                          href={`https://instagram.com/${member.social.instagram}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
                        >
                          <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                      )}
                    </div>

                    {/* Social links hover tooltip */}
                    <div className="mt-1 text-[8px] sm:text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Click icons to view profiles
                    </div>

                    {/* SPD-style tech details - Enhanced */}
                    <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-700 text-[10px] sm:text-xs text-gray-500 font-mono">
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        STATUS: ACTIVE
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>CLEARANCE: LEVEL {Math.floor(Math.random() * 5) + 1}</span>
                        <span className="text-blue-400 animate-pulse">[AUTHORIZED]</span>
                      </div>
                      <div className="mt-1 text-[8px] sm:text-[10px] opacity-50">
                        LOCATION: SECTOR {Math.floor(Math.random() * 20) + 1}-
                        {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
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
        .clip-path-badge {
          clip-path: polygon(0 0, 100% 0, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0 75%);
        }
        .animate-blink {
          animation: blink 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default TeamPage