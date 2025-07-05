import { type NextRequest, NextResponse } from "next/server"

// Temporarily bypass authentication
export function middleware(request: NextRequest) {
  // Comment out authentication logic for now
  /*
  const token = request.cookies.get('auth-token')
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login?redirectTo=' + request.nextUrl.pathname, request.url))
    }
  }
  */

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
