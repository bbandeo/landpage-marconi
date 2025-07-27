"use client"

import { useState } from "react"
import { Menu, X, Home, Building, Phone, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { name: "Inicio", href: "/", icon: Home },
    { name: "Propiedades", href: "/propiedades", icon: Building },
    { name: "Contacto", href: "/contacto", icon: Phone },
    { name: "Nosotros", href: "/nosotros", icon: Info },
  ]

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    // Handle navigation - you can use Next.js router here
    window.location.href = href
  }

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:bg-white"
          >
            {isOpen ? <X className="h-6 w-6 text-gray-900" /> : <Menu className="h-6 w-6 text-gray-900" />}
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[300px] sm:w-[350px] bg-white/95 backdrop-blur-md border-l border-gray-200"
        >
          <div className="flex flex-col h-full">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Marconi</h2>
                <p className="text-sm text-gray-600">Inmobiliaria</p>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-6 py-8">
              <ul className="space-y-4">
                {navigationItems.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-left transition-all duration-200 hover:bg-orange-50 hover:text-orange-700 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                        <item.icon className="w-5 h-5 text-gray-600 group-hover:text-orange-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 group-hover:text-orange-700">{item.name}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact Info */}
            <div className="px-6 py-6 border-t border-gray-200 bg-gray-50/50">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-gray-700">+54 3482 123456</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-gray-700">Reconquista, Santa Fe</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                className="w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg"
                onClick={() => handleNavClick("/contacto")}
              >
                Contactar Ahora
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
