'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 2000 }) {
  const mesh = useRef();
  const { mouse, viewport } = useThree();

  // Cria as posições iniciais das partículas de farinha
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 5;
      const size = Math.random() * 0.015 + 0.005;
      const speed = Math.random() * 0.01 + 0.002;
      temp.push({ x, y, z, size, speed, ox: x, oy: y });
    }
    return temp;
  }, [count]);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count]);

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.2)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    const positions = geo.attributes.position.array;
    
    particles.forEach((p, i) => {
      // Movimento de deriva orgânica (vento sutil)
      p.x += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;
      p.y += Math.cos(state.clock.elapsedTime * 0.3 + i) * 0.002;

      // Interatividade com o mouse
      const mx = (mouse.x * viewport.width) / 2;
      const my = (mouse.y * viewport.height) / 2;
      
      const dx = p.x - mx;
      const dy = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 2) {
        const force = (2 - dist) * 0.02;
        p.x += (dx / dist) * force;
        p.y += (dy / dist) * force;
      } else {
        p.x += (p.ox - p.x) * 0.01;
        p.y += (p.oy - p.y) * 0.01;
      }

      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh} geometry={geo}>
      <pointsMaterial
        size={0.08}
        map={texture}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function FlourParticles({ density = 1500, opacity = 0.4 }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0" style={{ opacity }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <Particles count={density} />
      </Canvas>
    </div>
  );
}
