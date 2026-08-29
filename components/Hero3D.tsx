"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Tech stack items orbiting the Cyber Android Bugdroid
const ORBITING_TECHS = [
  { name: "JavaScript", color: "#FFE600", border: "#FFE600", radius: 2.4, speed: 0.75, offset: 0 },
  { name: "Node.js", color: "#A3E635", border: "#A3E635", radius: 2.7, speed: 0.55, offset: Math.PI * 0.5 },
  { name: "React 18", color: "#00F0FF", border: "#00F0FF", radius: 2.3, speed: 0.65, offset: Math.PI * 1.0 },
  { name: "Supabase", color: "#3ECF8E", border: "#3ECF8E", radius: 2.9, speed: 0.45, offset: Math.PI * 1.5 },
  { name: "Next.js 14", color: "#FFFFFF", border: "#FFFFFF", radius: 2.6, speed: 0.6, offset: Math.PI * 1.9 },
];

// Single Orbiting Tech Badge
function OrbitingBadge({ tech }: { tech: typeof ORBITING_TECHS[0] }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * tech.speed + tech.offset;
    const x = Math.sin(t) * tech.radius;
    const z = Math.cos(t) * tech.radius;
    const y = Math.sin(t * 1.4) * 0.35;
    ref.current.position.set(x, y, z);
  });

  return (
    <group ref={ref}>
      <Html center distanceFactor={8} transform position={[0, 0, 0]}>
        <div
          style={{
            borderColor: tech.border,
            color: tech.color,
            backgroundColor: "#07080d",
            boxShadow: `0 0 14px ${tech.border}40`,
          }}
          className="px-2.5 py-1 text-[11px] font-mono font-bold border-2 rounded-none whitespace-nowrap select-none uppercase tracking-wider transition-transform hover:scale-110"
        >
          &lt;{tech.name} /&gt;
        </div>
      </Html>
    </group>
  );
}

