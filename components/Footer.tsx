import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b1120] border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* Grid de 4 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Columna 1: Marca */}
          <div className="space-y-4">
            <h2 className="text-2xl text-white font-bold tracking-tight">Marconi</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Elevando el estándar inmobiliario en Reconquista. Comprometidos con la excelencia y la confianza de nuestros clientes.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Columna 2: Explorar */}
          <div>
            <h3 className="text-white font-semibold mb-6">Explorar</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-orange-500 transition">Propiedades en Venta</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Propiedades en Alquiler</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Nuestros Agentes</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Oportunidades de Inversión</a></li>
            </ul>
          </div>

          {/* Columna 3: Legal */}
          <div>
            <h3 className="text-white font-semibold mb-6">Legal</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-orange-500 transition">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Defensa del Consumidor</a></li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contacto</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex flex-col">
                <span className="text-gray-600 text-xs uppercase mb-1">Dirección</span>
                Jorge Newbery 1562, Reconquista
              </li>
              <li className="flex flex-col">
                <span className="text-gray-600 text-xs uppercase mb-1">Email</span>
                contacto@marconi.com
              </li>
              <li className="flex flex-col">
                <span className="text-gray-600 text-xs uppercase mb-1">Teléfono</span>
                +54 3482 308100
              </li>
            </ul>
          </div>

        </div>

        {/* Fila Inferior: Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>&copy; 2024 Marconi Negocios Inmobiliarios. Todos los derechos reservados.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <span className="cursor-pointer hover:text-gray-400">Mapa del sitio</span>
            <span className="cursor-pointer hover:text-gray-400">Accesibilidad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}