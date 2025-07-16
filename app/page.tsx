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
  Twitter,
  ChevronDown,
  Users,
  Home,
  Award,
} from "lucide-react"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("todos")
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 50)
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
      location: "Zona Norte, Ciudad",
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
      image: "/placeholder.jpg?height=300&width=400",
      featured: true,
    },
    {
      id: 2,
      title: "Departamento Céntrico",
      price: 2800,
      type: "alquiler",
      location: "Centro, Ciudad",
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      image: "/placeholder.jpg?height=300&width=400",
      featured: false,
    },
    {
      id: 3,
      title: "Casa con Jardín",
      price: 320000,
      type: "venta",
      location: "Zona Oeste, Ciudad",
      bedrooms: 3,
      bathrooms: 2,
      area: 200,
      image: "/placeholder.jpg?height=300&width=400",
      featured: true,
    },
  ]

  const filteredProperties = properties.filter((property) => activeFilter === "todos" || property.type === activeFilter)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isHeaderScrolled ? "glass-effect shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-black text-gray-900">Marconi</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
                Inicio
              </a>
              <a href="#propiedades" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
                Propiedades
              </a>
              <a href="#nosotros" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
                Nosotros
              </a>
              <a href="#contacto" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
                Contacto
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent">
                Iniciar Sesión
              </Button>
              <Button className="btn-premium">Contactar</Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-effect border-t border-white/20">
            <div className="px-4 py-4 space-y-4">
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
                  Iniciar Sesión
                </Button>
                <Button className="w-full btn-premium">Contactar</Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-orange-900/20"
      >
        <ParticleBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-fluid-5xl md:text-fluid-7xl font-black text-white mb-6 tracking-tight">
              Tu hogar ideal{" "}
              <span className="gradient-text bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                te espera
              </span>
            </h1>
            <p className="text-fluid-lg md:text-fluid-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubre propiedades excepcionales con Marconi Inmobiliaria. Más de 15 años conectando familias con sus
              hogares perfectos.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Button size="lg" className="btn-premium text-lg px-8 py-4">
              Ver Propiedades
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4 bg-transparent"
            >
              Contactar Ahora
            </Button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="text-center">
              <div className="text-fluid-3xl md:text-fluid-4xl font-black text-orange-400 mb-2">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <p className="text-gray-300 text-fluid-sm">Propiedades Vendidas</p>
            </div>
            <div className="text-center">
              <div className="text-fluid-3xl md:text-fluid-4xl font-black text-orange-400 mb-2">
                <AnimatedCounter end={15} suffix="+" />
              </div>
              <p className="text-gray-300 text-fluid-sm">Años de Experiencia</p>
            </div>
            <div className="text-center">
              <div className="text-fluid-3xl md:text-fluid-4xl font-black text-orange-400 mb-2">
                <AnimatedCounter end={1200} suffix="+" />
              </div>
              <p className="text-gray-300 text-fluid-sm">Clientes Satisfechos</p>
            </div>
            <div className="text-center">
              <div className="text-fluid-3xl md:text-fluid-4xl font-black text-orange-400 mb-2">
                <AnimatedCounter end={98} suffix="%" />
              </div>
              <p className="text-gray-300 text-fluid-sm">Satisfacción</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      </section>

      {/* Properties Section */}
      <section id="propiedades" className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-fluid-3xl md:text-fluid-5xl font-black text-gray-900 mb-4 tracking-tight">
              Propiedades <span className="gradient-text">Destacadas</span>
            </h2>
            <p className="text-fluid-lg text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra selección de propiedades premium en las mejores ubicaciones
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { key: "todos", label: "Todas" },
              { key: "venta", label: "En Venta" },
              { key: "alquiler", label: "En Alquiler" },
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={activeFilter === filter.key ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.key)}
                className={
                  activeFilter === filter.key ? "btn-premium" : "border-orange-500 text-orange-500 hover:bg-orange-50"
                }
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="card-hover overflow-hidden group">
                <div className="relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {property.featured && (
                    <Badge className="absolute top-4 left-4 bg-orange-500 text-white">Destacada</Badge>
                  )}

                  <Button size="sm" variant="ghost" className="absolute top-4 right-4 text-white hover:bg-white/20">
                    <Heart className="w-5 h-5" />
                  </Button>

                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge variant="secondary" className="mb-2">
                      {property.type === "venta" ? "En Venta" : "En Alquiler"}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      <span>{property.area}m²</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-black text-orange-500">
                      ${property.price.toLocaleString()}
                      {property.type === "alquiler" && <span className="text-sm text-gray-600">/mes</span>}
                    </div>
                    <Button className="btn-premium">Ver Detalles</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-fluid-3xl md:text-fluid-5xl font-black text-gray-900 mb-6 tracking-tight">
                Conoce a <span className="gradient-text">Floriana Marconi</span>
              </h2>
              <p className="text-fluid-lg text-gray-600 mb-6 leading-relaxed">
                Con más de 15 años de experiencia en el mercado inmobiliario, Floriana Marconi ha ayudado a cientos de
                familias a encontrar su hogar ideal.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Su enfoque personalizado y conocimiento profundo del mercado local la convierten en la elección perfecta
                para tu próxima inversión inmobiliaria.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Award className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-black text-orange-500">
                    <AnimatedCounter end={15} suffix="+" />
                  </div>
                  <p className="text-sm text-gray-600">Años de Experiencia</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Users className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-black text-orange-500">
                    <AnimatedCounter end={500} suffix="+" />
                  </div>
                  <p className="text-sm text-gray-600">Clientes Atendidos</p>
                </div>
              </div>

              <Button className="btn-premium">Conocer Más</Button>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/placeholder-user.jpg"
                  alt="Floriana Marconi"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl transform rotate-3" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-fluid-3xl md:text-fluid-5xl font-black text-gray-900 mb-4 tracking-tight">
              ¿Listo para encontrar tu <span className="gradient-text">hogar ideal</span>?
            </h2>
            <p className="text-fluid-lg text-gray-600 max-w-2xl mx-auto">
              Contáctanos hoy mismo y comencemos a buscar la propiedad perfecta para ti
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Teléfono</p>
                    <p className="text-gray-600">+54 11 1234-5678</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">info@marconipropiedades.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Dirección</p>
                    <p className="text-gray-600">Av. Principal 123, Ciudad</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Síguenos en redes sociales</h4>
                <div className="flex space-x-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                  >
                    <Instagram className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h3>

              <form className="space-y-6">
                <div className="form-group">
                  <Input
                    type="text"
                    placeholder=" "
                    className="floating-input w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <label className="floating-label">Nombre completo</label>
                </div>

                <div className="form-group">
                  <Input
                    type="email"
                    placeholder=" "
                    className="floating-input w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <label className="floating-label">Email</label>
                </div>

                <div className="form-group">
                  <Input
                    type="tel"
                    placeholder=" "
                    className="floating-input w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <label className="floating-label">Teléfono</label>
                </div>

                <div className="form-group">
                  <Textarea
                    placeholder=" "
                    rows={4}
                    className="floating-input w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  />
                  <label className="floating-label">Mensaje</label>
                </div>

                <Button type="submit" className="w-full btn-premium">
                  Enviar Mensaje
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black">Marconi Inmobiliaria</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Tu socio de confianza en el mercado inmobiliario. Conectamos familias con sus hogares perfectos desde
                hace más de 15 años.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="ghost" className="text-gray-300 hover:text-orange-400">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-300 hover:text-orange-400">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-300 hover:text-orange-400">
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#inicio" className="text-gray-300 hover:text-orange-400 transition-colors">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#propiedades" className="text-gray-300 hover:text-orange-400 transition-colors">
                    Propiedades
                  </a>
                </li>
                <li>
                  <a href="#nosotros" className="text-gray-300 hover:text-orange-400 transition-colors">
                    Nosotros
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="text-gray-300 hover:text-orange-400 transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-gray-300">Venta de Propiedades</span>
                </li>
                <li>
                  <span className="text-gray-300">Alquiler de Propiedades</span>
                </li>
                <li>
                  <span className="text-gray-300">Asesoramiento</span>
                </li>
                <li>
                  <span className="text-gray-300">Tasaciones</span>
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
