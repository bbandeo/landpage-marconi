"use client"
import { ArrowRight, Shield, TrendingUp, UserCheck, CheckCircle, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AboutUsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-orange font-medium mb-4">
              Conocé nuestro equipo
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              ¿Quiénes <span className="text-brand-orange">somos?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Somos <strong>Marconi Inmobiliaria</strong>, una empresa local que entiende tus necesidades.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Con un enfoque dinámico, nos especializamos en conectar personas con sus propiedades ideales, 
                  ofreciendo un servicio cercano y profesional que marca la diferencia.
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
            </div>
            <div className="relative">
              <div className="relative bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl p-8 overflow-hidden">
                <div className="aspect-[4/5] bg-white rounded-2xl relative overflow-hidden shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <Users className="h-20 w-20 mx-auto mb-4 opacity-40" />
                      <p className="text-sm font-medium">Imagen de Floriana Marconi</p>
                      <p className="text-xs text-gray-300 mt-1">Fundadora & Agente Principal</p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-gray-900 text-white rounded-xl p-4">
                    <h4 className="font-bold text-lg mb-1">Floriana Marconi</h4>
                    <p className="text-gray-300 text-sm mb-3">Fundadora & Agente Principal</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
