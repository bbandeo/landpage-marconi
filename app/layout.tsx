import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ScrollProgress } from "@/components/ui/scroll-progress"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Marconi Inmobiliaria - Tu hogar ideal te espera",
  description:
    "Encuentra la propiedad perfecta con Marconi Inmobiliaria. Especialistas en compra, venta y alquiler de propiedades en las mejores ubicaciones.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <ScrollProgress />
        {children}
        <Toaster />
    </>
  )
}
