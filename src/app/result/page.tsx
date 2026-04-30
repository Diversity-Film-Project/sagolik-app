// Step 4 — Video Result
'use client'

// import { useState } from 'react'
import { PageLayout } from '@/components/layout/PageLayout/PageLayout'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import { useStory } from '@/context/StoryContext'

export default function ResultPage() {
    const { storyData } = useStory()
    // const [duration, setDuration] = useState<number | null>(null)
    const name = storyData.characterName || 'Your'
    const theme = storyData.storyTheme || 'Personalised story'
    // const videoDuration = duration ? `${duration} seconds` : null

    return (
        <PageLayout currentStep={4} href="/result">
            {/* todo: change description when video duration is available */}
            <PageTitle
                text={`${name}'s story is ready`}
                description={`${theme}`}
            />
        </PageLayout>
    )
}
