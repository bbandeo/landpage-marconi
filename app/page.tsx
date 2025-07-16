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
  Home,
  MapPin,
  Phone,
  Mail,
  Bed,
  Bath,
  Square,
  Heart,
  ChevronDown,
  Award,
  Users,
  Building,
  TrendingUp,
  ArrowRight,
  Menu,
  X,
} from "lucide-react"

interface Property {
  id: number
  title: string
  price: string
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  type: "sale" | "rent"
  featured?: boolean
}

const mockProperties: Property[] = [
  {
    id: 1,
    title: "Casa Moderna en Zona Residencial",
    price: "$450,000",
    location: "Colonia del Valle",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    image: "/placeholder.jpg?height=300&width=400",
    type: "sale",
    featured: true,
  },
  {
    id: 2,
    title: "Departamento Ejecutivo Centro",
    price: "$2,800/mes",
    location: "Centro Histórico",
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    image: "/placeholder.jpg?height=300&width=400",
    type: "rent",
  },
  {
    id: 3,
    title: "Villa de Lujo con Jardín",
    price: "$850,000",
    location: "Las Lomas",
    bedrooms: 4,
    bathrooms: 3,
    area: 320,
    image: "/placeholder.jpg?height=300&width=400",
    type: "sale",
    featured: true,
  },
  {
    id: 4,
    title: "Loft Industrial Moderno",
    price: "$3,200/mes",
    location: "Zona Rosa",
    bedrooms: 1,
    bathrooms: 1,
    area: 95,
    image: "/placeholder.jpg?height=300&width=400",
    type: "rent",
  },
  {
    id: 5,
    title: "Casa Familiar con Piscina",
    price: "$620,000",
    location: "Suburbia",
    bedrooms: 4,
    bathrooms: 2,
    area: 250,
    image: "/placeholder.jpg?height=300&width=400",
    type: "sale",
  },
  {
    id: 6,
    title: "Penthouse con Vista Panorámica",
    price: "$5,500/mes",
    location: "Polanco",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    image: "/placeholder.jpg?height=300&width=400",
    type: "rent",
    featured: true,
  },
]

