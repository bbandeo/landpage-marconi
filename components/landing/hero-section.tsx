"use client"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { getOptimizedImageUrl } from "@/lib/cloudinary"

export function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col">
      <div className="absolute inset-0">
        <Image
          src={getOptimizedImageUrl("gustavo-papasergio-emoKYb99CRI-unsplash_w6gipy", {
            width: 1920,
            height: 1080,
            crop: "fill",
            quality: "auto",
            format: "auto",\
           || "/placeholder.svg\"})}\
          alt=\"Reconquista - Marconi Inmobiliaria"\
          fill\
          className="object-cover"\
          priority
        />
        <div className="absolute inset-0 bg-black/50" />\
        <div className="absolute inset-0">
          <div
            className="absolute bottom-0 left-0 right-0 h-3/4"
            style={{
              background: `linear-gradient(to top, rgba(255, 107, 53, 0.6) 0%, rgba(255, 140, 0, 0.5) 15%, rgba(255, 165, 0, 0.4) 30%, rgba(255, 140, 0, 0.3) 45%, rgba(255, 107, 53, 0.2) 60%, rgba(255, 140, 0, 0.1) 75%, transparent 100%)`,
              backdropFilter: "blur(2px)",
            }}
          />\
        </div>
      </div>
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 pt-20 md:pt-0">
        <div className="container mx-auto text-center max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-16 md:mb-24"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-tight tracking-wide">
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="block mb-4 md:mb-6">
                No esperes más,
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="block mb-4 md:mb-6 font-normal">
                encuentra el hogar ideal
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }} className="block text-gray-200">
                con nosotros.
              </motion.span>
            </h1>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8 }} className="mt-auto mb-8 md:mb-12 text-center">
          <div className="text-white">
            <div className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.2em] mb-2">MARCONI</div>
            <div className="text-sm md:text-base text-gray-300 font-light tracking-[0.3em] uppercase">Negocios Inmobiliarios</div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }} className="hidden md:flex absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} className="flex flex-col items-center text-white/60">
            <div className="w-px h-8 bg-white/30 mb-2"></div>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
