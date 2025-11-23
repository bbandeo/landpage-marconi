'use client'

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Bed, Bath, Square, Eye } from "lucide-react"
import Link from "next/link"
import type { Property as PropertyType } from "@/lib/supabase"
import PropertyImageCarousel from "@/components/PropertyImageCarousel"

interface Property extends PropertyType {
  operation: "sale" | "rent"
  type: "house" | "apartment" | "commercial" | "terreno" | "local"
}

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const shouldShowRoomInfo = property.type !== 'terreno';

  // Normalizar formato de moneda: "USD", "ARS", etc. sin duplicar símbolos
  const formatCurrency = (currency: string | undefined): string => {
    if (!currency) return 'USD';
    // Eliminar símbolos duplicados como "USD$" -> "USD"
    return currency.replace(/\$+/g, '').trim().toUpperCase();
  };

  return (
    <Card className="group overflow-hidden bg-[#1E1E1E] backdrop-blur-md border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl hover:-translate-y-1.5 flex flex-col h-full">
      {/* LAYOUT VERTICAL - CARRUSEL ARRIBA + CONTENIDO ABAJO */}

      {/* CARRUSEL DE IMÁGENES - Ocupa parte superior de la tarjeta */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
          <PropertyImageCarousel
            images={property.images || []}
            propertyTitle={property.title}
            propertyId={property.id}
          />
        </div>

        {/* Featured badge - INFERIOR DERECHA */}
        {property.featured && (
          <div className="absolute bottom-4 right-4 z-20 backdrop-blur-sm bg-white/90 text-gray-800 px-3 py-1 rounded-sm text-[10px] font-medium uppercase tracking-[1.5px] shadow-lg flex items-center gap-1.5">
            <Eye className="w-3 h-3" strokeWidth={2} />
            DESTACADA
          </div>
        )}
      </div>

      {/* CONTENIDO DE LA PROPIEDAD - CON FLEXBOX PARA ALINEAR BOTÓN AL FONDO */}
      <CardContent className="p-6 flex flex-col flex-1">
        {/* SECCIÓN SUPERIOR: PRECIO Y TÍTULO */}
        <div className="mb-4 flex-1">
          {/* Precio destacado - 1º NIVEL DE JERARQUÍA */}
          <div className="mb-4">
            {property.price > 0 ? (
              <>
                <div className="text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">{formatCurrency(property.currency)}</div>
                <div className="text-[22px] font-bold text-white tracking-tight leading-none">
                  ${property.price.toLocaleString()}
                </div>
                {property.operation === "rent" && (
                  <div className="text-xs text-gray-500 mt-1">por mes</div>
                )}
              </>
            ) : (
              <div className="text-[22px] font-bold text-orange-500 tracking-tight">
                A Consultar
              </div>
            )}
          </div>

          {/* Título - LIMITADO A 1 LÍNEA CON ELLIPSIS */}
          <Link href={`/propiedades/${property.id}`}>
            <h3 className="font-semibold text-white text-lg mb-3 hover:text-orange-500 transition-colors cursor-pointer truncate">
              {property.title}
            </h3>
          </Link>

          {/* Ubicación - 2º NIVEL DE JERARQUÍA */}
          <div className="flex items-center text-[#AAAAAA] font-normal text-sm mb-4">
            <MapPin className="w-4 h-4 mr-1.5 text-gray-500 flex-shrink-0" strokeWidth={1.5} />
            <span className="truncate">{property.neighborhood}, Reconquista</span>
          </div>

          {/* CARACTERÍSTICAS ESENCIALES - 3º NIVEL DE JERARQUÍA */}
          {(() => {
            const hasCharacteristics = property.bedrooms || property.bathrooms || property.area_m2;
            return hasCharacteristics && (
              <div className="flex items-center gap-5 mb-4 text-gray-400">
                {property.area_m2 && (
                  <div className="flex items-center text-sm">
                    <Square className="w-4 h-4 mr-1.5 text-gray-500" strokeWidth={1.5} />
                    <span className="font-medium text-gray-300">{property.area_m2}m²</span>
                  </div>
                )}
                {shouldShowRoomInfo && property.bedrooms && (
                  <>
                    {property.area_m2 && <div className="w-px h-4 bg-gray-700" />}
                    <div className="flex items-center text-sm">
                      <Bed className="w-4 h-4 mr-1.5 text-gray-500" strokeWidth={1.5} />
                      <span className="font-medium text-gray-300">{property.bedrooms} dorm.</span>
                    </div>
                  </>
                )}
                {shouldShowRoomInfo && property.bathrooms && (
                  <>
                    {(property.area_m2 || property.bedrooms) && <div className="w-px h-4 bg-gray-700" />}
                    <div className="flex items-center text-sm">
                      <Bath className="w-4 h-4 mr-1.5 text-gray-500" strokeWidth={1.5} />
                      <span className="font-medium text-gray-300">{property.bathrooms} baños</span>
                    </div>
                  </>
                )}
              </div>
            );
          })()}

          {/* FEATURES BADGES */}
          {property.features && property.features.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {property.features.slice(0, 3).map((feature, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-white/5 text-gray-400 border border-white/10 px-2.5 py-0.5 rounded-lg text-xs font-medium"
                  >
                    {feature}
                  </Badge>
                ))}
                {property.features.length > 3 && (
                  <Badge
                    variant="outline"
                    className="text-gray-400 border-white/10 px-2.5 py-0.5 rounded-lg text-xs"
                  >
                    +{property.features.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {/* BOTÓN CTA - NIVEL 2: Ghost Button (Architectural Sharp) */}
        <Link href={`/propiedades/${property.id}`} className="block mt-auto">
          <Button className="w-full bg-transparent border border-gray-400 hover:bg-white hover:border-white text-gray-300 hover:text-gray-900 font-medium py-2.5 px-4 rounded-sm transition-all duration-300 text-sm tracking-wide uppercase">
            Ver propiedad
            <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default PropertyCard
