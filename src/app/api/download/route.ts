import { NextRequest } from 'next/server'

const ALLOWED_HOSTS = ['fal.media', 'v3b.fal.media', 'storage.googleapis.com']
const DEFAULT_FILENAME = 'story.mp4'

// Build an RFC 6266 Content-Disposition value: ASCII fallback +
// `filename*=UTF-8''…` for clients that need Unicode-safe names.
function buildContentDisposition(rawName: string): string {
    const stripped = rawName.replace(/["\\\r\n\x00-\x1f]/g, '')
    const safe = stripped || DEFAULT_FILENAME
    const asciiFallback = safe.replace(/[^\x20-\x7e]/g, '_') || DEFAULT_FILENAME
    const utf8 = encodeURIComponent(safe)
    return `attachment; filename="${asciiFallback}"; filename*=UTF-8''${utf8}`
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    const filename = searchParams.get('filename') ?? DEFAULT_FILENAME

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

    const contentLength = upstream.headers.get('content-length')
    const upstreamType = upstream.headers.get('content-type')
    // iOS share sheet uses the MIME type to decide whether to offer
    // "Save Video" (Photos library) — keep a real video/* type.
    const contentType =
        upstreamType && upstreamType.startsWith('video/')
            ? upstreamType
            : 'video/mp4'

    const headers: HeadersInit = {
        'Content-Type': contentType,
        'Content-Disposition': buildContentDisposition(filename),
        'Cache-Control': 'private, max-age=3600',
    }
    if (contentLength) headers['Content-Length'] = contentLength

    return new Response(upstream.body, { status: 200, headers })
}
