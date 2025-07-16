import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { ScrollProgress } from "@/components/ui/scroll-progress"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Marconi Inmobiliaria - Tu hogar ideal te espera",
  description:
    "Encuentra la propiedad perfecta con Marconi Inmobiliaria. Especialistas en venta y alquiler de propiedades en las mejores ubicaciones.",
  keywords: "inmobiliaria, propiedades, venta, alquiler, casas, departamentos",
  authors: [{ name: "Marconi Inmobiliaria" }],
  openGraph: {
    title: "Marconi Inmobiliaria - Tu hogar ideal te espera",
    description: "Encuentra la propiedad perfecta con Marconi Inmobiliaria",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ScrollProgress />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
