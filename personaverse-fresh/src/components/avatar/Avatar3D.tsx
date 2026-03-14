"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Default fallback - uses procedural avatar
const DEFAULT_AVATAR = "";

// Procedural Avatar - fallback when no GLB is provided
function ProceduralAvatar({ isSpeaking = false }: { isSpeaking?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const mouthRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
    
    if (mouthRef.current && isSpeaking) {
      mouthRef.current.scale.y = 0.5 + Math.sin(state.clock.elapsedTime * 15) * 0.3;
    } else if (mouthRef.current) {
      mouthRef.current.scale.y = 0.5;
    }
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.4, 0.6, 1.5, 32]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      <mesh position={[-0.15, 0.4, 0.4]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.15, 0.4, 0.4]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[-0.13, 0.43, 0.46]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.17, 0.43, 0.46]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh ref={mouthRef} position={[0, 0.15, 0.45]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.08, 0.15, 4, 8]} />
        <meshStandardMaterial color="#7c2d12" />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.52, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[-0.55, 0.3, 0]}>
        <torusGeometry args={[0.15, 0.05, 8, 16]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      <mesh position={[0.55, 0.3, 0]}>
        <torusGeometry args={[0.15, 0.05, 8, 16]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      <mesh position={[0, 0.3, -0.5]}>
        <torusGeometry args={[0.5, 0.03, 8, 32, Math.PI]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
    </group>
  );
}

// CC4/Reallusion Avatar Loader
function CC4Avatar({ 
  avatarUrl, 
  isSpeaking = false,
  onLoad
}: { 
  avatarUrl: string; 
  isSpeaking?: boolean;
  onLoad?: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(avatarUrl);
  const [mixer] = useState(() => new THREE.AnimationMixer(scene));
  
  useEffect(() => {
    if (animations.length > 0) {
      const action = mixer.clipAction(animations[0]);
      action.play();
    }
    onLoad?.();
  }, [animations, mixer, onLoad]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 1) * 0.01;
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
    }
    mixer.update(delta);
  });

  return (
    <group ref={group} position={[0, -1.8, 0]} scale={1.8}>
      <primitive object={scene} />
    </group>
  );
}

interface Avatar3DProps {
  avatarUrl?: string;
  isSpeaking?: boolean;
  onLoad?: () => void;
}

export function Avatar3D({ avatarUrl, isSpeaking = false, onLoad }: Avatar3DProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Environment preset="city" />
        
        {avatarUrl ? (
          <CC4Avatar avatarUrl={avatarUrl} isSpeaking={isSpeaking} onLoad={onLoad} />
        ) : (
          <ProceduralAvatar isSpeaking={isSpeaking} />
        )}
        
        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={4} 
        />
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 1.8}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
