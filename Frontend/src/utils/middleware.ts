import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // If accessing the root path '/', redirect to landing page
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/landing-page', request.url))
  }
  return NextResponse.next()
}