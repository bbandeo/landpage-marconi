'use client';

import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="bg-[#0f172a] py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Columna de Información */}
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-light text-white mb-2">Contáctanos</h2>
            <p className="text-gray-400 font-light">
              Estamos aquí para ayudarte a encontrar la propiedad perfecta.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white/5 rounded-full">
                <Phone className="w-5 h-5 text-orange-500" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-white text-lg">+54 3482 308100</p>
                <p className="text-sm text-gray-500">Lunes a Viernes, 9am - 6pm</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white/5 rounded-full">
                <Mail className="w-5 h-5 text-orange-500" strokeWidth={1.5} />
              </div>
              <div>
                {/* CORREGIDO: Email profesional */}
                <p className="text-white text-lg">contacto@marconi.com.ar</p>
                <p className="text-sm text-gray-500">Consultas generales</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
               <div className="p-3 bg-white/5 rounded-full">
                <MapPin className="w-5 h-5 text-orange-500" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-white text-lg">Jorge Newbery 1562</p>
                <p className="text-sm text-gray-500">Reconquista, Santa Fe</p>
              </div>
            </div>
          </div>
        </div>

        {/* Columna del Formulario (El arreglo visual) */}
        <div className="bg-[#1e293b]/50 p-8 rounded-none md:rounded-lg">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Input Estilo 'Solo Línea' */}
              <div className="group">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full bg-transparent border-b border-gray-600 text-white py-2 focus:outline-none focus:border-orange-500 transition-colors placeholder-gray-500"
                />
              </div>
              <div className="group">
                <input
                  type="email"
                  placeholder="Email profesional"
                  className="w-full bg-transparent border-b border-gray-600 text-white py-2 focus:outline-none focus:border-orange-500 transition-colors placeholder-gray-500"
                />
              </div>
            </div>

            <div className="group">
              <input
                type="tel"
                placeholder="Teléfono"
                className="w-full bg-transparent border-b border-gray-600 text-white py-2 focus:outline-none focus:border-orange-500 transition-colors placeholder-gray-500"
              />
            </div>

            <div className="group">
              <textarea
                rows={4}
                placeholder="¿En qué podemos ayudarte?"
                className="w-full bg-transparent border-b border-gray-600 text-white py-2 focus:outline-none focus:border-orange-500 transition-colors placeholder-gray-500 resize-none"
              ></textarea>
            </div>

            {/* Botón Nivel 1: Sólido y Recto */}
            <button
              type="submit"
              className="w-full bg-[#FF6600] hover:bg-[#E55C00] text-white font-medium py-3 px-6 rounded-sm transition-all tracking-wide uppercase text-sm"
            >
              Enviar Consulta
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
