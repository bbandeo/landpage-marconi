import type React from "react"
import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { ScrollProgress } from "@/components/ui/scroll-progress"

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "600", "700", "800", "900"] })

export const metadata: Metadata = {
  title: "Marconi Inmobiliaria | Excelencia y Confianza",
  description: "La inmobiliaria que está revolucionando Reconquista con tecnología y confianza local.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${manrope.className} bg-gray-900 text-gray-200 antialiased`}>
        <ScrollProgress />
        {children}
        <Toaster richColors theme="dark" position="bottom-right" />
      </body>
    </html>
  )
}
