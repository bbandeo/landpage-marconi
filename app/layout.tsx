import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "../styles/globals.css"
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
  title: "Marconi Inmobiliaria | Tu próximo hogar perfecto",
  description: "La inmobiliaria que está revolucionando Reconquista con tecnología y confianza local.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Prevent flash of incorrect theme */
            html { 
              background-color: #111827; 
              color: #f9fafb;
            }
            body { 
              background-color: #111827; 
              color: #f9fafb;
            }
          `
        }} />
      </head>
      <body className={`${inter.variable} ${playfairDisplay.variable} font-sans dark bg-gray-900 text-white`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
