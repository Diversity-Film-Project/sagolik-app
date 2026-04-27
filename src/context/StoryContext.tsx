import { createContext, useState } from 'react'

interface StoryData {
    photo: File | null
    characterName: string
    storyTheme: string
    sidekick: string
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
        storyTheme: '',
        sidekick: '',
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
