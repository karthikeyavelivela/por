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
      arr[i * 3] = (rand() - 0.5) * 18;
      arr[i * 3 + 1] = (rand() - 0.5) * 11;
      arr[i * 3 + 2] = (rand() - 0.5) * 7 - 1;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.012;
    // particles drift opposite the pointer for depth
    ref.current.position.x = -state.pointer.x * 0.4;
    ref.current.position.y = -state.pointer.y * 0.25;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#ff9d5c" transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

/**
 * Chrome torus knot centered behind the hero type — follows the cursor:
 * the whole group eases toward the pointer and tilts into the motion.
 */
function ChromeKnot({ animate, mobile }: { animate: boolean; mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const eased = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!animate) return;
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.1;
      mesh.current.rotation.y += delta * 0.15;
    }
    if (group.current) {
      eased.current.x += (state.pointer.x - eased.current.x) * 0.06;
      eased.current.y += (state.pointer.y - eased.current.y) * 0.06;
      group.current.position.x = eased.current.x * 1.1;
      group.current.position.y = eased.current.y * 0.7;
      group.current.rotation.y = eased.current.x * 0.45;
      group.current.rotation.x = -eased.current.y * 0.35;
    }
  });

  return (
    <group ref={group}>
      <Float speed={animate ? 1.3 : 0} rotationIntensity={0.35} floatIntensity={0.7}>
        <mesh ref={mesh} scale={mobile ? 1.05 : 1.35} position={[0, 0.15, -0.5]}>
          <torusKnotGeometry args={mobile ? [1, 0.3, 128, 24] : [1, 0.3, 240, 40]} />
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
    </group>
  );
}

export default function HeroScene() {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const animate = !reduced;

  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      aria-hidden
    >
      <Suspense fallback={null}>
        <ChromeKnot animate={animate} mobile={mobile} />
        {!mobile && <Particles count={360} />}
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
