"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Phone,
  MessageCircle,
  Instagram,
  Play,
  Send,
  ArrowRight,
  Bed,
  Bath,
  CheckCircle,
  Loader2,
  MapPin,
  Ruler,
} from "lucide-react"
import { useIsClient } from "@/hooks/use-is-client"
import { PropertyService } from "@/services/properties"
import { LeadsService } from "@/services/leads"
import type { Property } from "@/lib/supabase"
import { ParticleBackground } from "@/components/ui/particle-background"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

export default function MarconiInmobiliariaPremium() {
  const [scrolled, setScrolled] = useState(false)
  const isClient = useIsClient()

  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([])
  const [loadingProperties, setLoadingProperties] = useState(true)
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [propertyInterest, setPropertyInterest] = useState<Property | null>(null)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const contactFormRef = useRef<HTMLDivElement>(null)

  const stats = [
    { number: 200, suffix: "+", label: "Propiedades Vendidas" },
    { number: 98, suffix: "%", label: "Clientes Satisfechos" },
    { number: 5, suffix: "+", label: "Años de Experiencia" },
    { number: 24, suffix: "/7", label: "Atención Disponible" },
  ]

  useEffect(() => {
    const loadFeaturedProperties = async () => {
      try {
        setLoadingProperties(true)
        const properties = await PropertyService.getFeaturedProperties()
        setFeaturedProperties(properties)
      } catch (error) {
        console.error("Error loading featured properties:", error)
        toast.error("No se pudieron cargar las propiedades.")
      } finally {
        setLoadingProperties(false)
      }
    }
    loadFeaturedProperties()
  }, [])

  useEffect(() => {
    if (!isClient) return
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isClient])

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("es-AR", { style: "currency", currency, minimumFractionDigits: 0 }).format(price)
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactForm.name || !contactForm.message) {
      toast.warning("Por favor completa tu nombre y mensaje.")
      return
    }
    setSubmitLoading(true)
    try {
      await LeadsService.createLead({
        name: contactForm.name,
        email: contactForm.email || null,
        phone: contactForm.phone || null,
        message: contactForm.message,
        property_id: propertyInterest?.id || null,
        lead_source: "website_premium",
      })
      setSubmitSuccess(true)
      toast.success("¡Mensaje enviado! Te contactaremos pronto.")
      setContactForm({ name: "", email: "", phone: "", message: "" })
      setPropertyInterest(null)
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      console.error("Error sending contact form:", error)
      toast.error("Error al enviar el mensaje. Intenta nuevamente.")
    } finally {
      setSubmitLoading(false)
    }
  }

  const handlePropertyInterest = (property: Property) => {
    setPropertyInterest(property)
    setContactForm((prev) => ({
      ...prev,
      message: `Hola, me interesa la propiedad: ${property.title} (${formatPrice(
        property.price,
        property.currency,
      )}). Me gustaría recibir más información.`,
    }))
    contactFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/60 backdrop-blur-lg border-b border-gray-800 py-3" : "py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center max-w-7xl">
          <div className="text-2xl font-extrabold tracking-tight hover:scale-105 transition-transform">
            <span className="text-white">MARCONI</span>
            <span className="text-orange-500">.</span>
          </div>
          <div className="flex gap-3">
            <Button
              size="sm"
              className="bg-orange-500 hover:bg-orange-600 text-white btn-premium hidden sm:inline-flex"
            >
              <Phone /> (03482) 15-123456
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white btn-premium">
              <MessageCircle /> <span className="hidden sm:inline">WhatsApp</span>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-orange-900/20">
          <ParticleBackground />
          <div className="relative z-10 text-center text-white px-4 max-w-5xl">
            <h1 className="text-fluid-hero font-black tracking-tight text-balance leading-none">
              Tu próximo{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 animate-text-gradient">
                hogar perfecto
              </span>
            </h1>
            <p className="text-lg md:text-xl mt-6 mb-10 opacity-80 max-w-2xl mx-auto text-balance">
              La inmobiliaria que está revolucionando Reconquista con tecnología y confianza local.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white btn-premium"
                onClick={() => document.getElementById("propiedades")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver propiedades <ArrowRight />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 text-white hover:bg-white hover:text-black btn-premium bg-transparent"
              >
                <Play /> Ver video
              </Button>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-white rounded-full animate-scroll-bounce"></div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-900/50 border-y border-gray-800">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-4xl md:text-5xl font-bold text-orange-500 group-hover:scale-110 transition-transform">
                    <AnimatedCounter to={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="propiedades" className="py-16 md:py-20 lg:py-24 bg-black">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-fluid-h2 font-extrabold text-white tracking-tight">
                Propiedades <span className="text-orange-500">Destacadas</span>
              </h2>
              <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto text-balance">
                Las mejores oportunidades de inversión y vivienda en Reconquista y la región.
              </p>
            </div>

            {loadingProperties ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="bg-gray-900 border-gray-800">
                    <Skeleton className="h-56 w-full" />
                    <CardContent className="p-6 space-y-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex gap-4">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {featuredProperties.map((property) => (
                  <Card
                    key={property.id}
                    className="bg-gray-900 border-gray-800 overflow-hidden group transition-all duration-300 hover:border-orange-500/50 hover:-translate-y-2 will-change-transform"
                  >
                    <div className="relative">
                      <img
                        src={property.images?.[0] || "/placeholder.svg?width=400&height=225&query=modern+house"}
                        alt={property.title}
                        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                          {property.operation_type.toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-bold text-xl text-white text-balance">{property.title}</h3>
                        <p className="text-orange-400 font-semibold text-sm flex items-center gap-1 mt-1">
                          <MapPin className="w-4 h-4" />
                          {property.neighborhood}, {property.city}
                        </p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="text-3xl font-extrabold text-white mb-4">
                        {formatPrice(property.price, property.currency)}
                      </div>
                      <div className="flex items-center gap-6 text-gray-300 mb-4">
                        {property.bedrooms && (
                          <span className="flex items-center gap-2">
                            <Bed /> {property.bedrooms}
                          </span>
                        )}
                        {property.bathrooms && (
                          <span className="flex items-center gap-2">
                            <Bath /> {property.bathrooms}
                          </span>
                        )}
                        <span className="flex items-center gap-2">
                          <Ruler /> {property.area_m2}m²
                        </span>
                      </div>
                      <Button
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white btn-premium"
                        onClick={() => handlePropertyInterest(property)}
                      >
                        Me interesa <ArrowRight />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 md:py-20 lg:py-24 bg-gray-900">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-fluid-h2 font-extrabold text-white tracking-tight">
                  ¿Quiénes <span className="text-orange-500">somos?</span>
                </h2>
                <div className="space-y-4 text-gray-300 mt-6 mb-8 text-lg">
                  <p>
                    Somos <strong>Marconi Inmobiliaria</strong>, una empresa local que entiende tus necesidades.
                    Conocemos Reconquista como la palma de nuestra mano y te acompañamos en cada paso.
                  </p>
                  <p>
                    Con un enfoque joven y dinámico, nos especializamos en encontrar la propiedad perfecta para cada
                    cliente. Desde casas familiares hasta inversiones estratégicas.
                  </p>
                </div>
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white btn-premium">
                  Conocé más <ArrowRight />
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-square bg-orange-500/10 rounded-3xl p-6 transform rotate-3">
                  <img
                    src="/placeholder.svg?width=500&height=500"
                    alt="Floriana Marconi"
                    className="rounded-2xl h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-black border border-gray-800 text-white p-4 rounded-xl shadow-2xl">
                  <p className="font-bold text-orange-500">Floriana Marconi</p>
                  <p className="text-sm text-gray-300">Fundadora & Agente Principal</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={contactFormRef} id="contact-form" className="py-16 md:py-20 lg:py-24 bg-black">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-fluid-h2 font-extrabold text-white tracking-tight">
                  Contacto <span className="text-orange-500">Rápido</span>
                </h2>
                <p className="text-lg text-gray-400 mt-4 mb-8">¿Tenés una consulta? Te respondemos al instante.</p>
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: "Teléfono", value: "(03482) 15-123456", color: "bg-orange-500" },
                    { icon: MessageCircle, label: "WhatsApp", value: "+54 9 3482 123456", color: "bg-green-600" },
                    { icon: Instagram, label: "Instagram", value: "@marconi.inmobiliarios", color: "bg-pink-600" },
                  ].map((contact) => (
                    <a
                      key={contact.label}
                      href="#"
                      className="flex items-center gap-4 text-white p-4 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800 hover:border-orange-500/50 transition-all group"
                    >
                      <div className={`${contact.color} p-4 rounded-full group-hover:scale-110 transition-transform`}>
                        <contact.icon />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{contact.label}</p>
                        <p className="text-gray-400">{contact.value}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>
              </div>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-8">
                  {submitSuccess ? (
                    <div className="flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                      <h3 className="text-2xl font-bold text-white">¡Mensaje Enviado!</h3>
                      <p className="text-gray-400 mt-2">Gracias por contactarnos. Te responderemos a la brevedad.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      {propertyInterest && (
                        <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg text-sm">
                          <p className="text-orange-400">
                            <strong>Propiedad de interés:</strong> {propertyInterest.title}
                          </p>
                        </div>
                      )}
                      <div className="form-group">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={contactForm.name}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder=" "
                          required
                        />
                        <label htmlFor="name" className="form-label">
                          Nombre *
                        </label>
                      </div>
                      <div className="form-group">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={contactForm.email}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder=" "
                        />
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                      </div>
                      <div className="form-group">
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={contactForm.phone}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder=" "
                        />
                        <label htmlFor="phone" className="form-label">
                          Teléfono
                        </label>
                      </div>
                      <div className="form-group">
                        <textarea
                          id="message"
                          name="message"
                          value={contactForm.message}
                          onChange={handleInputChange}
                          className="form-input min-h-32"
                          placeholder=" "
                          required
                        />
                        <label htmlFor="message" className="form-label">
                          Mensaje *
                        </label>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white btn-premium"
                        size="lg"
                        disabled={submitLoading}
                      >
                        {submitLoading ? <Loader2 className="animate-spin" /> : <Send />}
                        {submitLoading ? "Enviando..." : "Enviar Mensaje"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center text-gray-400 max-w-7xl">
          <h3 className="text-3xl font-extrabold text-white mb-2">
            <span className="text-orange-500">MARCONI</span> INMOBILIARIA
          </h3>
          <p>Tu socio inmobiliario en Reconquista, Santa Fe</p>
          <div className="flex justify-center gap-4 my-8">
            {[Instagram, MessageCircle, Phone].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-400 hover:text-orange-500 hover:scale-110 transition-all p-3 bg-gray-900 rounded-full hover:bg-gray-800"
              >
                <Icon />
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Marconi Inmobiliaria. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      <a
        href="#"
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl shadow-green-500/20 animate-pulse hover:animate-none transition-transform hover:scale-110"
      >
        <MessageCircle className="w-8 h-8" />
      </a>
    </div>
  )
}
