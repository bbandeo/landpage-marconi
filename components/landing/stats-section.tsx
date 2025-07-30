"use client"
import { motion } from "framer-motion"
import { Home, Users, Award, Star } from "lucide-react"
import type { ElementType } from "react"

const stats: { icon: ElementType; number: string; label: string }[] = [
  { icon: Home, number: "500+", label: "Propiedades Vendidas" },
  { icon: Users, number: "1000+", label: "Clientes Satisfechos" },
  { icon: Award, number: "15+", label: "Años de Experiencia" },
  { icon: Star, number: "4.9", label: "Calificación Promedio" },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-orange/20 rounded-full mb-4">
                <stat.icon className="h-8 w-8 text-brand-orange" />
              </div>
              <div className="text-3xl font-bold text-primary-foreground mb-2">{stat.number}</div>
              <div className="text-primary-foreground/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
