import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, PerspectiveCamera } from "@react-three/drei";

/**
 * The Sphere Component
 * This part handles the 3D geometry and the per-frame animation logic.
 */
function SphereMesh() {
  const sphereRef = useRef();

  // useFrame runs 60 times per second
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Subtle rotation so the highlights move across the surface
    sphereRef.current.rotation.x = t * 0.15;
    sphereRef.current.rotation.y = t * 0.2;
  });

  return (
    // Float adds a gentle "hovering" up and down motion
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={sphereRef} args={[1, 100, 100]} scale={2.4}>
        <MeshDistortMaterial
          color="#4f46e5"     // Indigo color
          attach="material"
          distort={0.4}       // Amount of "liquid" distortion (0 to 1)
          speed={2}           // Speed of the distortion pulse
          roughness={0.1}     // Low roughness = shiny
          metalness={0.8}     // High metalness = reflective
        />
      </Sphere>
    </Float>
  );
}

/**
 * The Main Canvas Container
 * Use this in your Landing Page. It includes the lights and camera.
 */
export default function AnimatedSphere() {
  return (
    <div className="w-full h-[500px] cursor-grab active:cursor-grabbing">
      <Canvas>
        {/* PerspectiveCamera sets the "eye" of the user */}
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        {/* Ambient light provides base visibility */}
        <ambientLight intensity={0.5} />
        
        {/* Directional/Point lights create the shadows and shiny highlights */}
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#4f46e5" intensity={1} />
        
        <SphereMesh />
      </Canvas>
    </div>
  );
}