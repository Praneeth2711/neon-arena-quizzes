import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

const GlowingRing = ({ radius, speed, color }: { radius: number; speed: number; color: string }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.5;
    ref.current.rotation.y = state.clock.elapsedTime * speed;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.6} />
    </mesh>
  );
};

const QuizCube = () => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <MeshDistortMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          distort={0.15}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

const Hero3DScene = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#7c3aed" />
          <pointLight position={[-5, -5, 5]} intensity={0.5} color="#06b6d4" />
          <pointLight position={[0, 5, -5]} intensity={0.3} color="#ec4899" />

          <QuizCube />
          <GlowingRing radius={2} speed={0.4} color="#7c3aed" />
          <GlowingRing radius={2.5} speed={-0.3} color="#06b6d4" />
          <GlowingRing radius={3} speed={0.2} color="#ec4899" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
