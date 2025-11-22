"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroCTA() {
  return (
    <motion.div
      className="flex flex-wrap gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6 }}
    >
      <Link href="/propiedades">
        <motion.button
          className="group relative overflow-hidden rounded-full border border-white/20 bg-gradient-to-r from-orange-500 to-pink-500 px-10 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-[0_20px_60px_rgba(255,138,76,0.35)]"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: ["-100%", "120%"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <span className="relative flex items-center gap-3 text-base">
            Explorar catálogo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </motion.button>
      </Link>

      <Link href="https://wa.me/5493482683136" target="_blank" rel="noopener noreferrer">
        <motion.button
          className="group rounded-full border border-white/15 bg-white/5 px-8 py-4 text-white/80 backdrop-blur"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="flex items-center gap-2 text-base">
            <MessageCircle className="h-4 w-4" />
            Hablar con un especialista
          </span>
        </motion.button>
      </Link>
    </motion.div>
  );
}
