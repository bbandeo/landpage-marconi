"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

interface PageHeroProps {
  title: React.ReactNode;
  description: string;
  backgroundImage: string;
  alt: string;
}

export function PageHero({ title, description, backgroundImage, alt }: PageHeroProps) {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background Image and Overlay */}
      <div className="absolute inset-0">
        <Image
          src={getOptimizedImageUrl(backgroundImage, {
            width: 1920,
            height: 1080,
            quality: "auto",
            format: "auto",
          })}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl px-4"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          {description}
        </p>
      </motion.div>
    </section>
  );
}
