"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Phone, Mail, Star, Bed, Bath, Square, ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PropertyService } from "@/services/properties"
import { getOptimizedImageUrl } from "@/lib/cloudinary"
import type { Property } from "@/lib/supabase"
import Link from "next/link"

interface PropertyCardProps {
  property: Property
}

function PropertyCard({ property }: PropertyCardProps) {
  const [imageError, setImageError] = useState(false)
  const firstImage = property.images && property.images.length > 0 ? property.images[0] : null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getOperationTypeLabel = (type: string) => {
    return type === "venta" ? "Venta" : "Alquiler"
  }

  const getPropertyTypeLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      casa: "Casa",
      departamento: "Departamento",
      terreno: "Terreno",
      local: "Local",
    }
    return typeMap[type] || type
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden bg-gray-100">
            {!imageError && firstImage ? (
              <img
                src={getOptimizedImageUrl(firstImage, {
                  width: 400,
                  height: 300,
                  crop: "fill",
                  quality: "auto" || "/placeholder.svg",
                })}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>

          {property.featured && (
            <Badge className="absolute top-3 left-3 bg-yellow-500 text-white">
              <Star className="w-3 h-3 mr-1" />
              Destacada
            </Badge>
          )}

          <Badge className="absolute top-3 right-3 bg-orange-600 text-white">
            {getOperationTypeLabel(property.operation_type)}
          </Badge>
        </div>

        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl font-bold text-gray-900">{formatPrice(property.price)}</div>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="text-sm truncate">
              {property.neighborhood}, {property.city}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <span className="font-medium">{getPropertyTypeLabel(property.property_type)}</span>
            {property.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.area_m2 && (
              <div className="flex items-center gap-1">
                <Square className="w-4 h-4" />
                <span>{property.area_m2}m²</span>
              </div>
            )}
          </div>

          <Button className="w-full bg-orange-600 hover:bg-orange-700">Ver detalles</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [operationType, setOperationType] = useState("")
  const [propertyType, setPropertyType] = useState("")

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const properties = await PropertyService.getFeaturedProperties(6)
        setFeaturedProperties(properties)
      } catch (error) {
        console.error("Error fetching featured properties:", error)
      }
    }

    fetchFeaturedProperties()
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.set("search", searchTerm)
    if (operationType) params.set("operation_type", operationType)
    if (propertyType) params.set("property_type", propertyType)

    window.location.href = `/propiedades?${params.toString()}`
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={getOptimizedImageUrl("gustavo-papasergio-emoKYb99CRI-unsplash_w6gipy", {
              width: 1920,
              height: 1080,
              crop: "fill",
              quality: "auto",
              format: "auto" || "/placeholder.svg",
            })}
            alt="Vista panorámica de Reconquista - Marconi Inmobiliaria"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="h-full flex flex-col">
            {/* Main content area */}
            <div className="pt-32 md:pt-0 md:flex-1 md:flex md:flex-col md:justify-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              >
                SOMOS LA INMOBILIARIA <span className="text-orange-500">#1</span>
                <br />
                <span className="text-orange-500">DE RECONQUISTA</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl mb-8 text-gray-200"
              >
                Encuentra la propiedad de tus sueños con más de 20 años de experiencia
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white/95 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Buscar propiedades..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 border-0 bg-white"
                    />
                  </div>

                  <Select value={operationType} onValueChange={setOperationType}>
                    <SelectTrigger className="h-12 border-0 bg-white">
                      <SelectValue placeholder="Operación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="venta">Venta</SelectItem>
                      <SelectItem value="alquiler">Alquiler</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="h-12 border-0 bg-white">
                      <SelectValue placeholder="Tipo de propiedad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="departamento">Departamento</SelectItem>
                      <SelectItem value="terreno">Terreno</SelectItem>
                      <SelectItem value="local">Local</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    onClick={handleSearch}
                    className="h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold"
                  >
                    Buscar
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-auto pb-8 flex flex-col items-center"
            >
              <span className="text-sm text-gray-300 mb-2">Descubre más</span>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                <ChevronDown className="w-6 h-6 text-gray-300" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Propiedades Destacadas
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Descubre nuestra selección de propiedades premium en las mejores ubicaciones de Reconquista
            </motion.p>
          </div>

          {featuredProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {featuredProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <Link href="/propiedades">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                    Ver todas las propiedades
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Cargando propiedades destacadas...</p>
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Nuestros Servicios
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Ofrecemos servicios integrales para todas tus necesidades inmobiliarias
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Venta de Propiedades",
                description: "Te ayudamos a vender tu propiedad al mejor precio del mercado",
                icon: "🏠",
              },
              {
                title: "Alquiler",
                description: "Encuentra el hogar perfecto para alquilar o pon tu propiedad en alquiler",
                icon: "🔑",
              },
              {
                title: "Asesoramiento",
                description: "Recibe asesoramiento profesional en todas tus decisiones inmobiliarias",
                icon: "💼",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              ¿Listo para encontrar tu próximo hogar?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-orange-100 max-w-2xl mx-auto"
            >
              Contáctanos hoy mismo y déjanos ayudarte a encontrar la propiedad perfecta
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <Phone className="w-8 h-8 mb-3" />
              <h3 className="font-semibold mb-2">Teléfono</h3>
              <p className="text-orange-100">+54 3482 123456</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <Mail className="w-8 h-8 mb-3" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-orange-100">info@marconiinmobiliaria.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <MapPin className="w-8 h-8 mb-3" />
              <h3 className="font-semibold mb-2">Ubicación</h3>
              <p className="text-orange-100">Reconquista, Santa Fe</p>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
              Contactar ahora
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
