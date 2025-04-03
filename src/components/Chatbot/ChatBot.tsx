"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Sparkles, Send, X, Music, Users, ClipboardCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { hackathonInfo, pageSections } from "./hackathon-info"

export function AstroBotChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: `Hi there! I'm AstroBot, your ${hackathonInfo.name} assistant. How can I help you today?`,
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 100)
    }
  }, [isOpen])

  // Function to navigate to sections
  const navigateToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      return `Navigated to the ${sectionId.replace("-", " ")} section.`
    }
    return `Sorry, I couldn't find the ${sectionId.replace("-", " ")} section.`
  }

  // Function to play music
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
        return "Music paused."
      } else {
        audioRef.current.play()
        setIsPlaying(true)
        return "Playing the hackathon theme music!"
      }
    }
    return "Sorry, the music player isn't available right now."
  }

  // Function to process user message using Gemini AI
  const processMessageWithGemini = async (userMessage: string) => {
    try {
      // First check for navigation and music commands directly
      // These don't need AI processing
      const lowerMessage = userMessage.toLowerCase()

      // Handle music requests
      if (lowerMessage.includes("play music") || lowerMessage.includes("start music")) {
        return toggleMusic()
      }

      if (lowerMessage.includes("stop music") || lowerMessage.includes("pause music")) {
        if (isPlaying) {
          return toggleMusic()
        }
        return "The music isn't currently playing."
      }

      // Handle navigation requests
      if (lowerMessage.includes("navigate") || lowerMessage.includes("go to") || lowerMessage.includes("show me")||lowerMessage.includes("what is") || lowerMessage.includes("what are")){
        for (const section of pageSections) {
          if (lowerMessage.includes(section.id) || lowerMessage.includes(section.name.toLowerCase())) {
            return navigateToSection(section.id)
          }
        }
      }

      // For other queries, use Gemini API
      const systemPrompt = `
You are AstroBot, a helpful assistant for the Hello World Hacks 2025. 
You can ONLY answer questions using the following information about the hackathon:

HACKATHON INFO:
Name: ${hackathonInfo.name}
Dates: ${hackathonInfo.dates}
Location: ${hackathonInfo.location}
Registration: ${hackathonInfo.registration}

ORGANIZERS:
${hackathonInfo.organizers.map((org) => `- ${org.name} (${org.role})`).join("\n")}

TEAM MEMBERS:
${hackathonInfo.team.map((member) => `- ${member.name} (${member.role})`).join("\n")}



TRACKS:
${hackathonInfo.tracks.map((track) => `- ${track.name}: ${track.description}`).join("\n")}

PRIZES:
${hackathonInfo.prizes.map((prize) => `- ${prize.category}: ${prize.reward}`).join("\n")}

IMPORTANT RULES:
1. If asked about anything not included in the information above, respond with "I don't have that information. I can only provide details about the Astro Hackathon 2025 schedule, team, tracks, and prizes."
2. Keep your answers brief and focused on the hackathon information.
3. Do not make up any information.
4. Do not respond to harmful, unethical, or offensive requests.
5. Ask users to register on Devfolio on this link "https://hello-world-hacks.devfolio.co/"

Respond to: "${userMessage}"
`
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: systemPrompt }],
              },
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 500,
            },
          }),
        },
      )

      const data = await response.json()

      if (data.candidates && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
        return data.candidates[0].content.parts[0].text
      } else {
        // Fallback response if there's an issue with the API
        return "I'm having trouble connecting to my knowledge base. Please try asking about the hackathon schedule, team, or other basic information."
      }
    } catch (error) {
      console.error("Error processing with Gemini:", error)
      // Fallback to basic response system if Gemini fails
      return fallbackProcessMessage(userMessage)
    }
  }

  // Fallback message processor if Gemini fails
  const fallbackProcessMessage = (userMessage: string) => {
    // Convert to lowercase for easier matching
    const message = userMessage.toLowerCase()

    // Check for information about the hackathon
    if (message.includes("when") || message.includes("date") || message.includes("time")) {
      return `${hackathonInfo.name} will take place on ${hackathonInfo.dates} at ${hackathonInfo.location}. Registration is ${hackathonInfo.registration}.`
    }

   

    // Check for organizer information
    if (message.includes("organizer") || message.includes("who is organizing")) {
      const organizers = hackathonInfo.organizers.map((org) => `${org.name} (${org.role})`).join(" and ")
      return `The hackathon is organized by ${organizers}.`
    }

    // Check for team information
    if (message.includes("team") || message.includes("who is running")) {
      const team = hackathonInfo.team.map((member) => `${member.name} (${member.role})`).join(", ")
      return `The team members are: ${team}.`
    }

    // Default response
    return "I can help you with information about the hackathon schedule, team, tracks, prizes, and more. What would you like to know?"
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = inputValue.trim()
    setMessages([...messages, { type: "user", content: userMessage }])
    setInputValue("")
    setIsTyping(true)

    try {
      // Process with Gemini AI
      const botResponse = await processMessageWithGemini(userMessage)
      setMessages((prev) => [...prev, { type: "bot", content: botResponse }])
    } catch (error) {
      console.error("Error in chat processing:", error)
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "I'm having some trouble connecting to my knowledge base. Please try again in a moment.",
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  // Handle quick action buttons
  const handleQuickAction = async (action: string) => {
    switch (action) {
      case "music":
        const response = toggleMusic()
        setMessages((prev) => [...prev, { type: "user", content: "Play music" }, { type: "bot", content: response }])
        break
        case "register":
          setMessages((prev) => [
            ...prev,
            { type: "user", content: "How do I register?" },
            {
              type: "bot",
              content: `You can register for ${hackathonInfo.name} at hello-world-hacks.devfolio.co`,
            },
          ])
          break
          case "team":
  window.location.href = "/about"; // Navigate directly to the /about page
  break;
      default:
        break
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat popup */}
      {isOpen && (
        <div className="astro-chat-container mb-4 w-[280px] xs:w-[320px] sm:w-[350px] overflow-hidden rounded-xl border border-purple-500 bg-black shadow-[0_0_15px_rgba(149,76,233,0.5)] backdrop-blur-sm">
          {/* Chat header */}
          <div className="flex items-center justify-between border-b border-purple-500/30 bg-black/80 px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-purple-500 bg-black p-1">
                <img src="/astro.png" alt="AstroBot" className="h-full w-full object-cover" />
                <div className="absolute inset-0 rounded-full border border-purple-300/20 shadow-[inset_0_0_10px_rgba(149,76,233,0.3)]"></div>
              </div>
              <div>
                <h3 className="flex items-center gap-1 text-sm font-bold text-white">
                  AstroBot <Sparkles className="h-3 w-3 text-purple-400" />
                </h3>
                <p className="text-[10px] text-purple-300">Online</p>
              </div>
            </div>
            <Button
              onClick={toggleChat}
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full text-purple-300 hover:bg-purple-950 hover:text-purple-200"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Quick action buttons */}
          <div className="flex flex-col gap-2 border-b border-purple-500/30 bg-black/60 p-3">
            <h4 className="text-center text-xs font-bold uppercase tracking-wider text-purple-300">
              <span className="relative">
                <span className="relative z-10">Quick Actions</span>
                <span className="absolute bottom-0 left-0 right-0 z-0 h-[6px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></span>
              </span>
            </h4>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleQuickAction("music")}
                className={cn(
                  "group relative flex flex-col items-center justify-center overflow-hidden rounded-lg border border-purple-500/50 bg-gradient-to-b from-purple-900/20 to-black p-2 transition-all hover:scale-[1.02] hover:border-purple-400",
                  isPlaying && "from-purple-700/30 to-purple-900/20 border-purple-400",
                )}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(149,76,233,0.15),transparent_70%)]"></div>
                <div
                  className={cn(
                    "relative mb-1 flex h-8 w-8 items-center justify-center rounded-full border border-purple-500/50 bg-black transition-all group-hover:border-purple-400",
                    isPlaying && "border-purple-400 bg-purple-900/30",
                  )}
                >
                  <Music
                    className={cn(
                      "h-4 w-4 text-purple-400 transition-all group-hover:text-purple-300",
                      isPlaying && "text-purple-300",
                    )}
                  />
                  {isPlaying && (
                    <div className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-purple-600 text-[8px] text-white">
                      <span className="animate-pulse">●</span>
                    </div>
                  )}
                </div>
                <span className="text-center text-[10px] font-medium text-purple-300 group-hover:text-purple-200">
                  {isPlaying ? "Pause" : "Play"}
                </span>
              </button>

              <button
                onClick={() => handleQuickAction("register")}
                className="group relative flex flex-col items-center justify-center overflow-hidden rounded-lg border border-purple-500/50 bg-gradient-to-b from-purple-900/20 to-black p-2 transition-all hover:scale-[1.02] hover:border-purple-400"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(149,76,233,0.15),transparent_70%)]"></div>
                <div className="relative mb-1 flex h-8 w-8 items-center justify-center rounded-full border border-purple-500/50 bg-black transition-all group-hover:border-purple-400">
                  <ClipboardCheck className="h-4 w-4 text-purple-400 transition-all group-hover:text-purple-300" />
                </div>
                <span className="text-center text-[10px] font-medium text-purple-300 group-hover:text-purple-200">
                  Register
                </span>
              </button>

              <button
                onClick={() => handleQuickAction("team")}
                className="group relative flex flex-col items-center justify-center overflow-hidden rounded-lg border border-purple-500/50 bg-gradient-to-b from-purple-900/20 to-black p-2 transition-all hover:scale-[1.02] hover:border-purple-400"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(149,76,233,0.15),transparent_70%)]"></div>
                <div className="relative mb-1 flex h-8 w-8 items-center justify-center rounded-full border border-purple-500/50 bg-black transition-all group-hover:border-purple-400">
                  <Users className="h-4 w-4 text-purple-400 transition-all group-hover:text-purple-300" />
                </div>
                <span className="text-center text-[10px] font-medium text-purple-300 group-hover:text-purple-200">
                  Team
                </span>
              </button>
            </div>
          </div>

          {/* Chat messages */}
          <div className="h-[250px] overflow-y-auto bg-black/80 p-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "mb-2 max-w-[85%] rounded-xl p-2",
                  msg.type === "user" ? "ml-auto bg-purple-600 text-white" : "mr-auto bg-zinc-800 text-gray-100",
                )}
              >
                <div className="text-xs sm:text-sm">{msg.content}</div>
              </div>
            ))}
            {isTyping && (
              <div className="mr-auto mb-2 flex max-w-[85%] items-center gap-1 rounded-xl bg-zinc-800 p-2">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400"></div>
                <div
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="border-t border-purple-500/30 bg-black/90 p-3">
            <div className="relative flex items-center">
              <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask something..."
                className="border-purple-500/50 bg-zinc-900 pr-10 text-purple-50 placeholder:text-purple-300/50 focus-visible:ring-purple-500"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 h-8 w-8 rounded-full bg-purple-600 text-white hover:bg-purple-700"
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Chat toggle button */}
      <button
  onClick={toggleChat}
  className="group relative flex h-38 w-28 items-center justify-center transition-all hover:scale-105"
  aria-label="Toggle chat"
>
  <img
    src="/astro.gif"
    alt="AstroBot"
    className="h-full w-full object-cover "
  />
</button>

      {/* Audio player for the music */}
      <audio ref={audioRef} src="/music2.mp3" loop />
    </div>
  )
}

