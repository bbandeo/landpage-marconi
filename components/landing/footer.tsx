"use client"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold">
                <span className="text-white">MARCONI</span>
                <span className="text-brand-orange block text-sm font-normal tracking-wider">INMOBILIARIA</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              La inmobiliaria líder en Reconquista, comprometida con encontrar el hogar perfecto para cada familia.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/propiedades" className="hover:text-white transition-colors">
                  Propiedades
                </Link>
              </li>
              <li>
                <Link href="/agentes" className="hover:text-white transition-colors">
                  Agentes
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Reconquista, Santa Fe</li>
              <li>+54 9 3482 123456</li>
              <li>info@marconiinmobiliaria.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Marconi Inmobiliaria. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
