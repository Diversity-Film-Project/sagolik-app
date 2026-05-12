export function buildParamsKey(data: {
    characterName: string
    storyTheme: string
    sidekick: string
    videoStyle: string
    themeDescription: string
    customStory: string
}): string {
    return `${data.characterName}|${data.storyTheme}|${data.sidekick}|${data.videoStyle}|${data.themeDescription}|${data.customStory}`
}
