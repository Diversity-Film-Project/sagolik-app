import { fal } from '@fal-ai/client'
import { VIDEO_CONSTRAINTS } from '@/lib/videoConstraints'

fal.config({ credentials: process.env.FAL_KEY })

const ENDPOINT = 'fal-ai/kling-video/v3/pro/image-to-video'

export async function POST(request: Request) {
    const formData = await request.formData()
    const image = formData.get('image') as File
    const prompt = formData.get('prompt') as string
    const videoStyle = formData.get('videoStyle') as string
    const themeDescription = formData.get('themeDescription') as string

    const styleNote = `\n\nVisual style: ${videoStyle || 'realistic cinematic'}${themeDescription ? ` — ${themeDescription}` : ''}`
    const fullPrompt = `${prompt}${styleNote}${VIDEO_CONSTRAINTS}`

    try {
        const uploadedUrl = await fal.storage.upload(image)

        const { request_id } = await fal.queue.submit(ENDPOINT, {
            input: {
                start_image_url: uploadedUrl,
                prompt: fullPrompt,
                duration: '15',
                generate_audio: true,
            },
        })

        return Response.json({ requestId: request_id })
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        // eslint-disable-next-line no-console
        console.error('[generate-video] submit error:', message)
        return Response.json({ error: message }, { status: 500 })
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const requestId = searchParams.get('requestId')

    if (!requestId) {
        return Response.json({ error: 'requestId required' }, { status: 400 })
    }

    try {
        const status = await fal.queue.status(ENDPOINT, {
            requestId,
            logs: false,
        })

        if (status.status === 'COMPLETED') {
            const result = await fal.queue.result(ENDPOINT, { requestId })
            return Response.json({
                status: 'completed',
                videoUrl: result.data.video.url,
            })
        }

        if ((status.status as string) === 'FAILED') {
            return Response.json(
                { status: 'failed', error: 'Video generation failed' },
                { status: 500 },
            )
        }

        return Response.json({ status: 'processing' })
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        // eslint-disable-next-line no-console
        console.error('[generate-video-status] error:', message)
        return Response.json({ error: message }, { status: 500 })
    }
}
