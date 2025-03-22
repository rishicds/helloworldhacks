"use client";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const MusicButton = () => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Initially false to avoid autoplay
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/music2.mp3");
    audioRef.current.loop = true;
    audioRef.current.muted = true; // Mute initially to prevent autoplay issues
    audioRef.current.play().catch(() => {
      console.warn("Autoplay blocked, waiting for user interaction.");
    });
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.muted = false; // Unmute when user interacts
      audioRef.current.play().catch((err) => console.error("Playback blocked:", err));
    }

    setIsPlaying(!isPlaying);
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { mass: 3, stiffness: 400, damping: 50 });
  const ySpring = useSpring(y, { mass: 3, stiffness: 400, damping: 50 });
  const transform = useMotionTemplate`translateX(${xSpring}px) translateY(${ySpring}px)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    x.set(e.clientX - (left + width / 2));
    y.set(e.clientY - (top + height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={togglePlay}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      className="fixed bottom-4 right-4 z-50 grid h-[80px] w-[80px] place-content-center rounded-full border-2 border-black bg-white transition-colors duration-700 ease-out"
    >
      {isPlaying ? (
        <FaPause className="text-3xl text-black transition-all duration-700 ease-out" />
      ) : (
        <FaPlay className="text-3xl text-black transition-all duration-700 ease-out" />
      )}

      <div className="pointer-events-none absolute inset-0 scale-0 rounded-full bg-black transition-transform duration-700 ease-out group-hover:scale-100" />

      <motion.svg
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "loop", ease: "linear" }}
        style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
        width="70"
        height="70"
        className="pointer-events-none absolute"
      >
        <path id="circlePath" d="M35,35 m-35,0 a35,35 0 1,0 70,0 a35,35 0 1,0 -70,0" fill="none" />
        <text>
          <textPath
            href="#circlePath"
            fill="black"
            className="fill-black text-sm font-light uppercase opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
          >
            Play / Pause Music
          </textPath>
        </text>
      </motion.svg>
    </motion.button>
  );
};

export default MusicButton;
