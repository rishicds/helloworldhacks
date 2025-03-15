"use client"
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, useAnimations, useFBX } from '@react-three/drei';

interface ModelProps {
  modelPath: string;
}

const GLTFModel: React.FC<ModelProps> = ({ modelPath }) => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(modelPath);
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    // Play the first animation if available
    if (animations && animations.length > 0) {
      const actionNames = Object.keys(actions);
      if (actionNames.length > 0) {
        actions[actionNames[0]]?.play();
      }
    }
  }, [actions, animations]);

  // Auto-rotate if no animations
  useFrame((state, delta) => {
    if (animations.length === 0 && group.current) {
      group.current.rotation.y += 0.01;
    }
  });

  // Clone the scene to prevent issues with multiple instances
  const clonedScene = scene.clone();

  return (
    <group ref={group}>
      <primitive object={clonedScene} />
    </group>
  );
};

const FBXModel: React.FC<ModelProps> = ({ modelPath }) => {
  const group = useRef<THREE.Group>(null);
  const fbx = useFBX(modelPath);
  const [animationMixer, setAnimationMixer] = useState<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (fbx && fbx.animations && fbx.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(fbx);
      const action = mixer.clipAction(fbx.animations[0]);
      action.play();
      setAnimationMixer(mixer);
    }
  }, [fbx]);

  // Update animation mixer
  useFrame((state, delta) => {
    if (animationMixer) {
      animationMixer.update(delta);
    } else if (group.current) {
      // Auto-rotate if no animations
      group.current.rotation.y += 0.01;
    }
  });

  // Clone the FBX to prevent issues with multiple instances
  const clonedFbx = fbx.clone();

  return (
    <group ref={group}>
      <primitive object={clonedFbx} />
    </group>
  );
};

interface ModelViewerProps {
  modelPath: string;
  modelName: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelPath, modelName }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading state
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [modelPath]);

  const handleError = (e: Error) => {
    console.error(`Error loading model: ${modelPath}`, e);
    setError(`Failed to load ${modelName}`);
    setLoading(false);
  };

  // Determine model type based on file extension
  const isGLB = modelPath.toLowerCase().endsWith('.glb');
  const isGLTF = modelPath.toLowerCase().endsWith('.gltf');
  const isFBX = modelPath.toLowerCase().endsWith('.fbx');

  return (
    <div className="model-container">
      <div className="model-viewer" ref={containerRef}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x2a2a2a);
          }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[0, 10, 10]} intensity={0.8} />
          
          {/* Error boundary to catch loading errors */}
          <ErrorBoundary onError={handleError}>
            {isGLB || isGLTF ? (
              <ScaledModel ModelComponent={GLTFModel} modelPath={modelPath} />
            ) : isFBX ? (
              <ScaledModel ModelComponent={FBXModel} modelPath={modelPath} />
            ) : null}
          </ErrorBoundary>
          
          <OrbitControls 
            enableDamping 
            dampingFactor={0.05}
          />
        </Canvas>
      </div>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <h3 className="model-name">{modelName}</h3>
    </div>
  );
};

// Component to auto-scale models
const ScaledModel = ({ ModelComponent, modelPath }: { ModelComponent: React.FC<ModelProps>, modelPath: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      // Center and scale the model
      const box = new THREE.Box3().setFromObject(groupRef.current);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

      groupRef.current.position.x = -center.x;
      groupRef.current.position.y = -center.y;
      groupRef.current.position.z = -center.z;

      if (size > 0) {
        const scale = 2 / size;
        groupRef.current.scale.set(scale, scale, scale);
      }
    }
  }, []);

  return (
    <group ref={groupRef}>
      <ModelComponent modelPath={modelPath} />
    </group>
  );
};

// Error boundary to catch and handle errors
class ErrorBoundary extends React.Component<{ children: React.ReactNode, onError: (error: Error) => void }> {
  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    return this.props.children;
  }
}

const ModelGallery: React.FC = () => {
  const modelFiles = [
    'cute_voxel_ghost.glb',
    'dragon.glb',
    'fire_dragon_minecraft.glb',
    'ghost_of_tsushito.glb',
    'image_of_a_virtual_character_surrounded_by_disto.glb',
    'Mech.glb',
    'mech2.glb',
    'pixel_satchel_charge.glb',
    'pixelated_collage_of_animated_characters_with_a.glb',
    'robot.fbx',
    'Schmugg.glb'
  ];

  return (
    <div className="gallery-container">
      <h1>3D Model Gallery</h1>
      <div className="models-grid">
        {modelFiles.map((modelFile) => (
          <ModelViewer
            key={modelFile}
            modelPath={`/models/${modelFile}`}
            modelName={modelFile.replace(/\.[^.]+$/, '')} // Remove file extension
          />
        ))}
      </div>
      <style jsx>{`
        .gallery-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        h1 {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .models-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .model-container {
          display: flex;
          flex-direction: column;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          background-color: #333;
          position: relative;
        }
        
        .model-viewer {
          width: 100%;
          height: 300px;
          position: relative;
        }
        
        .loading, .error {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
        }
        
        .error {
          background-color: rgba(255, 0, 0, 0.7);
        }
        
        .model-name {
          padding: 1rem;
          margin: 0;
          text-align: center;
          background-color: #444;
          color: white;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default ModelGallery;