export default function HomePage() {
  const [filter, setFilter] = useState<"all" | "sale" | "rent">("all")
  const [favorites, setFavorites] = useState<number[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filteredProperties = mockProperties.filter((property) => filter === "all" || property.type === filter)

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-3">
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
                Iniciar Sesión
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 btn-premium">Publicar Propiedad</Button>
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
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <a href="#inicio" className="block text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Inicio
              </a>
              <a
                href="#propiedades"
                className="block text-gray-700 hover:text-orange-500 transition-colors font-medium"
              >
                Propiedades
              </a>
              <a href="#nosotros" className="block text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Nosotros
              </a>
              <a href="#contacto" className="block text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Contacto
              </a>
              <div className="pt-4 space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
                >
                  Iniciar Sesión
                </Button>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Publicar Propiedad</Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50/30"
      >
        <ParticleBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-fluid-hero font-black text-gray-900 mb-6 tracking-tight leading-none">
              Tu hogar ideal
              <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                te espera
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubre propiedades excepcionales con Marconi Inmobiliaria. Más de 15 años conectando familias con sus
              hogares perfectos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg btn-premium group"
              >
                Explorar Propiedades
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 hover:border-orange-500 hover:text-orange-500 px-8 py-4 text-lg btn-premium bg-transparent"
              >
                Agendar Cita
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: 1500, suffix: "+", label: "Propiedades Vendidas" },
                { number: 15, suffix: "+", label: "Años de Experiencia" },
                { number: 98, suffix: "%", label: "Clientes Satisfechos" },
                { number: 50, suffix: "+", label: "Agentes Expertos" },
              ].map((stat, index) => (
                <div key={index} className="text-center animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Properties Section */}
      <section id="propiedades" className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-fluid-h2 font-bold text-gray-900 mb-4 tracking-tight">Propiedades Destacadas</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre nuestra selección de propiedades premium, cuidadosamente elegidas para ti
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={
                filter === "all" ? "bg-orange-500 hover:bg-orange-600" : "hover:border-orange-500 hover:text-orange-500"
              }
            >
              Todas
            </Button>
            <Button
              variant={filter === "sale" ? "default" : "outline"}
              onClick={() => setFilter("sale")}
              className={
                filter === "sale"
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "hover:border-orange-500 hover:text-orange-500"
              }
            >
              En Venta
            </Button>
            <Button
              variant={filter === "rent" ? "default" : "outline"}
              onClick={() => setFilter("rent")}
              className={
                filter === "rent"
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "hover:border-orange-500 hover:text-orange-500"
              }
            >
              En Alquiler
            </Button>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden card-hover group cursor-pointer">
                <div className="relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={`${property.type === "sale" ? "bg-green-500" : "bg-blue-500"} text-white`}>
                      {property.type === "sale" ? "Venta" : "Alquiler"}
                    </Badge>
                    {property.featured && <Badge className="bg-orange-500 text-white">Destacada</Badge>}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(property.id)
                    }}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(property.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </button>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
                      {property.title}
                    </h3>
                  </div>

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
                    <span className="text-2xl font-bold text-orange-500">{property.price}</span>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 btn-premium">
                      Ver Detalles
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
              className="border-orange-500 text-orange-500 hover:bg-orange-50 btn-premium bg-transparent"
            >
              Ver Todas las Propiedades
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-fluid-h2 font-bold text-gray-900 mb-6 tracking-tight">Conoce a Floriana Marconi</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Con más de 15 años de experiencia en el mercado inmobiliario, Floriana Marconi ha ayudado a más de 1,500
                familias a encontrar su hogar ideal. Su enfoque personalizado y conocimiento profundo del mercado la
                convierten en la elección perfecta para tu próxima inversión.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Award, title: "Agente Certificada", desc: "Licencia profesional vigente" },
                  { icon: Users, title: "Atención Personal", desc: "Servicio uno a uno" },
                  { icon: Building, title: "Amplio Portafolio", desc: "Propiedades exclusivas" },
                  { icon: TrendingUp, title: "Resultados Comprobados", desc: "98% de satisfacción" },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 btn-premium">
                Agendar Consulta Gratuita
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
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl transform rotate-3 scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-fluid-h2 font-bold text-gray-900 mb-4 tracking-tight">
              ¿Listo para encontrar tu hogar?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Contáctanos hoy y comencemos a buscar la propiedad perfecta para ti
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Envíanos un mensaje</h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <Input type="text" placeholder=" " className="form-input" />
                    <label className="form-label">Nombre</label>
                  </div>
                  <div className="form-group">
                    <Input type="email" placeholder=" " className="form-input" />
                    <label className="form-label">Email</label>
                  </div>
                </div>

                <div className="form-group">
                  <Input type="tel" placeholder=" " className="form-input" />
                  <label className="form-label">Teléfono</label>
                </div>

                <div className="form-group">
                  <Textarea placeholder=" " rows={4} className="form-input resize-none" />
                  <label className="form-label">Mensaje</label>
                </div>

                <Button type="submit" size="lg" className="w-full bg-orange-500 hover:bg-orange-600 btn-premium">
                  Enviar Mensaje
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Información de contacto</h3>

                <div className="space-y-6">
                  {[
                    { icon: Phone, title: "Teléfono", info: "+52 (55) 1234-5678" },
                    { icon: Mail, title: "Email", info: "floriana@marconipropiedades.com" },
                    { icon: MapPin, title: "Oficina", info: "Av. Reforma 123, Col. Centro\nCiudad de México, CDMX" },
                  ].map((contact, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <contact.icon className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{contact.title}</h4>
                        <p className="text-gray-600 whitespace-pre-line">{contact.info}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Horarios de atención</h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Lunes - Viernes</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábados</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingos</span>
                    <span>Solo citas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Marconi Inmobiliaria</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Tu socio de confianza en bienes raíces. Conectando familias con sus hogares ideales desde 2008.
              </p>
              <div className="flex space-x-4">
                {/* Social Media Icons */}
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">ig</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">tw</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
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
              <h4 className="font-semibold mb-4">Servicios</h4>
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
                    Valuación
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Asesoría Legal
                  </a>
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
