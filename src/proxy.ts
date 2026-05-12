import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/login', '/api/auth']

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
        return NextResponse.next()
    }

    const cookie = request.cookies.get('demo_auth')
    const expected = process.env.DEMO_PASSWORD

    if (!expected || cookie?.value !== expected) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|apple-icon.png|icon0.svg|icon1.png|manifest.json|logo.svg|images/.*).*)',
    ],
}
