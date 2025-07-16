"use client"

import { useState, useEffect } from "react"
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Home,
  Users,
  Award,
  Star,
  Heart,
  Bed,
  Bath,
  Square,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { ParticleBackground } from "@/components/ui/particle-background"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
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
      price: "$450.000",
      type: "Venta",
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
      image: "/placeholder.svg?height=300&width=400&text=Casa+Moderna",
      location: "Zona Norte",
      featured: true,
    },
    {
      id: 2,
      title: "Departamento Céntrico",
      price: "$1.200/mes",
      type: "Alquiler",
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      image: "/placeholder.svg?height=300&width=400&text=Departamento",
      location: "Centro",
      featured: true,
    },
    {
      id: 3,
      title: "Casa con Jardín",
      price: "$320.000",
      type: "Venta",
      bedrooms: 3,
      bathrooms: 2,
      area: 200,
      image: "/placeholder.svg?height=300&width=400&text=Casa+Jardín",
      location: "Zona Oeste",
      featured: true,
    },
  ]

  const testimonials = [
    {
      name: "María González",
      text: "Excelente atención y profesionalismo. Encontré mi casa ideal gracias a Marconi Inmobiliaria.",
      rating: 5,
    },
    {
      name: "Carlos Rodríguez",
      text: "Muy recomendable. El proceso de compra fue rápido y transparente.",
      rating: 5,
    },
    {
      name: "Ana Martínez",
      text: "Floriana nos ayudó a encontrar el departamento perfecto. Servicio excepcional.",
      rating: 5,
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
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
              <span className="text-fluid-xl font-black text-gray-900">
                Marconi <span className="gradient-text">Inmobiliaria</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
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
              <a href="tel:+1234567890" className="text-orange-500 hover:text-orange-600 transition-colors">
                <Phone className="h-5 w-5" />
              </a>
              <button className="btn-premium">Contactar</button>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-2">
              <a href="#inicio" className="block py-2 text-gray-700 hover:text-orange-500">
                Inicio
              </a>
              <a href="#propiedades" className="block py-2 text-gray-700 hover:text-orange-500">
                Propiedades
              </a>
              <a href="#nosotros" className="block py-2 text-gray-700 hover:text-orange-500">
                Nosotros
              </a>
              <a href="#contacto" className="block py-2 text-gray-700 hover:text-orange-500">
                Contacto
              </a>
              <button className="btn-premium w-full mt-4">Contactar</button>
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-fluid-7xl font-black text-white mb-6 tracking-tight">
              Tu hogar ideal
              <span className="block gradient-text">te espera</span>
            </h1>
            <p className="text-fluid-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubre las mejores propiedades con Marconi Inmobiliaria. Más de 15 años conectando familias con sus
              hogares soñados.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="btn-premium text-lg px-8 py-4">Ver Propiedades</button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                Contactar Ahora
              </button>
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
                  <AnimatedCounter end={24} suffix="/7" />
                </div>
                <p className="text-gray-300">Atención al Cliente</p>
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
              Explora nuestra selección de propiedades premium, cuidadosamente elegidas para ofrecerte las mejores
              opciones del mercado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div key={property.id} className="card-hover bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        property.type === "Venta" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {property.type}
                    </span>
                  </div>
                  <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                  </button>
                  {property.featured && (
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Destacada
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
                    <span className="text-2xl font-black text-orange-500">{property.price}</span>
                  </div>

                  <p className="text-gray-600 mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </p>

                  <div className="flex justify-between items-center text-gray-600 mb-6">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      <span>{property.area}m²</span>
                    </div>
                  </div>

                  <button className="w-full btn-premium">Ver Detalles</button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-white text-orange-500 border-2 border-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300">
              Ver Todas las Propiedades
            </button>
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
                Con más de 15 años de experiencia en el mercado inmobiliario, Floriana Marconi se ha consolidado como
                una de las profesionales más confiables y exitosas del sector.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Home className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Experiencia</h3>
                    <p className="text-gray-600">15+ años en el mercado</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Clientes</h3>
                    <p className="text-gray-600">500+ familias felices</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Reconocimientos</h3>
                    <p className="text-gray-600">Agente del año 2023</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Calificación</h3>
                    <p className="text-gray-600">4.9/5 estrellas</p>
                  </div>
                </div>
              </div>

              <button className="btn-premium">Conocer Más</button>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/placeholder-user.jpg"
                  alt="Floriana Marconi"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-fluid-5xl font-black text-gray-900 mb-6">
              Lo que dicen nuestros <span className="gradient-text">clientes</span>
            </h2>
            <p className="text-fluid-lg text-gray-600 max-w-3xl mx-auto">
              La satisfacción de nuestros clientes es nuestra mayor recompensa. Descubre por qué confían en nosotros
              para encontrar su hogar ideal.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 text-lg mb-6 italic">"{testimonial.text}"</p>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-orange-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
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
              Contáctanos hoy mismo y comienza el camino hacia la propiedad de tus sueños. Estamos aquí para ayudarte en
              cada paso del proceso.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Información de Contacto</h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Teléfono</h4>
                    <p className="text-gray-600">+54 11 1234-5678</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@marconipropiedades.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Oficina</h4>
                    <p className="text-gray-600">Av. Principal 123, Ciudad</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    className="floating-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="name" className="floating-label">
                    Nombre completo
                  </label>
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    className="floating-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="email" className="floating-label">
                    Email
                  </label>
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    id="phone"
                    className="floating-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder=" "
                  />
                  <label htmlFor="phone" className="floating-label">
                    Teléfono
                  </label>
                </div>

                <div className="form-group">
                  <textarea
                    id="message"
                    rows={4}
                    className="floating-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="message" className="floating-label">
                    Mensaje
                  </label>
                </div>

                <button type="submit" className="btn-premium w-full">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Home className="h-8 w-8 text-orange-500" />
                <span className="text-2xl font-black">
                  Marconi <span className="text-orange-500">Inmobiliaria</span>
                </span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Tu socio de confianza en el mercado inmobiliario. Conectamos familias con sus hogares ideales desde hace
                más de 15 años.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Enlaces Rápidos</h3>
              <ul className="space-y-3">
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
              <h3 className="text-lg font-semibold mb-6">Servicios</h3>
              <ul className="space-y-3">
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

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2024 Marconi Inmobiliaria. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
