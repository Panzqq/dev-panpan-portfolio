"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Sparkles, OrbitControls, Center, Text } from "@react-three/drei";
import * as THREE from "three";

// Tech stack items orbiting the robot
const ORBITING_TECHS = [
  { name: "JavaScript", color: "#FFE600", bg: "rgba(255, 230, 0, 0.15)", border: "#FFE600", radius: 2.6, speed: 0.8, offset: 0 },
  { name: "Node.js", color: "#A3E635", bg: "rgba(163, 230, 53, 0.15)", border: "#A3E635", radius: 2.8, speed: 0.6, offset: Math.PI * 0.6 },
  { name: "React 18", color: "#00F0FF", bg: "rgba(0, 240, 255, 0.15)", border: "#00F0FF", radius: 2.5, speed: 0.7, offset: Math.PI * 1.2 },
  { name: "Next.js 14", color: "#FFFFFF", bg: "rgba(255, 255, 255, 0.15)", border: "#FFFFFF", radius: 3.0, speed: 0.5, offset: Math.PI * 1.8 },
  { name: "TypeScript", color: "#38BDF8", bg: "rgba(56, 189, 248, 0.15)", border: "#38BDF8", radius: 2.7, speed: 0.65, offset: Math.PI * 0.3 },
];

// Single Orbiting Badge Component
function OrbitingBadge({ tech }: { tech: typeof ORBITING_TECHS[0] }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * tech.speed + tech.offset;
    const x = Math.sin(t) * tech.radius;
    const z = Math.cos(t) * tech.radius;
    const y = Math.sin(t * 1.5) * 0.4;
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
            boxShadow: `0 0 12px ${tech.border}40`,
          }}
          className="px-2.5 py-1 text-[11px] font-mono font-bold border-2 rounded-none whitespace-nowrap select-none uppercase tracking-wider transition-transform hover:scale-110"
        >
          &lt;{tech.name} /&gt;
        </div>
      </Html>
    </group>
  );
}

