'use client'

import { createContext, useState, useContext } from 'react'

interface StoryData {
    photo: File | null
    characterName: string
    storyTheme: string
    sidekick: string
    generatedPrompt: string
    finalPrompt: string
    videoUrl: string
}

interface StoryContextType {
    storyData: StoryData
    updateStoryData: (data: Partial<StoryData>) => void
}

type StoryProviderProps = {
    children: React.ReactNode
}

const StoryContext = createContext<StoryContextType | null>(null)

export function StoryProvider({ children }: StoryProviderProps) {
    const [storyData, setStoryData] = useState<StoryData>({
        photo: null,
        characterName: '',
        storyTheme: 'Any Theme',
        sidekick: '',
        generatedPrompt: '',
        finalPrompt: '',
        videoUrl: '',
    })

    const updateStoryData = (data: Partial<StoryData>) => {
        setStoryData((prev) => ({ ...prev, ...data }))
    }

    return (
        <StoryContext.Provider value={{ storyData, updateStoryData }}>
            {children}
        </StoryContext.Provider>
    )
}

export function useStory() {
    const context = useContext(StoryContext)
    if (!context) throw new Error('useStory must be wrapped in a StoryProvider')
    return context
}
