import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

const GlowRing = ({ radius, speed, color, thickness = 0.015 }: {
  radius: number; speed: number; color: string; thickness?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.4) * 0.6;
    ref.current.rotation.y = state.clock.elapsedTime * speed;
    ref.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.3) * 0.3;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, thickness, 32, 128]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={3}
        transparent
        opacity={0.5}
        toneMapped={false}
      />
    </mesh>
  );
};

const QuizCube = () => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.4 + state.clock.elapsedTime * 0.1;
    ref.current.rotation.y = state.clock.elapsedTime * 0.25;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref}>
        <boxGeometry args={[1.1, 1.1, 1.1]} />
        <MeshDistortMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.9}
          distort={0.12}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
};

const StarField = () => {
  const points = useMemo(() => {
    const positions = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  const ref = useRef<THREE.Points>(null!);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={600}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#8b5cf6" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const Hero3DScene = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.15} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#7c3aed" />
          <pointLight position={[-5, -3, 5]} intensity={0.8} color="#06b6d4" />
          <pointLight position={[0, 5, -5]} intensity={0.4} color="#ec4899" />

          <QuizCube />
          <GlowRing radius={1.8} speed={0.35} color="#7c3aed" thickness={0.012} />
          <GlowRing radius={2.3} speed={-0.25} color="#06b6d4" thickness={0.01} />
          <GlowRing radius={2.8} speed={0.18} color="#ec4899" thickness={0.008} />
          <StarField />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
