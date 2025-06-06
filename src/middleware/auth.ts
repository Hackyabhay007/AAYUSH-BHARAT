import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export interface AuthenticatedRequest extends NextApiRequest {
    user?: {
        userId: string;
        email: string;
    };
}

export interface TokenPayload {
    userId: string;
    email: string;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register')

  // Redirect to login if no token and trying to access protected routes
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to profile if user is already logged in and trying to access auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  return NextResponse.next()
}

// Simple token verification
export function verifyToken(token: string): TokenPayload {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
        return decoded;
    } catch (error) {
        console.error('Token verification failed:', error);
        throw new Error('Invalid token');
    }
}

// Helper for API routes
export function getTokenFromRequest(request: NextRequest | Request): string {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
        throw new Error('Invalid token format');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new Error('No token provided');
    }

    return token;
}

export const config = {
  matcher: ['/profile/:path*', '/login', '/register']
}
