"use client";

import { motion } from "framer-motion";
import { MapPin, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { FaqSection } from "@/components/contact/FaqSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-premium-main text-white">
      <Header />

      <Hero
        backgroundImage="v1721008691/marconi/contact/contact-hero_gq82gs.jpg"
        alt="Oficina de Marconi Inmobiliaria"
        title={<><span className="text-orange-400">CONTACTANOS</span></>}
        description="Estamos aquí para ayudarte a encontrar la propiedad perfecta o responder cualquier consulta sobre nuestros servicios"
        withAnimation={true}
        imageClassName="object-cover object-top"
      />

      {/* Contact Details Section */}
      <section className="section-premium">
        <div className="container-premium">
          <ContactDetails />
        </div>
      </section>

      {/* Form and Map Section */}
      <section className="section-premium">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-premium-xl items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-premium-card border-support-gray/20">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-premium-primary mb-2">Envianos tu consulta</h2>
                  <p className="text-premium-secondary mb-6">Nos pondremos en contacto a la brevedad.</p>
                  <ContactForm />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-premium-lg"
            >
              <h2 className="text-3xl font-bold text-premium-primary">Nuestra Ubicación</h2>
              <Card className="overflow-hidden bg-premium-card border-support-gray/20">
                <div className="aspect-video bg-support-gray/10 flex items-center justify-center">
                  {/* Placeholder for an interactive map */}
                  <div className="text-center p-8">
                    <MapPin className="w-16 h-16 text-vibrant-orange mx-auto mb-4" />
                    <p className="text-xl font-bold text-premium-primary">Jorge Newbery 1562</p>
                    <p className="text-premium-secondary mb-4">Reconquista, Santa Fe</p>
                    <Button asChild>
                      <a href="https://maps.google.com/?q=Jorge+Newbery+1562,+Reconquista,+Santa+Fe" target="_blank" rel="noopener noreferrer">
                        <Globe className="w-5 h-5 mr-2" />
                        Ver en Google Maps
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
              <div className="text-premium-secondary">
                <h3 className="font-bold text-premium-primary text-xl mb-2">Horarios de Atención</h3>
                <p>Lunes a Viernes: 9:00 - 18:00</p>
                <p>Sábados: 9:00 - 13:00</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-premium">
        <div className="container-premium text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-premium-primary mb-4">Preguntas Frecuentes</h2>
          <p className="text-lg text-premium-secondary max-w-3xl mx-auto mb-12">Resolvemos las dudas más comunes de nuestros clientes.</p>
          <FaqSection />
        </div>
      </section>

      <Footer />
    </div>
  );
}
