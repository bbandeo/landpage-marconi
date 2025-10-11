'use client'

import React from 'react'
import Image from 'next/image'
import { Home } from 'lucide-react'

/**
 * Props for PropertyImageCarousel component
 */
interface PropertyImageCarouselProps {
  images: string[]
  propertyTitle: string
  propertyId: number
  onImageClick?: () => void
}

/**
 * Placeholder component shown when no images are available
 */
function PlaceholderImage() {
  return (
    <div className="relative aspect-[4/3] bg-night-blue/80 flex items-center justify-center rounded-t-2xl">
      <div className="text-center">
        <Home className="w-12 h-12 mx-auto mb-2 text-support-gray/40" />
        <p className="text-sm text-support-gray">Sin imágenes disponibles</p>
      </div>
    </div>
  )
}

/**
 * Single image component shown when property has only one image
 * No carousel controls needed for single images
 */
function SingleImage({ image, title }: { image: string; title: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
      <Image
        src={image}
        alt={`${title} - Vista principal`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        priority
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = '/placeholder.svg'
        }}
      />
    </div>
  )
}

/**
 * PropertyImageCarousel Component
 *
 * Displays property images in a carousel format with navigation controls.
 * Handles special cases: no images, single image, and multiple images.
 *
 * Features:
 * - Embla Carousel integration (to be implemented in next task)
 * - Navigation controls (prev/next arrows)
 * - Position indicators (dots)
 * - Touch/swipe gestures
 * - Keyboard navigation
 * - Accessibility support
 *
 * Requirements covered: 3.1, 3.8, 2.5
 */
export function PropertyImageCarousel({
  images,
  propertyTitle,
  propertyId,
  onImageClick,
}: PropertyImageCarouselProps) {
  // Handle case: No images available
  if (!images || images.length === 0) {
    return <PlaceholderImage />
  }

  // Handle case: Single image (no carousel needed)
  if (images.length === 1) {
    return <SingleImage image={images[0]} title={propertyTitle} />
  }

  // Multiple images - Full carousel implementation
  // TODO: Integrate Embla Carousel in next task
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-night-blue/80">
      <div className="text-center p-8">
        <p className="text-sm text-support-gray">
          Carrusel con {images.length} imágenes (Embla integration pendiente)
        </p>
      </div>
    </div>
  )
}

export default PropertyImageCarousel
