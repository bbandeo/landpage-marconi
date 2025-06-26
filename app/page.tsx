"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Phone,
  MessageCircle,
  Instagram,
  Home,
  Star,
  Play,
  Send,
  ArrowRight,
  Users,
  Award,
  Clock,
  Eye,
} from "lucide-react"

export default function MarconiInmobiliaria() {
  const [currentStat, setCurrentStat] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  const stats = [
    { number: "200+", label: "Propiedades Vendidas" },
    { number: "98%", label: "Clientes Satisfechos" },
    { number: "5", label: "Años de Experiencia" },
    { number: "24/7", label: "Atención Disponible" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${scrolled ? "bg-black bg-opacity-90 py-2" : "py-4"}`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className={`transition-all duration-300 ${scrolled ? "text-lg" : "text-xl"}`}>
            <span className="font-bold text-white">MARCONI</span>
            <span className="text-orange-500 font-bold"> INMOBILIARIA</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
              <Phone className="w-4 h-4 mr-1" /> (03482) 15-123456
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              <MessageCircle className="w-4 h-4 mr-1" /> WhatsApp
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-orange-900">
        {/* Stats flotantes */}
        <div className="absolute top-20 right-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 text-white z-20 border border-white border-opacity-20">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">{stats[currentStat].number}</div>
            <div className="text-xs">{stats[currentStat].label}</div>
          </div>
        </div>

        <div className="relative z-20 text-center text-white px-4 max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Tu próximo
            <span className="block text-orange-500">hogar perfecto</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            La inmobiliaria que está revolucionando Reconquista con tecnología y confianza local
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              Ver propiedades <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              <Play className="w-4 h-4 mr-1" /> Ver video
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-gray-900 border-b border-orange-500 border-opacity-30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="text-2xl md:text-3xl font-bold text-orange-500 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Propiedades Destacadas */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              PROPIEDADES <span className="text-orange-500">DESTACADAS</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8">Las mejores oportunidades de inversión en Reconquista</p>

            {/* Filter Tabs */}
            <div className="flex justify-center gap-2 mb-8 flex-wrap">
              {["Todas", "Casas", "Terrenos", "Deptos"].map((filter) => (
                <Button
                  key={filter}
                  variant={filter === "Todas" ? "default" : "outline"}
                  className={
                    filter === "Todas"
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
                  }
                  size="sm"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                type: "VENTA CASA",
                price: "75.000 USD",
                location: "Barrio Parque, Reconquista",
                details: "3 dorm • 2 baños • 150m²",
                badge: "VENTA",
                badgeColor: "bg-orange-500",
                features: ["Cochera", "Patio", "Parrilla"],
              },
              {
                type: "GRAN OPORTUNIDAD",
                price: "48.000 USD",
                location: "Terreno 10x18",
                details: "180m² • Servicios disponibles",
                badge: "¡OPORTUNIDAD!",
                badgeColor: "bg-red-600",
                features: ["Agua", "Energía", "Gas"],
              },
              {
                type: "ALQUILER",
                price: "$200.000",
                location: "Barrio Lorenzón",
                details: "1 dorm • 1 baño • 45m²",
                badge: "ALQUILER",
                badgeColor: "bg-blue-600",
                features: ["Luminoso", "Céntrico", "Amoblado"],
              },
            ].map((property, index) => (
              <Card
                key={index}
                className="bg-black border-orange-500 border-2 overflow-hidden group hover:scale-105 transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white">
                    <Home className="w-8 h-8 mr-2" /> Imagen de la propiedad
                  </div>

                  <div
                    className={`absolute top-4 left-4 ${property.badgeColor} text-white px-3 py-1 rounded-full font-bold text-sm`}
                  >
                    {property.badge}
                  </div>

                  <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {Math.floor(Math.random() * 50) + 10}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-4">
                    <div className="text-2xl font-bold text-white mb-1">{property.price}</div>
                    <div className="text-orange-500 font-semibold text-sm">{property.location}</div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-white mb-3 text-sm">
                    <Home className="w-4 h-4" />
                    <span>{property.details}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {property.features.map((feature, i) => (
                      <span key={i} className="bg-orange-500 bg-opacity-20 text-orange-500 px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm">
                      Ver detalles <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              size="lg"
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
            >
              Ver todas las propiedades <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Quiénes Somos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-orange-500 bg-opacity-10 text-orange-500 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Conocé nuestro equipo
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                ¿Quiénes <span className="text-orange-500">somos?</span>
              </h2>

              <div className="space-y-4 text-gray-700 mb-6">
                <p>
                  Somos <strong>Marconi Inmobiliaria</strong>, una empresa local que entiende tus necesidades. Conocemos
                  Reconquista como la palma de nuestra mano y te acompañamos en cada paso.
                </p>
                <p>
                  Con un enfoque joven y dinámico, nos especializamos en encontrar la propiedad perfecta para cada
                  cliente. Desde casas familiares hasta inversiones estratégicas.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { icon: Star, text: "Confianza local" },
                  { icon: Home, text: "Conocimiento del mercado" },
                  { icon: Users, text: "Atención personalizada" },
                  { icon: Award, text: "Experiencia comprobada" },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 group">
                    <div className="bg-orange-500 bg-opacity-10 p-2 rounded-full group-hover:bg-orange-500 transition-colors">
                      <feature.icon className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-gray-800 text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                Conocé más <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="relative">
              <div className="bg-orange-500 bg-opacity-20 rounded-3xl p-6 transform rotate-3">
                <div className="bg-gray-300 rounded-2xl h-80 flex items-center justify-center text-gray-600">
                  <Users className="w-16 h-16 mr-2" /> Foto de Floriana Marconi
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-black text-white p-4 rounded-xl">
                <p className="font-bold text-orange-500">Floriana Marconi</p>
                <p className="text-sm">Fundadora & Agente Principal</p>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 fill-orange-500 text-orange-500" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Videos y Novedades */}
      <section className="py-16 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Videos y <span className="text-black">Novedades</span>
            </h2>
            <p className="text-lg text-white text-opacity-90 mb-6">Nuevas propiedades cada semana en Instagram</p>

            <div className="inline-flex items-center gap-4 bg-black bg-opacity-20 rounded-full px-6 py-3 text-white">
              <Instagram className="w-5 h-5" />
              <span className="font-semibold">+2.5K seguidores</span>
              <span className="text-white text-opacity-70">•</span>
              <span>Propiedades semanales</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative bg-black rounded-3xl overflow-hidden aspect-video group cursor-pointer">
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white">
                  <Play className="w-8 h-8 mr-2" /> Video {i}
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-black group-hover:bg-opacity-60 transition-colors">
                  <div className="bg-white bg-opacity-20 rounded-full p-4">
                    <Play className="w-6 h-6" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-2 inline-block">
                    NUEVO INGRESO
                  </div>
                  <p className="text-white font-semibold">Propiedad #{i}</p>
                  <p className="text-white text-opacity-80 text-sm">Barrio Centro • $85.000 USD</p>
                </div>

                <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {Math.floor(Math.random() * 1000) + 500}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
              <Instagram className="w-4 h-4 mr-1" /> Seguinos en Instagram <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Contacto <span className="text-orange-500">Rápido</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8">¿Tenés una consulta? Te respondemos al toque.</p>

              <div className="space-y-4">
                {[
                  { icon: Phone, label: "Teléfono", value: "(03482) 15-123456", color: "bg-orange-500" },
                  { icon: MessageCircle, label: "WhatsApp", value: "+54 9 3482 123456", color: "bg-green-600" },
                  { icon: Instagram, label: "Instagram", value: "@marconi.inmobiliarios", color: "bg-pink-600" },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 text-white p-4 rounded-xl hover:bg-gray-800 transition-all cursor-pointer group"
                  >
                    <div className={`${contact.color} p-4 rounded-full group-hover:scale-110 transition-transform`}>
                      <contact.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{contact.label}</p>
                      <p className="text-gray-300">{contact.value}</p>
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-orange-500 bg-opacity-10 rounded-xl border border-orange-500 border-opacity-30">
                <div className="flex items-center gap-3 text-orange-500">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Tiempo de respuesta: 15 minutos</span>
                </div>
              </div>
            </div>

            <Card className="bg-black border-orange-500 border-2">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Envíanos tu consulta</h3>
                  <p className="text-gray-400">Te contactamos en el mismo día</p>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Tu nombre"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                    />
                    <Input
                      placeholder="Tu WhatsApp"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <Input
                    placeholder="Tu email"
                    type="email"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                  />

                  <Textarea
                    placeholder="Qué estás buscando..."
                    rows={3}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                  />

                  <div className="grid grid-cols-3 gap-2">
                    {["Comprar", "Alquilar", "Vender"].map((option) => (
                      <Button
                        key={option}
                        type="button"
                        variant="outline"
                        className="border-gray-700 text-gray-400 hover:border-orange-500 hover:text-orange-500 bg-transparent"
                        size="sm"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>

                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    <Send className="w-4 h-4 mr-1" /> Quiero más información
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              <span className="text-orange-500">MARCONI</span> INMOBILIARIA
            </h3>
            <p className="text-gray-400">Tu socio inmobiliario en Reconquista, Santa Fe</p>
          </div>

          <div className="flex justify-center gap-6 mb-8">
            {[
              { icon: Instagram, href: "#" },
              { icon: MessageCircle, href: "#" },
              { icon: Phone, href: "#" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-orange-500 transition-colors p-3 bg-gray-800 rounded-full hover:bg-gray-700"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500 text-sm mb-2">© 2024 Marconi Inmobiliaria. Todos los derechos reservados.</p>
            <p className="text-gray-600 text-xs">
              Matrícula profesional N° XXXXX - CUCICBA | Hecho con ❤️ en Reconquista
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Flotante */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full w-14 h-14 animate-pulse hover:animate-none">
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
