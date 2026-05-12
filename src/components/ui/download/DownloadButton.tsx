'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'

type DownloadButtonProps = {
    videoUrl: string
    fileName?: string
}

export function DownloadButton({
    videoUrl,
    fileName = 'story-video',
}: DownloadButtonProps) {
    const [loading, setLoading] = useState(false)

    const handleDownload = async () => {
        if (loading) return

        setLoading(true)

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

        if (isIOS) {
            window.open(videoUrl, '_blank')
            setLoading(false)
            return
        }

        try {
            const response = await fetch(videoUrl)
            const blob = await response.blob()

            const objectUrl = URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = objectUrl
            link.download = `${fileName}.mp4`

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            URL.revokeObjectURL(objectUrl)
        } catch {
            window.open(videoUrl, '_blank')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            label="Download"
            variant="outlined"
            icon={<Download size={16} />}
            loading={loading}
            disabled={loading}
            onClick={handleDownload}
        />
    )
}
