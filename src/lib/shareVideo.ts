// Shares a video URL via Web Share API, falls back to clipboard.
// AbortError (user dismissed the share sheet) is silently ignored.
export async function shareVideo(
    title: string,
    text: string,
    url: string,
): Promise<void> {
    const shareData = { title, text, url }
    try {
        if (navigator.share && navigator.canShare(shareData)) {
            await navigator.share(shareData)
        } else {
            await navigator.clipboard.writeText(url)
        }
    } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return
        throw err
    }
}
