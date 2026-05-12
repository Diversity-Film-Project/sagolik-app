export async function downloadVideo(
    url: string,
    fileName: string,
): Promise<void> {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    if (isIOS) {
        window.open(url, '_blank')
        return
    }
    try {
        const res = await fetch(url)
        const blob = await res.blob()
        const objectUrl = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = objectUrl
        a.download = `${fileName}.mp4`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(objectUrl)
    } catch {
        // CORS blocked — open in new tab so user can save manually
        window.open(url, '_blank')
    }
}
