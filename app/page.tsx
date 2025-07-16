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
  Phone,
  Mail,
  Star,
  ChevronLeft,
  ChevronRight,
  Home,
  Building,
  Users,
  Award,
} from "lucide-react"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
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
      price: "$450,000",
      location: "Zona Norte, Ciudad",
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
      type: "Venta",
      image: "/placeholder.svg?height=300&width=400&text=Casa+Moderna",
    },
    {
      id: 2,
      title: "Departamento Céntrico",
      price: "$1,200/mes",
      location: "Centro, Ciudad",
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      type: "Alquiler",
      image: "/placeholder.svg?height=300&width=400&text=Departamento+Céntrico",
    },
    {
      id: 3,
      title: "Villa con Piscina",
      price: "$750,000",
      location: "Zona Residencial",
      bedrooms: 5,
      bathrooms: 4,
      area: 450,
      type: "Venta",
      image: "/placeholder.svg?height=300&width=400&text=Villa+con+Piscina",
    },
  ]

  const testimonials = [
    {
      name: "María González",
      text: "Excelente servicio, encontré mi casa ideal gracias a Marconi Inmobiliaria.",
      rating: 5,
    },
    {
      name: "Carlos Rodríguez",
      text: "Profesionales y confiables. Recomiendo sus servicios al 100%.",
      rating: 5,
    },
    {
      name: "Ana Martínez",
      text: "Proceso rápido y transparente. Muy satisfecha con la atención recibida.",
      rating: 5,
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "glass-effect shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-orange-500" />
              <span className="text-fluid-xl font-black gradient-text">Marconi</span>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a href="#inicio" className="text-gray-900 hover:text-orange-500 transition-colors font-medium">
                Inicio
              </a>
              <a href="#propiedades" className="text-gray-900 hover:text-orange-500 transition-colors font-medium">
                Propiedades
              </a>
              <a href="#nosotros" className="text-gray-900 hover:text-orange-500 transition-colors font-medium">
                Nosotros
              </a>
              <a href="#contacto" className="text-gray-900 hover:text-orange-500 transition-colors font-medium">
                Contacto
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent">
                Iniciar Sesión
              </Button>
              <Button className="btn-premium">Contactar</Button>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-effect border-t">
            <div className="px-4 py-4 space-y-4">
              <a href="#inicio" className="block text-gray-900 hover:text-orange-500 transition-colors">
                Inicio
              </a>
              <a href="#propiedades" className="block text-gray-900 hover:text-orange-500 transition-colors">
                Propiedades
              </a>
              <a href="#nosotros" className="block text-gray-900 hover:text-orange-500 transition-colors">
                Nosotros
              </a>
              <a href="#contacto" className="block text-gray-900 hover:text-orange-500 transition-colors">
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
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-orange-900/20 overflow-hidden"
      >
        <ParticleBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-fluid-7xl font-black text-white mb-6 tracking-tight">
              Tu hogar ideal
              <span className="block gradient-text">te espera</span>
            </h1>
            <p className="text-fluid-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubre las mejores propiedades con Marconi Inmobiliaria. Más de 15 años conectando familias con sus
              hogares perfectos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center animate-float" style={{ animationDelay: "0s" }}>
                <div className="text-fluid-4xl font-black text-white mb-2">
                  <AnimatedCounter end={500} suffix="+" />
                </div>
                <p className="text-gray-300">Propiedades Vendidas</p>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="text-fluid-4xl font-black text-white mb-2">
                  <AnimatedCounter end={15} suffix="+" />
                </div>
                <p className="text-gray-300">Años de Experiencia</p>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: "1s" }}>
                <div className="text-fluid-4xl font-black text-white mb-2">
                  <AnimatedCounter end={98} suffix="%" />
                </div>
                <p className="text-gray-300">Clientes Satisfechos</p>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="text-fluid-4xl font-black text-white mb-2">
                  <AnimatedCounter end={50} suffix="+" />
                </div>
                <p className="text-gray-300">Agentes Expertos</p>
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
              Explora nuestra selección de propiedades premium en las mejores ubicaciones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Card key={property.id} className="card-hover overflow-hidden">
                <div className="relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      className={`${
                        property.type === "Venta" ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
                      } text-white`}
                    >
                      {property.type}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                <CardContent className="p-6">
                  <h3 className="text-fluid-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
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
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-fluid-2xl font-black gradient-text">{property.price}</span>
                    <Button className="btn-premium">Ver Detalles</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
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
              <p className="text-fluid-lg text-gray-600 mb-8 leading-relaxed">
                Con más de 15 años de experiencia en el mercado inmobiliario, Floriana Marconi ha ayudado a cientos de
                familias a encontrar su hogar ideal. Su compromiso con la excelencia y atención personalizada la han
                convertido en una de las agentes más reconocidas de la región.
              </p>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="text-center">
                  <Building className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Experiencia</h3>
                  <p className="text-gray-600">15+ años en el mercado</p>
                </div>
                <div className="text-center">
                  <Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Clientes</h3>
                  <p className="text-gray-600">500+ familias satisfechas</p>
                </div>
                <div className="text-center">
                  <Award className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Reconocimientos</h3>
                  <p className="text-gray-600">Agente del año 2023</p>
                </div>
                <div className="text-center">
                  <Star className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Calificación</h3>
                  <p className="text-gray-600">5.0 estrellas promedio</p>
                </div>
              </div>

              <Button className="btn-premium">Agendar Consulta</Button>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/placeholder-user.jpg"
                  alt="Floriana Marconi"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-fluid-5xl font-black text-gray-900 mb-6">
              Lo que dicen nuestros <span className="gradient-text">clientes</span>
            </h2>
          </div>

          <div className="relative">
            <Card className="p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-fluid-xl text-gray-600 mb-6 italic">"{testimonials[currentTestimonial].text}"</p>
              <h4 className="text-fluid-lg font-bold text-gray-900">{testimonials[currentTestimonial].name}</h4>
            </Card>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial ? "bg-orange-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-fluid-5xl font-black text-gray-900 mb-6">
              ¿Listo para encontrar tu <span className="gradient-text">hogar ideal</span>?
            </h2>
            <p className="text-fluid-lg text-gray-600 max-w-3xl mx-auto">
              Contáctanos hoy mismo y comienza tu búsqueda con la mejor asesoría profesional
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-fluid-2xl font-bold text-gray-900 mb-8">Información de Contacto</h3>

              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-orange-500 mr-4" />
                  <div>
                    <p className="font-semibold text-gray-900">Teléfono</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-orange-500 mr-4" />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">info@marconipropiedades.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-orange-500 mr-4" />
                  <div>
                    <p className="font-semibold text-gray-900">Oficina</p>
                    <p className="text-gray-600">Av. Principal 123, Ciudad</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="text-fluid-lg font-bold text-gray-900 mb-4">Horarios de Atención</h4>
                <div className="space-y-2 text-gray-600">
                  <p>Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                  <p>Sábados: 9:00 AM - 2:00 PM</p>
                  <p>Domingos: Cerrado</p>
                </div>
              </div>
            </div>

            <Card className="p-8">
              <h3 className="text-fluid-2xl font-bold text-gray-900 mb-6">Envíanos un Mensaje</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <Input type="text" placeholder=" " className="floating-input peer" />
                    <label className="floating-label">Nombre</label>
                  </div>
                  <div className="form-group">
                    <Input type="email" placeholder=" " className="floating-input peer" />
                    <label className="floating-label">Email</label>
                  </div>
                </div>
                <div className="form-group">
                  <Input type="tel" placeholder=" " className="floating-input peer" />
                  <label className="floating-label">Teléfono</label>
                </div>
                <div className="form-group">
                  <Textarea placeholder=" " rows={4} className="floating-input peer resize-none" />
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
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Home className="h-8 w-8 text-orange-500" />
                <span className="text-fluid-xl font-black">Marconi</span>
              </div>
              <p className="text-gray-400 mb-4">
                Tu socio de confianza en bienes raíces. Encontramos el hogar perfecto para ti.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#inicio" className="hover:text-orange-500 transition-colors">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#propiedades" className="hover:text-orange-500 transition-colors">
                    Propiedades
                  </a>
                </li>
                <li>
                  <a href="#nosotros" className="hover:text-orange-500 transition-colors">
                    Nosotros
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="hover:text-orange-500 transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Venta de Propiedades
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Alquiler
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Asesoría Legal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Valuaciones
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+1 (555) 123-4567</li>
                <li>info@marconipropiedades.com</li>
                <li>Av. Principal 123, Ciudad</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Marconi Inmobiliaria. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
