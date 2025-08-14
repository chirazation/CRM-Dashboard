// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value;

  // If not logged in, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

// Run middleware on all routes except these
export const config = {
  matcher: ['/dashboard/:path*', '/leads/:path*', '/contacts/:path*'],
};

