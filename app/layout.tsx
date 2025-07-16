import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ScrollProgress } from "@/components/ui/scroll-progress"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Marconi Inmobiliaria - Propiedades Premium en Argentina",
  description:
    "Descubre las mejores propiedades en Argentina con Marconi Inmobiliaria. Casas, departamentos y terrenos de lujo.",
  keywords: "inmobiliaria, propiedades, casas, departamentos, Argentina, bienes raíces",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ScrollProgress />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
