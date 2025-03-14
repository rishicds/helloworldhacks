'use client';

import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect } from 'react';

export default function Model() {
  const { scene, animations } = useGLTF('/models/Mech.glb'); // ✅ Load animations
  const { actions } = useAnimations(animations, scene); // ✅ Access animation actions

  useEffect(() => {
    if (actions && animations.length > 0) {
      actions[animations[0].name]?.play(); // ✅ Automatically play the first animation
    }
  }, [actions, animations]);

  return <primitive object={scene} scale={.5} />;
}
