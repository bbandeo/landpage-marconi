"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Bed, Bath, Square, ArrowRight, Star, Users, Home, Award, VolumeX, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getOptimizedImageUrl } from "@/lib/cloudinary"
import Link from "next/link"
import Image from "next/image"

interface Property {
  id: string
  title: string
  price: number
  operation_type: "sale" | "rent"
  property_type: "house" | "apartment" | "commercial" | "land"
  bedrooms: number
  bathrooms: number
  area: number
  address: string
  neighborhood: string
  images: string[]
  featured: boolean
}

const featuredProperties: Property[] = [
  {
    id: "1",
    title: "Casa moderna en centro",
    price: 85000,
    operation_type: "sale",
    property_type: "house",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    address: "San Martín 1234",
    neighborhood: "Centro",
    images: ["gustavo-papasergio-emoKYb99CRI-unsplash_w6gipy"],
    featured: true,
  },
  {
    id: "2",
    title: "Departamento luminoso",
    price: 45000,
    operation_type: "rent",
    property_type: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    address: "Rivadavia 567",
    neighborhood: "Norte",
    images: ["gustavo-papasergio-emoKYb99CRI-unsplash_w6gipy"],
    featured: true,
  },
  {
    id: "3",
    title: "Local comercial estratégico",
    price: 120000,
    operation_type: "sale",
    property_type: "commercial",
    bedrooms: 0,
    bathrooms: 1,
    area: 80,
    address: "Belgrano 890",
    neighborhood: "Centro",
    images: ["gustavo-papasergio-emoKYb99CRI-unsplash_w6gipy"],
    featured: true,
  },
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [operationType, setOperationType] = useState("")
  const [propertyType, setPropertyType] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.set("search", searchTerm)
    if (operationType) params.set("operation", operationType)
    if (propertyType) params.set("type", propertyType)

    window.location.href = `/propiedades?${params.toString()}`
  }

  const formatPrice = (price: number, operation: string) => {
    return (
      new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price) + (operation === "rent" ? "/mes" : "")
    )
  }

  const getPropertyTypeLabel = (type: string) => {
    switch (type) {
      case "house":
        return "Casa"
      case "apartment":
        return "Departamento"
      case "commercial":
        return "Comercial"
      case "land":
        return "Terreno"
      default:
        return type
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                <span className="text-white">MARCONI</span>
                <span className="text-brand-orange block text-sm font-normal tracking-wider">INMOBILIARIA</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/propiedades" className="text-gray-300 hover:text-white transition-colors">
                PROPIEDADES
              </Link>
              <Link href="/agentes" className="text-gray-300 hover:text-white transition-colors">
                AGENTES
              </Link>
              <Link href="/contacto" className="text-gray-300 hover:text-white transition-colors">
                CONTACTO
              </Link>
            </nav>

            {/* Mobile Search Bar */}
            <div className="md:hidden flex-1 max-w-xs ml-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar propiedades..."
                  className="pl-10 h-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 text-sm focus:border-brand-orange"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-background.jpg"
            alt="Vista aérea de Reconquista - Marconi Inmobiliaria"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal text-white leading-tight mb-6">
                No esperes más,
                <br />
                <span className="font-semibold">encuentra el hogar ideal</span>
                <br />
                con nosotros.
              </h1>

              {/* Orange curved line */}
              <div className="flex justify-center mb-12">
                <svg width="200" height="20" viewBox="0 0 200 20" className="text-brand-orange">
                  <path
                    d="M10 15 Q100 5 190 15"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </motion.div>

            {/* House Icon with Heart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-16"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32">
                <div className="relative">
                  {/* House outline */}
                  <svg width="80" height="80" viewBox="0 0 80 80" className="text-white" fill="none">
                    <path
                      d="M8 35L40 8L72 35V70C72 71.1046 71.1046 72 70 72H50V52C50 50.8954 49.1046 50 48 50H32C30.8954 50 30 50.8954 30 52V72H10C8.89543 72 8 71.1046 8 70V35Z"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    <path d="M30 72V52H50V72" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                  </svg>
                  {/* Heart inside */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Marconi Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-center"
            >
              <div className="text-5xl md:text-7xl font-bold text-blue-600 mb-2">Marconi</div>
              <div className="text-lg md:text-xl text-white font-light tracking-wider">Negocios Inmobiliarios</div>
            </motion.div>
          </div>

          {/* Mute Icon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-8 right-8"
          >
            <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
              <VolumeX className="w-6 h-6 text-white" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Propiedades Destacadas</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Descubre las mejores oportunidades inmobiliarias en Reconquista
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-700 border-gray-600 hover:border-brand-orange transition-all duration-300 overflow-hidden group">
                  <div className="relative">
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={
                          getOptimizedImageUrl(property.images[0], {
                            width: 400,
                            height: 250,
                            crop: "fill",
                            quality: "auto",
                            format: "auto" || "/placeholder.svg",
                          }) || "/placeholder.svg"
                        }
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="absolute top-3 left-3">
                      <Badge className="bg-brand-orange hover:bg-orange-600 text-white">Destacada</Badge>
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {formatPrice(property.price, property.operation_type)}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-white text-xl mb-2">{property.title}</h3>
                        <div className="flex items-center text-gray-400">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.address}, {property.neighborhood}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="bg-gray-600 text-gray-200 px-3 py-1 rounded-full text-sm">
                          {getPropertyTypeLabel(property.property_type)}
                        </span>
                        <div className="flex items-center gap-4 text-gray-300">
                          {property.bedrooms > 0 && (
                            <div className="flex items-center gap-1">
                              <Bed className="h-4 w-4" />
                              {property.bedrooms}
                            </div>
                          )}
                          {property.bathrooms > 0 && (
                            <div className="flex items-center gap-1">
                              <Bath className="h-4 w-4" />
                              {property.bathrooms}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Square className="h-4 w-4" />
                            {property.area}m²
                          </div>
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

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { icon: Home, number: "500+", label: "Propiedades Vendidas" },
              { icon: Users, number: "1000+", label: "Clientes Satisfechos" },
              { icon: Award, number: "15+", label: "Años de Experiencia" },
              { icon: Star, number: "4.9", label: "Calificación Promedio" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-orange/20 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-brand-orange" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-orange">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">¿Listo para encontrar tu próximo hogar?</h2>
            <p className="text-xl text-orange-100 mb-8">
              Nuestro equipo de expertos está aquí para ayudarte en cada paso del camino
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/propiedades">
                <Button size="lg" variant="secondary" className="bg-white text-brand-orange hover:bg-gray-100">
                  Explorar Propiedades
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contacto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-brand-orange bg-transparent"
                >
                  Contactar Agente
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl font-bold">
                  <span className="text-white">MARCONI</span>
                  <span className="text-brand-orange block text-sm font-normal tracking-wider">INMOBILIARIA</span>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                La inmobiliaria líder en Reconquista, comprometida con encontrar el hogar perfecto para cada familia.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Enlaces</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/propiedades" className="hover:text-white transition-colors">
                    Propiedades
                  </Link>
                </li>
                <li>
                  <Link href="/agentes" className="hover:text-white transition-colors">
                    Agentes
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-white transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Reconquista, Santa Fe</li>
                <li>+54 9 3482 123456</li>
                <li>info@marconiinmobiliaria.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Marconi Inmobiliaria. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
