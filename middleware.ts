// middleware.ts - VERSIÓN SIMPLIFICADA SIN SUPABASE
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Rutas que requieren autenticación
  const protectedRoutes = ["/admin"]
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route) && pathname !== "/admin/login"
  )

  // Por ahora, permitir todo hasta solucionar Supabase
  if (isProtectedRoute) {
    // En producción, aquí verificarías autenticación
    console.log('Protected route accessed:', pathname)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*),'
  ]
}