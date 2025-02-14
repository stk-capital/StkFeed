import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(request: NextRequest) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "")

  // Public paths that don't require authentication
  const publicPaths = ["/login", "/api/auth/login", "/api/auth/register"]
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))

    // Add user info to request headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("X-User-ID", payload.userId as string)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|favicon.ico|logo.png|images|login).*)"],
}

