'use client';

import { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const FragmentedMonolith = () => {
  const instancesRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Load the logo texture
  const logoTexture = useLoader(THREE.TextureLoader, '/images/isologo-copm.webp');

  const numCubes = 250;

  // Store initial random positions and rotation speeds for the fragments
  const { initialData, boxGeo } = useMemo(() => {
    const data = [];
    for (let i = 0; i < numCubes; i++) {
      // Golden spiral uniform distribution on a sphere
      const phi = Math.acos(-1 + (2 * i) / numCubes);
      const theta = Math.sqrt(numCubes * Math.PI) * phi;

      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);

      data.push({
        dir: new THREE.Vector3(x, y, z),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3,
        ),
        // Some cubes are bigger (services), some are tiny (functions)
        scale: Math.random() > 0.9 ? Math.random() * 0.8 + 0.4 : Math.random() * 0.3 + 0.1,
        // Individual orbit speed offset
        orbitSpeed: (Math.random() - 0.5) * 2,
      });
    }

    // Reusing geometry for performance
    const geo = new THREE.BoxGeometry(1, 1, 1);

    return { initialData: data, boxGeo: geo };
  }, [numCubes]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (instancesRef.current && groupRef.current) {
      const dummy = new THREE.Object3D();

      // Calculate how "fragmented" it should be based on mouse distance from center
      const mouseDist = Math.sqrt(Math.pow(state.pointer.x, 2) + Math.pow(state.pointer.y, 2));

      // Target expansion radius. Minimum 1.5, expands up to a maximum limit based on cursor interaction
      // When the user moves the mouse, the monolith "fragments" outward
      const maxRadius = 3.0; // Limit this to avoid overflow
      const targetRadius = Math.min(maxRadius, 1.5 + mouseDist * 3.0);

      for (let i = 0; i < numCubes; i++) {
        const data = initialData[i];

        // Orbit effect (fragments revolve around the core)
        const currentAngle = time * data.orbitSpeed;

        // Rotate the original direction vector to create orbit
        const rotatedDir = data.dir.clone();
        rotatedDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), currentAngle);
        rotatedDir.applyAxisAngle(new THREE.Vector3(1, 0, 0), currentAngle * 0.5);

        // Final position pushing outwards
        dummy.position.copy(rotatedDir).multiplyScalar(targetRadius);

        // Local rotation of the fragment
        dummy.rotation.x = time * data.rotSpeed.x;
        dummy.rotation.y = time * data.rotSpeed.y;
        dummy.rotation.z = time * data.rotSpeed.z;

        // Apply scale
        dummy.scale.setScalar(data.scale * 0.25);

        dummy.updateMatrix();
        instancesRef.current.setMatrixAt(i, dummy.matrix);
      }

      // Tell ThreeJS to update the instances
      instancesRef.current.instanceMatrix.needsUpdate = true;

      // Rotate the entire swarm slightly based on cursor position for a 3D parallax feel
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        state.pointer.y * 0.3,
        0.05,
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.3,
        0.05,
      );
    }
  });

  const responsiveScale = Math.min(1, viewport.width / 6);

  return (
    <group scale={responsiveScale}>
      {/* Isologo central que siempre mira a la cámara */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.3, 1.3]} />
        <meshBasicMaterial map={logoTexture} transparent depthWrite={false} opacity={0.9} />
      </mesh>

      <group ref={groupRef}>
        {/* Los Fragmentos (Microservicios Rust Distribuidos) */}
        <instancedMesh ref={instancesRef} args={[boxGeo, undefined, numCubes]}>
          <meshStandardMaterial color="#00ff66" roughness={0.2} metalness={0.8} />
        </instancedMesh>
      </group>
    </group>
  );
};

export const DataOrb = () => {
  return (
    <div className="w-full h-full relative z-10 pointer-events-auto cursor-crosshair">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
      >
        <ambientLight intensity={0.5} />
        {/* Luces direccionales para dar volumen 3D a los cubos */}
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#00ff66" />

        <Suspense fallback={null}>
          <FragmentedMonolith />
        </Suspense>
      </Canvas>
    </div>
  );
};
