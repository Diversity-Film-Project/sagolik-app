export function downloadVideo(url: string, fileName: string): void {
    const proxyUrl = `/api/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(fileName + '.mp4')}`
    const a = document.createElement('a')
    a.href = proxyUrl
    a.download = `${fileName}.mp4`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
