import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame  } from '@react-three/fiber';
import * as THREE from 'three';

const RangerModel = () => {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/power_rangers_model.glb");
  
  // Mouse position state
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  
  
  // Update rotation based on mouse position
  useFrame(() => {
    if (group.current) {
      // Smooth rotation towards mouse position
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        (mouse.x * Math.PI) / 5,
        0.1
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        (mouse.y * Math.PI) / 10,
        0.1
      );
    }
  });
  
  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      // Normalize mouse coordinates
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1)
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <group ref={group}>
      {/* Lighting setup */}
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#b0c4de" />
      <spotLight position={[0, 8, -10]} intensity={0.8} color="#ff9900" angle={0.6} />
      
      {/* Power Rangers model */}
      <primitive 
        object={scene} 
        scale={25}
        position={[0, -2, 0]}
      />
    </group>
  );
};

// Render component to be used in your app
const RangerModels = () => {
  return (
    <div className="relative w-32 h-32 sm:w-48 sm:h-48">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
        <RangerModel />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default RangerModels;