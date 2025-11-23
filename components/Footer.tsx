import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-8 pb-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Image
                src="/assets/logos/marconi_header_orangewhite.png"
                alt="Marconi Inmobiliaria"
                width={140}
                height={45}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-lg text-gray-300 mb-6 max-w-md leading-relaxed">
              Experiencia premium en bienes raíces. Comprometidos con encontrar
              la propiedad perfecta para cada familia.
            </p>

            {/* Iconos de redes sociales */}
            <div className="flex space-x-4">
              <a
                href="tel:+5493482308100"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 cursor-pointer group"
                aria-label="Teléfono"
              >
                <Phone className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors duration-300" />
              </a>
              <a
                href="mailto:marconinegociosinmobiliarios@hotmail.com"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 cursor-pointer group"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors duration-300" />
              </a>
              <a
                href="https://www.instagram.com/marconinegociosinmobiliarios"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 cursor-pointer group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors duration-300" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6">Enlaces</h3>
            <ul className="space-y-4 text-gray-300">
              <li>
                <Link
                  href="/propiedades"
                  className="text-base hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Propiedades
                </Link>
              </li>
              <li>
                <Link
                  href="/agentes"
                  className="text-base hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Agentes
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-base hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700/50 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-base">
            &copy; 2025 Marconi Inmobiliaria. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}