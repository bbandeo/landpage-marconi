"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Bed,
  Bath,
  Square,
  ArrowRight,
  Star,
  Users,
  Building,
  Award,
  ChevronDown,
} from "lucide-react"
import { getOptimizedImageUrl } from "@/lib/cloudinary"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const featuredProperties = [
    {
      id: 1,
      title: "Casa moderna en centro",
      price: 85000,
      currency: "USD",
      operation: "Venta",
      address: "San Martín 1234, Centro",
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      image: "gustavo-papasergio-emoKYb99CRI-unsplash_w6gipy",
      featured: true,
    },
    {
      id: 2,
      title: "Departamento luminoso",
      price: 95000,
      currency: "USD",
      operation: "Venta",
      address: "Rivadavia 567, Centro",
      bedrooms: 2,
      bathrooms: 1,
      area: 85,
      image: "gustavo-papasergio-emoKYb99CRI-unsplash_w6gipy",
      featured: true,
    },
    {
      id: 3,
      title: "Casa familiar amplia",
      price: 1200,
      currency: "USD",
      operation: "Alquiler",
      address: "Belgrano 890, Norte",
      bedrooms: 4,
      bathrooms: 3,
      area: 180,
      image: "gustavo-papasergio-emoKYb99CRI-unsplash_w6gipy",
      featured: true,
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to properties page with search term
    window.location.href = `/propiedades?search=${encodeURIComponent(searchTerm)}`
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <h1
                className={`text-xl md:text-2xl font-bold transition-colors ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                MARCONI <span className="text-brand-orange">INMOBILIARIA</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/propiedades"
                className={`font-medium transition-colors hover:text-brand-orange ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                PROPIEDADES
              </Link>
              <Link
                href="/agentes"
                className={`font-medium transition-colors hover:text-brand-orange ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                AGENTES
              </Link>
              <Link
                href="/contacto"
                className={`font-medium transition-colors hover:text-brand-orange ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                CONTACTO
              </Link>
            </nav>

            {/* Mobile Search Bar */}
            <div className="md:hidden flex-1 max-w-xs mx-4">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Buscar propiedades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/90 border-0 rounded-full text-sm placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-brand-orange"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getOptimizedImageUrl("gustavo-papasergio-emoKYb99CRI-unsplash_w6gipy", {
              width: 1920,
              height: 1080,
              quality: "auto",
              format: "auto",
              crop: "fill" || "/placeholder.svg",
            })}
            alt="Marconi Inmobiliaria - Propiedades en Reconquista"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 h-full flex flex-col">
          <div className="pt-32 md:pt-0 md:flex-1 md:flex md:flex-col md:justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              SOMOS LA
              <br />
              INMOBILIARIA #1
              <br />
              <span className="text-brand-orange">DE RECONQUISTA</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            >
              Encuentra tu hogar ideal con más de 20 años de experiencia en el mercado inmobiliario
            </motion.p>

            {/* Desktop Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden md:block max-w-2xl mx-auto w-full"
            >
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Buscar propiedades por dirección, barrio o tipo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-32 py-4 text-lg bg-white/95 border-0 rounded-full placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-brand-orange"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-2 rounded-full"
                >
                  Buscar
                </Button>
              </form>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-auto pb-8 flex flex-col items-center"
          >
            <p className="text-sm mb-2">Descubre nuestras propiedades</p>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-brand-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Propiedades Vendidas</div>
            </div>
            <div className="text-center">
              <div className="bg-brand-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
              <div className="text-gray-600">Clientes Satisfechos</div>
            </div>
            <div className="text-center">
              <div className="bg-brand-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">20+</div>
              <div className="text-gray-600">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="bg-brand-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9</div>
              <div className="text-gray-600">Calificación Promedio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Propiedades Destacadas</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre las mejores oportunidades inmobiliarias en Reconquista
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative">
                  <Image
                    src={getOptimizedImageUrl(property.image, {
                      width: 400,
                      height: 250,
                      quality: "auto",
                      format: "auto",
                      crop: "fill" || "/placeholder.svg",
                    })}
                    alt={property.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brand-orange text-white">{property.operation}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-black/70 text-white px-3 py-1 rounded-lg font-bold">
                      {property.currency}$ {property.price.toLocaleString()}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    {property.address}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        {property.bedrooms}
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        {property.bathrooms}
                      </div>
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        {property.area}m²
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-brand-orange hover:bg-brand-orange/90">Ver Detalles</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/propiedades">
              <Button
                size="lg"
                variant="outline"
                className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white bg-transparent"
              >
                Ver Todas las Propiedades
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para encontrar tu hogar ideal?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Nuestro equipo de expertos está aquí para ayudarte en cada paso del proceso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-brand-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Teléfono</h3>
              <p className="text-gray-300">+54 3482 123456</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-300">info@marconiinmobiliaria.com</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Oficina</h3>
              <p className="text-gray-300">San Martín 123, Reconquista</p>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
              Contactar Ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                MARCONI <span className="text-brand-orange">INMOBILIARIA</span>
              </h3>
              <p className="text-gray-400 mb-4">
                Tu inmobiliaria de confianza en Reconquista con más de 20 años de experiencia.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-brand-orange cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-brand-orange cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-brand-orange cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/propiedades?operation=sale" className="hover:text-brand-orange transition-colors">
                    Venta
                  </Link>
                </li>
                <li>
                  <Link href="/propiedades?operation=rent" className="hover:text-brand-orange transition-colors">
                    Alquiler
                  </Link>
                </li>
                <li>
                  <Link href="/tasaciones" className="hover:text-brand-orange transition-colors">
                    Tasaciones
                  </Link>
                </li>
                <li>
                  <Link href="/administracion" className="hover:text-brand-orange transition-colors">
                    Administración
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Propiedades</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/propiedades?type=house" className="hover:text-brand-orange transition-colors">
                    Casas
                  </Link>
                </li>
                <li>
                  <Link href="/propiedades?type=apartment" className="hover:text-brand-orange transition-colors">
                    Departamentos
                  </Link>
                </li>
                <li>
                  <Link href="/propiedades?type=commercial" className="hover:text-brand-orange transition-colors">
                    Comerciales
                  </Link>
                </li>
                <li>
                  <Link href="/propiedades?featured=true" className="hover:text-brand-orange transition-colors">
                    Destacadas
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>San Martín 123, Reconquista</li>
                <li>+54 3482 123456</li>
                <li>info@marconiinmobiliaria.com</li>
                <li>Lun - Vie: 9:00 - 18:00</li>
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
