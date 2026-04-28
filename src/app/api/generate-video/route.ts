import { fal } from '@fal-ai/client'

fal.config({ credentials: process.env.FAL_KEY })

export async function POST(request: Request) {
    const { imageUrl, prompt } = await request.json()

    const result = await fal.subscribe(
        'fal-ai/kling-video/v3/pro/image-to-video',
        {
            input: {
                start_image_url: imageUrl,
                prompt: prompt,
                duration: '15',
                generate_audio: true,
            },
        },
    )

    return Response.json({
        videoUrl: result.data.video.url,
    })
}
