import { fal } from '@fal-ai/client'
import { VIDEO_CONSTRAINTS } from '@/lib/videoConstraints'

fal.config({ credentials: process.env.FAL_KEY })

export async function POST(request: Request) {
    const { imageUrl, prompt } = await request.json()

    const fullPrompt = `${prompt}${VIDEO_CONSTRAINTS}`

    const result = await fal.subscribe(
        'fal-ai/kling-video/v3/pro/image-to-video',
        {
            input: {
                start_image_url: imageUrl,
                prompt: fullPrompt,
                duration: '15',
                generate_audio: true,
            },
        },
    )

    return Response.json({
        videoUrl: result.data.video.url,
    })
}
