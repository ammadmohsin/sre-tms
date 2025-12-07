import { auth } from "~/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that don't require authentication
const publicRoutes = ["/login", "/api/auth"];

// Role-based route access
const roleRoutes = {
  ADMIN: [
    "/admin",
    "/employees",
    "/departments",
    "/inventory",
    "/orders",
    "/shipments",
    "/analytics",
    "/settings",
  ],
  MANAGER: [
    "/dashboard",
    "/employees",
    "/departments",
    "/inventory",
    "/orders",
    "/shipments",
    "/analytics",
  ],
  DEPARTMENT_HEAD: [
    "/dashboard",
    "/employees",
    "/attendance",
    "/inventory",
    "/reports",
  ],
  QUALITY_CONTROL: ["/dashboard", "/inventory", "/quality", "/stock-movements"],
  COMMERCIAL: ["/dashboard", "/shipments", "/exports", "/imports"],
  SHIPPING: ["/dashboard", "/shipments", "/deliveries"],
  DEPARTMENT_STAFF: ["/dashboard", "/orders", "/inventory"],
  WORKER: ["/portal", "/attendance", "/progress"],
};

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const user = req.auth?.user;

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check role-based access
  if (user?.accessLevel) {
    const allowedRoutes =
      roleRoutes[user.accessLevel as keyof typeof roleRoutes] || [];
    const hasAccess = allowedRoutes.some((route) => pathname.startsWith(route));

    if (!hasAccess && pathname !== "/") {
      // Redirect to appropriate dashboard
      const dashboardRoute =
        user.accessLevel === "WORKER" ? "/portal" : "/dashboard";
      return NextResponse.redirect(new URL(dashboardRoute, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
