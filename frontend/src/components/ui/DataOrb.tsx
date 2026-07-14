import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

const OrbMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  // Calculate dynamic scale based on viewport width to prevent horizontal clipping on mobile
  const responsiveScale = Math.min(1, viewport.width / 3.5);

  return (
    <group scale={responsiveScale}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Outer Wireframe Distorted Sphere */}
        <Sphere ref={meshRef} args={[1.2, 64, 64]} scale={1}>
          <MeshDistortMaterial
            color="#00ff66"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            wireframe={true}
          />
        </Sphere>
        {/* Inner solid dark core to obscure the back of the wireframe. 
            Must be smaller than outer sphere minus distortion (1.2 - 0.3 = 0.9) */}
        <Sphere args={[0.85, 32, 32]} scale={1}>
          <meshStandardMaterial color="#050505" roughness={0.9} />
        </Sphere>
        {/* Inner glowing core */}
        <Sphere args={[0.7, 32, 32]}>
          <meshBasicMaterial color="#00ff66" transparent opacity={0.15} />
        </Sphere>
      </Float>
    </group>
  );
};

export const DataOrb = () => {
  return (
    <div className="w-full h-full relative z-10 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]} // Limit device pixel ratio for 60fps performance
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#00ff66" />

        <OrbMesh />

        {/* Soft environment lighting to give depth to the material */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};
