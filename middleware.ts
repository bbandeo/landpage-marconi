// middleware.ts (en la raíz del proyecto)
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const pathname = req.nextUrl.pathname;

	// Crear cliente de Supabase para el middleware
	const supabase = createMiddlewareClient({ req, res });

	// Verificar sesión del usuario
	const {
		data: { session }
	} = await supabase.auth.getSession();

	// Rutas que requieren autenticación
	const protectedRoutes = ["/admin"];
	const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

	// Si es una ruta protegida y no hay sesión, redirigir al login
	if (isProtectedRoute && !session && pathname !== "/admin/login") {
		const redirectUrl = new URL("/admin/login", req.url);
		redirectUrl.searchParams.set("redirectTo", pathname);
		return NextResponse.redirect(redirectUrl);
	}

	// Si está en la página de login y ya está autenticado, redirigir al admin
	if (pathname === "/admin/login" && session) {
		return NextResponse.redirect(new URL("/admin", req.url));
	}

	return res;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
	]
};
