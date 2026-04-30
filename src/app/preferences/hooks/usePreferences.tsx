'use client'

import { useStory } from '@/context/StoryContext'

export const usePreferences = () => {
    const { storyData, updateStoryData } = useStory()

    const setName = (name: string) => {
        updateStoryData({ characterName: name })
    }

    const setTheme = (theme: string) => {
        updateStoryData({ storyTheme: theme })
    }

    const setSidekick = (sidekick: string) => {
        updateStoryData({ sidekick })
    }

    return {
        // values
        name: storyData.characterName,
        theme: storyData.storyTheme,
        sidekick: storyData.sidekick,

        // setters
        setName,
        setTheme,
        setSidekick,
    }
}
