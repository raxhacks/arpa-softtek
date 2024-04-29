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
  
  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
 
  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session &&
    !req.nextUrl.pathname.startsWith('/CargarArchivos')
  ) {
    return NextResponse.redirect(new URL('/CargarArchivos', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}