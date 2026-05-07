// function to call the API route that generates a video from an image and a prompt
import { compressImage } from '@/lib/compressImage'

export const generateVideo = async (
    photo: File,
    prompt: string,
    videoStyle: string,
    themeDescription: string,
) => {
    const cleanPrompt = prompt.replace(/['']/g, "'").replace(/[""]/g, '"')

    const compressed = await compressImage(photo)

    const formData = new FormData()
    formData.append('image', compressed)
    formData.append('prompt', cleanPrompt)
    formData.append('videoStyle', videoStyle)
    formData.append('themeDescription', themeDescription)

    const response = await fetch('/api/generate-video', {
        method: 'POST',
        body: formData,
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(
            data.error || 'Video generation failed. Please try again.',
        )
    }
    return data.videoUrl
}
