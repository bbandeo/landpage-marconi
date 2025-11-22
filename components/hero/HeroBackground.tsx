"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; duration: number }>>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set window dimensions
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    // Generate particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      duration: 20 + Math.random() * 20
    }));
    setParticles(newParticles);

    // Update dimensions on resize
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Gradiente de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#141826] to-[#0a0e27]" />

      {/* Overlay con patrón sutil */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 107, 53, 0.05) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Partículas animadas */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 107, 53, 0.3) 0%, transparent 70%)',
              boxShadow: '0 0 4px rgba(255, 107, 53, 0.2)'
            }}
            initial={{
              x: particle.x,
              y: dimensions.height + 20
            }}
            animate={{
              y: -20,
              x: particle.x + (Math.random() - 0.5) * 200,
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              opacity: {
                times: [0, 0.1, 0.9, 1]
              }
            }}
          />
        ))}
      </div>

      {/* Gradiente radial desde el centro */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent blur-3xl" />
        </div>
      </div>
    </>
  );
}