// Cyberpunk Android Bugdroid Robot Model
function CyberBugdroid() {
  const robotRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftAntennaRef = useRef<THREE.Group>(null);
  const rightAntennaRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const energyRingRef = useRef<THREE.Group>(null);

  // Materials: Dark Matte Metallic Armor + Neon Emissives
  const matteMetallic = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#11141e",
        roughness: 0.28,
        metalness: 0.88,
      }),
    []
  );

  const darkPlate = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0a0c14",
        roughness: 0.35,
        metalness: 0.95,
      }),
    []
  );

  // Android Neon Green Glowing Material
  const androidGreenEmissive = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#3DDC84",
        emissive: "#3DDC84",
        emissiveIntensity: 2.6,
        roughness: 0.1,
      }),
    []
  );

  // Cyber Cyan Glowing Material
  const cyanEmissive = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00F0FF",
        emissive: "#00F0FF",
        emissiveIntensity: 2.2,
        roughness: 0.1,
      }),
    []
  );

  // Neon Pink Accents
  const pinkEmissive = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FF2A85",
        emissive: "#FF2A85",
        emissiveIntensity: 2.0,
        roughness: 0.1,
      }),
    []
  );

  const wireframeRing = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#3DDC84",
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer; // Mouse tracking

    // Body idle hovering oscillation
    if (robotRef.current) {
      robotRef.current.position.y = Math.sin(t * 1.6) * 0.12;

      // Subtle body rotation following cursor
      robotRef.current.rotation.y = THREE.MathUtils.lerp(
        robotRef.current.rotation.y,
        x * 0.35,
        0.05
      );
      robotRef.current.rotation.x = THREE.MathUtils.lerp(
        robotRef.current.rotation.x,
        -y * 0.2,
        0.05
      );
    }

    // Head follows mouse cursor smoothly
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        x * 0.7,
        0.08
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -y * 0.45,
        0.08
      );
    }

    // Organic antenna wiggling / twitching
    if (leftAntennaRef.current) {
      leftAntennaRef.current.rotation.z = -0.45 + Math.sin(t * 3.5) * 0.08 + Math.sin(t * 7) * 0.03;
      leftAntennaRef.current.rotation.x = Math.cos(t * 2.8) * 0.06;
    }
    if (rightAntennaRef.current) {
      rightAntennaRef.current.rotation.z = 0.45 - Math.sin(t * 3.2 + 1) * 0.08 - Math.sin(t * 6.5) * 0.03;
      rightAntennaRef.current.rotation.x = Math.sin(t * 2.5) * 0.06;
    }

    // Floating capsule arms gentle sway
    if (leftArmRef.current) {
      leftArmRef.current.position.y = Math.sin(t * 2 + 1) * 0.05;
      leftArmRef.current.rotation.z = Math.sin(t * 1.5) * 0.06 + 0.08;
    }
    if (rightArmRef.current) {
      rightArmRef.current.position.y = Math.sin(t * 2 + 2) * 0.05;
      rightArmRef.current.rotation.z = -Math.sin(t * 1.5) * 0.06 - 0.08;
    }

    // Core pulsing reactor
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 4) * 0.12;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Energy rings rotation
    if (energyRingRef.current) {
      energyRingRef.current.rotation.x = t * 0.4;
      energyRingRef.current.rotation.y = t * 0.6;
    }
  });

  return (
    <group ref={robotRef} position={[0, -0.1, 0]}>
      {/* 3D Wireframe Cyber Halo / Shield */}
      <group ref={energyRingRef} position={[0, 0.1, 0]}>
        <mesh material={wireframeRing}>
          <torusGeometry args={[1.7, 0.02, 16, 64]} />
        </mesh>
        <mesh material={cyanEmissive} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.5, 0.012, 16, 64]} />
        </mesh>
      </group>

      {/* ==================== BUGDROID HEAD ==================== */}
      <group ref={headRef} position={[0, 0.75, 0]}>
        {/* Android Dome Head (Hemisphere) */}
        <mesh material={matteMetallic} rotation={[0, 0, 0]}>
          <sphereGeometry args={[0.85, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>

        {/* Head Bottom Plate / Cyber Seam */}
        <mesh position={[0, 0.01, 0]} material={darkPlate} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.85, 32]} />
        </mesh>

        {/* Cyber Neon Trim Ring at Base of Head */}
        <mesh position={[0, 0.02, 0]} material={androidGreenEmissive}>
          <torusGeometry args={[0.84, 0.02, 16, 64]} />
        </mesh>

        {/* ---------------- Eyes ---------------- */}
        {/* Left Glowing Android Eye */}
        <mesh position={[-0.32, 0.38, 0.68]} material={androidGreenEmissive}>
          <sphereGeometry args={[0.09, 24, 24]} />
        </mesh>
        {/* Left Eye Bezel Ring */}
        <mesh position={[-0.32, 0.38, 0.67]} material={darkPlate}>
          <torusGeometry args={[0.11, 0.015, 16, 32]} />
        </mesh>

        {/* Right Glowing Android Eye */}
        <mesh position={[0.32, 0.38, 0.68]} material={androidGreenEmissive}>
          <sphereGeometry args={[0.09, 24, 24]} />
        </mesh>
        {/* Right Eye Bezel Ring */}
        <mesh position={[0.32, 0.38, 0.67]} material={darkPlate}>
          <torusGeometry args={[0.11, 0.015, 16, 32]} />
        </mesh>

        {/* Cyber Forehead Visor Seam Line */}
        <mesh position={[0, 0.58, 0.55]} material={cyanEmissive}>
          <boxGeometry args={[0.55, 0.03, 0.04]} />
        </mesh>

        {/* ---------------- Antennas ---------------- */}
        {/* Left Antenna */}
        <group ref={leftAntennaRef} position={[-0.42, 0.72, 0]}>
          <mesh position={[0, 0.22, 0]} material={matteMetallic}>
            <cylinderGeometry args={[0.03, 0.035, 0.44, 16]} />
          </mesh>
          {/* Glowing Antenna Tip */}
          <mesh position={[0, 0.46, 0]} material={androidGreenEmissive}>
            <sphereGeometry args={[0.055, 16, 16]} />
          </mesh>
        </group>

        {/* Right Antenna */}
        <group ref={rightAntennaRef} position={[0.42, 0.72, 0]}>
          <mesh position={[0, 0.22, 0]} material={matteMetallic}>
            <cylinderGeometry args={[0.03, 0.035, 0.44, 16]} />
          </mesh>
          {/* Glowing Antenna Tip */}
          <mesh position={[0, 0.46, 0]} material={androidGreenEmissive}>
            <sphereGeometry args={[0.055, 16, 16]} />
          </mesh>
        </group>
      </group>

      {/* Head-Body Gap Neon Circuit Ring */}
      <mesh position={[0, 0.68, 0]} material={cyanEmissive}>
        <cylinderGeometry args={[0.45, 0.45, 0.04, 32]} />
      </mesh>

      {/* ==================== BUGDROID TORSO ==================== */}
      <group position={[0, 0.05, 0]}>
        {/* Main Cylindrical Body */}
        <mesh material={matteMetallic}>
          <cylinderGeometry args={[0.85, 0.85, 1.1, 32]} />
        </mesh>

        {/* Rounded Bottom Base */}
        <mesh position={[0, -0.55, 0]} material={matteMetallic} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.85, 32, 16, 0, Math.PI * 2, 0, Math.PI / 4]} />
        </mesh>

        {/* Cyber Core Reactor on Chest */}
        <mesh ref={coreRef} position={[0, 0.1, 0.83]} rotation={[Math.PI / 2, 0, 0]} material={androidGreenEmissive}>
          <cylinderGeometry args={[0.15, 0.15, 0.06, 24]} />
        </mesh>
        {/* Core Ring Bezel */}
        <mesh position={[0, 0.1, 0.82]} material={cyanEmissive} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.02, 16, 32]} />
        </mesh>

        {/* Vertical Cyber Seam Glow Lines on Body */}
        <mesh position={[-0.45, 0, 0.74]} material={pinkEmissive}>
          <boxGeometry args={[0.03, 0.8, 0.02]} />
        </mesh>
        <mesh position={[0.45, 0, 0.74]} material={pinkEmissive}>
          <boxGeometry args={[0.03, 0.8, 0.02]} />
        </mesh>
      </group>

      {/* ==================== FLOATING CAPSULE ARMS ==================== */}
      {/* Left Arm */}
      <group ref={leftArmRef} position={[-1.15, 0.08, 0]}>
        {/* Upper Arm Cylinder */}
        <mesh material={matteMetallic}>
          <cylinderGeometry args={[0.18, 0.18, 0.7, 24]} />
        </mesh>
        {/* Top Dome */}
        <mesh position={[0, 0.35, 0]} material={matteMetallic}>
          <sphereGeometry args={[0.18, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        {/* Bottom Dome */}
        <mesh position={[0, -0.35, 0]} material={matteMetallic} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.18, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        {/* Glowing Arm Seam Ring */}
        <mesh position={[0, 0, 0]} material={androidGreenEmissive}>
          <torusGeometry args={[0.185, 0.015, 16, 32]} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[1.15, 0.08, 0]}>
        {/* Upper Arm Cylinder */}
        <mesh material={matteMetallic}>
          <cylinderGeometry args={[0.18, 0.18, 0.7, 24]} />
        </mesh>
        {/* Top Dome */}
        <mesh position={[0, 0.35, 0]} material={matteMetallic}>
          <sphereGeometry args={[0.18, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        {/* Bottom Dome */}
        <mesh position={[0, -0.35, 0]} material={matteMetallic} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.18, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        {/* Glowing Arm Seam Ring */}
        <mesh position={[0, 0, 0]} material={cyanEmissive}>
          <torusGeometry args={[0.185, 0.015, 16, 32]} />
        </mesh>
      </group>

      {/* ==================== FLOATING CAPSULE LEGS ==================== */}
      {/* Left Leg */}
      <group position={[-0.38, -0.85, 0]}>
        <mesh material={matteMetallic}>
          <cylinderGeometry args={[0.18, 0.18, 0.45, 24]} />
        </mesh>
        {/* Bottom Rounded Foot */}
        <mesh position={[0, -0.22, 0]} material={matteMetallic} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.18, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        {/* Glowing Joint Ring */}
        <mesh position={[0, 0.1, 0]} material={androidGreenEmissive}>
          <torusGeometry args={[0.185, 0.015, 16, 32]} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group position={[0.38, -0.85, 0]}>
        <mesh material={matteMetallic}>
          <cylinderGeometry args={[0.18, 0.18, 0.45, 24]} />
        </mesh>
        {/* Bottom Rounded Foot */}
        <mesh position={[0, -0.22, 0]} material={matteMetallic} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.18, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        {/* Glowing Joint Ring */}
        <mesh position={[0, 0.1, 0]} material={cyanEmissive}>
          <torusGeometry args={[0.185, 0.015, 16, 32]} />
        </mesh>
      </group>

      {/* ==================== ORBITING TECH BADGES ==================== */}
      {ORBITING_TECHS.map((tech) => (
        <OrbitingBadge key={tech.name} tech={tech} />
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
    <div className="relative w-full h-[440px] md:h-[540px] select-none">
      {/* 3D Canvas Container */}
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: isMobile ? 54 : 44 }}
        dpr={[1, isMobile ? 1.5 : 2]} // Mobile & Retina performance optimization
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          alpha: true,
        }}
        className="w-full h-full"
      >
        {/* Dark-Mode Lighting Setup */}
        <ambientLight intensity={0.45} />

        {/* Key Light: Android Green Keylight */}
        <directionalLight position={[4, 5, 4]} intensity={2.4} color="#3DDC84" />

        {/* Fill Light: Electric Cyan */}
        <directionalLight position={[-4, 3, 3]} intensity={1.8} color="#00F0FF" />

        {/* Rim Light: Cyber Purple/Pink */}
        <pointLight position={[0, -3, -3]} intensity={2.5} color="#A855F7" />

        {/* Cyber Sparkle Dust Particles */}
        <Sparkles
          count={isMobile ? 35 : 65}
          scale={7}
          size={isMobile ? 3 : 4}
          speed={0.6}
          color="#3DDC84"
          opacity={0.65}
        />

        {/* Float Wrapper with smooth damping */}
        <Float speed={2} rotationIntensity={0.25} floatIntensity={0.45}>
          <CyberBugdroid />
        </Float>
      </Canvas>

      {/* Neobrutalist Corner Badge Overlay */}
      <div className="absolute bottom-2 right-2 bg-brutal-surface border-2 border-black px-2.5 py-1 shadow-brutal-sm font-mono text-[10px] text-white/70 flex items-center gap-1.5 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#3DDC84] animate-pulse" />
        <span>BUGDROID_3D // ANDROID_CYBER_EDITION</span>
      </div>
    </div>
  );
}
