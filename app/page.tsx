"use client"

import type React from "react"

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
  Send,
  ArrowRight,
  MapPin,
  Bed,
  Bath,
  Ruler,
  Heart,
  CheckCircle,
  Award,
  Users,
  TrendingUp,
  Shield,
  Clock,
  Target,
} from "lucide-react"
import { useIsClient } from "@/hooks/use-is-client"
import { PropertyService } from "@/services/properties"
import { LeadsService } from "@/services/leads"
import type { Property } from "@/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Helper component for animated stats
const AnimatedStat = ({ number, label, icon: Icon }: { number: string; label: string; icon: any }) => (
  <motion.div
    className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
      <Icon className="w-8 h-8 text-orange-500" />
    </div>
    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{number}</div>
    <div className="text-sm text-gray-600 font-medium">{label}</div>
  </motion.div>
)

// Service Card Component
const ServiceCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <motion.div
    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-100 transition-colors">
      <Icon className="w-8 h-8 text-orange-500" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
)

// Refined Property Card Component
const PropertyCard = ({ property, onInterest }: { property: Property; onInterest: (property: Property) => void }) => {
  const [isFavorited, setIsFavorited] = useState(false)

  const formatPrice = (price: number, currency: string) => {
    return `${currency === "USD" ? "U$S" : "$"} ${price.toLocaleString("es-AR")}`
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-white border border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-300 rounded-2xl">
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {property.images && property.images.length > 0 ? (
                property.images.map((img, i) => (
                  <CarouselItem key={i}>
                    <div className="aspect-[4/3] bg-gray-100">
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`${property.title} - imagen ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center text-gray-400">
                    <Home className="w-12 h-12" />
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            {property.images && property.images.length > 1 && (
              <>
                <CarouselPrevious className="absolute left-4" />
                <CarouselNext className="absolute right-4" />
              </>
            )}
          </Carousel>

          <div className="absolute top-4 left-4 flex gap-2">
            <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
              {property.operation_type === "venta" ? "VENTA" : "ALQUILER"}
            </div>
            {property.featured && (
              <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Star className="w-3 h-3" />
                DESTACADA
              </div>
            )}
          </div>
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-600 hover:text-orange-500 hover:bg-white transition-all duration-300"
            aria-label="Marcar como favorito"
          >
            <Heart className={`w-5 h-5 ${isFavorited ? "fill-orange-500 text-orange-500" : ""}`} />
          </button>
        </div>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="font-bold text-xl text-gray-900 mb-2">{property.title}</h3>
              <div className="text-orange-500 font-medium text-sm flex items-center">
                <MapPin className="w-4 h-4 mr-1.5" />
                {property.neighborhood}, Reconquista
              </div>
            </div>
            <div className="text-xl font-bold text-gray-900 text-right shrink-0 ml-4">
              {formatPrice(property.price, property.currency)}
            </div>
          </div>
          <div className="flex items-center gap-x-6 text-gray-600 mb-6 text-sm border-t border-gray-100 pt-4">
            {property.bedrooms && (
              <span className="flex items-center gap-2">
                <Bed className="w-4 h-4 text-orange-500" /> {property.bedrooms} Dorm.
              </span>
            )}
            {property.bathrooms && (
              <span className="flex items-center gap-2">
                <Bath className="w-4 h-4 text-orange-500" /> {property.bathrooms} Baños
              </span>
            )}
            <span className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-orange-500" /> {property.area_m2}m²
            </span>
          </div>
          <Button
            onClick={() => onInterest(property)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl h-12"
          >
            Consultar Propiedad
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function MarconiInmobiliaria() {
  const [currentStat, setCurrentStat] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const isClient = useIsClient()
  const { toast } = useToast()

  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([])
  const [loadingProperties, setLoadingProperties] = useState(true)
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [submitLoading, setSubmitLoading] = useState(false)

  const stats = [
    { number: "200+", label: "Propiedades Vendidas", icon: Home },
    { number: "98%", label: "Clientes Satisfechos", icon: Users },
    { number: "5+", label: "Años de Experiencia", icon: Award },
    { number: "24/7", label: "Atención Disponible", icon: Clock },
  ]

  const services = [
    {
      icon: Home,
      title: "Venta de Propiedades",
      description:
        "Asesoramiento completo en la venta de tu propiedad con estrategias de marketing digital y presencia local.",
    },
    {
      icon: TrendingUp,
      title: "Inversiones Inmobiliarias",
      description:
        "Análisis de mercado y oportunidades de inversión para maximizar tu rentabilidad en el sector inmobiliario.",
    },
    {
      icon: Shield,
      title: "Asesoramiento Legal",
      description: "Acompañamiento legal completo en todas las etapas de compra, venta y alquiler de propiedades.",
    },
    {
      icon: Target,
      title: "Tasaciones Profesionales",
      description: "Valuaciones precisas y actualizadas basadas en el análisis del mercado local y regional.",
    },
  ]

  useEffect(() => {
    const loadFeaturedProperties = async () => {
      try {
        setLoadingProperties(true)
        const properties = await PropertyService.getFeaturedProperties()
        setFeaturedProperties(properties)
      } catch (error) {
        console.error("Error loading featured properties:", error)
        toast({
          variant: "destructive",
          title: "Error de Carga",
          description: "No se pudieron cargar las propiedades destacadas.",
        })
      } finally {
        setLoadingProperties(false)
      }
    }
    loadFeaturedProperties()
  }, [toast])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [stats.length])

  useEffect(() => {
    if (!isClient) return
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isClient])

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactForm.name || !contactForm.message) {
      toast({
        variant: "destructive",
        title: "Campos incompletos",
        description: "Por favor, completa tu nombre y mensaje.",
      })
      return
    }
    setSubmitLoading(true)
    try {
      await LeadsService.createLead({
        name: contactForm.name,
        email: contactForm.email || null,
        phone: contactForm.phone || null,
        message: contactForm.message,
        lead_source: "website",
      })
      toast({
        title: "¡Mensaje Enviado!",
        description: "Gracias por contactarnos. Te responderemos a la brevedad.",
        action: <CheckCircle className="text-green-500" />,
      })
      setContactForm({ name: "", email: "", phone: "", message: "" })
    } catch (error) {
      console.error("Error sending contact form:", error)
      toast({
        variant: "destructive",
        title: "Error al Enviar",
        description: "Hubo un problema al enviar tu mensaje. Intenta de nuevo.",
      })
    } finally {
      setSubmitLoading(false)
    }
  }

  const handlePropertyInterest = (property: Property) => {
    setContactForm((prev) => ({
      ...prev,
      message: `Hola, me interesa la propiedad: ${property.title}. Me gustaría recibir más información.`,
    }))
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white">
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-lg shadow-sm py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <a href="#" className="text-2xl font-bold tracking-tight">
              <span className={scrolled ? "text-gray-900" : "text-white"}>MARCONI</span>
              <span className="text-orange-500"> INMOBILIARIA</span>
            </a>
          </motion.div>
          <motion.div
            className="hidden md:flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              variant="ghost"
              className={`${scrolled ? "text-gray-700 hover:text-gray-900" : "text-white hover:text-white"} hover:bg-white/10`}
            >
              <Phone className="w-4 h-4 mr-2" /> (03482) 15-123456
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl">
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
            </Button>
          </motion.div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.jpg')] bg-cover bg-center opacity-20"></div>

          {/* Geometric shapes */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-orange-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-orange-500/5 rounded-full blur-2xl"></div>

          <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-orange-500/20 backdrop-blur-sm rounded-full text-orange-300 text-sm font-medium mb-6">
                Inmobiliaria Líder en Reconquista
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Encontrá tu{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                hogar perfecto
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Combinamos experiencia local con tecnología moderna para brindarte el mejor servicio inmobiliario en
              Reconquista y la región.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => document.getElementById("propiedades")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explorar Propiedades
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 font-semibold text-lg px-8 py-6 rounded-xl backdrop-blur-sm bg-transparent"
                onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                Contactar Ahora
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <AnimatePresence mode="wait">
                <AnimatedStat key={currentStat} {...stats[currentStat]} />
              </AnimatePresence>
              {stats.map((stat, index) => index !== currentStat && <AnimatedStat key={index} {...stat} />)}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-4">
                Nuestros Servicios
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Soluciones inmobiliarias <span className="text-orange-500">integrales</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Ofrecemos un servicio completo que abarca desde la búsqueda hasta la concreción de tu operación
                inmobiliaria.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Properties Section */}
        <section id="propiedades" className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-4">
                Propiedades Destacadas
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Las mejores <span className="text-orange-500">oportunidades</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Descubrí las propiedades más destacadas de Reconquista y la región, seleccionadas especialmente para
                vos.
              </p>
            </motion.div>

            {loadingProperties ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
                <p className="text-gray-600 mt-4">Cargando propiedades...</p>
              </div>
            ) : (
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ staggerChildren: 0.2 }}
              >
                {featuredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} onInterest={handlePropertyInterest} />
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact-form" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-6">
                  Contactanos
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  ¿Listo para dar el <span className="text-orange-500">siguiente paso</span>?
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Nuestro equipo de expertos está listo para ayudarte a encontrar la propiedad perfecta o vender la tuya
                  al mejor precio.
                </p>

                <div className="space-y-6">
                  <a
                    href="tel:+5403482123456"
                    className="flex items-center gap-6 p-6 rounded-2xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                      <Phone className="w-8 h-8 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-bold text-xl text-gray-900">(03482) 15-123456</p>
                      <p className="text-gray-600">Llamanos ahora</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/5403482123456"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 p-6 rounded-2xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
                      <MessageCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-xl text-gray-900">Chateá por WhatsApp</p>
                      <p className="text-gray-600">Respuesta inmediata</p>
                    </div>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
                transition={{ duration: 0.8 }}
              >
                <Card className="bg-white border border-gray-200 shadow-xl rounded-2xl">
                  <CardContent className="p-8">
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-900 text-sm font-semibold mb-3">
                          Nombre Completo
                        </label>
                        <Input
                          id="name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                          className="bg-gray-50 border-gray-200 text-gray-900 h-12 rounded-xl focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Tu nombre"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-gray-900 text-sm font-semibold mb-3">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                          className="bg-gray-50 border-gray-200 text-gray-900 h-12 rounded-xl focus:ring-orange-500 focus:border-orange-500"
                          placeholder="tu@email.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-gray-900 text-sm font-semibold mb-3">
                          Teléfono
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, phone: e.target.value }))}
                          className="bg-gray-50 border-gray-200 text-gray-900 h-12 rounded-xl focus:ring-orange-500 focus:border-orange-500"
                          placeholder="(03482) 15-123456"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-gray-900 text-sm font-semibold mb-3">
                          Tu Mensaje
                        </label>
                        <Textarea
                          id="message"
                          value={contactForm.message}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                          className="bg-gray-50 border-gray-200 text-gray-900 min-h-32 rounded-xl focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Contanos qué propiedad te interesa o qué necesitás..."
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold h-12 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={submitLoading}
                      >
                        {submitLoading ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" /> Enviar Mensaje
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-16 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="mb-8">
              <a href="#" className="text-3xl font-bold tracking-tight">
                <span className="text-white">MARCONI</span>
                <span className="text-orange-500"> INMOBILIARIA</span>
              </a>
              <p className="text-gray-400 mt-2 text-lg">Tu socio inmobiliario de confianza</p>
            </div>

            <div className="flex justify-center gap-8 mb-8">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: MessageCircle, href: "https://wa.me/5403482123456", label: "WhatsApp" },
                { icon: Phone, href: "tel:+5403482123456", label: "Teléfono" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-orange-500 hover:bg-gray-700 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>

            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">
                © {new Date().getFullYear()} Marconi Inmobiliaria. Todos los derechos reservados.
              </p>
              <p className="text-gray-500 text-sm mt-2">Reconquista, Santa Fe, Argentina</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
