import { fal } from '@fal-ai/client'
import { VIDEO_CONSTRAINTS } from '@/lib/videoConstraints'

fal.config({ credentials: process.env.FAL_KEY })

export async function POST(request: Request) {
    const formData = await request.formData()
    const image = formData.get('image') as File
    const prompt = formData.get('prompt') as string
    const videoStyle = formData.get('videoStyle') as string
    const themeDescription = formData.get('themeDescription') as string

    const styleNote = `\n\n**Visual style:** ${videoStyle || 'realistic cinematic'}${themeDescription ? ` — ${themeDescription}` : ''}`
    const fullPrompt = `${prompt}${styleNote}${VIDEO_CONSTRAINTS}`

    try {
        const uploadedUrl = await fal.storage.upload(image)

        const result = await fal.subscribe(
            'fal-ai/kling-video/v3/pro/image-to-video',
            {
                input: {
                    start_image_url: uploadedUrl,
                    prompt: fullPrompt,
                    duration: '15',
                    generate_audio: true,
                },
            },
        )

        return Response.json({
            videoUrl: result.data.video.url,
        })
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        // eslint-disable-next-line no-console
        console.error('[generate-video] fal error:', message)
        return Response.json({ error: message }, { status: 500 })
    }
}
