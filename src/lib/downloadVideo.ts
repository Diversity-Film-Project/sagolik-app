export function downloadVideo(url: string, fileName: string): void {
    const proxyUrl = `/api/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(fileName + '.mp4')}`

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    if (isIOS) {
        // iOS Safari can't download inline — opens file preview in new tab.
        // User taps More… → Save to Files to save the video.
        window.open(proxyUrl, '_blank')
        return
    }

    const a = document.createElement('a')
    a.href = proxyUrl
    a.download = `${fileName}.mp4`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
