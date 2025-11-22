"use client";

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroBackground from './HeroBackground';
import HeroGif from './HeroGif';
import HeroContent from './HeroContent';
import HeroIndicators from './HeroIndicators';
import { ChevronDown } from 'lucide-react';

export default function HeroModern() {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0e27]">
      {/* Capa 1: Fondo con gradiente y partículas */}
      <HeroBackground />

      {/* Capa 2: GIF Casa con efectos */}
      <HeroGif scrollY={scrollY} />

      {/* Capa 3: Contenido Principal */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center">
        <div className="max-w-2xl">
          {/* Badge de actividad */}
          <HeroIndicators />

          {/* Contenido principal */}
          <HeroContent />
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ChevronDown className="w-6 h-6 text-white/50" />
      </motion.div>
    </section>
  );
}