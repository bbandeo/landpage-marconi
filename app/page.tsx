"use client"

import type React from "react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { ParticleBackground } from "@/components/ui/particle-background"
import { useToast } from "@/hooks/use-toast"
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Home,
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
  Users,
  TrendingUp,
} from "lucide-react"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const { toast } = useToast()

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
      title: "Casa Moderna en Palermo",
      price: "$850,000",
      location: "Palermo, Buenos Aires",
      image: "/placeholder.svg?height=300&width=400&text=Casa+Moderna",
      beds: 4,
      baths: 3,
      area: "280m²",
      parking: 2,
      type: "Casa",
      featured: true,
    },
    {
      id: 2,
      title: "Departamento de Lujo en Puerto Madero",
      price: "$1,200,000",
      location: "Puerto Madero, Buenos Aires",
      image: "/placeholder.svg?height=300&width=400&text=Departamento+Lujo",
      beds: 3,
      baths: 2,
      area: "180m²",
      parking: 1,
      type: "Departamento",
      featured: true,
    },
    {
      id: 3,
      title: "Terreno Premium en Nordelta",
      price: "$450,000",
      location: "Nordelta, Buenos Aires",
      image: "/placeholder.svg?height=300&width=400&text=Terreno+Premium",
      beds: 0,
      baths: 0,
      area: "1,200m²",
      parking: 0,
      type: "Terreno",
      featured: false,
    },
  ]

  const testimonials = [
    {
      name: "María González",
      role: "Compradora",
      content: "Excelente servicio. Me ayudaron a encontrar la casa perfecta para mi familia.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60&text=MG",
    },
    {
      name: "Carlos Rodríguez",
      role: "Vendedor",
      content: "Profesionales excepcionales. Vendieron mi propiedad en tiempo récord.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60&text=CR",
    },
    {
      name: "Ana Martínez",
      role: "Inversora",
      content: "La mejor asesoría en inversiones inmobiliarias. Altamente recomendados.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60&text=AM",
    },
  ]

  const services = [
    {
      icon: Home,
      title: "Compra y Venta",
      description: "Te ayudamos a encontrar la propiedad ideal o vender tu inmueble al mejor precio del mercado.",
    },
    {
      icon: Building,
      title: "Alquiler",
      description: "Gestión completa de alquileres con garantía de cobro y mantenimiento incluido.",
    },
    {
      icon: TrendingUp,
      title: "Inversiones",
      description: "Asesoramiento especializado en inversiones inmobiliarias rentables y seguras.",
    },
    {
      icon: Users,
      title: "Consultoría",
      description: "Consultoría personalizada para desarrolladores e inversores institucionales.",
    },
    {
      icon: Award,
      title: "Tasaciones",
      description: "Tasaciones profesionales realizadas por expertos certificados en el mercado.",
    },
    {
      icon: Building,
      title: "Desarrollos",
      description: "Participación en desarrollos inmobiliarios exclusivos y oportunidades de pre-venta.",
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="min-h-screen bg-white">
      <ParticleBackground />

      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "glass-effect shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-orange-500" />
              <span className="text-fluid-xl font-black gradient-text">Marconi</span>
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
            <p className="text-fluid-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubre las mejores propiedades en Argentina con más de 15 años de experiencia en el mercado inmobiliario
              premium.
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
                Agendar Cita
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center animate-float">
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
                  <AnimatedCounter end={1200} suffix="+" />
                </div>
                <p className="text-gray-600 font-medium">Clientes Satisfechos</p>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="text-fluid-4xl font-black text-orange-500 mb-2">
                  <AnimatedCounter end={98} suffix="%" />
                </div>
                <p className="text-gray-600 font-medium">Tasa de Éxito</p>
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
              Explora nuestra selección exclusiva de propiedades premium en las mejores ubicaciones.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Card key={property.id} className="card-hover overflow-hidden border-0 shadow-lg">
                <div className="relative">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  {property.featured && (
                    <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600 text-white">
                      Destacada
                    </Badge>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-700">
                      {property.type}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-fluid-xl font-bold">{property.title}</CardTitle>
                  <CardDescription className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-fluid-2xl font-black text-orange-500">{property.price}</span>
                    <span className="text-gray-600 font-medium">{property.area}</span>
                  </div>
                  {property.beds > 0 && (
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
                  )}
                  <Button className="w-full btn-premium">Ver Detalles</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
            >
              Ver Todas las Propiedades
            </Button>
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
              Ofrecemos servicios integrales para todas tus necesidades inmobiliarias.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="card-hover text-center p-8 border-0 shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <service.icon className="h-8 w-8 text-orange-500" />
                </div>
                <CardHeader>
                  <CardTitle className="text-fluid-xl font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
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
            <p className="text-fluid-lg text-gray-600 max-w-2xl mx-auto">
              La satisfacción de nuestros clientes es nuestra mayor recompensa.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl p-8">
              <CardContent className="text-center">
                <div className="flex justify-center mb-6">
                  <Image
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-fluid-lg text-gray-700 mb-6 italic">
                  &quot;{testimonials[currentTestimonial].content}&quot;
                </blockquote>
                <div>
                  <p className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</p>
                  <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                </div>
              </CardContent>
            </Card>

            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-orange-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-fluid-5xl font-black text-gray-900 mb-4">
              Contáctanos <span className="gradient-text">Hoy</span>
            </h2>
            <p className="text-fluid-lg text-gray-600 max-w-2xl mx-auto">
              Estamos aquí para ayudarte a encontrar la propiedad perfecta o vender la tuya.
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
                      <Input type="text" placeholder=" " className="floating-input" required />
                      <label className="floating-label">Nombre completo</label>
                    </div>
                    <div className="form-group">
                      <Input type="email" placeholder=" " className="floating-input" required />
                      <label className="floating-label">Email</label>
                    </div>
                    <div className="form-group">
                      <Input type="tel" placeholder=" " className="floating-input" required />
                      <label className="floating-label">Teléfono</label>
                    </div>
                    <div className="form-group">
                      <Textarea placeholder=" " className="floating-input min-h-[120px]" required />
                      <label className="floating-label">Mensaje</label>
                    </div>
                    <Button type="submit" className="w-full btn-premium text-fluid-lg py-3">
                      Enviar Mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="border-0 shadow-xl p-8">
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Nuestra Oficina</h3>
                      <p className="text-gray-600">
                        Av. Santa Fe 1234, Piso 5<br />
                        Palermo, Buenos Aires
                        <br />
                        Argentina
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl p-8">
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Teléfono</h3>
                      <p className="text-gray-600">
                        +54 11 4567-8900
                        <br />
                        +54 9 11 2345-6789
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl p-8">
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Email</h3>
                      <p className="text-gray-600">
                        info@marconiinmobiliaria.com
                        <br />
                        ventas@marconiinmobiliaria.com
                      </p>
                    </div>
                  </div>
                </CardContent>
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
              <div className="flex items-center space-x-2 mb-6">
                <Home className="h-8 w-8 text-orange-500" />
                <span className="text-fluid-xl font-black">Marconi</span>
              </div>
              <p className="text-gray-400 mb-4">
                Tu socio de confianza en el mercado inmobiliario argentino desde 2008.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">ig</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Servicios</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Venta
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Alquiler
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Inversiones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Tasaciones
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Propiedades</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Casas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Departamentos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Terrenos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Comerciales
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Av. Santa Fe 1234, Piso 5</li>
                <li>Palermo, Buenos Aires</li>
                <li>+54 11 4567-8900</li>
                <li>info@marconiinmobiliaria.com</li>
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