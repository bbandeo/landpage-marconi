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
} from "lucide-react"
import { useIsClient } from "@/hooks/use-is-client"
import { PropertyService } from "@/services/properties"
import { LeadsService } from "@/services/leads"
import type { Property } from "@/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ErrorBoundary, ErrorFallback } from "@/components/ui/error-boundary"
import { PropertyGridSkeleton } from "@/components/ui/property-skeleton"
import Image from "next/image"

// Helper component for animated stats
const AnimatedStat = ({ number, label }: { number: string; label: string }) => (
  <motion.div
    className="text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-3xl md:text-4xl font-bold text-brand-orange">{number}</div>
    <div className="text-sm text-gray-300">{label}</div>
  </motion.div>
)

// Refined Property Card Component with optimization
const PropertyCard = ({ property, onInterest }: { property: Property; onInterest: (property: Property) => void }) => {
  const [isFavorited, setIsFavorited] = useState(false)
  const [imageError, setImageError] = useState(false)

  const formatPrice = (price: number, currency: string) => {
    return `${currency === "USD" ? "U$S" : "$"} ${price.toLocaleString("es-AR")}`
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-gray-900/50 border-gray-700/50 overflow-hidden group hover:border-brand-orange/50 transition-all duration-300 backdrop-blur-sm shadow-lg">
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {property.images && property.images.length > 0 && !imageError ? (
                property.images.map((img, i) => (
                  <CarouselItem key={i}>
                    <div className="aspect-[4/3] bg-gray-800 relative overflow-hidden">
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`${property.title} - Vista ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        onError={handleImageError}
                        priority={i === 0}
                        loading={i === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="aspect-[4/3] bg-gray-800 flex items-center justify-center text-gray-500">
                    <Home className="w-12 h-12" aria-hidden="true" />
                    <span className="sr-only">Imagen de propiedad no disponible</span>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            {property.images && property.images.length > 1 && (
              <>
                <CarouselPrevious className="absolute left-4" aria-label="Imagen anterior" />
                <CarouselNext className="absolute right-4" aria-label="Siguiente imagen" />
              </>
            )}
          </Carousel>

          <div className="absolute top-4 left-4 flex gap-2">
            <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              {property.operation_type === "venta" ? "VENTA" : "ALQUILER"}
            </div>
            {property.featured && (
              <div className="bg-brand-orange text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Star className="w-3 h-3" />
                DESTACADA
              </div>
            )}
          </div>
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:text-brand-orange hover:bg-white transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label={isFavorited ? "Quitar de favoritos" : "Agregar a favoritos"}
            aria-pressed={isFavorited}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? "fill-brand-orange text-brand-orange" : ""}`} aria-hidden="true" />
          </button>
        </div>
        <CardContent className="p-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-serif text-xl font-bold text-white mb-1" id={`property-${property.id}`}>{property.title}</h3>
              <div className="text-brand-orange font-semibold text-sm flex items-center">
                <MapPin className="w-4 h-4 mr-1.5" aria-hidden="true" />
                <span>{property.neighborhood}, Reconquista</span>
              </div>
            </div>
            <div className="text-lg font-bold text-white text-right shrink-0 ml-4" aria-label={`Precio: ${formatPrice(property.price, property.currency)}`}>
              {formatPrice(property.price, property.currency)}
            </div>
          </div>
          <div className="flex items-center gap-x-6 text-gray-300 my-4 text-sm border-y border-gray-700/50 py-3" role="list" aria-label="Características de la propiedad">
            {property.bedrooms && (
              <span className="flex items-center gap-2" role="listitem">
                <Bed className="w-5 h-5 text-brand-orange/80" aria-hidden="true" /> 
                <span>{property.bedrooms} Dorm.</span>
              </span>
            )}
            {property.bathrooms && (
              <span className="flex items-center gap-2" role="listitem">
                <Bath className="w-5 h-5 text-brand-orange/80" aria-hidden="true" /> 
                <span>{property.bathrooms} Baños</span>
              </span>
            )}
            <span className="flex items-center gap-2" role="listitem">
              <Ruler className="w-5 h-5 text-brand-orange/80" aria-hidden="true" /> 
              <span>{property.area_m2}m²</span>
            </span>
          </div>
          <Button
            onClick={() => onInterest(property)}
            className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-describedby={`property-${property.id}`}
          >
            Consultar por esta propiedad
            <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
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
    { number: "200+", label: "Propiedades Vendidas" },
    { number: "98%", label: "Clientes Satisfechos" },
    { number: "5+", label: "Años de Experiencia" },
    { number: "24/7", label: "Atención Disponible" },
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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>
      
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-lg shadow-lg py-2" : "py-4"
        }`}
        role="banner"
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <a href="#" className="font-serif text-xl sm:text-2xl font-bold tracking-wider focus-ring">
              <span className="text-white">MARCONI</span>
              <span className="text-brand-orange"> INMOBILIARIA</span>
              <span className="sr-only">, inmobiliaria en Reconquista, Santa Fe</span>
            </a>
          </motion.div>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              variant="ghost" 
              className="hidden sm:flex text-white hover:bg-white/10 hover:text-white focus-ring text-sm"
              asChild
            >
              <a href="tel:+5493482123456">
                <Phone className="w-4 h-4 mr-2" aria-hidden="true" /> 
                <span className="hidden md:inline">(03482) 15-123456</span>
                <span className="md:hidden">Llamar</span>
              </a>
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white font-bold focus-ring text-sm"
              asChild
            >
              <a href="https://wa.me/5493482123456" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" /> 
                <span className="hidden sm:inline">WhatsApp</span>
                <span className="sm:hidden">Chat</span>
              </a>
            </Button>
          </motion.div>
        </div>
      </header>

      <main id="main-content">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black" role="banner">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/80 to-brand-orange/30 opacity-80"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.jpg')] bg-cover bg-center opacity-10" aria-hidden="true"></div>

          <div className="relative z-10 text-center text-white px-4 py-20">
            <motion.h1
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Tu Próximo <span className="block text-brand-orange mt-2">Hogar Perfecto</span>
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              La inmobiliaria que está revolucionando Reconquista con tecnología y confianza local.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-base px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto focus-ring"
                onClick={() => document.getElementById("propiedades")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver Propiedades <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-gray-900 border-y border-gray-800" aria-label="Estadísticas de la empresa">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <AnimatePresence mode="wait">
                <AnimatedStat key={currentStat} {...stats[currentStat]} />
              </AnimatePresence>
              {stats.map(
                (stat, index) =>
                  index !== currentStat && (
                    <div key={index} className="text-center hidden md:block">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-orange">{stat.number}</div>
                      <div className="text-xs md:text-sm text-gray-400 mt-1">{stat.label}</div>
                    </div>
                  ),
              )}
            </div>
          </div>
        </section>

        <section id="propiedades" className="py-16 lg:py-24 bg-black">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12 lg:mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Propiedades <span className="text-brand-orange">Destacadas</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Las mejores oportunidades de inversión y vivienda en Reconquista y la región.
              </p>
            </motion.div>

            <ErrorBoundary
              fallback={
                <ErrorFallback
                  title="Error al cargar propiedades"
                  description="No se pudieron cargar las propiedades destacadas. Por favor, recarga la página."
                  resetError={() => window.location.reload()}
                />
              }
            >
              {loadingProperties ? (
                <PropertyGridSkeleton count={6} />
              ) : featuredProperties.length === 0 ? (
                <div className="text-center py-xl">
                  <Home className="w-16 h-16 text-gray-600 mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold text-white mb-2">No hay propiedades disponibles</h3>
                  <p className="text-gray-400">Pronto tendremos nuevas propiedades para mostrar.</p>
                </div>
              ) : (
                <motion.div
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-lg"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ staggerChildren: 0.2 }}
                  role="grid"
                  aria-label="Propiedades destacadas"
                >
                  {featuredProperties.map((property) => (
                    <div key={property.id} role="gridcell">
                      <PropertyCard property={property} onInterest={handlePropertyInterest} />
                    </div>
                  ))}
                </motion.div>
              )}
            </ErrorBoundary>
          </div>
        </section>

        <section id="contact-form" className="py-16 lg:py-24 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                  ¿Listo para dar el <span className="text-brand-orange">siguiente paso</span>?
                </h2>
                <p className="text-base sm:text-lg text-gray-400 mb-8 leading-relaxed">
                  Contanos qué estás buscando o consultá por una propiedad. Nuestro equipo de expertos está listo para
                  ayudarte.
                </p>
                <div className="space-y-4">
                  <a
                    href="tel:+5493482123456"
                    className="flex items-center gap-4 text-white p-4 rounded-lg hover:bg-gray-800 transition-colors group focus-ring"
                  >
                    <div className="bg-brand-orange p-3 rounded-lg flex-shrink-0">
                      <Phone className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-bold text-base sm:text-lg">(03482) 15-123456</p>
                      <p className="text-sm text-gray-400">Llamanos ahora</p>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/5493482123456"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-white p-4 rounded-lg hover:bg-gray-800 transition-colors group focus-ring"
                  >
                    <div className="bg-green-600 p-3 rounded-lg flex-shrink-0">
                      <MessageCircle className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-bold text-base sm:text-lg">Chateá por WhatsApp</p>
                      <p className="text-sm text-gray-400">Respuesta inmediata</p>
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
                <Card className="bg-black/30 border-gray-700/50 backdrop-blur-md">
                  <CardContent className="p-lg">
                    <form onSubmit={handleContactSubmit} className="space-y-md">
                      <div>
                        <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                          Nombre Completo
                        </label>
                        <Input
                          id="name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                          className="bg-gray-800 border-gray-700 text-white h-12"
                          placeholder="Tu nombre"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                          className="bg-gray-800 border-gray-700 text-white h-12"
                          placeholder="tu@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                          Tu Mensaje
                        </label>
                        <Textarea
                          id="message"
                          value={contactForm.message}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                          className="bg-gray-800 border-gray-700 text-white min-h-32"
                          placeholder="Contanos qué propiedad te interesa o qué necesitás..."
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold h-12 text-base focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={submitLoading}
                        aria-describedby={submitLoading ? "loading-message" : undefined}
                      >
                        {submitLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" aria-hidden="true"></div>
                            <span id="loading-message">Enviando...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" aria-hidden="true" /> Enviar Mensaje
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

      <footer className="bg-black py-12 lg:py-16 border-t border-gray-800" role="contentinfo">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <div className="mb-6">
            <a href="#" className="font-serif text-xl sm:text-2xl font-bold tracking-wider focus-ring">
              <span className="text-white">MARCONI</span>
              <span className="text-brand-orange"> INMOBILIARIA</span>
            </a>
          </div>
          <div className="flex justify-center gap-6 mb-6">
            <a 
              href="https://instagram.com/marconiinmobiliaria" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-brand-orange transition-colors focus-ring p-2 rounded"
              aria-label="Seguinos en Instagram"
            >
              <Instagram className="w-6 h-6" aria-hidden="true" />
            </a>
            <a 
              href="https://wa.me/5493482123456" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-brand-orange transition-colors focus-ring p-2 rounded"
              aria-label="Contactanos por WhatsApp"
            >
              <MessageCircle className="w-6 h-6" aria-hidden="true" />
            </a>
            <a 
              href="tel:+5493482123456" 
              className="text-gray-400 hover:text-brand-orange transition-colors focus-ring p-2 rounded"
              aria-label="Llamanos al teléfono"
            >
              <Phone className="w-6 h-6" aria-hidden="true" />
            </a>
          </div>
          <div className="space-y-2">
            <p className="text-sm">© {new Date().getFullYear()} Marconi Inmobiliaria. Todos los derechos reservados.</p>
            <p className="text-xs text-gray-500">Reconquista, Santa Fe, Argentina</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
