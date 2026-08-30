"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// 4 High-Resolution Tech Stack items orbiting the Android Bugdroid
const ORBITING_TECHS = [
  {
    id: "js",
    label: "JS",
    color: "#FFE600",
    border: "rgba(255, 230, 0, 0.45)",
    radius: 2.1,
    speed: 0.35,
    offset: 0,
    iconSvg: (
      <span className="font-mono font-black text-xs md:text-sm tracking-tight text-[#FFE600] drop-shadow-[0_0_8px_rgba(255,230,0,0.6)]">
        JS
      </span>
    ),
  },
  {
    id: "node",
    label: "Node",
    color: "#22C55E",
    border: "rgba(34, 197, 94, 0.45)",
    radius: 2.2,
    speed: 0.35,
    offset: Math.PI * 0.5,
    iconSvg: (
      <span className="font-mono font-bold text-[11px] md:text-xs text-[#4ADE80] drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]">
        Node
      </span>
    ),
  },
  {
    id: "supabase",
    label: "⚡",
    color: "#00FFA3",
    border: "rgba(0, 255, 163, 0.45)",
    radius: 2.1,
    speed: 0.35,
    offset: Math.PI * 1.0,
    iconSvg: (
      <svg
        className="w-4 h-4 md:w-5 md:h-5 text-[#00FFA3] drop-shadow-[0_0_8px_rgba(0,255,163,0.8)]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    id: "vercel",
    label: "▲",
    color: "#FFFFFF",
    border: "rgba(255, 255, 255, 0.4)",
    radius: 2.2,
    speed: 0.35,
    offset: Math.PI * 1.5,
    iconSvg: (
      <svg
        className="w-3.5 h-3.5 md:w-4 md:h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2L2 20h20L12 2z" />
      </svg>
    ),
  },
];

// Single HD Orbiting Badge Component with crisp vector render
function OrbitingBadge({ tech }: { tech: (typeof ORBITING_TECHS)[0] }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * tech.speed + tech.offset;
    const x = Math.sin(t) * tech.radius;
    const z = Math.cos(t) * tech.radius;
    const y = Math.sin(t * 1.2) * 0.25 - 0.05;
    ref.current.position.set(x, y, z);
  });

  return (
    <group ref={ref}>
      <Html center distanceFactor={5.0} transform position={[0, 0, 0]}>
        <div
          style={{
            borderColor: tech.border,
            color: tech.color,
            backgroundColor: "rgba(5, 14, 11, 0.9)",
            boxShadow: `0 0 22px ${tech.color}35`,
          }}
          className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border-2 shadow-2xl backdrop-blur-xl transition-transform hover:scale-115 select-none cursor-default"
        >
          {tech.iconSvg}
        </div>
      </Html>
    </group>
  );
}

