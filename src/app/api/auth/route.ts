import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
    const { password } = await request.json()
    const expected = process.env.DEMO_PASSWORD

    if (!expected || password !== expected) {
        return NextResponse.json({ error: 'Wrong password' }, { status: 401 })
    }

    const cookieStore = await cookies()
    cookieStore.set('demo_auth', expected, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    })

    return NextResponse.json({ ok: true })
}
