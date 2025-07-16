"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ParticleBackground } from "@/components/ui/particle-background"
import { AnimatedCounter } from "@/components/ui/animated-counter"
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
  ChevronDown,
  ArrowRight,
  CheckCircle,
  Award,
  TrendingUp,
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
      price: "$450,000",
      type: "venta",
      location: "Zona Norte, Ciudad",
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
      image: "/placeholder.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "Departamento Céntrico",
      price: "$1,200/mes",
      type: "alquiler",
      location: "Centro, Ciudad",
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      image: "/placeholder.jpg",
      featured: false,
    },
    {
      id: 3,
      title: "Villa con Piscina",
      price: "$750,000",
      type: "venta",
      location: "Zona Residencial",
      bedrooms: 5,
      bathrooms: 4,
      area: 450,
      image: "/placeholder.jpg",
      featured: true,
    },
  ]

  const filteredProperties = activeFilter === "todos" ? properties : properties.filter((p) => p.type === activeFilter)

  return (
    <div className="min-h-screen bg-white">
      {/* Header Premium */}
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? "backdrop-blur-lg bg-white/80 border-b border-gray-200 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-900">Marconi</h1>
                <p className="text-xs text-gray-600 -mt-1">Inmobiliaria</p>
              </div>
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

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Button className="btn-premium bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold">
                Consultar Ahora
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
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
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold">
                Consultar Ahora
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section Cinematográfico */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50"
      >
        <ParticleBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-up">
            <Badge className="mb-6 bg-orange-100 text-orange-800 px-4 py-2 text-sm font-semibold">
              ✨ Más de 15 años de experiencia
            </Badge>

            <h1 className="text-fluid-7xl font-black text-gray-900 mb-6 tracking-tight">
              Tu hogar ideal
              <span className="block gradient-text">te espera</span>
            </h1>

            <p className="text-fluid-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubre propiedades excepcionales con Marconi Inmobiliaria. Te acompañamos en cada paso hacia tu nuevo
              hogar.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button className="btn-premium bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg">
                Ver Propiedades
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-gray-300 hover:border-orange-500 px-8 py-4 text-lg font-semibold rounded-xl bg-transparent"
              >
                Contactar Asesor
              </Button>
            </div>

            {/* Stats flotantes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center animate-float" style={{ animationDelay: "0s" }}>
                <div className="text-fluid-3xl font-black text-orange-500">
                  <AnimatedCounter end={500} suffix="+" />
                </div>
                <p className="text-gray-600 font-medium">Propiedades Vendidas</p>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="text-fluid-3xl font-black text-orange-500">
                  <AnimatedCounter end={15} suffix="+" />
                </div>
                <p className="text-gray-600 font-medium">Años de Experiencia</p>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: "1s" }}>
                <div className="text-fluid-3xl font-black text-orange-500">
                  <AnimatedCounter end={98} suffix="%" />
                </div>
                <p className="text-gray-600 font-medium">Clientes Satisfechos</p>
              </div>
              <div className="text-center animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="text-fluid-3xl font-black text-orange-500">
                  <AnimatedCounter end={24} suffix="/7" />
                </div>
                <p className="text-gray-600 font-medium">Atención al Cliente</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Propiedades Destacadas */}
      <section id="propiedades" className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-orange-100 text-orange-800 px-4 py-2">Propiedades Premium</Badge>
            <h2 className="text-fluid-5xl font-black text-gray-900 mb-4">
              Propiedades <span className="gradient-text">Destacadas</span>
            </h2>
            <p className="text-fluid-lg text-gray-600 max-w-2xl mx-auto">
              Selección exclusiva de las mejores propiedades disponibles
            </p>
          </div>

          {/* Filtros animados */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { key: "todos", label: "Todas" },
              { key: "venta", label: "En Venta" },
              { key: "alquiler", label: "En Alquiler" },
            ].map((filter) => (
              <Button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                variant={activeFilter === filter.key ? "default" : "outline"}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === filter.key
                    ? "bg-orange-500 text-white shadow-lg"
                    : "hover:border-orange-500 hover:text-orange-500"
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Grid de propiedades */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="card-hover overflow-hidden border-0 shadow-lg">
                <div className="relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {property.featured && (
                      <Badge className="bg-orange-500 text-white px-2 py-1 text-xs">Destacada</Badge>
                    )}
                    <Badge
                      className={`px-2 py-1 text-xs ${
                        property.type === "venta" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                      }`}
                    >
                      {property.type === "venta" ? "Venta" : "Alquiler"}
                    </Badge>
                  </div>

                  {/* Favorito */}
                  <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                    <Heart className="w-5 h-5 text-white" />
                  </button>

                  {/* Precio */}
                  <div className="absolute bottom-4 left-4">
                    <p className="text-2xl font-black text-white">{property.price}</p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </p>

                  {/* Características */}
                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
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

                  <Button className="w-full btn-premium bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                    Ver Detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quiénes Somos */}
      <section id="nosotros" className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-orange-100 text-orange-800 px-4 py-2">Sobre Nosotros</Badge>
              <h2 className="text-fluid-5xl font-black text-gray-900 mb-6">
                Conoce a <span className="gradient-text">Floriana Marconi</span>
              </h2>
              <p className="text-fluid-lg text-gray-600 mb-8 leading-relaxed">
                Con más de 15 años de experiencia en el mercado inmobiliario, Floriana Marconi ha ayudado a cientos de
                familias a encontrar su hogar ideal. Su compromiso, profesionalismo y conocimiento del mercado la
                convierten en la mejor opción para tu próxima inversión inmobiliaria.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {[
                  "Asesoramiento personalizado",
                  "Amplio conocimiento del mercado local",
                  "Proceso transparente y confiable",
                  "Atención 24/7 durante todo el proceso",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-orange-500 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button className="btn-premium bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 font-semibold">
                Contactar Ahora
              </Button>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/placeholder-user.jpg"
                  alt="Floriana Marconi"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
              </div>

              {/* Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-gray-900">
                      <AnimatedCounter end={500} suffix="+" />
                    </p>
                    <p className="text-sm text-gray-600">Propiedades Vendidas</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-gray-900">98%</p>
                    <p className="text-sm text-gray-600">Satisfacción</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de Contacto Avanzado */}
      <section id="contacto" className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-orange-100 text-orange-800 px-4 py-2">Contacto</Badge>
            <h2 className="text-fluid-5xl font-black text-gray-900 mb-4">
              ¿Listo para <span className="gradient-text">encontrar tu hogar?</span>
            </h2>
            <p className="text-fluid-lg text-gray-600 max-w-2xl mx-auto">
              Contáctanos hoy mismo y comencemos a buscar la propiedad perfecta para ti
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Información de contacto */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Teléfono</h4>
                    <p className="text-gray-600">+54 11 1234-5678</p>
                    <p className="text-sm text-gray-500">Lun - Vie: 9:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@marconinmobiliaria.com</p>
                    <p className="text-sm text-gray-500">Respuesta en 24hs</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Oficina</h4>
                    <p className="text-gray-600">Av. Principal 1234, Ciudad</p>
                    <p className="text-sm text-gray-500">Zona Centro</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <Card className="p-8 shadow-lg border-0">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <Input
                      type="text"
                      placeholder=" "
                      className="peer w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 pt-6 pb-2 text-gray-900 placeholder-transparent transition-colors focus:outline-none focus:border-orange-500"
                    />
                    <label className="floating-label">Nombre</label>
                  </div>
                  <div className="form-group">
                    <Input
                      type="email"
                      placeholder=" "
                      className="peer w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 pt-6 pb-2 text-gray-900 placeholder-transparent transition-colors focus:outline-none focus:border-orange-500"
                    />
                    <label className="floating-label">Email</label>
                  </div>
                </div>

                <div className="form-group">
                  <Input
                    type="tel"
                    placeholder=" "
                    className="peer w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 pt-6 pb-2 text-gray-900 placeholder-transparent transition-colors focus:outline-none focus:border-orange-500"
                  />
                  <label className="floating-label">Teléfono</label>
                </div>

                <div className="form-group">
                  <Textarea
                    placeholder=" "
                    rows={4}
                    className="peer w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 pt-6 pb-2 text-gray-900 placeholder-transparent transition-colors focus:outline-none focus:border-orange-500 resize-none"
                  />
                  <label className="floating-label">Mensaje</label>
                </div>

                <Button className="w-full btn-premium bg-orange-500 hover:bg-orange-600 text-white py-3 font-semibold text-lg">
                  Enviar Mensaje
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Premium */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo y descripción */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black">Marconi Inmobiliaria</h3>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Tu socio de confianza en el mercado inmobiliario. Más de 15 años ayudando a familias a encontrar su
                hogar ideal.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-600 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-600 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-600 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Enlaces rápidos */}
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

            {/* Contacto */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+54 11 1234-5678</li>
                <li>info@marconinmobiliaria.com</li>
                <li>Av. Principal 1234, Ciudad</li>
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
