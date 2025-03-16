"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CoolHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`fixed top-0 left-0 w-full z-50 py-4 sm:py-6 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
              <motion.path 
                d="M10 20L20 10L30 20L20 30L10 20Z" 
                fill="#3DEFE9"
                initial={{ pathLength: 0, fill: "rgba(61, 239, 233, 0)" }}
                animate={{ pathLength: 1, fill: "rgba(61, 239, 233, 1)" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.path 
                d="M5 20L20 5L35 20L20 35L5 20Z" 
                stroke="#3DEFE9" 
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h1 className="text-white font-bold text-xl sm:text-2xl tracking-wider">
                HELLO<span className="text-[#3DEFE9]">WORLD</span>
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm -mt-1">HACKS</p>
            </motion.div>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {['About', 'Tracks', 'Schedule', 'Sponsors', 'FAQs'].map((item, index) => (
              <motion.a
                key={item}
                href={`${item.toLowerCase()}`}
                className="text-gray-300 hover:text-[#3DEFE9] transition-colors duration-300 text-sm font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.5, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              className="bg-[#3DEFE9] text-black px-4 py-2 rounded font-medium text-sm shadow-glow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(61, 239, 233, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button 
            className="block md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="w-8 h-8 flex flex-col justify-center items-center">
              <motion.span 
                className="w-6 h-0.5 bg-white mb-1.5 block"
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span 
                className="w-6 h-0.5 bg-white mb-1.5 block"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span 
                className="w-6 h-0.5 bg-white block"
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className="md:hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={menuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{overflow: 'hidden'}}
      >
        <div className="px-4 pt-4 pb-6 bg-black/90 backdrop-blur-md mt-4 border-t border-gray-800">
          {['About', 'Tracks', 'Schedule', 'Sponsors', 'FAQs'].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block py-3 text-gray-300 hover:text-[#3DEFE9] transition-colors duration-300"
              initial={{ x: -20, opacity: 0 }}
              animate={menuOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ delay: menuOpen ? 0.1 * index : 0, duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            className="bg-[#3DEFE9] text-black px-6 py-2 rounded font-medium text-sm mt-4 w-full shadow-glow"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={menuOpen ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ delay: menuOpen ? 0.6 : 0, duration: 0.3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(false)}
          >
            Register Now
          </motion.button>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default CoolHeader;