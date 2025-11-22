"use client";

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function HeroCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.6 }}
      className="flex flex-wrap gap-4"
    >
      {/* CTA Primario */}
      <Link href="/propiedades">
        <motion.button
          className="relative group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl overflow-hidden shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Efecto de glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Efecto de brillo que se mueve */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />

          {/* Contenido del botón */}
          <span className="relative flex items-center gap-2">
            Explorar Propiedades
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>

          {/* Efecto de sombra */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity -z-10" />
        </motion.button>
      </Link>

      {/* CTA Secundario */}
      <Link href="https://wa.me/5493482683136" target="_blank" rel="noopener noreferrer">
        <motion.button
          className="group px-8 py-4 bg-white/10 backdrop-blur-md text-white font-medium rounded-xl border border-white/20 hover:bg-white/15 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Recibir Asesoramiento
          </span>
        </motion.button>
      </Link>
    </motion.div>
  );
}