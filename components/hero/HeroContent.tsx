"use client";

import { motion } from 'framer-motion';
import HeroCTA from './HeroCTA';
import { HeroSearchBar } from '@/components/HeroSearchBar';
import { Star, TrendingUp } from 'lucide-react';

export default function HeroContent() {
  const words = ["Encontrá", "tu", "lugar", "en", "el", "mundo"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1.0]
      }
    }
  };

  return (
    <>
      {/* Headline con efecto de revelado */}
      <motion.h1
        className="text-white font-bold mb-6 leading-tight"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.25em] last:mr-0"
            variants={wordVariants}
          >
            {word === "mundo" ? (
              <span className="relative">
                {word}
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 1.5,
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                />
              </span>
            ) : (
              word
            )}
          </motion.span>
        ))}
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed"
      >
        Tecnología inmobiliaria + Conocimiento local =
        <span className="text-orange-400 font-semibold"> Tu hogar perfecto</span>
      </motion.p>

      {/* Buscador mejorado con glass morphism */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="mb-8"
      >
        <div className="relative">
          {/* Efecto de glass morphism */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-xl border border-white/10" />
          <div className="relative p-1">
            <HeroSearchBar />
          </div>
        </div>
      </motion.div>

      {/* CTAs */}
      <HeroCTA />

      {/* Social proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="flex flex-wrap items-center gap-4 md:gap-6 mt-8"
      >
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < 4 ? 'text-yellow-400 fill-current' : 'text-yellow-400/30'
                }`}
              />
            ))}
          </div>
          <span className="text-white/80 text-sm">4.9/5 (127 reviews)</span>
        </div>

        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-white/80 text-sm">+200 propiedades vendidas</span>
        </div>

        <motion.div
          className="flex items-center gap-2"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-green-400 text-sm">Disponible ahora</span>
        </motion.div>
      </motion.div>
    </>
  );
}