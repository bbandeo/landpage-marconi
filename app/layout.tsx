import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Marconi Inmobiliaria - Tu hogar ideal te espera",
  description:
    "Encuentra la propiedad perfecta con Marconi Inmobiliaria. Especialistas en venta y alquiler de propiedades en las mejores ubicaciones.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ScrollProgress />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
