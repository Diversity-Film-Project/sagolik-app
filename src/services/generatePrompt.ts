// function to call the API route and get the generated prompt.

export const generatePrompt = async (
    characterName: string,
    storyTheme: string,
    sidekick: string,
    videoStyle: string,
    themeDescription: string,
    customStory: string,
) => {
    const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            characterName,
            storyTheme,
            sidekick,
            videoStyle,
            themeDescription,
            customStory,
        }),
    })
    const data = await response.json()
    if (!response.ok) {
        if (response.status === 503) {
            throw new Error(
                'Gemini is currently overloaded. Please try again in a moment.',
            )
        }
        if (response.status === 429) {
            throw new Error(
                'Too many requests. Please wait a few seconds and try again.',
            )
        }
        throw new Error('Something went wrong. Please try again.')
    }
    return data.prompt
}
