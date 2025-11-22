"use client";

import { motion } from "framer-motion";
import { HeroSearchBar } from "@/components/HeroSearchBar";
import HeroCTA from "./HeroCTA";

const headline = [
  { text: "Arquitectura", accent: false },
  { text: "lumínica", accent: true },
  { text: "para", accent: false },
  { text: "elegir", accent: false },
  { text: "tu", accent: false },
  { text: "próxima", accent: true },
  { text: "casa", accent: false },
];

const metrics = [
  { label: "Tiempo promedio", value: "72s" },
  { label: "Experiencias guiadas", value: "24/7" },
  { label: "Clientes felices", value: "98%" },
];

export default function HeroContent() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className="text-balance text-[clamp(2.6rem,4.6vw,4.8rem)] font-semibold leading-[1.05]"
        >
          {headline.map(({ text, accent }, index) => (
            <motion.span
              key={`${text}-${index}`}
              className={`mr-3 inline-block ${
                accent ? "text-transparent bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text" : ""
              }`}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
            >
              {text}
            </motion.span>
          ))}
        </h1>
      </motion.div>

      <motion.p
        className="mt-6 text-lg text-white/70"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Diseñamos experiencias inmobiliarias envolventes con datos en tiempo real,
        realidad inmersiva y el toque humano que caracteriza a Marconi.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-8"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md" />
          <div className="relative p-2">
            <HeroSearchBar />
          </div>
        </div>
      </motion.div>

      <div className="mt-8">
        <HeroCTA />
      </div>

      <motion.div
        className="mt-10 flex flex-wrap gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex flex-col rounded-2xl border border-white/10 px-4 py-3"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">
              {metric.label}
            </span>
            <span className="text-xl font-semibold text-white">{metric.value}</span>
          </div>
        ))}
      </motion.div>
    </>
  );
}