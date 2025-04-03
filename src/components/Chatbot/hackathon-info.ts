// Hackathon information - this is the only data the chatbot should use for responses
export const hackathonInfo = {
    "name": "Hello World Hacks",
    "dates": "April 12-May 12, 2025",
    "location": "Virtual & In-person at RCCIIT",
    "registration": "Open until April 12, 2025",
    "organizers": [
      { "name": "GDGC RCCIIT", "role": "Main Organizer" },
      { "name": "RCCTECHZ", "role": "Co-organizer" }
    ],
    "team": [
      { "name": "Sagnik Datta", "role": "Organiser" },
      { "name": "Adrita Chakraborty", "role": "Organiser" },
      { "name": "Swapnendu Bannerjee", "role": "Co-organiser" },
      { "name": "Rishi Paul", "role": "Co-organiser" }
    ],
    "schedule": [
      { "time": "March 20 - April 18", "event": "Registration Period", "description": "Sign up for the hackathon on Devfolio" },
      { "time": "April 4 10:00AM-5:00PM", "event": "Tech Verse Session", "description": "Multiple speakers offline session preparing participants for industry exposure" },
      { "time": "April 10 1:00PM-5:00PM", "event": "Hackathon Orientation Session", "description": "Learn what to expect during the hackathon event" },
      { "time": "April 12", "event": "Opening Ceremony", "description": "Official kickoff for HelloWorld Hacks" },
      { "time": "April 14 12:01AM", "event": "Proposal Writing Starts", "description": "Begin crafting your project proposals and learn how to leverage popular APIs" },
      { "time": "April 16-20", "event": "Proposal Filtering", "description": "Selection committee reviews submitted proposals" },
      { "time": "April 18 11:59PM", "event": "Proposal Submission Deadline", "description": "Last chance to submit your project ideas" },
      { "time": "April 19", "event": "Github Session", "description": "Best practices for version control and collaboration" },
      { "time": "April 21 12:00AM-May 5 12:59PM", "event": "Hacking Period", "description": "Two weeks of intensive development and building your project" },
      { "time": "April 21", "event": "Web3 Session", "description": "Introduction to blockchain and decentralized applications" },
      { "time": "April 22", "event": "App Dev Session", "description": "Building cross-platform mobile applications" },
      { "time": "April 22-25", "event": "Mentor Mentee MatchMaking", "description": "Connect with industry mentors based on your project proposal" },
      { "time": "April 23", "event": "GenAI Session", "description": "Leveraging generative AI in your projects" },
      { "time": "April 25", "event": "Light Gaming Session", "description": "Take a break with fun multiplayer games" },
      { "time": "April 27", "event": "Cyber Security Session", "description": "Securing your applications and data" },
      { "time": "April 28-29", "event": "Mid Evaluation", "description": "Progress check with mentors to evaluate current implementation" },
      { "time": "April 28", "event": "OpenSource Session", "description": "Contributing to and building open source projects" },
      { "time": "April 30", "event": "Entrepreneurship Session", "description": "Turning your hackathon project into a startup" },
      { "time": "May 1", "event": "Devops Session", "description": "CI/CD pipelines and deployment strategies" },
      { "time": "May 1-5", "event": "Documentation Writing Period", "description": "Create technical documentation on Dev.to/Hashnode/Medium" },
      { "time": "May 2", "event": "Technical Writing Session", "description": "Effective technical documentation techniques" },
      { "time": "May 3", "event": "Networking and PR Session", "description": "Develop professional connections and promote your project" },
      { "time": "May 5 11:59PM", "event": "Final Submission Deadline", "description": "Submit your completed projects" },
      { "time": "May 6-8", "event": "Judging", "description": "Judges review all submitted projects" },
      { "time": "May 12", "event": "Project Pitching", "description": "Present your ideas and prototypes to judges (online options available for remote participants)" },
      { "time": "May 12", "event": "Closing Ceremony", "description": "Awards announcement and hackathon conclusion" }
    ],
    "tracks": [
    {
      "id": "ai-for-good",
      "name": "AI for Good",
      "color": "#FF5757",
      "description": "🚀 AI-powered solutions for accessibility, sustainability, and education.",
      "difficulty": "Intermediate",
      "tools": ["Python", "TensorFlow", "PyTorch", "OpenAI APIs"]
    },
    {
      "id": "blockchain-web3",
      "name": "Decentralized Future",
      "color": "#9945FF",
      "description": "🔗 Blockchain for secure and transparent applications.",
      "difficulty": "Advanced",
      "tools": ["Solidity", "Ethereum", "Polygon", "IPFS"]
    },
    {
      "id": "healthtech",
      "name": "HealthTech & Wellness",
      "color": "#FF00E5",
      "description": "🏥 Innovations in healthcare, mental well-being, and fitness.",
      "difficulty": "Intermediate",
      "tools": ["React Native", "Firebase", "OpenAI APIs", "Twilio"]
    },
    {
      "id": "greentech",
      "name": "Green Tech & Sustainability",
      "color": "#14F195",
      "description": "🌱 Tech solutions for climate change and environmental protection.",
      "difficulty": "Intermediate",
      "tools": ["IoT APIs", "Python", "ML models", "Blockchain"]
    },
    {
      "id": "fintech",
      "name": "FinTech & Smart Transactions",
      "color": "#FFC107",
      "description": "🏦 Secure and automated financial solutions.",
      "difficulty": "Intermediate",
      "tools": ["Stripe API", "Plaid API", "Solidity", "Firebase"]
    },
    {
      "id": "edtech",
      "name": "Gamified Learning & EdTech",
      "color": "#00E4FF",
      "description": "🎮 Interactive and AI-driven educational experiences.",
      "difficulty": "Beginner",
      "tools": ["Unity", "Godot", "Phaser.js", "AI learning engines"]
    },
    {
      "id": "safetech",
      "name": "SafeTech+",
      "color": "#14F195",
      "description": "🛡️ AI and predictive analytics for safety solutions.",
      "difficulty": "Advanced",
      "tools": ["GPS APIs", "AI detection", "Twilio", "Blockchain"]
    },
    {
      "id": "smarttourism",
      "name": "Smart Tourism & Cultural Tech",
      "color": "#00a8e8",
      "description": "✈️ AI, AR/VR, and smart planning for enhanced travel.",
      "difficulty": "Intermediate",
      "tools": ["Google Maps API", "OpenAI APIs", "AR frameworks", "Blockchain"]
    },
    {
      "id": "open-innovation",
      "name": "Open Innovation",
      "color": "#FF9900",
      "description": "🌟 Explore groundbreaking ideas beyond predefined tracks.",
      "difficulty": "Intermediate",
      "tools": ["Any technology", "Your imagination", "Innovation mindset"]
    }
  ],
    "prizes": [
      { "category": "1st Prize", "reward": "Rs8,000 + Mentorship opportunities" },
      { "category": "1st Runner Up", "reward": "Rs4,000 + AI compute credits" },
      { "category": "2nd Runner Up", "reward": "Rs2,500 + Blockchain platform credits" },
      { "category": "Best Girls Team", "reward": "Rs2,000 + Feature on our site" },
      { "category": "Best Beginners Team", "reward": "Rs2,000 + Feature on our site" }
    ]
  }
  
  
  // Define sections for navigation
  export const pageSections = [
    { id: "hero", name: "Home" },
    { id: "upcoming-event", name: "Upcoming Event" },
    { id: "schedule", name: "Schedule" },
    { id: "tracks", name: "Tracks" },
    { id: "features", name: "Features" },
    { id: "prizes", name: "Prizes" },
    { id: "sponsors", name: "Sponsors" },
    { id: "community-partners", name: "Community Partners" },
    { id: "faq", name: "FAQ" }
  ];
  