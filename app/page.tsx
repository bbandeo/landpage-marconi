"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { ParticleBackground } from "@/components/ui/particle-background"
import {
  Menu,
  X,
  Home,
  MapPin,
  Phone,
  Mail,
  Bed,
  Bath,
  Square,
  Heart,
  Search,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("todos")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const properties = [
    {
      id: 1,
      title: "Casa Moderna en Zona Norte",
      price: 450000,
      type: "venta",
      location: "Zona Norte",
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
      image: "/placeholder.svg?height=300&width=400&text=Casa+Moderna",
      featured: true,
    },
    {
      id: 2,
      title: "Departamento Céntrico",
      price: 1200,
      type: "alquiler",
      location: "Centro",
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      image: "/placeholder.svg?height=300&width=400&text=Departamento+Céntrico",
      featured: false,
    },
    {
      id: 3,
      title: "Casa con Jardín",
      price: 320000,
      type: "venta",
      location: "Zona Oeste",
      bedrooms: 3,
      bathrooms: 2,
      area: 220,
      image: "/placeholder.svg?height=300&width=400&text=Casa+con+Jardín",
      featured: true,
    },
    {
      id: 4,
      title: "Loft Industrial",
      price: 1800,
      type: "alquiler",
      location: "Zona Este",
      bedrooms: 1,
      bathrooms: 1,
      area: 120,
      image: "/placeholder.svg?height=300&width=400&text=Loft+Industrial",
      featured: false,
    },
  ]

  const filteredProperties = properties.filter((property) => activeFilter === "todos" || property.type === activeFilter)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-black text-gray-900">Marconi</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Inicio
              </a>
              <a href="#propiedades" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Propiedades
              </a>
              <a href="#nosotros" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Nosotros
              </a>
              <a href="#contacto" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Contacto
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent">
                <Phone className="h-4 w-4 mr-2" />
                Llamar
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 btn-premium">Consultar</Button>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <a href="#inicio" className="block text-gray-700 hover:text-orange-500 font-medium">
                Inicio
              </a>
              <a href="#propiedades" className="block text-gray-700 hover:text-orange-500 font-medium">
                Propiedades
              </a>
              <a href="#nosotros" className="block text-gray-700 hover:text-orange-500 font-medium">
                Nosotros
              </a>
              <a href="#contacto" className="block text-gray-700 hover:text-orange-500 font-medium">
                Contacto
              </a>
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full border-orange-500 text-orange-500 bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Llamar
                </Button>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Consultar</Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50"
      >
        <ParticleBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-up">
            <h1 className="text-fluid-7xl font-black text-gray-900 mb-6 tracking-tight">
              Tu hogar ideal
              <span className="block gradient-text">te espera</span>
            </h1>

            <p className="text-fluid-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubre propiedades excepcionales con Marconi Inmobiliaria. Más de 15 años conectando familias con sus
              hogares perfectos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 btn-premium text-lg px-8 py-4">
                <Search className="h-5 w-5 mr-2" />
                Explorar Propiedades
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 hover:border-orange-500 text-lg px-8 py-4 bg-transparent"
              >
                <Phone className="h-5 w-5 mr-2" />
                Contactar Ahora
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center animate-float" style={{ animationDelay: "0s" }}>
                <div className="text-fluid-4xl font-black text-orange-500 mb-2">
                  <AnimatedCounter end={500} suffix="+" />
                </div>
                <p className="text-gray-600 font-medium">Propiedades Vendidas</p>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="text-fluid-4xl font-black text-orange-500 mb-2">
                  <AnimatedCounter end={15} suffix="+" />
                </div>
                <p className="text-gray-600 font-medium">Años de Experiencia</p>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: "1s" }}>
                <div className="text-fluid-4xl font-black text-orange-500 mb-2">
                  <AnimatedCounter end={98} suffix="%" />
                </div>
                <p className="text-gray-600 font-medium">Clientes Satisfechos</p>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="text-fluid-4xl font-black text-orange-500 mb-2">
                  <AnimatedCounter end={24} suffix="/7" />
                </div>
                <p className="text-gray-600 font-medium">Atención Disponible</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="propiedades" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-fluid-5xl font-black text-gray-900 mb-6">
              Propiedades <span className="gradient-text">Destacadas</span>
            </h2>
            <p className="text-fluid-lg text-gray-600 max-w-3xl mx-auto">
              Descubre nuestra selección de propiedades premium, cuidadosamente elegidas para ofrecerte las mejores
              opciones del mercado.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant={activeFilter === "todos" ? "default" : "outline"}
              onClick={() => setActiveFilter("todos")}
              className={activeFilter === "todos" ? "bg-orange-500 hover:bg-orange-600" : "hover:border-orange-500"}
            >
              Todas
            </Button>
            <Button
              variant={activeFilter === "venta" ? "default" : "outline"}
              onClick={() => setActiveFilter("venta")}
              className={activeFilter === "venta" ? "bg-orange-500 hover:bg-orange-600" : "hover:border-orange-500"}
            >
              En Venta
            </Button>
            <Button
              variant={activeFilter === "alquiler" ? "default" : "outline"}
              onClick={() => setActiveFilter("alquiler")}
              className={activeFilter === "alquiler" ? "bg-orange-500 hover:bg-orange-600" : "hover:border-orange-500"}
            >
              En Alquiler
            </Button>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="card-hover overflow-hidden border-0 shadow-lg">
                <div className="relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge
                      className={`${
                        property.type === "venta" ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
                      } text-white`}
                    >
                      {property.type === "venta" ? "Venta" : "Alquiler"}
                    </Badge>
                    {property.featured && (
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-white">Destacada</Badge>
                    )}
                  </div>
                  <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                  </button>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </p>

                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      {property.bedrooms}
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      {property.bathrooms}
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      {property.area}m²
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-black text-orange-500">
                      ${property.price.toLocaleString()}
                      {property.type === "alquiler" && <span className="text-sm text-gray-600">/mes</span>}
                    </div>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 btn-premium">
                      Ver Más
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 btn-premium bg-transparent"
            >
              Ver Todas las Propiedades
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-fluid-5xl font-black text-gray-900 mb-6">
                Conoce a <span className="gradient-text">Floriana Marconi</span>
              </h2>
              <p className="text-fluid-lg text-gray-600 mb-6 leading-relaxed">
                Con más de 15 años de experiencia en el mercado inmobiliario, Floriana Marconi se ha consolidado como
                una de las profesionales más confiables y exitosas del sector.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Su enfoque personalizado y su profundo conocimiento del mercado local han ayudado a cientos de familias
                a encontrar su hogar ideal. Floriana no solo vende propiedades, construye sueños y crea hogares.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-black text-orange-500 mb-2">
                    <AnimatedCounter end={500} suffix="+" />
                  </div>
                  <p className="text-gray-700 font-medium">Ventas Exitosas</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-black text-orange-500 mb-2">
                    <AnimatedCounter end={98} suffix="%" />
                  </div>
                  <p className="text-gray-700 font-medium">Satisfacción</p>
                </div>
              </div>

              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 btn-premium">
                <Mail className="h-5 w-5 mr-2" />
                Contactar a Floriana
              </Button>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/placeholder.svg?height=600&width=500&text=Floriana+Marconi"
                  alt="Floriana Marconi"
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-fluid-5xl font-black mb-6">
              ¿Listo para encontrar tu <span className="gradient-text">hogar ideal</span>?
            </h2>
            <p className="text-fluid-lg text-gray-300 max-w-3xl mx-auto">
              Contáctanos hoy mismo y comienza el camino hacia la propiedad de tus sueños. Estamos aquí para ayudarte en
              cada paso del proceso.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold mb-8">Información de Contacto</h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Teléfono</p>
                    <p className="text-gray-300">+54 11 1234-5678</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-300">info@marconipropiedades.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Dirección</p>
                    <p className="text-gray-300">Av. Principal 1234, Ciudad</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Síguenos en redes sociales</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
                  >
                    <Facebook className="h-5 w-5 text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
                  >
                    <Instagram className="h-5 w-5 text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
                  >
                    <Twitter className="h-5 w-5 text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
                  >
                    <Linkedin className="h-5 w-5 text-white" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="form-group">
                    <Input
                      type="text"
                      placeholder=" "
                      className="peer bg-gray-800 border-gray-700 text-white placeholder-transparent focus:border-orange-500"
                    />
                    <label className="floating-label">Nombre</label>
                  </div>
                  <div className="form-group">
                    <Input
                      type="email"
                      placeholder=" "
                      className="peer bg-gray-800 border-gray-700 text-white placeholder-transparent focus:border-orange-500"
                    />
                    <label className="floating-label">Email</label>
                  </div>
                </div>

                <div className="form-group">
                  <Input
                    type="tel"
                    placeholder=" "
                    className="peer bg-gray-800 border-gray-700 text-white placeholder-transparent focus:border-orange-500"
                  />
                  <label className="floating-label">Teléfono</label>
                </div>

                <div className="form-group">
                  <Textarea
                    placeholder=" "
                    rows={4}
                    className="peer bg-gray-800 border-gray-700 text-white placeholder-transparent focus:border-orange-500 resize-none"
                  />
                  <label className="floating-label">Mensaje</label>
                </div>

                <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 btn-premium">
                  Enviar Mensaje
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Home className="h-8 w-8 text-orange-500" />
                <span className="text-2xl font-black">Marconi Inmobiliaria</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Tu socio de confianza en el mercado inmobiliario. Conectamos sueños con realidades desde hace más de 15
                años.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#inicio" className="text-gray-400 hover:text-orange-500 transition-colors">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#propiedades" className="text-gray-400 hover:text-orange-500 transition-colors">
                    Propiedades
                  </a>
                </li>
                <li>
                  <a href="#nosotros" className="text-gray-400 hover:text-orange-500 transition-colors">
                    Nosotros
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="text-gray-400 hover:text-orange-500 transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Servicios</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                    Venta de Propiedades
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                    Alquiler
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                    Tasaciones
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                    Asesoramiento
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 Marconi Inmobiliaria. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
