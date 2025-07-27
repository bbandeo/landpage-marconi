"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section className="py-20 bg-brand-orange">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-white mb-6">¿Listo para encontrar tu próximo hogar?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Nuestro equipo de expertos está aquí para ayudarte en cada paso del camino
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/propiedades">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-brand-orange hover:bg-gray-100 w-full sm:w-auto"
              >
                Explorar Propiedades
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contacto">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-brand-orange bg-transparent w-full sm:w-auto"
              >
                Contactar Agente
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