// Metallic Dark Emerald Android Bugdroid Model with cleanly floating legs (NO platform/base)
function DarkEmeraldBugdroid() {
  const robotRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftAntennaRef = useRef<THREE.Group>(null);
  const rightAntennaRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const orbitRingRef = useRef<THREE.Group>(null);

  // Materials: Deep Metallic Dark Emerald
  const darkEmeraldMetallic = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0A382C",
        roughness: 0.2,
        metalness: 0.9,
      }),
    []
  );

  const darkPlate = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#051A14",
        roughness: 0.3,
        metalness: 0.92,
      }),
    []
  );

  // Neon Emerald Glowing Material
  const neonEmeraldEmissive = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00FFA3",
        emissive: "#00FFA3",
        emissiveIntensity: 3.2,
        roughness: 0.08,
      }),
    []
  );

  // Soft Cyan Emissive for Secondary Glow
  const cyanEmissive = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#22D3EE",
        emissive: "#22D3EE",
        emissiveIntensity: 2.5,
        roughness: 0.08,
      }),
    []
  );

  const ringMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#00FFA3",
        transparent: true,
        opacity: 0.22,
      }),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer; // Mouse tracking

    // Floating breathing animation
    if (robotRef.current) {
      robotRef.current.position.y = 0.08 + Math.sin(t * 1.2) * 0.08;

      robotRef.current.rotation.y = THREE.MathUtils.damp(
        robotRef.current.rotation.y,
        x * 0.25,
        2.5,
        delta
      );
      robotRef.current.rotation.x = THREE.MathUtils.damp(
        robotRef.current.rotation.x,
        -y * 0.15,
        2.5,
        delta
      );
    }

    // Head follows mouse cursor smoothly
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.damp(
        headRef.current.rotation.y,
        x * 0.5,
        3.5,
        delta
      );
      headRef.current.rotation.x = THREE.MathUtils.damp(
        headRef.current.rotation.x,
        -y * 0.35,
        3.5,
        delta
      );
    }

    // Antennas gentle sway
    if (leftAntennaRef.current) {
      leftAntennaRef.current.rotation.z = -0.42 + Math.sin(t * 2.2) * 0.05;
      leftAntennaRef.current.rotation.x = Math.cos(t * 1.8) * 0.04;
    }
    if (rightAntennaRef.current) {
      rightAntennaRef.current.rotation.z = 0.42 - Math.sin(t * 2.0 + 1) * 0.05;
      rightAntennaRef.current.rotation.x = Math.sin(t * 1.6) * 0.04;
    }

    // Floating arms gentle breathing
    if (leftArmRef.current) {
      leftArmRef.current.position.y = Math.sin(t * 1.5 + 0.5) * 0.04;
      leftArmRef.current.rotation.z = Math.sin(t * 1.2) * 0.04 + 0.06;
    }
    if (rightArmRef.current) {
      rightArmRef.current.position.y = Math.sin(t * 1.5 + 1.5) * 0.04;
      rightArmRef.current.rotation.z = -Math.sin(t * 1.2) * 0.04 - 0.06;
    }

    // Orbit ring slow rotation
    if (orbitRingRef.current) {
      orbitRingRef.current.rotation.z = -0.15;
      orbitRingRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group ref={robotRef} position={[0, 0.08, 0]}>
      {/* Orbital Plane Ring */}
      <group ref={orbitRingRef} position={[0, 0.05, 0]}>
        <mesh material={ringMaterial} rotation={[Math.PI / 2.3, 0, 0]}>
          <torusGeometry args={[2.15, 0.012, 16, 64]} />
        </mesh>
      </group>

      {/* ==================== BUGDROID HEAD ==================== */}
      <group ref={headRef} position={[0, 0.72, 0]}>
        {/* Android Dome Head (Hemisphere) */}
        <mesh material={darkEmeraldMetallic}>
          <sphereGeometry args={[0.82, 48, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>

        {/* Head Bottom Plate */}
        <mesh position={[0, 0.01, 0]} material={darkPlate} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.82, 48]} />
        </mesh>

        {/* Left Glowing Neon Eye */}
        <mesh position={[-0.3, 0.36, 0.66]} material={neonEmeraldEmissive}>
          <sphereGeometry args={[0.085, 32, 32]} />
        </mesh>

        {/* Right Glowing Neon Eye */}
        <mesh position={[0.3, 0.36, 0.66]} material={neonEmeraldEmissive}>
          <sphereGeometry args={[0.085, 32, 32]} />
        </mesh>

        {/* Left Antenna */}
        <group ref={leftAntennaRef} position={[-0.4, 0.7, 0]}>
          <mesh position={[0, 0.2, 0]} material={darkEmeraldMetallic}>
            <cylinderGeometry args={[0.028, 0.032, 0.4, 24]} />
          </mesh>
          <mesh position={[0, 0.42, 0]} material={neonEmeraldEmissive}>
            <sphereGeometry args={[0.05, 24, 24]} />
          </mesh>
        </group>

        {/* Right Antenna */}
        <group ref={rightAntennaRef} position={[0.4, 0.7, 0]}>
          <mesh position={[0, 0.2, 0]} material={darkEmeraldMetallic}>
            <cylinderGeometry args={[0.028, 0.032, 0.4, 24]} />
          </mesh>
          <mesh position={[0, 0.42, 0]} material={neonEmeraldEmissive}>
            <sphereGeometry args={[0.05, 24, 24]} />
          </mesh>
        </group>
      </group>

      {/* Head-Body Gap Glowing Neon Ring */}
      <mesh position={[0, 0.66, 0]} material={cyanEmissive}>
        <torusGeometry args={[0.45, 0.025, 24, 64]} />
      </mesh>

      {/* ==================== BUGDROID TORSO (Clean flat bottom, NO platform) ==================== */}
      <group position={[0, 0.1, 0]}>
        <mesh material={darkEmeraldMetallic}>
          <cylinderGeometry args={[0.82, 0.82, 0.95, 48]} />
        </mesh>
        {/* Flat Bottom Cap */}
        <mesh position={[0, -0.475, 0]} material={darkPlate} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.82, 48]} />
        </mesh>
      </group>

      {/* ==================== FLOATING CAPSULE ARMS ==================== */}
      {/* Left Arm */}
      <group ref={leftArmRef} position={[-1.12, 0.1, 0]}>
        <mesh material={darkEmeraldMetallic}>
          <cylinderGeometry args={[0.17, 0.17, 0.6, 32]} />
        </mesh>
        <mesh position={[0, 0.3, 0]} material={darkEmeraldMetallic}>
          <sphereGeometry args={[0.17, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        <mesh position={[0, -0.3, 0]} material={darkEmeraldMetallic} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.17, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[1.12, 0.1, 0]}>
        <mesh material={darkEmeraldMetallic}>
          <cylinderGeometry args={[0.17, 0.17, 0.6, 32]} />
        </mesh>
        <mesh position={[0, 0.3, 0]} material={darkEmeraldMetallic}>
          <sphereGeometry args={[0.17, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        <mesh position={[0, -0.3, 0]} material={darkEmeraldMetallic} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.17, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      </group>

      {/* ==================== CLEAN FLOATING CAPSULE LEGS (No platform below) ==================== */}
      {/* Left Leg */}
      <group position={[-0.36, -0.65, 0]}>
        <mesh material={darkEmeraldMetallic}>
          <cylinderGeometry args={[0.16, 0.16, 0.45, 32]} />
        </mesh>
        <mesh position={[0, 0.225, 0]} material={darkEmeraldMetallic}>
          <sphereGeometry args={[0.16, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        <mesh position={[0, -0.225, 0]} material={darkEmeraldMetallic} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.16, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group position={[0.36, -0.65, 0]}>
        <mesh material={darkEmeraldMetallic}>
          <cylinderGeometry args={[0.16, 0.16, 0.45, 32]} />
        </mesh>
        <mesh position={[0, 0.225, 0]} material={darkEmeraldMetallic}>
          <sphereGeometry args={[0.16, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        <mesh position={[0, -0.225, 0]} material={darkEmeraldMetallic} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.16, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      </group>

      {/* 4 Orbiting Badges */}
      {ORBITING_TECHS.map((tech) => (
        <OrbitingBadge key={tech.id} tech={tech} />
      ))}
    </group>
  );
}

// Main 3D Canvas Scene - Borderless with Extended Width (No Mask Image Clipping)
export default function Hero3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative w-[110%] -ml-[5%] md:w-[130%] md:-ml-[15%] h-[400px] sm:h-[480px] md:h-[520px] select-none flex items-center justify-center overflow-visible bg-transparent">
      {/* 3D Canvas Container - 100% borderless, transparent, no mask-image clipping */}
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: isMobile ? 50 : 42 }}
        dpr={[1, 2]}
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          alpha: true,
        }}
        style={{ background: "transparent" }}
        className="w-full h-full bg-transparent overflow-visible"
      >
        {/* Focused Lighting */}
        <ambientLight intensity={0.65} />

        {/* Key Emerald Directional Light */}
        <directionalLight position={[4, 5, 4]} intensity={2.8} color="#00FFA3" />

        {/* Cyan Soft Fill Light */}
        <directionalLight position={[-4, 3, 3]} intensity={2.0} color="#22D3EE" />

        {/* Depth Rim Light */}
        <pointLight position={[0, -3, -3]} intensity={2.2} color="#064E3B" />

        {/* Subtle Ambient Emerald Sparkles */}
        <Sparkles
          count={isMobile ? 25 : 45}
          scale={5.5}
          size={isMobile ? 2.5 : 3.5}
          speed={0.4}
          color="#00FFA3"
          opacity={0.6}
        />

        {/* Float Wrapper with gentle damping */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.35}>
          <DarkEmeraldBugdroid />
        </Float>
      </Canvas>
    </div>
  );
}
