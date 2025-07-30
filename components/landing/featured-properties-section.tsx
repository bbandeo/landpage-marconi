"use client"
import { motion } from "framer-motion"
import { MapPin, Bed, Bath, Square, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getOptimizedImageUrl } from "@/lib/cloudinary"
import Link from "next/link"
import Image from "next/image"
import type { Property } from "@/lib/types"
import type { ElementType } from "react"
import { formatPrice, PROPERTY_TYPES, IMAGE_OPTIMIZATION } from "@/lib/constants"

const getPropertyTypeLabel = (type: string) => {
  return PROPERTY_TYPES[type as keyof typeof PROPERTY_TYPES] || type
}

const PropertyFeature = ({ icon: Icon, value }: { icon: ElementType; value: string | number }) => (
  <div className="flex items-center gap-1 text-sm">
    <Icon className="h-4 w-4" />
    <span>{value}</span>
  </div>
)

const PropertyCard = ({ property, index }: { property: Property; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
    <Card className="bg-card border-border hover:border-brand-orange transition-all duration-300 overflow-hidden group shadow-lg">
      <div className="relative">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={getOptimizedImageUrl(property.images[0], {
              width: IMAGE_OPTIMIZATION.PROPERTY_CARD.width,
              height: IMAGE_OPTIMIZATION.PROPERTY_CARD.height,
              crop: "fill",
              quality: IMAGE_OPTIMIZATION.QUALITY,
              format: IMAGE_OPTIMIZATION.FORMAT,
            }) || "/placeholder.svg"}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <Badge className="absolute top-3 left-3 bg-brand-orange hover:bg-orange-600 text-white">
          Destacada
        </Badge>
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {formatPrice(property.price, property.operation_type)}
        </div>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-card-foreground text-xl mb-2">{property.title}</h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              {property.address}, {property.neighborhood}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
              {getPropertyTypeLabel(property.property_type)}
            </span>
            <div className="flex items-center gap-4 text-muted-foreground">
              {property.bedrooms > 0 && <PropertyFeature icon={Bed} value={property.bedrooms} />}
              {property.bathrooms > 0 && <PropertyFeature icon={Bath} value={property.bathrooms} />}
              <PropertyFeature icon={Square} value={`${property.area}m²`} />
            </div>
          </div>
          <Link href={`/propiedades/${property.id}`}>
            <Button className="w-full bg-brand-orange hover:bg-orange-600 text-white">
              Ver detalles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
    </motion.div>
  )
}

export function FeaturedPropertiesSection({ properties }: { properties: Property[] }) {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">Propiedades Destacadas</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre las mejores oportunidades inmobiliarias en Reconquista
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
        <div className="text-center">
          <Link href="/propiedades">
            <Button
              size="lg"
              variant="outline"
              className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white bg-transparent"
            >
              Ver todas las propiedades
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
