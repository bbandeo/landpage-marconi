"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import HeroBackground from "./HeroBackground";
import HeroGif from "./HeroGif";
import HeroContent from "./HeroContent";
import HeroIndicators from "./HeroIndicators";

export default function HeroModern() {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#050712] text-white">
      <HeroBackground />

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#05060f] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur"
          >
            <Sparkles className="w-4 h-4 text-orange-300" />
            <span className="text-xs tracking-[0.3em] uppercase text-white/70">
              Marconi Inside
            </span>
            <span className="text-xs text-white/60">Experiencias inmersivas 2025</span>
          </motion.div>
        </div>

        <div className="mt-12 grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_0.9fr]">
          <div className="space-y-10">
            <HeroContent />
            <HeroIndicators />
          </div>
          <HeroGif scrollY={scrollY} />
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
      >
        <span className="text-xs tracking-[0.5em] uppercase">Scroll</span>
        <div className="flex items-center justify-center rounded-full border border-white/10 p-2">
          <ChevronDown className="w-5 h-5" />
        </div>
      </motion.div>
    </section>
  );
}