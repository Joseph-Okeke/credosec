import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/admin", "/profile", "/my-courses"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // Supabase Auth cookies
  const accessToken =
    request.cookies.get("sb-access-token")?.value ||
    request.cookies.getAll().find((c) => c.name.includes("access-token"))
      ?.value;

  const refreshToken =
    request.cookies.get("sb-refresh-token")?.value ||
    request.cookies.getAll().find((c) => c.name.includes("refresh-token"))
      ?.value;

  // Not logged in
  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/my-courses/:path*",
  ],
};
