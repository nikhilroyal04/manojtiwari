import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Check for manual authentication (using sessionStorage or localStorage)
    // For now, we'll use a simple approach - you can enhance this later
    const isAuthenticated = request.cookies.get("isLoggedIn")?.value === "true";

    // Protected routes that require authentication
    const protectedRoutes = [
        "/dashboard",
        "/admin",
        "/manage",
        "/settings"
    ];

    // Public routes that don't require authentication
    const publicRoutes = [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password"
    ];

    // Check if current path is protected
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    
    // Check if current path is a public auth route
    const isPublicAuthRoute = publicRoutes.some(route => pathname.startsWith(route));

    // Redirect to login if accessing protected route without authentication
    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect to dashboard if accessing auth routes while already authenticated
    if (isPublicAuthRoute && isAuthenticated) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Continue with the request
    return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc.)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};