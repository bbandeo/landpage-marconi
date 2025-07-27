"use client"
import { motion } from "framer-motion"
import { ArrowRight, Shield, TrendingUp, UserCheck, CheckCircle, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AboutUsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-orange font-medium mb-4"
            >
              Conocé nuestro equipo
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
            >
              ¿Quiénes <span className="text-brand-orange">somos?</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Somos <strong>Marconi Inmobiliaria</strong>, una empresa local que entiende tus necesidades. Conocemos
                  Reconquista como la palma de nuestra mano y te acompañamos en cada paso.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Con un enfoque joven y dinámico, nos especializamos en encontrar la propiedad perfecta para cada
                  cliente. Desde casas familiares hasta inversiones estratégicas.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-brand-orange mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Confianza local</h4>
                      <p className="text-gray-600 text-sm">Conocimiento profundo del mercado local</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-6 w-6 text-brand-orange mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Conocimiento del mercado</h4>
                      <p className="text-gray-600 text-sm">Análisis actualizado de tendencias</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <UserCheck className="h-6 w-6 text-brand-orange mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Atención personalizada</h4>
                      <p className="text-gray-600 text-sm">Servicio adaptado a cada cliente</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-brand-orange mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Experiencia comprobada</h4>
                      <p className="text-gray-600 text-sm">Años de éxito en el sector</p>
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <Button className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-3">
                    Conocé más
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl p-8 overflow-hidden">
                <div className="aspect-[4/5] bg-gray-300 rounded-2xl relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">Foto de Floriana Marconi</p>
                    </div>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <div className="bg-gray-900 text-white rounded-xl p-4">
                    <h4 className="font-bold text-lg mb-1">Floriana Marconi</h4>
                    <p className="text-gray-300 text-sm mb-3">Fundadora & Agente Principal</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
