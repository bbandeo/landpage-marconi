import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, Instagram, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-16 pb-8 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* COLUMNA IZQUIERDA: Logo y Descripción */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-6">
              <Image
                src="/assets/logos/marconi_header_orangewhite.png"
                alt="Marconi Inmobiliaria"
                width={140}
                height={45}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Experiencia premium en bienes raíces. Comprometidos con encontrar
              la propiedad perfecta para cada familia en Reconquista.
            </p>
          </div>

          {/* COLUMNA CENTRO: Enlaces Rápidos */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Enlaces Rápidos</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  href="/propiedades"
                  className="text-sm hover:text-orange-500 transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Propiedades
                </Link>
              </li>
              <li>
                <Link
                  href="/agentes"
                  className="text-sm hover:text-orange-500 transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Agentes
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-sm hover:text-orange-500 transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/quienes-somos"
                  className="text-sm hover:text-orange-500 transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Quiénes Somos
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMNA DERECHA: Datos Duros y Redes Sociales */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-4 text-gray-400 mb-6">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-sm">Reconquista, Santa Fe, Argentina</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <a href="tel:+5493482308100" className="text-sm hover:text-orange-500 transition-colors">
                  +54 9 3482 30-8100
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <a href="mailto:contacto@marconi.com.ar" className="text-sm hover:text-orange-500 transition-colors">
                  contacto@marconi.com.ar
                </a>
              </li>
            </ul>

            {/* Redes Sociales */}
            <div className="flex space-x-3">
              <a
                href="tel:+5493482308100"
                className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 cursor-pointer group"
                aria-label="Teléfono"
              >
                <Phone className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-500 transition-colors duration-300" strokeWidth={1.5} />
              </a>
              <a
                href="mailto:contacto@marconi.com.ar"
                className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 cursor-pointer group"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-500 transition-colors duration-300" strokeWidth={1.5} />
              </a>
              <a
                href="https://www.instagram.com/marconinegociosinmobiliarios"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 cursor-pointer group"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-500 transition-colors duration-300" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2025 Marconi Inmobiliaria. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
