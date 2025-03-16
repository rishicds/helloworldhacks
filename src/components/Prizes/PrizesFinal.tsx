"use client";

import { useRef, useEffect, Suspense } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import type { Group } from "three";
import * as THREE from "three";

import { Award, Gift, Trophy } from "lucide-react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, PerspectiveCamera, useAnimations } from "@react-three/drei";

function DiamondModel() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/models/minecraft_diamond.glb");

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={0.15} position={[0, -0.5, 0]} rotation={[0, Math.PI * 0.25, 0]} />
    </group>
  );
}

function DragonScene() {
    const dragonRef = useRef<Group>(null);
    const goldPileRef = useRef<Group>(null);
  
    // Load the dragon model - replace with your actual model path
    const { scene: dragonScene, animations: dragonAnimations } = useGLTF("/models/snow_dragon.glb");
    const { actions: dragonActions } = useAnimations(dragonAnimations, dragonRef);
  
    // Load the gold pile model - replace with your actual model path
    const { scene: goldScene, animations: goldAnimations } = useGLTF("/models/treasure.glb");
    const { actions: goldActions } = useAnimations(goldAnimations, goldPileRef);
  
    // Set up camera position for the background scene
    const { camera } = useThree();
  
    useEffect(() => {
      // Position the camera to see both models
      camera.position.set(0, 2, 8);
      camera.lookAt(0, 0, 0);
  
      // Play the gold pile animation
      if (goldActions && goldAnimations.length > 0) {
        const action = goldActions[goldAnimations[0].name];
        if (action) {
          action.reset().fadeIn(0.5).play();
          action.loop = THREE.LoopRepeat;
        }
      }
  
      // Play the dragon animation
      if (dragonActions && dragonAnimations.length > 2) {
        const action = dragonActions[dragonAnimations[2].name];
        if (action) {
          action.reset().fadeIn(0.5).play();
          action.loop = THREE.LoopRepeat;
        }
      }
    }, [camera, goldActions, goldAnimations, dragonActions, dragonAnimations]);
  
    useFrame(({ clock }) => {
      // Subtle animation for the dragon
      if (dragonRef.current) {
        dragonRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
        dragonRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1 + 1;
      }
  
      // Subtle animation for the gold pile
      if (goldPileRef.current) {
        goldPileRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
      }
    });
  
    return (
      <>
        {/* Ambient light for overall illumination */}
        <ambientLight intensity={2} />
  
        {/* Main directional light to simulate sun/main light source */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
  
        {/* Point light to highlight the gold */}
        <pointLight position={[0, 2, 2]} intensity={1} color="#FFD700" />
  
        {/* Dragon model */}
        <group ref={dragonRef} position={[-2, -4, 0]} rotation={[0, -Math.PI * 0.25, 0]}>
  <primitive object={dragonScene} scale={2} />
</group>

{/* Gold pile */}
<group ref={goldPileRef} position={[2, 0.5, 0]}>
  <primitive object={goldScene} scale={2} />
</group>
  
        {/* Environment map for reflections, especially on the gold */}
        <Environment preset="sunset" />
      </>
    );
  }

// Background component that fills the entire section
function BackgroundScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-50">
      <Canvas shadows className="bg-transparent">
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={45} />
        <Suspense fallback={null}>
          <DragonScene />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}

export default function PrizesFinal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const mainPrizes = [
    {
      place: "1st PLACE",
      prize: "₹50,000",
      icon: <Trophy className="w-12 h-12" />,
      extras: ["Internship opportunities", "1-year software subscriptions", "Mentorship from industry experts"],
      color: "#FFBE0B",
    },
    {
      place: "2nd PLACE",
      prize: "₹30,000",
      icon: <Award className="w-12 h-12" />,
      extras: ["6-month software subscriptions", "Cloud credits worth ₹20,000", "Exclusive swag kit"],
      color: "#3DEFE9",
    },
    {
      place: "3rd PLACE",
      prize: "₹20,000",
      icon: <Gift className="w-12 h-12" />,
      extras: ["3-month software subscriptions", "Cloud credits worth ₹10,000", "Swag kit"],
      color: "#FF5470",
    },
  ];

  const specialPrizes = [
    {
      category: "BEST UI/UX",
      prize: "₹10,000 + Design Software Licenses",
      color: "#8A4FFF",
    },
    {
      category: "MOST INNOVATIVE",
      prize: "₹10,000 + Innovation Lab Access",
      color: "#FFBE0B",
    },
    {
      category: "BEST USE OF AI",
      prize: "₹10,000 + AI Platform Credits",
      color: "#3DEFE9",
    },
    {
      category: "COMMUNITY CHOICE",
      prize: "₹10,000 + Feature on Tech Blogs",
      color: "#FF5470",
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="py-32 px-4 sm:px-6 bg-[#0d0916] relative overflow-hidden" ref={ref}>
      {/* The 3D background scene */}
      <BackgroundScene />

      {/* Semi-transparent overlay to improve text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0916] via-transparent to-[#0d0916] z-10"></div>

      <div className="relative z-20">
        {/* Brutalist background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-10 w-40 h-40 border-4 border-[#FFBE0B] rotate-12 opacity-20"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 border-4 border-[#FFBE0B] -rotate-12 opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0.5, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-32 h-32">
                <Canvas camera={{ position: [0, 0, 3], fov: 45 }} style={{ background: "transparent" }}>
                  <ambientLight intensity={3} />
                  <directionalLight position={[0, 10, 10]} intensity={0.8} />
                  <DiamondModel />
                  <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
                </Canvas>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white">WIN BIG</h2>
            </div>

            <div className="w-20 h-1 bg-[#FFBE0B] mx-auto my-6"></div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Get ready for amazing prizes, plus internship opportunities, software subscriptions, cloud credits, and
              more!
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {mainPrizes.map((prize, index) => (
              <motion.div key={index} variants={item} className="group">
                <div
                  className="relative overflow-hidden border-2 border-white/10 bg-white/5 backdrop-blur-md rounded-lg p-8 transform transition-all duration-500 hover:scale-105 text-center"
                  style={{
                    borderColor: prize.color,
                    boxShadow: `0 10px 30px -15px ${prize.color}40`,
                  }}
                >
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-white/5 opacity-20 rounded-full group-hover:opacity-30 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ color: prize.color, backgroundColor: `${prize.color}20` }}
                    >
                      {prize.icon}
                    </div>

                    <h3 className="text-xl font-bold mb-2" style={{ color: prize.color }}>
                      {prize.place}
                    </h3>
                    <p className="text-4xl font-bold mb-4 text-white">{prize.prize}</p>

                    <ul className="text-white/70 text-sm space-y-2">
                      {prize.extras.map((extra, i) => (
                        <li key={i}>{extra}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl font-bold text-center mb-8 text-white"
          >
            SPECIAL CATEGORY PRIZES
          </motion.h3>

          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {specialPrizes.map((prize, index) => (
              <motion.div key={index} variants={item} className="group">
                <div
                  className="relative overflow-hidden border-2 border-white/10 bg-white/5 backdrop-blur-md rounded-lg p-6 transform transition-all duration-300 hover:scale-105 text-center"
                  style={{
                    borderColor: prize.color,
                    boxShadow: `0 5px 15px -10px ${prize.color}40`,
                  }}
                >
                  <h3 className="text-lg font-bold mb-2" style={{ color: prize.color }}>
                    {prize.category}
                  </h3>
                  <p className="text-white/90 text-sm">{prize.prize}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}