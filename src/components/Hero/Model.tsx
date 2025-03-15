'use client';

import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function Model() {
  const { scene, animations } = useGLTF('/models/Mech.glb');
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions && animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  // Modify material properties for shininess and metalness
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material && mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.metalness = 1; // 1 = Fully metallic, 0 = Not metallic
          mesh.material.roughness = 0.2; // 0 = Shiny, 1 = Rough
          mesh.material.envMapIntensity = 1; // Enhances reflections
        } else {
          mesh.material = new THREE.MeshStandardMaterial({
            color: 'gray',
            metalness: 1,
            roughness: 0.2,
          });
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={1} />;
}
