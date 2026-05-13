import { NextRequest } from 'next/server'

const ALLOWED_HOSTS = ['fal.media', 'v3b.fal.media', 'storage.googleapis.com']

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    const filename = searchParams.get('filename') ?? 'story.mp4'

    if (!url) {
        return new Response('Missing url parameter', { status: 400 })
    }

    let parsed: URL
    try {
        parsed = new URL(url)
    } catch {
        return new Response('Invalid url', { status: 400 })
    }

    const isAllowed = ALLOWED_HOSTS.some(
        (host) =>
            parsed.hostname === host || parsed.hostname.endsWith(`.${host}`),
    )
    if (!isAllowed) {
        return new Response('URL not allowed', { status: 403 })
    }

    const upstream = await fetch(url)
    if (!upstream.ok || !upstream.body) {
        return new Response('Failed to fetch video', { status: 502 })
    }

    const contentType = upstream.headers.get('content-type') ?? 'video/mp4'
    const contentLength = upstream.headers.get('content-length')

    const headers: HeadersInit = {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'private, max-age=3600',
    }
    if (contentLength) headers['Content-Length'] = contentLength

    return new Response(upstream.body, { status: 200, headers })
}
