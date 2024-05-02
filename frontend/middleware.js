import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// 1. Specify protected and public routes
const protectedRoutes = ['/CargarArchivos', '/Analisis', '/Favorites', '/History']
const publicRoutes = ['/']

export default async function middleware(req) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  // 3. Decrypt the session from the cookie
  const session = cookies().get('session')?.value

  // 4. Redirect to /login if the user is not authenticated for protected routes
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(`${req.nextUrl.origin}/`)
  }

  // 5. Redirect to /CargarArchivos if the user is authenticated and trying to access public routes
  if (isPublicRoute && session) {
    return NextResponse.redirect(`${req.nextUrl.origin}/CargarArchivos`)
  }

  // 6. Continue to the next middleware or handler if no redirection is needed
  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  api: {
    bodyParser: false,
  },
}
