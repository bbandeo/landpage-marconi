"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, Building2, Users, Settings, Menu, BarChart3, ExternalLink, Globe } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Propiedades", href: "/admin/properties", icon: Building2 },
  { name: "Contactos", href: "/admin/contacts", icon: Users },
  { name: "Reportes", href: "/admin/reports", icon: BarChart3 },
  { name: "Configuración", href: "/admin/settings", icon: Settings },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleViewWebsite = () => {
    window.open("/", "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center justify-between px-6 border-b">
              <Link href="/admin" className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold">Marconi Admin</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* View Website Button */}
            <div className="border-t p-4">
              <Button variant="outline" onClick={handleViewWebsite} className="w-full justify-start bg-transparent">
                <Globe className="h-4 w-4 mr-2" />
                Ver Sitio Web
                <ExternalLink className="h-3 w-3 ml-auto" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b">
            <Link href="/admin" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">Marconi Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* View Website Button */}
          <div className="border-t p-4">
            <Button variant="outline" onClick={handleViewWebsite} className="w-full justify-start bg-transparent">
              <Globe className="h-4 w-4 mr-2" />
              Ver Sitio Web
              <ExternalLink className="h-3 w-3 ml-auto" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir sidebar</span>
            </Button>
          </SheetTrigger>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-lg font-semibold text-gray-900">Panel de Administración</h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button variant="outline" size="sm" onClick={handleViewWebsite} className="hidden sm:flex bg-transparent">
                <Globe className="h-4 w-4 mr-2" />
                Ver Sitio Web
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
