'use client'

import React, { useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PropertyMiniMap } from '@/components/PropertyMiniMap'
import { Property } from '@/lib/supabase'
import { Home, MapPin, Bed, Bath, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react'

interface FeaturedPropertiesSliderProps {
  properties: Property[]
}

const OPTIONS: EmblaOptionsType = {
  align: 'start',
  loop: true,
  skipSnaps: false,
  inViewThreshold: 0.7,
  breakpoints: {
    '(min-width: 768px)': { 
      slidesToScroll: 2,
      align: 'start'
    },
    '(min-width: 1024px)': { 
      slidesToScroll: 3,
      align: 'start'
    }
  }
}

export function FeaturedPropertiesSlider({ properties }: FeaturedPropertiesSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({ 
      delay: 5000, 
      stopOnInteraction: true,
      stopOnMouseEnter: true 
    })
  ])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    
    onSelect()
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
    
    return () => {
      emblaApi.off('reInit', onSelect)
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-premium-xl">
        <Home className="w-16 h-16 text-premium-secondary mx-auto mb-premium-md opacity-40" />
        <h3 className="heading-lg text-premium-primary mb-premium-sm">
          Propiedades en preparación
        </h3>
        <p className="body-md text-premium-secondary">
          Estamos seleccionando las mejores propiedades para ti
        </p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Navegación integrada - Flechas en la esquina superior derecha */}
      <div className="flex justify-end gap-2 mb-6">
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="p-2 rounded-full border border-slate-700 text-white hover:bg-slate-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="p-2 rounded-full border border-slate-700 text-white hover:bg-slate-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slider Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-3"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="h-full"
              >
                {/* Tarjeta Profesional Mejorada */}
                <div className="group bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800 hover:border-orange-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 h-full flex flex-col">

                  {/* Área de Imagen - Aspect ratio 4:3 */}
                  <Link href={`/propiedades/${property.id}`}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      {property.images && property.images.length > 0 ? (
                        <Image
                          src={property.images[0]}
                          alt={property.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.svg";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                          <div className="text-slate-500 text-center">
                            <Home className="w-12 h-12 mx-auto mb-2 opacity-40" />
                            <p className="text-xs font-medium">Sin imagen</p>
                          </div>
                        </div>
                      )}

                      {/* Badge de Estado (Top Left) */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          {property.operation_type === "venta" ? "VENTA" : "ALQUILER"}
                        </div>
                      </div>

                      {/* Precio (Bottom Right - Limpio sobre fondo oscuro) */}
                      <div className="absolute bottom-4 right-4">
                        <div className="bg-slate-900/90 backdrop-blur text-white font-bold px-4 py-2 rounded-lg border border-slate-700">
                          {property.currency}$ {property.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Área de Contenido */}
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Título */}
                    <Link href={`/propiedades/${property.id}`}>
                      <h3 className="text-xl font-bold text-white mb-1 hover:text-orange-400 transition-colors line-clamp-1">
                        {property.title}
                      </h3>
                    </Link>

                    {/* Ubicación */}
                    <div className="flex items-center text-slate-400 text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                      <span className="truncate">{property.neighborhood}, Reconquista</span>
                    </div>

                    {/* Separador */}
                    <div className="h-px w-full bg-slate-800 mb-4"></div>

                    {/* Features - Iconografía clara con color naranjo */}
                    {(property.bedrooms || property.bathrooms || property.area_m2) && (
                      <div className="flex justify-between items-center text-slate-300 mt-auto">
                        {property.bedrooms && (
                          <div className="flex items-center gap-2">
                            <Bed className="w-5 h-5 text-orange-500" />
                            <span className="text-sm font-medium">{property.bedrooms} Hab</span>
                          </div>
                        )}
                        {property.bathrooms && (
                          <div className="flex items-center gap-2">
                            <Bath className="w-5 h-5 text-orange-500" />
                            <span className="text-sm font-medium">{property.bathrooms} Baños</span>
                          </div>
                        )}
                        {property.area_m2 && (
                          <div className="flex items-center gap-2">
                            <Maximize2 className="w-5 h-5 text-orange-500" />
                            <span className="text-sm font-medium">{property.area_m2} m²</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Counter */}
      <div className="text-center mt-6">
        <p className="text-slate-400 text-sm">
          Mostrando {Math.min(3, properties.length)} de {properties.length} propiedades destacadas
        </p>
      </div>
    </div>
  )
}