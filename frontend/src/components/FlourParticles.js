'use client';

import { useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 1500 }) {

  // Cria as posições iniciais das partículas de farinha
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 5;
      temp.push({ x, y, z, ox: x, oy: y });
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
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const i3 = i * 3;

      // Movimento de deriva orgânica (vento sutilmente mais ágil)
      p.x += Math.sin(time * 0.8 + i) * 0.003;
      p.y += Math.cos(time * 0.6 + i) * 0.003;

      // Retorno contínuo e suave à origem para não se perderem na tela com o tempo
      p.x += (p.ox - p.x) * 0.01;
      p.y += (p.oy - p.y) * 0.01;

      positions[i3] = p.x;
      positions[i3 + 1] = p.y;
      positions[i3 + 2] = p.z;
    }

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points geometry={geo}>
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
