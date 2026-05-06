// function to call the API route that generates a video from an image and a prompt

export const generateVideo = async (imageUrl: string, prompt: string) => {
    const cleanPrompt = prompt.replace(/[‘’]/g, "'").replace(/[“”]/g, '"')

    const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl, prompt: cleanPrompt }),
    })
    const data = await response.json()
    return data.videoUrl
}
