// function to call the API route and get the generated prompt.

// todo: call this function on "Generate Prompt" (preferences page) and "Regenerate" (script page)
export const generatePrompt = async (
    characterName: string,
    storyTheme: string,
    sidekick: string,
) => {
    const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ characterName, storyTheme, sidekick }),
    })
    const data = await response.json()
    return data.prompt
}
