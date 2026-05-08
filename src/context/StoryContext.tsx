'use client'

import { createContext, useState, useContext, useEffect } from 'react'

interface StoryData {
    photo: File | null
    characterName: string
    storyTheme: string
    sidekick: string
    generatedPrompt: string
    finalPrompt: string
    promptParamsKey: string
    videoUrl: string
    videoStyle: 'animated' | 'realistic' | ''
    themeDescription: string
    videoRequestId: string // for tracking video generation status. If user closed the page and comes back, we can check if there's an ongoing job and resume polling.
}

interface StoryContextType {
    storyData: StoryData
    updateStoryData: (data: Partial<StoryData>) => void
    resetStory: () => void // to clear all data when user wants to create a new story
    hydrated: boolean
}

type StoryProviderProps = {
    children: React.ReactNode
}

const STORAGE_KEY = 'sagolik_story'
type PersistedFields = Pick<
    StoryData,
    'finalPrompt' | 'videoRequestId' | 'videoUrl'
>

const StoryContext = createContext<StoryContextType | null>(null)

export function StoryProvider({ children }: StoryProviderProps) {
    const [hydrated, setHydrated] = useState(false) // to track if we've restored persisted state from localStorage
    const [storyData, setStoryData] = useState<StoryData>({
        photo: null,
        characterName: '',
        storyTheme: '',
        sidekick: '',
        generatedPrompt: '',
        finalPrompt: '',
        promptParamsKey: '',
        videoUrl: '',
        videoStyle: 'animated',
        themeDescription: '',
        videoRequestId: '',
    })

    // If user closed the page and comes back, we can restore persisted fields from localStorage on mount (client-side only)
    useEffect(() => {
        const restore = async () => {
            await Promise.resolve() // break synchronous chain so setState isn't called mid-effect
            try {
                const stored = localStorage.getItem(STORAGE_KEY)
                if (stored) {
                    const parsed = JSON.parse(
                        stored,
                    ) as Partial<PersistedFields>
                    setStoryData((prev) => ({ ...prev, ...parsed })) // restore persisted fields
                }
            } catch {
                // ignore parse/storage errors
            }
            setHydrated(true)
        }
        restore()
    }, [])

    // Keep localStorage in sync whenever persisted fields change
    useEffect(() => {
        if (!hydrated) return
        try {
            const toStore: PersistedFields = {
                finalPrompt: storyData.finalPrompt,
                videoRequestId: storyData.videoRequestId,
                videoUrl: storyData.videoUrl,
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore))
        } catch {
            // ignore storage errors
        }
    }, [
        storyData.finalPrompt,
        storyData.videoRequestId,
        storyData.videoUrl,
        hydrated,
    ])

    const updateStoryData = (data: Partial<StoryData>) => {
        setStoryData((prev) => ({ ...prev, ...data }))
    }

    const resetStory = () => {
        try {
            localStorage.removeItem(STORAGE_KEY)
        } catch {
            /* ignore */
        }
        setStoryData({
            photo: null,
            characterName: '',
            storyTheme: '',
            sidekick: '',
            generatedPrompt: '',
            finalPrompt: '',
            promptParamsKey: '',
            videoUrl: '',
            videoStyle: '',
            themeDescription: '',
            videoRequestId: '',
        })
    }

    return (
        <StoryContext.Provider
            value={{ storyData, updateStoryData, resetStory, hydrated }}
        >
            {children}
        </StoryContext.Provider>
    )
}

export function useStory() {
    const context = useContext(StoryContext)
    if (!context) throw new Error('useStory must be wrapped in a StoryProvider')
    return context
}
