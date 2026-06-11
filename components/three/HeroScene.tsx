"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion, useIsMobile } from "@/lib/hooks";

/** Deterministic PRNG so particle layout is pure per count. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const rand = mulberry32(count * 7919);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 12;
      arr[i * 3 + 1] = (rand() - 0.5) * 9;
      arr[i * 3 + 2] = (rand() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.014;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.024} color="#ff9d5c" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/** Polished chrome torus knot — mirrors the orange/teal lightformers.
 *  (Physical material, not transmission: no FBO dark-square artifact on
 *  light theme, and far cheaper on mobile GPUs.) */
function GlassKnot({ animate, mobile }: { animate: boolean; mobile: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!mesh.current || !animate) return;
    mesh.current.rotation.x += delta * 0.12;
    mesh.current.rotation.y += delta * 0.17;
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.05;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.05;
    mesh.current.rotation.z = pointer.current.x * 0.35;
    mesh.current.position.y = pointer.current.y * 0.3;
  });

  return (
    <Float speed={animate ? 1.4 : 0} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh} scale={1.18}>
        <torusKnotGeometry args={mobile ? [1, 0.32, 128, 24] : [1, 0.32, 240, 40]} />
        <meshPhysicalMaterial
          color="#8d8378"
          metalness={1}
          roughness={0.16}
          clearcoat={1}
          clearcoatRoughness={0.25}
          envMapIntensity={1.4}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const animate = !reduced;

  return (
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 38 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      aria-hidden
    >
      <Suspense fallback={null}>
        <GlassKnot animate={animate} mobile={mobile} />
        {!mobile && <Particles count={320} />}
        {/* Local lightformer environment — vivid reflections, no network HDR. */}
        <Environment resolution={256}>
          <Lightformer intensity={3} position={[4, 2, 3]} scale={[6, 4, 1]} color="#ff8a52" />
          <Lightformer intensity={2.4} position={[-4, -1, 2]} scale={[5, 5, 1]} color="#2dd4bf" />
          <Lightformer intensity={1.6} position={[0, 5, -2]} scale={[9, 3, 1]} color="#f2efe9" />
          <Lightformer intensity={1.2} position={[0, -4, 1]} scale={[8, 2, 1]} color="#ffb347" />
        </Environment>
        <ambientLight intensity={0.35} />
      </Suspense>
    </Canvas>
  );
}
