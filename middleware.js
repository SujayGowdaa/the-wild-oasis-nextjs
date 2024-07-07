/*
import { NextResponse } from 'next/server';

// Middleware function to handle requests
export function middleware(req) {
  // Redirect the request to the '/about' page
  return NextResponse.redirect(new URL('/about', req.url));
}

// Configuration object for the middleware
export const config = {
  // Define the paths that the middleware should match
  matcher: ['/account', '/cabins'],
};
 */

export { auth as middleware } from '@/app/_lib/auth';

export const config = {
  matcher: ['/account'],
};
