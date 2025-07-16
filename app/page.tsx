"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Building,
  Award,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Bed,
  Bath,
  Square,
  Car,
} from "lucide-react"

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <span>{count}</span>
}

// Scroll Progress Component
function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollPx / winHeightPx
      setScrollProgress(scrolled)
    }

    window.addEventListener("scroll", updateScrollProgress)
    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  return <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
}

// Particle Background Component
function ParticleBackground() {
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.animationDuration = Math.random() * 3 + 2 + "s"
      particle.style.opacity = (Math.random() * 0.5 + 0.1).toString()
      particle.style.width = particle.style.height = Math.random() * 10 + 5 + "px"

      document.body.appendChild(particle)

      setTimeout(() => {
        particle.remove()
      }, 5000)
    }

    const interval = setInterval(createParticle, 300)
    return () => clearInterval(interval)
  }, [])

  return null
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { toast } = useToast()

  const properties = [
    {
      id: 1,
      title: "Casa Moderna en Zona Norte",
      price: "$450,000",
      location: "Zona Norte, Ciudad",
      image: "/placeholder.svg?height=300&width=400&text=Casa+Moderna",
      beds: 3,
      baths: 2,
      area: "180m²",
      parking: 2,
      type: "Casa",
    },
    {
      id: 2,
      title: "Apartamento de Lujo Centro",
      price: "$320,000",
      location: "Centro, Ciudad",
      image: "/placeholder.svg?height=300&width=400&text=Apartamento+Lujo",
      beds: 2,
      baths: 2,
      area: "120m²",
      parking: 1,
      type: "Apartamento",
    },
    {
      id: 3,
      title: "Villa con Piscina",
      price: "$750,000",
      location: "Zona Residencial",
      image: "/placeholder.svg?height=300&width=400&text=Villa+Piscina",
      beds: 4,
      baths: 3,
      area: "300m²",
      parking: 3,
      type: "Villa",
    },
  ]

  const testimonials = [
    {
      name: "María González",
      text: "Excelente servicio, encontraron la casa perfecta para mi familia.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60&text=MG",
    },
    {
      name: "Carlos Rodríguez",
      text: "Profesionales y confiables. Muy recomendados.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60&text=CR",
    },
    {
      name: "Ana Martínez",
      text: "El proceso de compra fue muy sencillo gracias a su equipo.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60&text=AM",
    },
  ]

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo pronto.",
    })
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <ParticleBackground />

      {/* Header */}
      <header className="glass-effect fixed w-full top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Menu className="h-8 w-8 text-orange-500" />
              <span className="text-fluid-xl font-black gradient-text">Marconi Inmobiliaria</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Inicio
              </a>
              <a href="#propiedades" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Propiedades
              </a>
              <a href="#servicios" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Servicios
              </a>
              <a href="#contacto" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Contacto
              </a>
              <Button className="btn-premium">Consulta Gratis</Button>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4">
              <div className="flex flex-col space-y-4">
                <a href="#inicio" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                  Inicio
                </a>
                <a href="#propiedades" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                  Propiedades
                </a>
                <a href="#servicios" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                  Servicios
                </a>
                <a href="#contacto" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                  Contacto
                </a>
                <Button className="btn-premium w-full">Consulta Gratis</Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200&text=Hero+Background')] bg-cover bg-center opacity-10"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-fluid-6xl font-black text-gray-900 mb-6 leading-tight">
              Tu <span className="gradient-text">Hogar Ideal</span>
              <br />
              Te Espera
            </h1>
            <p className="text-fluid-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Encuentra la propiedad perfecta con más de 15 años de experiencia en el mercado inmobiliario
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="btn-premium text-fluid-lg px-8 py-4">
                Ver Propiedades
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-fluid-lg px-8 py-4 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 bg-transparent"
              >
                Contactar Ahora
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center animate-float">
                <div className="text-fluid-4xl font-black text-orange-500 mb-2">
                  <AnimatedCounter end={500} />+
                </div>
                <p className="text-gray-600 font-medium">Propiedades Vendidas</p>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="text-fluid-4xl font-black text-orange-500 mb-2">
                  <AnimatedCounter end={15} />+
                </div>
                <p className="text-gray-600 font-medium">Años de Experiencia</p>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: "1s" }}>
                <div className="text-fluid-4xl font-black text-orange-500 mb-2">
                  <AnimatedCounter end={1200} />+
                </div>
                <p className="text-gray-600 font-medium">Clientes Satisfechos</p>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="text-fluid-4xl font-black text-orange-500 mb-2">
                  <AnimatedCounter end={98} />%
                </div>
                <p className="text-gray-600 font-medium">Satisfacción</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="propiedades" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-fluid-5xl font-black text-gray-900 mb-4">
              Propiedades <span className="gradient-text">Destacadas</span>
            </h2>
            <p className="text-fluid-lg text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra selección de propiedades premium en las mejores ubicaciones
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Card key={property.id} className="card-hover overflow-hidden border-0 shadow-lg">
                <div className="relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-64 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-orange-500 text-white">{property.type}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-fluid-lg font-bold">{property.title}</CardTitle>
                  <CardDescription className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-fluid-2xl font-black text-orange-500">{property.price}</span>
                  </div>

                  <div className="grid grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      {property.beds}
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      {property.baths}
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      {property.area}
                    </div>
                    <div className="flex items-center">
                      <Car className="h-4 w-4 mr-1" />
                      {property.parking}
                    </div>
                  </div>

                  <Button className="w-full btn-premium">Ver Detalles</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-fluid-5xl font-black text-gray-900 mb-4">
              Nuestros <span className="gradient-text">Servicios</span>
            </h2>
            <p className="text-fluid-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos soluciones integrales para todas tus necesidades inmobiliarias
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-hover text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Menu className="h-8 w-8 text-orange-500" />
              </div>
              <CardHeader>
                <CardTitle className="text-fluid-xl font-bold">Compra y Venta</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Te ayudamos a encontrar la propiedad ideal o vender tu inmueble al mejor precio del mercado.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="h-8 w-8 text-orange-500" />
              </div>
              <CardHeader>
                <CardTitle className="text-fluid-xl font-bold">Alquiler</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Gestión completa de alquileres con garantía de cobro y mantenimiento incluido.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-orange-500" />
              </div>
              <CardHeader>
                <CardTitle className="text-fluid-xl font-bold">Asesoría Legal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Acompañamiento legal completo en todos los procesos de compra, venta y alquiler.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-fluid-5xl font-black text-gray-900 mb-4">
              Lo que dicen nuestros <span className="gradient-text">Clientes</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <Card className="border-0 shadow-xl p-8">
              <CardContent className="text-center">
                <div className="flex justify-center mb-6">
                  <img
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full"
                  />
                </div>

                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-fluid-lg text-gray-600 mb-6 italic">"{testimonials[currentTestimonial].text}"</p>

                <h4 className="text-fluid-xl font-bold text-gray-900">{testimonials[currentTestimonial].name}</h4>
              </CardContent>
            </Card>

            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6 text-orange-500" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6 text-orange-500" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-fluid-5xl font-black text-gray-900 mb-4">
              <span className="gradient-text">Contáctanos</span>
            </h2>
            <p className="text-fluid-lg text-gray-600 max-w-2xl mx-auto">
              Estamos aquí para ayudarte a encontrar tu hogar ideal
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <Card className="border-0 shadow-xl p-8">
                <CardHeader>
                  <CardTitle className="text-fluid-2xl font-bold mb-6">Envíanos un mensaje</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="form-group">
                      <Input placeholder=" " className="floating-input" required />
                      <label className="floating-label">Nombre completo</label>
                    </div>

                    <div className="form-group">
                      <Input type="email" placeholder=" " className="floating-input" required />
                      <label className="floating-label">Correo electrónico</label>
                    </div>

                    <div className="form-group">
                      <Input type="tel" placeholder=" " className="floating-input" required />
                      <label className="floating-label">Teléfono</label>
                    </div>

                    <div className="form-group">
                      <Textarea placeholder=" " className="floating-input min-h-[120px]" required />
                      <label className="floating-label">Mensaje</label>
                    </div>

                    <Button type="submit" className="w-full btn-premium text-fluid-lg py-4">
                      Enviar Mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="border-0 shadow-xl p-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-fluid-lg font-bold">Teléfono</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
              </Card>

              <Card className="border-0 shadow-xl p-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-fluid-lg font-bold">Email</h3>
                    <p className="text-gray-600">info@marconiinmobiliaria.com</p>
                  </div>
                </div>
              </Card>

              <Card className="border-0 shadow-xl p-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-fluid-lg font-bold">Oficina</h3>
                    <p className="text-gray-600">Av. Principal 123, Ciudad</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Menu className="h-8 w-8 text-orange-500" />
                <span className="text-fluid-xl font-black">Marconi Inmobiliaria</span>
              </div>
              <p className="text-gray-400">Tu socio de confianza en el mercado inmobiliario desde 2008.</p>
            </div>

            <div>
              <h3 className="text-fluid-lg font-bold mb-4">Servicios</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Compra y Venta
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
              <h3 className="text-fluid-lg font-bold mb-4">Enlaces</h3>
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
                  <a href="#servicios" className="hover:text-orange-500 transition-colors">
                    Servicios
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
              <h3 className="text-fluid-lg font-bold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  info@marconiinmobiliaria.com
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Av. Principal 123, Ciudad
                </li>
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
