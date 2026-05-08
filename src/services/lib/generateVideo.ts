import { compressImage } from '@/lib/compressImage'

// Polls the status endpoint until Kling finishes generating the video.
// Needed because fal.subscribe blocks the serverless function for minutes,
// causing Vercel to kill it with a timeout. Instead, POST submits the job
// and returns a requestId immediately; this function checks progress client-side.
export async function pollVideoStatus(requestId: string): Promise<string> {
    const maxAttempts = 72 // cap at 6 minutes (72 × 5s) to avoid infinite loops
    for (let i = 0; i < maxAttempts; i++) {
        await new Promise((resolve) => setTimeout(resolve, 5000)) // wait 5s between checks

        const res = await fetch(
            `/api/generate-video?requestId=${encodeURIComponent(requestId)}`, // GET → status check
        )
        const data = await res.json()

        if (data.status === 'completed') return data.videoUrl // job done — return the video URL
        if (data.status === 'failed' || !res.ok) {
            // job failed or network error
            throw new Error(
                data.error || 'Video generation failed. Please try again.',
            )
        }
        // status === 'processing' — Kling is still working, continue polling
    }
    throw new Error('Video generation timed out. Please try again.') // max attempts reached
}

// Compresses and uploads the photo, submits the job to the fal queue,
// and returns the requestId immediately without waiting for the video to finish.
export async function submitVideoJob(
    photo: File,
    prompt: string,
    videoStyle: string,
    themeDescription: string,
): Promise<string> {
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
    return data.requestId
}
