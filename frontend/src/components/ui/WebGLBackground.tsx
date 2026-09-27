'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSwarm({ count = 1500 }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random spherical positions
  const [positions, initialPositions] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const initial = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Box volume distribution
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;
      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
      initial[i * 3] = x;
      initial[i * 3 + 1] = y;
      initial[i * 3 + 2] = z;
    }
    return [p, initial];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const mouseX = (state.pointer.x * state.viewport.width) / 2;
    const mouseY = (state.pointer.y * state.viewport.height) / 2;

    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Floating motion using sine waves
      const originalX = initialPositions[i3];
      const originalY = initialPositions[i3 + 1];
      const originalZ = initialPositions[i3 + 2];

      // Subtle ambient float
      let targetX = originalX + Math.sin(time * 0.2 + originalY) * 0.5;
      let targetY = originalY + Math.cos(time * 0.3 + originalX) * 0.5;

      // Mouse repulsion
      const dx = targetX - mouseX;
      const dy = targetY - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 3) {
        const force = (3 - dist) / 3;
        targetX += (dx / dist) * force * 1.5;
        targetY += (dy / dist) * force * 1.5;
      }

      // Lerp current position to target for smoothness
      positionsArray[i3] += (targetX - positionsArray[i3]) * 0.05;
      positionsArray[i3 + 1] += (targetY - positionsArray[i3 + 1]) * 0.05;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Slow global rotation
    pointsRef.current.rotation.y = time * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ff66"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export function WebGLBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only mount on client
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        gl={{ alpha: true, antialias: false }} // antialias false is faster, alpha true for background
      >
        <ParticleSwarm count={1200} />
      </Canvas>
    </div>
  );
}
