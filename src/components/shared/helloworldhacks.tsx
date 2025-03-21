"use client"

import { useEffect } from "react"
import { motion, useAnimationControls } from "framer-motion"

const AnimatedHelloWorldhacks = ({ text = "HELLO WORLDHACKS" }) => {
  // Animation controls for coordinated animations
  const controls = useAnimationControls()

  useEffect(() => {
    // Start the animation sequence when component mounts
    controls.start("visible")
  }, [controls])

  // Letter animation variants
  const letterVariants = {
    hidden: {
      y: 40,
      opacity: 0,
      scale: 0.5,
      rotateY: 90,
      filter: "blur(8px)",
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 1.2,
        delay: i * 0.08,
        duration: 0.8,
      },
    }),
    floating: (i: number) => ({
      y: [0, -12, 0],
      rotate: [0, i % 2 === 0 ? 3 : -3, 0],
      filter: ["drop-shadow(0 0 8px #9d6bff)", "drop-shadow(0 0 20px #9d6bff)", "drop-shadow(0 0 8px #9d6bff)"],
      transition: {
        y: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          duration: 2 + (i % 3) * 0.4,
          ease: "easeInOut",
          delay: i * 0.05,
        },
        rotate: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          duration: 3 + (i % 2) * 0.6,
          ease: "easeInOut",
          delay: i * 0.05,
        },
        filter: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          duration: 2.5,
          ease: "easeInOut",
          delay: i * 0.05,
        },
      },
    }),
    hover: {
      scale: 1.2,
      y: -20,
      filter: "drop-shadow(0 0 30px #9d6bff)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  }

  // Background path variants
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 0.3,
      transition: {
        pathLength: {
          delay: 0.5 + i * 0.1,
          type: "spring",
          duration: 1.5,
          bounce: 0.3,
        },
        opacity: {
          delay: 0.5 + i * 0.1,
          duration: 0.8,
        },
      },
    }),
  }

  // Shape animation variants
  const shapeVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: (i: number) => ({
      scale: 1,
      opacity: 0.3,
      transition: {
        delay: 1.2 + i * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    }),
  }

  const letterSpacing = 70; // Define letter spacing

  return (
    <div className="animated-text-wrapper">
      <div className="animated-text-container">
        <svg viewBox="0 0 1200 220" width="100%" height="100%">
          {/* Background decorative elements */}
          <g className="background-shapes">
            <motion.path
              d="M100,30 Q200,10 300,30 T500,30 T700,30"
              variants={pathVariants}
              initial="hidden"
              animate={controls}
              custom={0}
            />
            <motion.path
              d="M50,60 Q150,30 250,60 T450,60 T650,60"
              variants={pathVariants}
              initial="hidden"
              animate={controls}
              custom={1}
            />
            <motion.path
              d="M150,90 Q250,60 350,90 T550,90 T750,90"
              variants={pathVariants}
              initial="hidden"
              animate={controls}
              custom={2}
            />
            <motion.path
              d="M50,120 Q150,90 250,120 T450,120 T650,120"
              variants={pathVariants}
              initial="hidden"
              animate={controls}
              custom={3}
            />
            <motion.circle
              cx="100"
              cy="120"
              r="10"
              variants={shapeVariants}
              initial="hidden"
              animate={controls}
              custom={0}
            />
            <motion.circle
              cx="700"
              cy="80"
              r="12"
              variants={shapeVariants}
              initial="hidden"
              animate={controls}
              custom={1}
            />
            <motion.circle
              cx="400"
              cy="50"
              r="8"
              variants={shapeVariants}
              initial="hidden"
              animate={controls}
              custom={2}
            />
            <motion.rect
              x="600"
              y="100"
              width="15"
              height="15"
              variants={shapeVariants}
              initial="hidden"
              animate={controls}
              custom={3}
            />
            <motion.rect
              x="200"
              y="100"
              width="10"
              height="10"
              variants={shapeVariants}
              initial="hidden"
              animate={controls}
              custom={4}
            />
          </g>

          {/* Rendered letters */}
          <g>
            {text.split("").map((char, i) => (
              <motion.g key={i}>
                <motion.text
                  x={letterSpacing *(i+1)} // Increased spacing between letters
                  y={110}
                  fontFamily="Rubik Spray Paint, system-ui"
                  fontSize="80" // Increased font size
                  className="letter"
                  variants={letterVariants}
                  initial="hidden"
                  animate={["visible", "floating"]}
                  whileHover="hover"
                  custom={i}
                >
                  {char}
                </motion.text>

                {/* Subtle glow dot under each letter */}
                <motion.circle
                  cx={50 + i * 70} // Match the increased spacing
                  cy={135}
                  r={3}
                  fill="#6b38fb"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.7, 0.5],
                    scale: [0, 1.2, 1],
                  }}
                  transition={{
                    delay: 1 + i * 0.08,
                    duration: 0.5,
                    times: [0, 0.6, 1],
                  }}
                />
              </motion.g>
            ))}
          </g>
        </svg>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Contrail+One&family=Fascinate+Inline&family=Faster+One&family=Rubik+Spray+Paint&display=swap');
        
        .letter {
          fill: #0A0217;
          stroke: #6b38fb;
          stroke-width: 1.5;
          filter: drop-shadow(0 0 8px #9d6bff);
        }
        
        .background-shapes path {
          stroke: #6b38fb;
          stroke-width: 1;
          fill: none;
        }
        
        .background-shapes circle,
        .background-shapes rect {
          stroke: #6b38fb;
          stroke-width: 1;
          fill: none;
        }
      `}</style>

      <style jsx>{`
        .animated-text-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f7f7f7; 
          padding: 2rem;
          width: 100vw;
          height:20vh;
          overflow: hidden;
        }
        
        .animated-text-container {
          width: 100vw;
          max-width: 1200px;
          height: 220px; 
        }
      `}</style>
    </div>
  )
}

export default AnimatedHelloWorldhacks

