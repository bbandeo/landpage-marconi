"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Phone,
  MessageCircle,
  Instagram,
  Home,
  Star,
  MapPin,
  Bed,
  Bath,
  Ruler,
  Heart,
  CheckCircle,
  Search,
  Menu,
  X,
  ChevronDown,
} from "lucide-react"
import { useIsClient } from "@/hooks/use-is-client"
import { PropertyService } from "@/services/properties"
import { LeadsService } from "@/services/leads"
import type { Property } from "@/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Property Card Component with CORE-style design
const PropertyCard = ({ property, onInterest }: { property: Property; onInterest: (property: Property) => void }) => {
  const [isFavorited, setIsFavorited] = useState(false)

  const formatPrice = (price: number, currency: string) => {
    return `${currency === "USD" ? "U$S" : "$"} ${price.toLocaleString("es-AR")}`
  }

  return (
    <motion.div
      className="group cursor-pointer"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative overflow-hidden bg-black">
        <Carousel className="w-full">
          <CarouselContent>
            {property.images && property.images.length > 0 ? (
              property.images.map((img, i) => (
                <CarouselItem key={i}>
                  <div className="aspect-[4/3] bg-gray-900">
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${property.title} - imagen ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem>
                <div className="aspect-[4/3] bg-gray-900 flex items-center justify-center text-gray-600">
                  <Home className="w-12 h-12" />
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          {property.images && property.images.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-2 md:left-4 bg-black/50 border-white/20 text-white hover:bg-black/70 w-8 h-8 md:w-10 md:h-10" />
              <CarouselNext className="absolute right-2 md:right-4 bg-black/50 border-white/20 text-white hover:bg-black/70 w-8 h-8 md:w-10 md:h-10" />
            </>
          )}
        </Carousel>

        <div className="absolute top-3 md:top-4 left-3 md:left-4 flex gap-2">
          <div className="bg-black/70 backdrop-blur-sm text-white px-2 md:px-3 py-1 text-xs font-medium tracking-wider">
            {property.operation_type === "venta" ? "VENTA" : "ALQUILER"}
          </div>
          {property.featured && (
            <div className="bg-orange-500 text-white px-2 md:px-3 py-1 text-xs font-medium tracking-wider flex items-center gap-1">
              <Star className="w-3 h-3" />
              <span className="hidden sm:inline">DESTACADA</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 md:top-4 right-3 md:right-4 bg-black/50 backdrop-blur-sm p-2 text-white hover:text-orange-500 transition-colors"
          aria-label="Marcar como favorito"
        >
          <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isFavorited ? "fill-orange-500 text-orange-500" : ""}`} />
        </button>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <Button
            onClick={() => onInterest(property)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-10 md:h-12 text-sm md:text-base"
          >
            VER DETALLES
          </Button>
        </div>
      </div>

      <div className="p-4 md:p-6 bg-white">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
          <div className="flex-1">
            <h3 className="font-medium text-base md:text-lg text-gray-900 mb-2 tracking-wide leading-tight">
              {property.title}
            </h3>
            <div className="text-gray-600 text-sm flex items-center tracking-wide">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{property.neighborhood}, Reconquista</span>
            </div>
          </div>
          <div className="text-lg md:text-xl font-light text-gray-900 sm:text-right sm:shrink-0 sm:ml-4">
            {formatPrice(property.price, property.currency)}
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6 text-gray-600 text-sm pt-4 border-t border-gray-100 overflow-x-auto">
          {property.bedrooms && (
            <span className="flex items-center gap-2 whitespace-nowrap">
              <Bed className="w-4 h-4" /> {property.bedrooms}
            </span>
          )}
          {property.bathrooms && (
            <span className="flex items-center gap-2 whitespace-nowrap">
              <Bath className="w-4 h-4" /> {property.bathrooms}
            </span>
          )}
          <span className="flex items-center gap-2 whitespace-nowrap">
            <Ruler className="w-4 h-4" /> {property.area_m2}m²
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function MarconiInmobiliaria() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isClient = useIsClient()
  const { toast } = useToast()

  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([])
  const [loadingProperties, setLoadingProperties] = useState(true)
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [submitLoading, setSubmitLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

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
      {/* Header */}
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-lg shadow-sm py-3 md:py-4" : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* Mobile Header */}
          <div className="flex md:hidden justify-between items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <a href="#" className="text-lg font-light tracking-[0.15em]">
                <span className={scrolled ? "text-gray-900" : "text-white"}>MARCONI</span>
                <span className="text-orange-500"> INMOBILIARIA</span>
              </a>
            </motion.div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 ${scrolled ? "text-gray-900" : "text-white"}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 ${scrolled ? "text-gray-400" : "text-white/70"}`}
                />
                <Input
                  type="text"
                  placeholder="Buscar propiedades por dirección, barrio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-12 pr-4 py-3 w-full border-0 ${
                    scrolled
                      ? "bg-gray-50 text-gray-900 placeholder-gray-500"
                      : "bg-white/10 backdrop-blur-sm text-white placeholder-white/70"
                  } focus:ring-2 focus:ring-orange-500 transition-all`}
                />
              </div>
            </div>

            {/* Logo */}
            <motion.div
              className="flex-1 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <a href="#" className="text-2xl font-light tracking-[0.2em]">
                <span className={scrolled ? "text-gray-900" : "text-white"}>MARCONI</span>
                <span className="text-orange-500"> INMOBILIARIA</span>
              </a>
            </motion.div>

            {/* Navigation */}
            <div className="flex-1 flex justify-end">
              <nav className="flex items-center space-x-8">
                <a
                  href="#propiedades"
                  className={`text-sm font-medium tracking-wider hover:text-orange-500 transition-colors ${scrolled ? "text-gray-700" : "text-white"}`}
                >
                  PROPIEDADES
                </a>
                <a
                  href="#agentes"
                  className={`text-sm font-medium tracking-wider hover:text-orange-500 transition-colors ${scrolled ? "text-gray-700" : "text-white"}`}
                >
                  AGENTES
                </a>
                <a
                  href="#contact-form"
                  className={`text-sm font-medium tracking-wider hover:text-orange-500 transition-colors ${scrolled ? "text-gray-700" : "text-white"}`}
                >
                  CONTACTO
                </a>
              </nav>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${scrolled ? "text-gray-400" : "text-white/70"}`}
              />
              <Input
                type="text"
                placeholder="Buscar propiedades..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-3 w-full border-0 text-sm ${
                  scrolled
                    ? "bg-gray-50 text-gray-900 placeholder-gray-500"
                    : "bg-white/10 backdrop-blur-sm text-white placeholder-white/70"
                } focus:ring-2 focus:ring-orange-500 transition-all`}
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200 shadow-lg"
            >
              <nav className="container mx-auto px-4 py-6 space-y-6">
                <a
                  href="#propiedades"
                  className="block text-gray-700 font-medium tracking-wider hover:text-orange-500 text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  PROPIEDADES
                </a>
                <a
                  href="#agentes"
                  className="block text-gray-700 font-medium tracking-wider hover:text-orange-500 text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  AGENTES
                </a>
                <a
                  href="#contact-form"
                  className="block text-gray-700 font-medium tracking-wider hover:text-orange-500 text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  CONTACTO
                </a>

                {/* Mobile Contact Buttons */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <a
                    href="tel:+5403482123456"
                    className="flex items-center justify-center bg-gray-900 text-white py-3 px-4 font-medium tracking-wide hover:bg-gray-800 transition-colors"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    LLAMAR AHORA
                  </a>
                  <a
                    href="https://wa.me/5403482123456"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-green-600 text-white py-3 px-4 font-medium tracking-wide hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WHATSAPP
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black">
            <img src="/placeholder.jpg" alt="Reconquista skyline" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
          </div>

          <div className="relative z-10 text-center text-white px-4 md:px-6 max-w-4xl mx-auto">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light mb-6 md:mb-8 tracking-[0.05em] md:tracking-[0.1em] leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              SOMOS LA INMOBILIARIA #1
              <br />
              <span className="text-orange-500">DE RECONQUISTA</span>
            </motion.h1>

            <motion.div
              className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <p className="text-xs md:text-sm font-medium tracking-[0.2em] mb-4">SCROLL</p>
              <div className="w-px h-8 md:h-12 bg-white mx-auto animate-pulse" />
              <ChevronDown className="w-5 h-5 md:w-6 md:h-6 mx-auto mt-2 animate-bounce" />
            </motion.div>
          </div>
        </section>

        {/* Properties Section */}
        <section id="propiedades" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 md:mb-6 tracking-[0.05em] md:tracking-[0.1em]">
                PROPIEDADES DESTACADAS
              </h2>
              <div className="w-16 md:w-24 h-px bg-orange-500 mx-auto mb-6 md:mb-8" />
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
                Descubrí las mejores oportunidades inmobiliarias en Reconquista y la región
              </p>
            </motion.div>

            {loadingProperties ? (
              <div className="text-center py-16 md:py-20">
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600 font-medium tracking-wide text-sm md:text-base">CARGANDO PROPIEDADES</p>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
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

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-black text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { number: "200+", label: "PROPIEDADES VENDIDAS" },
                { number: "98%", label: "CLIENTES SATISFECHOS" },
                { number: "5+", label: "AÑOS DE EXPERIENCIA" },
                { number: "24/7", label: "ATENCIÓN DISPONIBLE" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl font-light text-orange-500 mb-3 md:mb-4">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm font-medium tracking-[0.1em] md:tracking-[0.15em] text-gray-300 leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact-form" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="text-center mb-12 md:mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 md:mb-6 tracking-[0.05em] md:tracking-[0.1em]">
                  CONTACTANOS
                </h2>
                <div className="w-16 md:w-24 h-px bg-orange-500 mx-auto mb-6 md:mb-8" />
                <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Nuestro equipo de expertos está listo para ayudarte a encontrar tu próximo hogar
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-4 md:mb-6 tracking-wide">
                        INFORMACIÓN DE CONTACTO
                      </h3>
                      <div className="space-y-4 md:space-y-6">
                        <a
                          href="tel:+5403482123456"
                          className="flex items-center text-gray-600 hover:text-orange-500 transition-colors"
                        >
                          <Phone className="w-5 h-5 mr-4 flex-shrink-0" />
                          <span className="font-medium">(03482) 15-123456</span>
                        </a>
                        <a
                          href="https://wa.me/5403482123456"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
                        >
                          <MessageCircle className="w-5 h-5 mr-4 flex-shrink-0" />
                          <span className="font-medium">WhatsApp</span>
                        </a>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-5 h-5 mr-4 flex-shrink-0" />
                          <span className="font-medium">Reconquista, Santa Fe</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-4 md:mb-6 tracking-wide">
                        HORARIOS DE ATENCIÓN
                      </h3>
                      <div className="space-y-2 text-gray-600">
                        <p>Lunes a Viernes: 9:00 - 18:00</p>
                        <p>Sábados: 9:00 - 13:00</p>
                        <p>Domingos: Cerrado</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.8 }}
                >
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Input
                          type="text"
                          placeholder="NOMBRE"
                          value={contactForm.name}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                          className="bg-gray-50 border-0 text-gray-900 placeholder-gray-500 font-medium tracking-wide focus:ring-2 focus:ring-orange-500 h-12 md:h-14"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="EMAIL"
                          value={contactForm.email}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                          className="bg-gray-50 border-0 text-gray-900 placeholder-gray-500 font-medium tracking-wide focus:ring-2 focus:ring-orange-500 h-12 md:h-14"
                        />
                      </div>
                    </div>

                    <div>
                      <Input
                        type="tel"
                        placeholder="TELÉFONO"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, phone: e.target.value }))}
                        className="bg-gray-50 border-0 text-gray-900 placeholder-gray-500 font-medium tracking-wide focus:ring-2 focus:ring-orange-500 h-12 md:h-14"
                      />
                    </div>

                    <div>
                      <Textarea
                        placeholder="MENSAJE"
                        value={contactForm.message}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                        className="bg-gray-50 border-0 text-gray-900 placeholder-gray-500 font-medium tracking-wide min-h-32 md:min-h-40 focus:ring-2 focus:ring-orange-500 resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium tracking-[0.1em] py-4 md:py-6 transition-all duration-300 text-sm md:text-base"
                      disabled={submitLoading}
                    >
                      {submitLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        "ENVIAR MENSAJE"
                      )}
                    </Button>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black py-12 md:py-16 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <div className="mb-6 md:mb-8">
              <a href="#" className="text-2xl md:text-3xl font-light tracking-[0.15em] md:tracking-[0.2em]">
                <span className="text-white">MARCONI</span>
                <span className="text-orange-500"> INMOBILIARIA</span>
              </a>
            </div>

            <div className="flex justify-center space-x-6 md:space-x-8 mb-6 md:mb-8">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: MessageCircle, href: "https://wa.me/5403482123456", label: "WhatsApp" },
                { icon: Phone, href: "tel:+5403482123456", label: "Teléfono" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-orange-500 transition-colors p-2"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>

            <div className="border-t border-gray-800 pt-6 md:pt-8">
              <p className="text-gray-400 font-medium tracking-wide text-sm md:text-base">
                © {new Date().getFullYear()} MARCONI INMOBILIARIA. TODOS LOS DERECHOS RESERVADOS.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
