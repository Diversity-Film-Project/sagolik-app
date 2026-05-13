export type DownloadResult = 'shared' | 'downloaded' | 'opened' | 'cancelled'

const FILENAME_MAX_LENGTH = 80
const FALLBACK_FILENAME = 'video'
// Strip filesystem-unsafe chars and control chars; Unicode (Cyrillic, emoji,
// etc.) is preserved so the saved filename matches what the user typed.
const UNSAFE_FILENAME_CHARS = /[/\\:*?"<>|\x00-\x1f]/g

export function sanitizeFileName(name: string): string {
    const cleaned = name
        .replace(UNSAFE_FILENAME_CHARS, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, FILENAME_MAX_LENGTH)
    return cleaned || FALLBACK_FILENAME
}

function buildProxyUrl(url: string, fileName: string): string {
    const safeName = encodeURIComponent(`${fileName}.mp4`)
    return `/api/download?url=${encodeURIComponent(url)}&filename=${safeName}`
}

function isIOSDevice(): boolean {
    if (typeof navigator === 'undefined') return false
    const ua = navigator.userAgent
    if (/iPad|iPhone|iPod/.test(ua)) return true
    // iPadOS 13+ identifies itself as Mac; touch points disambiguate.
    return (
        navigator.platform === 'MacIntel' &&
        typeof navigator.maxTouchPoints === 'number' &&
        navigator.maxTouchPoints > 1
    )
}

function isAndroidDevice(): boolean {
    if (typeof navigator === 'undefined') return false
    return /Android/.test(navigator.userAgent)
}

function triggerAnchorDownload(proxyUrl: string, safeFileName: string): void {
    const a = document.createElement('a')
    a.href = proxyUrl
    a.download = safeFileName
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

export async function downloadVideo(
    url: string,
    fileName: string,
): Promise<DownloadResult> {
    const safeBaseName = sanitizeFileName(fileName)
    const proxyUrl = buildProxyUrl(url, safeBaseName)
    const safeFileName = `${safeBaseName}.mp4`
    const isMobile = isIOSDevice() || isAndroidDevice()

    if (isMobile && typeof navigator.share === 'function') {
        let blob: Blob
        try {
            const response = await fetch(proxyUrl)
            if (!response.ok) {
                throw new Error('Could not load the video. Please try again.')
            }
            blob = await response.blob()
        } catch (err) {
            // Network/server failure — every other path hits the same proxy,
            // so there's no working fallback to attempt.
            throw err instanceof Error
                ? err
                : new Error('Could not load the video. Please try again.')
        }

        try {
            const file = new File([blob], safeFileName, {
                type: blob.type || 'video/mp4',
            })
            if (
                typeof navigator.canShare === 'function' &&
                navigator.canShare({ files: [file] })
            ) {
                await navigator.share({ files: [file] })
                return 'shared'
            }
        } catch (err) {
            if (err instanceof Error && err.name === 'AbortError') {
                return 'cancelled'
            }
            // Share failed (e.g. user-gesture lost) — fall through to fallback.
        }

        if (isIOSDevice()) {
            window.location.href = proxyUrl
            return 'opened'
        }
    }

    triggerAnchorDownload(proxyUrl, safeFileName)
    return 'downloaded'
}
