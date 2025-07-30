import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
})

export const metadata: Metadata = {
  title: {
    default: "Marconi Inmobiliaria | Tu próximo hogar perfecto",
    template: "%s | Marconi Inmobiliaria"
  },
  description: "Inmobiliaria líder en Reconquista, Santa Fe. Propiedades en venta y alquiler con tecnología y confianza local. Más de 200 propiedades vendidas y 98% de clientes satisfechos.",
  keywords: ["inmobiliaria", "propiedades", "casas", "departamentos", "Reconquista", "Santa Fe", "venta", "alquiler"],
  authors: [{ name: "Marconi Inmobiliaria" }],
  creator: "Marconi Inmobiliaria",
  publisher: "Marconi Inmobiliaria",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://marconiinmobiliaria.com",
    siteName: "Marconi Inmobiliaria",
    title: "Marconi Inmobiliaria | Tu próximo hogar perfecto",
    description: "Inmobiliaria líder en Reconquista, Santa Fe. Propiedades en venta y alquiler con tecnología y confianza local.",
    images: [
      {
        url: "/placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "Marconi Inmobiliaria - Propiedades en Reconquista",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marconi Inmobiliaria | Tu próximo hogar perfecto",
    description: "Inmobiliaria líder en Reconquista, Santa Fe. Propiedades en venta y alquiler con tecnología y confianza local.",
    images: ["/placeholder.jpg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: "google-site-verification-code",
  },
  generator: 'Next.js',
  category: 'business',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#F97316" />
        <link rel="canonical" href="https://marconiinmobiliaria.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Marconi Inmobiliaria",
              "description": "Inmobiliaria líder en Reconquista, Santa Fe",
              "url": "https://marconiinmobiliaria.com",
              "telephone": "+54-3482-15-123456",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Reconquista",
                "addressRegion": "Santa Fe",
                "addressCountry": "AR"
              },
              "areaServed": {
                "@type": "City",
                "name": "Reconquista",
                "addressRegion": "Santa Fe",
                "addressCountry": "AR"
              },
              "sameAs": [
                "https://instagram.com/marconiinmobiliaria",
                "https://wa.me/5493482123456"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfairDisplay.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
