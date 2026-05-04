// Step 4 — Video Result
'use client'

// import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout/PageLayout'
// import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
// import { useStory } from '@/context/StoryContext'
import { ConfirmationCard } from '@/components/common/ConfirmationCard/ConfirmationCard'
import { LoadingCard } from '@/components/common/LoadingCard/LoadingCard'
import { Button } from '@/components/ui/Button/Button'

export default function ResultPage() {
    // const { storyData } = useStory()
    // const [duration, setDuration] = useState<number | null>(null)
    // const name = storyData.characterName || 'Your'
    // const theme = storyData.storyTheme || 'Personalised story'
    // const videoDuration = duration ? `${duration} seconds` : null
    const router = useRouter()

    return (
        <PageLayout currentStep={4} href="/result">
            <ConfirmationCard />
            <LoadingCard duration={2} />
            <Button
                variant="secondary"
                label="Back"
                onClick={() => router.push('/script')}
            />
            {/* todo: change description when video duration is available */}
            {/* <PageTitle
                text={`${name}'s story is ready`}
                description={`${theme}`}
            /> */}
        </PageLayout>
    )
}
