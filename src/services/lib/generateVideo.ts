// function to call the API route that generates a video from an image and a prompt

export const generateVideo = async (
    photo: File,
    prompt: string,
    videoStyle: string,
    themeDescription: string,
) => {
    const cleanPrompt = prompt.replace(/['']/g, "'").replace(/[""]/g, '"')

    const formData = new FormData()
    formData.append('image', photo)
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
