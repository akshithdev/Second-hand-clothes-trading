import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow all requests
  return NextResponse.next();
}

// Configure the paths that should trigger this middleware
export const config = {
  matcher: [
    '/api/products/:path*',
  ],
};
