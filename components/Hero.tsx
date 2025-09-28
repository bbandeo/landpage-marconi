"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface HeroProps {
  backgroundImage: string
  alt: string
  title: string | ReactNode
  description: string
  showCounter?: boolean
  counterText?: string
  counterValue?: number
  withAnimation?: boolean
  imageClassName?: string
  children?: ReactNode
}

export default function Hero({
  backgroundImage,
  alt,
  title,
  description,
  showCounter = false,
  counterText,
  counterValue,
  withAnimation = false,
  imageClassName = "object-cover",
  children
}: HeroProps) {
  const ContentWrapper = withAnimation ? motion.div : 'div'

  return (
    <section className="relative section-premium overflow-hidden hero-viewport-height">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={alt}
          fill
          className={imageClassName}
          priority
        />
        {/* Premium overlay */}
        <div className="absolute inset-0 bg-night-blue/50" />
        {/* Orange fade overlay - imported effect - Enhanced overlay for better text contrast */}
        <div className="absolute inset-x-0 bottom-0 h-32 md:h-48 bg-gradient-to-t from-orange-600/85 via-orange-500/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Page Title - PREMIUM TYPOGRAPHY */}
        <ContentWrapper
          {...(withAnimation && {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8 }
          })}
          className="text-center py-12 md:py-16"
        >
          <h1 className="hero-title mb-8 text-white">
            {title}
          </h1>
          {description && description.trim() !== "" && (
            <div className="mb-6 max-w-4xl mx-auto">
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/10">
                <p className="body-text text-white text-center font-medium">
                  {description}
                </p>
              </div>
            </div>
          )}
          {showCounter && counterValue !== undefined && (
            <div className="secondary-text text-center mb-8">
              <p className="text-white/80">{counterValue} {counterText}</p>
            </div>
          )}
        </ContentWrapper>

        {/* Additional Content (e.g., filters) */}
        {children}
      </div>
    </section>
  )
}