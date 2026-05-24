import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll, useTransform, useSpring } from 'framer-motion';

export default function ScrollModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/racing_helmet_-_sc04tm/scene.gltf');
  
  // Track window scroll
  const { scrollYProgress } = useScroll();
  
  // Create a spring-smoothed version of the scroll progress
  const smoothScroll = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    mass: 0.5
  });

  // Map scroll progress to rotation (spins continuously as you scroll down)
  const rotationY = useTransform(smoothScroll, [0, 1], [0, Math.PI * 4]);
  const rotationX = useTransform(smoothScroll, [0, 1], [0.2, 0.6]);
  
  // Map scroll progress to vertical position and scale
  // At top of page (0): it's positioned where the mask would be (slightly off-center if needed) and scaled down or hidden.
  // We'll actually have it float in the center right side for the rest of the page.
  // The Lando Norris helmet detaches and moves around. Let's make it move from center-right to different spots.
  const positionY = useTransform(smoothScroll, [0, 0.2, 1], [3, 0, -2]); 
  const positionX = useTransform(smoothScroll, [0, 0.2, 1], [2, 3, -1]);
  
  // Opacity fade in (invisible at very top so the 2D mask handles the hero effect)
  const opacity = useTransform(smoothScroll, [0, 0.05, 0.1], [0, 0.5, 1]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY.get();
      groupRef.current.rotation.x = rotationX.get();
      groupRef.current.position.y = positionY.get();
      groupRef.current.position.x = positionX.get();
      
      // Update opacity on all materials
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.transparent = true;
          child.material.opacity = opacity.get();
        }
      });
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} scale={[1.5, 1.5, 1.5]}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

useGLTF.preload('/racing_helmet_-_sc04tm/scene.gltf');
