/**
 * 3D "R" Logo Component for Reaction
 *
 * Purpose: Renders a 3D "R" logo using React Three Fiber
 * Features:
 * - 3D text with depth and beveling
 * - Purple/pink gradient material matching the theme
 * - Subtle rotation animation
 * - Optimized for UI/UX design aesthetic
 */

"use client"

import { Canvas } from "@react-three/fiber"
import { Text3D, Center, Environment } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type * as THREE from "three"

function AnimatedLogo() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Subtle rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <Center>
      <Text3D
        ref={meshRef}
        font="/fonts/Geist_Bold.json" // Fixed font path from Geist-Bold.json to Geist_Bold.json
        size={1.2}
        height={0.3}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.05}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        R
        <meshStandardMaterial
          color="#a78bfa"
          metalness={0.6}
          roughness={0.2}
          emissive="#f9a8d4"
          emissiveIntensity={0.3}
        />
      </Text3D>
    </Center>
  )
}

export default function ReactionLogo3D() {
  return (
    <div className="w-12 h-12">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f9a8d4" />
        <Environment preset="studio" />
        <AnimatedLogo />
      </Canvas>
    </div>
  )
}
