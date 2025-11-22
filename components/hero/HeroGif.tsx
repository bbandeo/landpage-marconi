"use client";

import { useEffect, useState } from 'react';
import { motion, MotionValue, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

interface HeroGifProps {
  scrollY: MotionValue<number>;
}

export default function HeroGif({ scrollY }: HeroGifProps) {
  const [mounted, setMounted] = useState(false);

  // Mouse tracking para efecto magnético
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring suave para el movimiento
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // Parallax suave
  const gifY = useTransform(scrollY, [0, 500], [0, -50]);
  const gifScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  // Transformaciones 3D basadas en el mouse
  const rotateX = useTransform(smoothMouseY, [-20, 20], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [-20, 20], [-5, 5]);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!mounted) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normalizar posición del mouse (-20 a 20)
      const x = (clientX - innerWidth / 2) / 25;
      const y = (clientY - innerHeight / 2) / 25;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mounted, mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[35%] md:w-[40%] max-w-[600px] z-[5]"
      style={{
        y: gifY,
        scale: gifScale,
        x: smoothMouseX,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
      initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)"
      }}
      transition={{
        duration: 1.2,
        ease: [0.215, 0.61, 0.355, 1.0],
        opacity: { duration: 0.8 },
        scale: { duration: 1.2 },
        filter: { duration: 1.0 }
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <div className="relative">
        {/* GIF principal */}
        <div className="relative">
          <Image
            src="/assets/hero/casa.gif"
            alt="Casa Marconi - Encontrá tu hogar"
            width={600}
            height={400}
            className="w-full h-auto rounded-lg"
            priority
            unoptimized
          />

          {/* Overlay con gradiente sutil */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27]/20 to-transparent rounded-lg pointer-events-none" />
        </div>

        {/* Efecto de glow naranja */}
        <div className="absolute inset-0 -z-10 blur-3xl opacity-50">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-orange-400/20 to-transparent" />
        </div>

        {/* Partículas orbitantes alrededor del GIF */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/40 rounded-full blur-sm"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: [
                Math.cos((i * 120) * Math.PI / 180) * 150,
                Math.cos((i * 120 + 360) * Math.PI / 180) * 150
              ],
              y: [
                Math.sin((i * 120) * Math.PI / 180) * 150,
                Math.sin((i * 120 + 360) * Math.PI / 180) * 150
              ],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Pulso de energía */}
        <motion.div
          className="absolute inset-0 rounded-lg border border-orange-500/20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}