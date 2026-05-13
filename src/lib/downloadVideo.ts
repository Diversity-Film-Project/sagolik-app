export async function downloadVideo(
    url: string,
    fileName: string,
): Promise<void> {
    const proxyUrl = `/api/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(fileName + '.mp4')}`

    try {
        const res = await fetch(proxyUrl)
        if (!res.ok) throw new Error('proxy failed')
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
        // last resort — open proxy URL directly in new tab
        window.open(proxyUrl, '_blank')
    }
}
