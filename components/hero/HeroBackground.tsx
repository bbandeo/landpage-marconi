"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function HeroBackground() {
  const beams = useMemo(
    () =>
      Array.from({ length: 3 }, (_, index) => ({
        id: index,
        delay: index * 1.2,
        top: `${20 + index * 18}%`,
      })),
    []
  );

  const sparks = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 4,
        duration: 6 + Math.random() * 6,
      })),
    []
  );

  return (
    <>
      <div className="absolute inset-0 bg-[#04040c]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#060a1b] via-[#05050f] to-[#020205]" />

      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 40px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 40px)",
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] h-[32rem] w-[32rem] rounded-full bg-orange-500/10 blur-[180px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[28rem] w-[28rem] rounded-full bg-purple-500/10 blur-[160px]" />
      </div>

      <div className="absolute inset-0">
        {beams.map((beam) => (
          <motion.div
            key={beam.id}
            className="absolute left-[55%] h-48 w-px bg-gradient-to-b from-transparent via-orange-400/40 to-transparent"
            style={{ top: beam.top }}
            animate={{ opacity: [0, 1, 0], scaleY: [0.7, 1.2, 0.8] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: beam.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0">
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            className="absolute h-1 w-1 rounded-full bg-orange-300"
            style={{ left: spark.left }}
            animate={{
              y: ["120%", "-10%"],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: spark.duration,
              repeat: Infinity,
              delay: spark.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </>
  );
}