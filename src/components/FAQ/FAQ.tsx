"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"



export default function Faq() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const faqs = [
    {
      question: "Who can participate in HelloWorld Hacks?",
      answer:
        "HelloWorld Hacks is open to all college students, recent graduates, and tech enthusiasts. Whether you're a beginner or an experienced developer, everyone is welcome to participate!",
    },
    {
      question: "Do I need to have a team to register?",
      answer:
        "No, you can register as an individual and form a team during the event. We'll have team formation activities to help you find teammates. Teams can have up to 4 members.",
    },
    {
      question: "Is there a registration fee?",
      answer:
        "No, HelloWorld Hacks is completely free to participate! We believe in making tech events accessible to everyone.",
    },
    {
      question: "What should I bring to the hackathon?",
      answer:
        "Bring your laptop, charger, any hardware you plan to use for your project, and your student ID. We'll provide food, drinks, and a comfortable hacking environment.",
    },
    {
      question: "Will there be food and accommodation?",
      answer:
        "Yes, we'll provide meals throughout the event. For participants coming from outside the city, we have limited accommodation options available. Please mention your requirements during registration.",
    },
    {
      question: "What kind of projects can I build?",
      answer:
        "You can build any type of software project - web apps, mobile apps, games, AI/ML solutions, IoT projects, or anything else that interests you. We encourage creativity and innovation!",
    },
    {
      question: "Will there be mentors available during the event?",
      answer:
        "Yes, we'll have experienced mentors from various tech domains to help you with your projects. They'll be available throughout the hackathon to provide guidance and support.",
    },
    {
      question: "How will the projects be judged?",
      answer:
        "Projects will be judged based on innovation, technical complexity, design, functionality, and real-world impact. Our panel of industry experts will evaluate all submissions.",
    },
    {
      question: "Can I start working on my project before the hackathon?",
      answer:
        "No, all coding and design work must be done during the hackathon. You can come with ideas and plans, but the actual implementation should happen during the event.",
    },
  ]

  return (
    <section className="py-32 px-4 sm:px-6 bg-[#0F0326] relative" ref={ref}>
      <div className="relative">

        {/* Brutalist background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-10 w-40 h-40 border-4 border-[#FF5470] rotate-12 opacity-20"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 border-4 border-[#FF5470] -rotate-12 opacity-20"></div>
        </div>

        <div className="max-w-4xl mx-auto ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="w-20 h-1 bg-[#FF5470] mx-auto mb-6"></div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Got questions? We&apos;ve got answers! If you don&apos;t find what you&apos;re looking for, feel free to reach out to us.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md border-2 border-[#FF5470]/20 rounded-lg p-6"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/10 last:border-0">
                  <AccordionTrigger className="text-white font-bold text-left hover:text-[#FF5470] transition-colors py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 pb-4">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-white/70">
              Still have questions? Contact us at{" "}
              <a href="mailto:helloworldhack6@gmail.com" className="text-[#FF5470] hover:underline">
              helloworldhack6@gmail.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

