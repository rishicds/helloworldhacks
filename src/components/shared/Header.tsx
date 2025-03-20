"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const TransparentNavbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Navigation items with icons
  const navItems = [
    {
      name: "About",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ]

  return (
    <>

      <motion.div
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          scrolled ? "w-5/6 md:w-3/4 lg:w-2/3" : "w-11/12 md:w-4/5 lg:w-3/4"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className={`rounded-full px-4 py-3 ${scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
      
            <Link href="/">
              <motion.div
                className="flex items-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="https://i.postimg.cc/PqjgWGFz/hwh-300-x-124-px-192-x-192-px-removebg-preview.png"
                  width={50}
                  height={40}
                  alt="Logo"
                />
                <motion.div
                  className="hidden sm:block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h1 className="text-white font-extrabold text-lg tracking-wider">
                    HELLO<span className="text-[#3DEFE9]">WORLD</span> HACKS
                  </h1>
                </motion.div>
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={`${item.name.toLowerCase()}`}
                  className="flex items-center text-gray-300 hover:text-[#3DEFE9] transition-colors duration-300 font-medium text-base"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.5, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2 text-[#3DEFE9]">{item.icon}</span>
                  {item.name}
                </motion.a>
              ))}
            </nav>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <motion.button
                className="text-white p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <motion.span
                    className="w-5 h-0.5 bg-white mb-1 block"
                    animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="w-5 h-0.5 bg-white mb-1 block"
                    animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="w-5 h-0.5 bg-white block"
                    animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Mobile Menu - Floating Above */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden absolute top-full mt-2 left-0 right-0 z-40"
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mx-2 bg-black/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-800 p-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={`${item.name.toLowerCase()}`}
                    className="flex items-center py-3 text-gray-300 hover:text-[#3DEFE9] transition-colors duration-300 text-lg"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * index, duration: 0.2 }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="mr-3 text-[#3DEFE9]">{item.icon}</span>
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

export default TransparentNavbar

