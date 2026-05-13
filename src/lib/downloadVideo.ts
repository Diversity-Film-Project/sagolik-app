export async function downloadVideo(
    url: string,
    fileName: string,
): Promise<void> {
    const proxyUrl = `/api/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(fileName + '.mp4')}`

    // iOS check must be synchronous (before any await) to preserve user gesture context.
    // The proxy route adds Content-Disposition: attachment so Safari downloads to Files.
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    if (isIOS) {
        window.open(proxyUrl, '_blank')
        return
    }

    try {
        const res = await fetch(proxyUrl)
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
        window.open(proxyUrl, '_blank')
    }
}
