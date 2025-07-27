"use client"
import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-white">MARCONI</span>
              <span className="text-brand-orange block text-sm font-normal tracking-wider">INMOBILIARIA</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/propiedades" className="text-gray-300 hover:text-white transition-colors">
              PROPIEDADES
            </Link>
            <Link href="/agentes" className="text-gray-300 hover:text-white transition-colors">
              AGENTES
            </Link>
            <Link href="/contacto" className="text-gray-300 hover:text-white transition-colors">
              CONTACTO
            </Link>
          </nav>
          <div className="md:hidden flex-1 max-w-xs ml-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar propiedades..."
                className="pl-10 h-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 text-sm focus:border-brand-orange"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
