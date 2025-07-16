import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
})

export const metadata: Metadata = {
  title: "Marconi Inmobiliaria | Tu Hogar en Reconquista",
  description:
    "La inmobiliaria que está revolucionando Reconquista con tecnología y confianza local. Encontrá tu próximo hogar perfecto con nosotros.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${playfairDisplay.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