// Procedural Cyber Robot Model
function CyberRobot() {
  const robotGroupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);

  // Materials with dark-mode aesthetic
  const darkMetal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0f111a",
        roughness: 0.25,
        metalness: 0.85,
      }),
    []
  );

  const armorPlate = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#181b29",
        roughness: 0.3,
        metalness: 0.9,
      }),
    []
  );

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

  const pinkEmissive = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FF2A85",
        emissive: "#FF2A85",
        emissiveIntensity: 1.8,
        roughness: 0.1,
      }),
    []
  );

  const yellowEmissive = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FFE600",
        emissive: "#FFE600",
        emissiveIntensity: 2.0,
        roughness: 0.1,
      }),
    []
  );

  const wireframeMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#00F0FF",
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer; // Mouse tracking normalized coords

    // Robot breathing / hover bobbing
    if (robotGroupRef.current) {
      robotGroupRef.current.position.y = Math.sin(t * 1.8) * 0.12;

      // Smooth mouse orientation
      robotGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        robotGroupRef.current.rotation.y,
        x * 0.45,
        0.05
      );
      robotGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        robotGroupRef.current.rotation.x,
        -y * 0.25,
        0.05
      );
    }

    // Head follows cursor more directly
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        x * 0.6,
        0.08
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -y * 0.4,
        0.08
      );
    }

    // Core pulsing reactor
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 4) * 0.15;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Floating arms gentle sway
    if (leftArmRef.current) {
      leftArmRef.current.position.y = Math.sin(t * 2 + 1) * 0.06;
      leftArmRef.current.rotation.z = Math.sin(t * 1.5) * 0.08 + 0.1;
    }
    if (rightArmRef.current) {
      rightArmRef.current.position.y = Math.sin(t * 2 + 2) * 0.06;
      rightArmRef.current.rotation.z = -Math.sin(t * 1.5) * 0.08 - 0.1;
    }

    // Orbiting energy rings rotation
    if (ringsRef.current) {
      ringsRef.current.rotation.x = t * 0.5;
      ringsRef.current.rotation.y = t * 0.8;
    }
  });

  return (
    <group ref={robotGroupRef} position={[0, -0.2, 0]}>
      {/* 3D Wireframe Cyber Base / Tech Halo behind robot */}
      <mesh position={[0, 0, -0.6]} material={wireframeMat}>
        <icosahedronGeometry args={[2.2, 1]} />
      </mesh>

      {/* Energy Rings around Core */}
      <group ref={ringsRef} position={[0, 0.1, 0]}>
        <mesh material={cyanEmissive}>
          <torusGeometry args={[1.1, 0.02, 16, 64]} />
        </mesh>
        <mesh material={pinkEmissive} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.25, 0.015, 16, 64]} />
        </mesh>
      </group>

      {/* ----------------- HEAD GROUP ----------------- */}
      <group ref={headRef} position={[0, 1.05, 0]}>
        {/* Main Head Helmet */}
        <mesh material={armorPlate}>
          <boxGeometry args={[0.75, 0.65, 0.7]} />
        </mesh>

        {/* Outer Head Armor Shell */}
        <mesh position={[0, 0.08, 0]} material={darkMetal}>
          <boxGeometry args={[0.82, 0.55, 0.76]} />
        </mesh>

        {/* Cyber Visor / Faceplate (Glowing Cyan) */}
        <mesh position={[0, 0.02, 0.38]} material={cyanEmissive}>
          <boxGeometry args={[0.62, 0.22, 0.08]} />
        </mesh>

        {/* Visor Glint / HUD Lines */}
        <mesh position={[0, 0.02, 0.43]} material={yellowEmissive}>
          <boxGeometry args={[0.4, 0.04, 0.02]} />
        </mesh>

        {/* Cyber Antenna / Ears */}
        <mesh position={[-0.45, 0.15, 0]} material={pinkEmissive}>
          <cylinderGeometry args={[0.04, 0.04, 0.35, 16]} />
        </mesh>
        <mesh position={[0.45, 0.15, 0]} material={cyanEmissive}>
          <cylinderGeometry args={[0.04, 0.04, 0.35, 16]} />
        </mesh>
        <mesh position={[-0.45, 0.32, 0]} material={yellowEmissive}>
          <sphereGeometry args={[0.06, 16, 16]} />
        </mesh>
        <mesh position={[0.45, 0.32, 0]} material={yellowEmissive}>
          <sphereGeometry args={[0.06, 16, 16]} />
        </mesh>

        {/* Chin Guard */}
        <mesh position={[0, -0.32, 0.2]} material={darkMetal}>
          <boxGeometry args={[0.4, 0.12, 0.3]} />
        </mesh>
      </group>

      {/* ----------------- NECK ----------------- */}
      <mesh position={[0, 0.65, 0]} material={darkMetal}>
        <cylinderGeometry args={[0.2, 0.25, 0.2, 16]} />
      </mesh>

      {/* ----------------- TORSO / CHEST ----------------- */}
      <group position={[0, 0.1, 0]}>
        {/* Main Chest Body */}
        <mesh material={armorPlate}>
          <boxGeometry args={[1.1, 0.95, 0.7]} />
        </mesh>

        {/* Chest Upper Plate */}
        <mesh position={[0, 0.2, 0.1]} material={darkMetal}>
          <boxGeometry args={[1.18, 0.5, 0.65]} />
        </mesh>

        {/* Core Reactor Chamber (Glowing Cyan Sphere) */}
        <mesh ref={coreRef} position={[0, 0.05, 0.36]} material={cyanEmissive}>
          <sphereGeometry args={[0.2, 32, 32]} />
        </mesh>

        {/* Reactor Core Ring Bezel */}
        <mesh position={[0, 0.05, 0.34]} material={pinkEmissive}>
          <torusGeometry args={[0.25, 0.03, 16, 32]} />
        </mesh>

        {/* Lower Abdomen / Spine Links */}
        <mesh position={[0, -0.42, 0]} material={darkMetal}>
          <cylinderGeometry args={[0.35, 0.3, 0.25, 16]} />
        </mesh>
        <mesh position={[0, -0.42, 0.16]} material={yellowEmissive}>
          <boxGeometry args={[0.15, 0.2, 0.05]} />
        </mesh>
      </group>

      {/* ----------------- FLOATING SHOULDERS & ARMS ----------------- */}
      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.85, 0.3, 0]}>
        {/* Shoulder Pad */}
        <mesh material={armorPlate}>
          <boxGeometry args={[0.4, 0.35, 0.45]} />
        </mesh>
        <mesh position={[-0.1, 0.1, 0]} material={cyanEmissive}>
          <boxGeometry args={[0.08, 0.15, 0.3]} />
        </mesh>
        {/* Bicep / Forearm */}
        <mesh position={[-0.05, -0.35, 0.05]} material={darkMetal}>
          <boxGeometry args={[0.22, 0.45, 0.25]} />
        </mesh>
        {/* Cyber Hand / Gripper */}
        <mesh position={[-0.05, -0.65, 0.1]} material={pinkEmissive}>
          <boxGeometry args={[0.18, 0.15, 0.18]} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.85, 0.3, 0]}>
        {/* Shoulder Pad */}
        <mesh material={armorPlate}>
          <boxGeometry args={[0.4, 0.35, 0.45]} />
        </mesh>
        <mesh position={[0.1, 0.1, 0]} material={pinkEmissive}>
          <boxGeometry args={[0.08, 0.15, 0.3]} />
        </mesh>
        {/* Bicep / Forearm */}
        <mesh position={[0.05, -0.35, 0.05]} material={darkMetal}>
          <boxGeometry args={[0.22, 0.45, 0.25]} />
        </mesh>
        {/* Cyber Hand / Gripper */}
        <mesh position={[0.05, -0.65, 0.1]} material={cyanEmissive}>
          <boxGeometry args={[0.18, 0.15, 0.18]} />
        </mesh>
      </group>

      {/* Orbiting Tech Stack Badges */}
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
        camera={{ position: [0, 0, 5.2], fov: isMobile ? 55 : 45 }}
        dpr={[1, 1.5]} // Mobile performance optimization
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          alpha: true,
        }}
        className="w-full h-full"
      >
        {/* Dark-Mode Lighting Setup */}
        <ambientLight intensity={0.4} />
        
        {/* Key Light: Vibrant Electric Cyan */}
        <directionalLight position={[4, 5, 4]} intensity={2.2} color="#00F0FF" />
        
        {/* Rim Light: Hot Purple/Pink for cyber depth */}
        <pointLight position={[-4, 3, -2]} intensity={2.8} color="#A855F7" />
        
        {/* Bottom Fill Light: Acid Lime glow */}
        <pointLight position={[0, -3, 2]} intensity={1.5} color="#A3E635" />

        {/* Floating Cyber Particle Dust */}
        <Sparkles
          count={isMobile ? 35 : 70}
          scale={7}
          size={isMobile ? 3 : 4}
          speed={0.6}
          color="#00F0FF"
          opacity={0.7}
        />

        {/* Float Wrapper with smooth damping */}
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
          <CyberRobot />
        </Float>
      </Canvas>

      {/* Neobrutalist Corner Badge Overlay */}
      <div className="absolute bottom-2 right-2 bg-brutal-surface border-2 border-black px-2.5 py-1 shadow-brutal-sm font-mono text-[10px] text-white/70 flex items-center gap-1.5 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-brutal-cyan animate-pulse" />
        <span>THREE_JS // R3F_ENGINE</span>
      </div>
    </div>
  );
}
