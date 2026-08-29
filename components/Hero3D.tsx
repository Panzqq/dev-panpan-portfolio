"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// 4 Tech Stack items orbiting the Android Bugdroid matching visual reference
const ORBITING_TECHS = [
  {
    id: "js",
    label: "JS",
    color: "#FFE600",
    bg: "rgba(255, 230, 0, 0.12)",
    border: "rgba(255, 230, 0, 0.3)",
    radius: 2.2,
    speed: 0.35,
    offset: 0,
  },
  {
    id: "node",
    label: "Node",
    icon: "🟩",
    color: "#A3E635",
    bg: "rgba(163, 230, 53, 0.12)",
    border: "rgba(163, 230, 53, 0.3)",
    radius: 2.4,
    speed: 0.35,
    offset: Math.PI * 0.5,
  },
  {
    id: "supabase",
    label: "⚡",
    color: "#00FFA3",
    bg: "rgba(0, 255, 163, 0.12)",
    border: "rgba(0, 255, 163, 0.3)",
    radius: 2.3,
    speed: 0.35,
    offset: Math.PI * 1.0,
  },
  {
    id: "vercel",
    label: "▲",
    color: "#FFFFFF",
    bg: "rgba(255, 255, 255, 0.12)",
    border: "rgba(255, 255, 255, 0.3)",
    radius: 2.5,
    speed: 0.35,
    offset: Math.PI * 1.5,
  },
];

// Single Orbiting Badge Component with glassmorphism style
function OrbitingBadge({ tech }: { tech: typeof ORBITING_TECHS[0] }) {
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
      <Html center distanceFactor={7} transform position={[0, 0, 0]}>
        <div
          style={{
            borderColor: tech.border,
            color: tech.color,
            backgroundColor: "rgba(5, 12, 10, 0.75)",
            backdropFilter: "blur(12px)",
            boxShadow: `0 0 16px ${tech.color}25`,
          }}
          className="w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs border shadow-lg transition-transform hover:scale-125 select-none"
        >
          {tech.label}
        </div>
      </Html>
    </group>
  );
}

