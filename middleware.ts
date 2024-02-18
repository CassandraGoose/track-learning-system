import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('auth_session')?.value
 const pathname = request.nextUrl.pathname;

  if (currentUser && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (!currentUser && (pathname !== '/login' && pathname !== '/signup')) {
    return NextResponse.redirect(new URL('/signup', request.url))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}