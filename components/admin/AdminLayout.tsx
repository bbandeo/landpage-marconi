"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Home, Settings, Menu, Building2, MessageSquare, BarChart3, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Propiedades", href: "/admin/properties", icon: Building2 },
    { name: "Contactos", href: "/admin/contacts", icon: MessageSquare },
    { name: "Reportes", href: "/admin/reports", icon: BarChart3 },
    { name: "Configuración", href: "/admin/settings", icon: Settings },
  ]

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsMobileMenuOpen(false)
  }

  const handleViewWebsite = () => {
    window.open("/", "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex flex-1 flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Building2 className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Marconi Admin</span>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = typeof window !== "undefined" && window.location.pathname === item.href
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`${
                      isActive
                        ? "bg-orange-50 dark:bg-orange-900/30 border-orange-500 text-orange-700 dark:text-orange-400"
                        : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                    } group flex items-center px-2 py-2 text-sm font-medium border-l-4 w-full text-left transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset`}
                  >
                    <item.icon
                      className={`${
                        isActive ? "text-orange-500" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
                      } mr-3 h-5 w-5`}
                    />
                    {item.name}
                  </button>
                )
              })}
            </nav>
            <div className="flex-shrink-0 px-2">
              <Button 
                onClick={handleViewWebsite} 
                variant="outline" 
                className="w-full justify-start bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-2 focus:ring-orange-500"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver Sitio Web
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            className="lg:hidden fixed top-4 left-4 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800" 
            size="sm"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-white dark:bg-gray-800">
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex flex-1 flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Building2 className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Marconi Admin</span>
              </div>
              <nav className="mt-8 flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = typeof window !== "undefined" && window.location.pathname === item.href
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.href)}
                      className={`${
                        isActive
                          ? "bg-orange-50 dark:bg-orange-900/30 border-orange-500 text-orange-700 dark:text-orange-400"
                          : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                      } group flex items-center px-2 py-2 text-sm font-medium border-l-4 w-full text-left transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset`}
                    >
                      <item.icon
                        className={`${
                          isActive ? "text-orange-500" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
                        } mr-3 h-5 w-5`}
                      />
                      {item.name}
                    </button>
                  )
                })}
              </nav>
              <div className="flex-shrink-0 px-2">
                <Button 
                  onClick={handleViewWebsite} 
                  variant="outline" 
                  className="w-full justify-start bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-2 focus:ring-orange-500"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ver Sitio Web
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 lg:hidden pl-16 pr-4 py-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-medium text-gray-900 dark:text-white">Admin Panel</h1>
            <Button 
              onClick={handleViewWebsite} 
              variant="outline" 
              size="sm"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-2 focus:ring-orange-500"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Ver Sitio
            </Button>
          </div>
        </div>
        <main className="flex-1 bg-gray-50 dark:bg-gray-900">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
