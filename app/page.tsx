"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { ParticleBackground } from "@/components/ui/particle-background"
import {
  Menu,
  X,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Phone,
  Mail,
  Instagram,
  Facebook,
  ChevronDown,
  Star,
  Users,
  Home,
  Award,
  ArrowRight,
  Play,
} from "lucide-react"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
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
      title: "Casa Moderna en Barrio Norte",
      price: 450000,
      type: "venta",
      location: "Barrio Norte, Reconquista",
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      image: "/placeholder.jpg?height=300&width=400",
      featured: true,
    },
    {
      id: 2,
      title: "Departamento Céntrico",
      price: 85000,
      type: "alquiler",
      location: "Centro, Reconquista",
      bedrooms: 2,
      bathrooms: 1,
      area: 75,
      image: "/placeholder.jpg?height=300&width=400",
      featured: false,
    },
    {
      id: 3,
      title: "Casa Familiar con Jardín",
      price: 320000,
      type: "venta",
      location: "Villa Ocampo",
      bedrooms: 4,
      bathrooms: 3,
      area: 220,
      image: "/placeholder.jpg?height=300&width=400",
      featured: true,
    },
  ]

  const filteredProperties = properties.filter((property) => activeFilter === "all" || property.type === activeFilter)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? "backdrop-blur-lg bg-white/90 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-gray-900">Marconi</span>
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
                Vender
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 btn-premium">Contactar</Button>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-4 space-y-4">
              <a
                href="#inicio"
                className="block text-gray-700 hover:text-orange-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </a>
              <a
                href="#propiedades"
                className="block text-gray-700 hover:text-orange-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Propiedades
              </a>
              <a
                href="#nosotros"
                className="block text-gray-700 hover:text-orange-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </a>
              <a
                href="#contacto"
                className="block text-gray-700 hover:text-orange-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </a>
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full border-orange-500 text-orange-500 bg-transparent">
                  Vender
                </Button>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Contactar</Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />

        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-orange-900/20" />

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/placeholder.jpg?height=1080&width=1920')",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="animate-slide-up">
            <h1 className="text-fluid-5xl md:text-fluid-7xl font-black text-white mb-6 tracking-tight leading-none">
              Tu hogar ideal
              <span className="block gradient-text">te espera</span>
            </h1>

            <p className="text-fluid-lg md:text-fluid-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubre propiedades excepcionales con la inmobiliaria que está revolucionando Reconquista con tecnología
              y confianza local.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold btn-premium group"
              >
                Ver Propiedades
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold glass-effect group bg-transparent"
              >
                <Play className="mr-2 w-5 h-5" />
                Ver Video
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <AnimatedCounter end={500} suffix="+" />
                </div>
                <p className="text-gray-300 text-sm md:text-base">Propiedades Vendidas</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <AnimatedCounter end={15} suffix=" años" />
                </div>
                <p className="text-gray-300 text-sm md:text-base">de Experiencia</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <AnimatedCounter end={98} suffix="%" />
                </div>
                <p className="text-gray-300 text-sm md:text-base">Clientes Satisfechos</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <AnimatedCounter end={24} suffix="/7" />
                </div>
                <p className="text-gray-300 text-sm md:text-base">Atención al Cliente</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
      </section>

      {/* Properties Section */}
      <section id="propiedades" className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-fluid-3xl md:text-fluid-5xl font-black text-gray-900 mb-4 tracking-tight">
              Propiedades <span className="gradient-text">Destacadas</span>
            </h2>
            <p className="text-fluid-base md:text-fluid-lg text-gray-600 max-w-2xl mx-auto">
              Explora nuestra selección de propiedades premium, cuidadosamente elegidas para ti
            </p>
          </div>

          {/* Filters */}
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="inline-flex bg-white rounded-full p-1 shadow-lg">
              {[
                { key: "all", label: "Todas" },
                { key: "venta", label: "Venta" },
                { key: "alquiler", label: "Alquiler" },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === filter.key
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-gray-600 hover:text-orange-500"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="group overflow-hidden border-0 shadow-lg card-hover bg-white">
                <div className="relative overflow-hidden">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {property.featured && (
                    <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600 text-white">
                      Destacada
                    </Badge>
                  )}

                  <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-2xl font-bold text-white mb-1">
                      ${property.price.toLocaleString()}
                      {property.type === "alquiler" && <span className="text-sm font-normal">/mes</span>}
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                    {property.title}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600 mb-6">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.area}m²</span>
                    </div>
                  </div>

                  <Button className="w-full bg-orange-500 hover:bg-orange-600 btn-premium">Ver Detalles</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 bg-transparent"
            >
              Ver Todas las Propiedades
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-fluid-3xl md:text-fluid-5xl font-black text-gray-900 mb-6 tracking-tight">
                Conoce a <span className="gradient-text">Floriana Marconi</span>
              </h2>

              <p className="text-fluid-base md:text-fluid-lg text-gray-600 mb-6 leading-relaxed">
                Con más de 15 años de experiencia en el mercado inmobiliario de Reconquista, Floriana ha ayudado a
                cientos de familias a encontrar su hogar ideal.
              </p>

              <p className="text-fluid-base text-gray-600 mb-8 leading-relaxed">
                Su enfoque personalizado y conocimiento profundo del mercado local la convierten en la elección perfecta
                para tu próxima inversión inmobiliaria.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Award className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={500} suffix="+" />
                  </div>
                  <p className="text-sm text-gray-600">Ventas Exitosas</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={98} suffix="%" />
                  </div>
                  <p className="text-sm text-gray-600">Satisfacción</p>
                </div>
              </div>

              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 btn-premium">
                Contactar a Floriana
              </Button>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/placeholder-user.jpg"
                  alt="Floriana Marconi"
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent" />
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 animate-float">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <div>
                    <div className="text-lg font-bold text-gray-900">4.9</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-fluid-3xl md:text-fluid-5xl font-black text-gray-900 mb-4 tracking-tight">
              ¿Listo para <span className="gradient-text">encontrar tu hogar</span>?
            </h2>
            <p className="text-fluid-base md:text-fluid-lg text-gray-600 max-w-2xl mx-auto">
              Contáctanos hoy y comencemos a buscar la propiedad perfecta para ti
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <Card className="p-6 md:p-8 shadow-xl border-0">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <Input
                      placeholder="Tu nombre"
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      type="email"
                      placeholder="Tu email"
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <Input
                    placeholder="Teléfono"
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div className="form-group">
                  <Textarea
                    placeholder="¿En qué podemos ayudarte?"
                    rows={4}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-orange-500 hover:bg-orange-600 btn-premium">
                  Enviar Mensaje
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Teléfono</p>
                      <p className="text-gray-600">+54 9 3482 123456</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600">info@marconipropiedades.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Dirección</p>
                      <p className="text-gray-600">Av. San Martín 1234, Reconquista</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Síguenos en redes sociales</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Marconi Inmobiliaria</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Tu socio de confianza en el mercado inmobiliario de Reconquista. Más de 15 años ayudando a familias a
                encontrar su hogar ideal.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
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
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+54 9 3482 123456</li>
                <li>info@marconipropiedades.com</li>
                <li>Av. San Martín 1234, Reconquista</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Marconi Inmobiliaria. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