// Refined Metallic Dark Emerald Android Bugdroid Model
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
        roughness: 0.22,
        metalness: 0.88,
      }),
    []
  );

  const darkPlate = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#051A14",
        roughness: 0.35,
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
        emissiveIntensity: 2.8,
        roughness: 0.1,
      }),
    []
  );

  // Soft Cyan Emissive for Secondary Glow
  const cyanEmissive = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#22D3EE",
        emissive: "#22D3EE",
        emissiveIntensity: 2.2,
        roughness: 0.1,
      }),
    []
  );

  const ringMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#00FFA3",
        transparent: true,
        opacity: 0.2,
      }),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer; // Mouse tracking

    // Ultra-smooth floating breathing animation
    if (robotRef.current) {
      robotRef.current.position.y = Math.sin(t * 1.2) * 0.08;

      // Body subtle follow with smooth dampening
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

    // Head follows mouse cursor smoothly with MathUtils.damp
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

    // Antennas organic gentle sway
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
    <group ref={robotRef} position={[0, -0.15, 0]}>
      {/* Subtle Orbital Plane Ring */}
      <group ref={orbitRingRef} position={[0, 0.05, 0]}>
        <mesh material={ringMaterial} rotation={[Math.PI / 2.3, 0, 0]}>
          <torusGeometry args={[2.3, 0.01, 16, 64]} />
        </mesh>
      </group>

      {/* ==================== BUGDROID HEAD ==================== */}
      <group ref={headRef} position={[0, 0.72, 0]}>
        {/* Android Dome Head (Hemisphere) */}
        <mesh material={darkEmeraldMetallic}>
          <sphereGeometry args={[0.82, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>

        {/* Head Bottom Plate */}
        <mesh position={[0, 0.01, 0]} material={darkPlate} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.82, 32]} />
        </mesh>

        {/* ---------------- Eyes ---------------- */}
        {/* Left Glowing Neon Eye */}
        <mesh position={[-0.3, 0.36, 0.66]} material={neonEmeraldEmissive}>
          <sphereGeometry args={[0.085, 24, 24]} />
        </mesh>

        {/* Right Glowing Neon Eye */}
        <mesh position={[0.3, 0.36, 0.66]} material={neonEmeraldEmissive}>
          <sphereGeometry args={[0.085, 24, 24]} />
        </mesh>

        {/* ---------------- Antennas ---------------- */}
        {/* Left Antenna */}
        <group ref={leftAntennaRef} position={[-0.4, 0.7, 0]}>
          <mesh position={[0, 0.2, 0]} material={darkEmeraldMetallic}>
            <cylinderGeometry args={[0.028, 0.032, 0.4, 16]} />
          </mesh>
          {/* Glowing Antenna Tip */}
          <mesh position={[0, 0.42, 0]} material={neonEmeraldEmissive}>
            <sphereGeometry args={[0.05, 16, 16]} />
          </mesh>
        </group>

        {/* Right Antenna */}
        <group ref={rightAntennaRef} position={[0.4, 0.7, 0]}>
          <mesh position={[0, 0.2, 0]} material={darkEmeraldMetallic}>
            <cylinderGeometry args={[0.028, 0.032, 0.4, 16]} />
          </mesh>
          {/* Glowing Antenna Tip */}
          <mesh position={[0, 0.42, 0]} material={neonEmeraldEmissive}>
            <sphereGeometry args={[0.05, 16, 16]} />
          </mesh>
        </group>
      </group>

      {/* Head-Body Gap Glowing Neon Ring */}
      <mesh position={[0, 0.66, 0]} material={cyanEmissive}>
        <torusGeometry args={[0.45, 0.025, 16, 48]} />
      </mesh>

      {/* ==================== BUGDROID TORSO ==================== */}
      <group position={[0, 0.05, 0]}>
        {/* Main Body Cylinder */}
        <mesh material={darkEmeraldMetallic}>
          <cylinderGeometry args={[0.82, 0.82, 1.05, 32]} />
        </mesh>

        {/* Rounded Bottom Base */}
        <mesh position={[0, -0.52, 0]} material={darkEmeraldMetallic} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.82, 32, 16, 0, Math.PI * 2, 0, Math.PI / 4]} />
        </mesh>
      </group>

      {/* ==================== FLOATING CAPSULE ARMS ==================== */}
      {/* Left Arm */}
      <group ref={leftArmRef} position={[-1.12, 0.08, 0]}>
        <mesh material={darkEmeraldMetallic}>
          <cylinderGeometry args={[0.17, 0.17, 0.65, 24]} />
        </mesh>
        <mesh position={[0, 0.32, 0]} material={darkEmeraldMetallic}>
          <sphereGeometry args={[0.17, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        <mesh position={[0, -0.32, 0]} material={darkEmeraldMetallic} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.17, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[1.12, 0.08, 0]}>
        <mesh material={darkEmeraldMetallic}>
          <cylinderGeometry args={[0.17, 0.17, 0.65, 24]} />
        </mesh>
        <mesh position={[0, 0.32, 0]} material={darkEmeraldMetallic}>
          <sphereGeometry args={[0.17, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        <mesh position={[0, -0.32, 0]} material={darkEmeraldMetallic} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.17, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      </group>

      {/* ==================== FLOATING CAPSULE LEGS ==================== */}
      {/* Left Leg */}
      <group position={[-0.36, -0.82, 0]}>
        <mesh material={darkEmeraldMetallic}>
          <cylinderGeometry args={[0.17, 0.17, 0.42, 24]} />
        </mesh>
        <mesh position={[0, -0.21, 0]} material={darkEmeraldMetallic} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.17, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group position={[0.36, -0.82, 0]}>
        <mesh material={darkEmeraldMetallic}>
          <cylinderGeometry args={[0.17, 0.17, 0.42, 24]} />
        </mesh>
        <mesh position={[0, -0.21, 0]} material={darkEmeraldMetallic} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.17, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      </group>

      {/* ==================== 4 ORBITING TECH BADGES ==================== */}
      {ORBITING_TECHS.map((tech) => (
        <OrbitingBadge key={tech.id} tech={tech} />
      ))}
    </group>
  );
}

// Main 3D Canvas Scene
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
    <div className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] select-none flex items-center justify-center">
      {/* 3D Canvas Container */}
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: isMobile ? 52 : 42 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          alpha: true,
        }}
        className="w-full h-full"
      >
        {/* Soft Dark Emerald & Cyan Lighting */}
        <ambientLight intensity={0.55} />

        {/* Key Emerald Directional Light */}
        <directionalLight position={[4, 5, 4]} intensity={2.6} color="#00FFA3" />

        {/* Cyan Soft Fill Light */}
        <directionalLight position={[-4, 3, 3]} intensity={1.8} color="#22D3EE" />

        {/* Soft Depth Rim Light */}
        <pointLight position={[0, -3, -3]} intensity={2.0} color="#064E3B" />

        {/* Subtle Ambient Emerald Sparkles */}
        <Sparkles
          count={isMobile ? 25 : 45}
          scale={6}
          size={isMobile ? 2.5 : 3.5}
          speed={0.4}
          color="#00FFA3"
          opacity={0.5}
        />

        {/* Float Wrapper with gentle damping */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.35}>
          <DarkEmeraldBugdroid />
        </Float>
      </Canvas>
    </div>
  );
}
