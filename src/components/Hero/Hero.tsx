'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import Model from './Model'; // ✅ Import Model correctly

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 opacity-60" />
      
      <div className="relative z-10 flex flex-col items-start justify-center h-full px-10 md:px-20 max-w-3xl">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-5xl md:text-7xl font-bold"
        >
          HELLO WORLD HACKS
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-lg md:text-2xl text-gray-300"
        >
          Hosted by GDG RCCIIT & RCCTECHZ
        </motion.p>
      </div>
      
      <div className="absolute right-0 w-1/2 h-full hidden md:block">
        <Canvas>
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.8}>
              <Model />
            </Stage>
            <OrbitControls autoRotateSpeed={1} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}
