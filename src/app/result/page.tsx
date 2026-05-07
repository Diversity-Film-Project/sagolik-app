// Step 4 — Video Result
'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout/PageLayout'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import { useStory } from '@/context/StoryContext'
import { ConfirmationCard } from '@/components/common/ConfirmationCard/ConfirmationCard'
import { LoadingCard } from '@/components/common/LoadingCard/LoadingCard'
import { Button } from '@/components/ui/Button/Button'
import { generateVideo } from '@/services/lib/generateVideo'

export default function ResultPage() {
    const router = useRouter()
    const { storyData, updateStoryData } = useStory()
    const [isLoading, setIsLoading] = useState(!storyData.videoUrl)
    const [error, setError] = useState<string | null>(null)
    const hasFetched = useRef(false)

    useEffect(() => {
        if (hasFetched.current) return
        hasFetched.current = true

        if (!storyData.finalPrompt || !storyData.photo) {
            router.push('/story')
            return
        }

        if (storyData.videoUrl) return

        generateVideo(
            storyData.photo,
            storyData.finalPrompt,
            storyData.videoStyle,
            storyData.themeDescription,
        )
            .then((url: string) => {
                updateStoryData({ videoUrl: url })
                setIsLoading(false)
            })
            .catch((err: Error) => {
                setError(err.message)
                setIsLoading(false)
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <PageLayout currentStep={4} href="/result">
            {isLoading ? (
                <>
                    <ConfirmationCard />
                    <LoadingCard duration={5} />
                </>
            ) : error ? (
                <>
                    <p className="error">{error}</p>
                    <Button
                        label="Try again"
                        onClick={() => {
                            hasFetched.current = false
                            setError(null)
                            setIsLoading(true)
                        }}
                    />
                </>
            ) : (
                <>
                    <PageTitle
                        text={`${storyData.characterName || 'Your'}'s story is ready`}
                        description={
                            storyData.storyTheme || 'Personalised story'
                        }
                    />
                    <video src={storyData.videoUrl} controls width="100%" />
                </>
            )}
            <Button
                variant="secondary"
                label="Back"
                onClick={() => router.push('/story')}
            />
        </PageLayout>
    )
}
