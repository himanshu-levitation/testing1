import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if(process.env.NEXT_PUBLIC_AUTHORIZATION_TOKEN !==request.headers.get('Authorization')){
    if(pathname.startsWith('/api/')){
      return NextResponse.json({error:'Unauthorized'}, {status:401})
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*'] 
}