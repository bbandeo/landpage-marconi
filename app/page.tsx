"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Bed, Bath, Square, ArrowRight, Star, Users, Home, Award, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  const [textStyle, setTextStyle] = useState("neon") // Estado para cambiar estilos

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

  // Función para obtener las clases CSS según el estilo seleccionado
  const getTextStyleClasses = () => {
    switch (textStyle) {
      case "neon":
        return "text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight neon-text"
      case "gradient":
        return "text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight gradient-text"
      case "shadow3d":
        return "text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight shadow-3d-text"
      case "metallic":
        return "text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight metallic-text"
      case "glitch":
        return "text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight glitch-text"
      default:
        return "text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Estilos CSS personalizados */}
      <style jsx>{`
        /* Efecto Neón */
        .neon-text {
          text-shadow: 
            0 0 5px #fff,
            0 0 10px #fff,
            0 0 15px #F97316,
            0 0 20px #F97316,
            0 0 35px #F97316,
            0 0 40px #F97316;
          animation: neon-flicker 2s infinite alternate;
        }

        @keyframes neon-flicker {
          0%, 18%, 22%, 25%, 53%, 57%, 100% {
            text-shadow: 
              0 0 5px #fff,
              0 0 10px #fff,
              0 0 15px #F97316,
              0 0 20px #F97316,
              0 0 35px #F97316,
              0 0 40px #F97316;
          }
          20%, 24%, 55% {
            text-shadow: none;
          }
        }

        /* Efecto Gradiente */
        .gradient-text {
          background: linear-gradient(45deg, #F97316, #FCD34D, #F97316, #DC2626);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease infinite;
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Efecto Sombra 3D */
        .shadow-3d-text {
          text-shadow: 
            1px 1px 0px #F97316,
            2px 2px 0px #E85D04,
            3px 3px 0px #DC2F02,
            4px 4px 0px #D00000,
            5px 5px 0px #9D0208,
            6px 6px 0px #6A040F,
            7px 7px 0px #370617,
            8px 8px 15px rgba(0,0,0,0.8);
          transform: perspective(500px) rotateX(15deg);
        }

        /* Efecto Metálico */
        .metallic-text {
          background: linear-gradient(135deg, 
            #C0C0C0 0%, 
            #F97316 25%, 
            #FFD700 50%, 
            #F97316 75%, 
            #C0C0C0 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: metallic-shine 2s linear infinite;
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));
        }

        @keyframes metallic-shine {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 200%; }
        }

        /* Efecto Glitch */
        .glitch-text {
          position: relative;
          animation: glitch-skew 1s infinite linear alternate-reverse;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: 'SOMOS LA INMOBILIARIA #1 DE RECONQUISTA';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch-text::before {
          animation: glitch-anim 2s infinite linear alternate-reverse;
          color: #F97316;
          z-index: -1;
        }

        .glitch-text::after {
          animation: glitch-anim2 1s infinite linear alternate-reverse;
          color: #DC2626;
          z-index: -2;
        }

        @keyframes glitch-anim {
          0% { clip: rect(42px, 9999px, 44px, 0); }
          5% { clip: rect(12px, 9999px, 59px, 0); }
          10% { clip: rect(48px, 9999px, 29px, 0); }
          15% { clip: rect(42px, 9999px, 73px, 0); }
          20% { clip: rect(63px, 9999px, 27px, 0); }
          25% { clip: rect(34px, 9999px, 55px, 0); }
          30% { clip: rect(86px, 9999px, 73px, 0); }
          35% { clip: rect(20px, 9999px, 20px, 0); }
          40% { clip: rect(26px, 9999px, 60px, 0); }
          45% { clip: rect(25px, 9999px, 66px, 0); }
          50% { clip: rect(57px, 9999px, 98px, 0); }
          55% { clip: rect(5px, 9999px, 46px, 0); }
          60% { clip: rect(82px, 9999px, 31px, 0); }
          65% { clip: rect(54px, 9999px, 27px, 0); }
          70% { clip: rect(28px, 9999px, 99px, 0); }
          75% { clip: rect(45px, 9999px, 69px, 0); }
          80% { clip: rect(23px, 9999px, 85px, 0); }
          85% { clip: rect(54px, 9999px, 84px, 0); }
          90% { clip: rect(45px, 9999px, 47px, 0); }
          95% { clip: rect(37px, 9999px, 20px, 0); }
          100% { clip: rect(4px, 9999px, 91px, 0); }
        }

        @keyframes glitch-anim2 {
          0% { clip: rect(65px, 9999px, 100px, 0); }
          5% { clip: rect(52px, 9999px, 74px, 0); }
          10% { clip: rect(79px, 9999px, 85px, 0); }
          15% { clip: rect(75px, 9999px, 5px, 0); }
          20% { clip: rect(67px, 9999px, 61px, 0); }
          25% { clip: rect(14px, 9999px, 79px, 0); }
          30% { clip: rect(1px, 9999px, 66px, 0); }
          35% { clip: rect(86px, 9999px, 30px, 0); }
          40% { clip: rect(23px, 9999px, 98px, 0); }
          45% { clip: rect(85px, 9999px, 72px, 0); }
          50% { clip: rect(71px, 9999px, 75px, 0); }
          55% { clip: rect(2px, 9999px, 48px, 0); }
          60% { clip: rect(30px, 9999px, 16px, 0); }
          65% { clip: rect(59px, 9999px, 50px, 0); }
          70% { clip: rect(41px, 9999px, 62px, 0); }
          75% { clip: rect(2px, 9999px, 82px, 0); }
          80% { clip: rect(47px, 9999px, 73px, 0); }
          85% { clip: rect(3px, 9999px, 27px, 0); }
          90% { clip: rect(26px, 9999px, 55px, 0); }
          95% { clip: rect(42px, 9999px, 97px, 0); }
          100% { clip: rect(38px, 9999px, 49px, 0); }
        }

        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          10% { transform: skew(-2deg); }
          20% { transform: skew(1deg); }
          30% { transform: skew(-1deg); }
          40% { transform: skew(2deg); }
          50% { transform: skew(-1deg); }
          60% { transform: skew(0deg); }
          70% { transform: skew(1deg); }
          80% { transform: skew(-2deg); }
          90% { transform: skew(2deg); }
          100% { transform: skew(0deg); }
        }
      `}</style>

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

            {/* Selector de Estilo de Texto (Solo para demo) */}
            <div className="hidden lg:flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Estilo:</span>
              <select
                value={textStyle}
                onChange={(e) => setTextStyle(e.target.value)}
                className="bg-gray-800 text-white text-sm rounded px-2 py-1 border border-gray-700"
              >
                <option value="neon">Neón</option>
                <option value="gradient">Gradiente</option>
                <option value="shadow3d">Sombra 3D</option>
                <option value="metallic">Metálico</option>
                <option value="glitch">Glitch</option>
              </select>
            </div>

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
            src={
              getOptimizedImageUrl("gustavo-papasergio-emoKYb99CRI-unsplash_w6gipy", {
                width: 1920,
                height: 1080,
                crop: "fill",
                quality: "auto",
                format: "auto" || "/placeholder.svg",
              }) || "/placeholder.svg"
            }
            alt="Reconquista - Marconi Inmobiliaria"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col justify-center pt-32 md:pt-0 md:flex-1 md:justify-center">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className={getTextStyleClasses()}
                >
                  SOMOS LA
                  <br />
                  INMOBILIARIA #1
                  <br />
                  <span className="text-brand-orange">DE RECONQUISTA</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto"
                >
                  La inmobiliaria que está revolucionando Reconquista con tecnología y confianza local.
                </motion.p>

                {/* Search Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="hidden md:block max-w-4xl mx-auto"
                >
                  <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 border border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-2">
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            placeholder="Buscar propiedades por dirección, barrio..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 h-12 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-brand-orange"
                          />
                        </div>
                      </div>

                      <Select value={operationType} onValueChange={setOperationType}>
                        <SelectTrigger className="h-12 bg-gray-700 border-gray-600 text-white focus:border-brand-orange">
                          <SelectValue placeholder="Operación" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="sale" className="text-white hover:bg-gray-700 focus:bg-gray-700">
                            Venta
                          </SelectItem>
                          <SelectItem value="rent" className="text-white hover:bg-gray-700 focus:bg-gray-700">
                            Alquiler
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={propertyType} onValueChange={setPropertyType}>
                        <SelectTrigger className="h-12 bg-gray-700 border-gray-600 text-white focus:border-brand-orange">
                          <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="house" className="text-white hover:bg-gray-700 focus:bg-gray-700">
                            Casa
                          </SelectItem>
                          <SelectItem value="apartment" className="text-white hover:bg-gray-700 focus:bg-gray-700">
                            Departamento
                          </SelectItem>
                          <SelectItem value="commercial" className="text-white hover:bg-gray-700 focus:bg-gray-700">
                            Comercial
                          </SelectItem>
                          <SelectItem value="land" className="text-white hover:bg-gray-700 focus:bg-gray-700">
                            Terreno
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="mt-4 flex justify-center">
                      <Button
                        onClick={handleSearch}
                        size="lg"
                        className="bg-brand-orange hover:bg-orange-600 text-white px-8 h-12 text-lg font-semibold"
                      >
                        <Search className="mr-2 h-5 w-5" />
                        Buscar Propiedades
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-auto pb-8 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="flex flex-col items-center text-white/70"
            >
              <span className="text-sm mb-2">Descubre más</span>
              <ChevronDown className="h-6 w-6" />
            </motion.div>
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
