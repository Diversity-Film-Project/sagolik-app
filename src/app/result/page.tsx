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
import { Share2 } from 'lucide-react'
import styles from './page.module.css'

// ─── TEST / PRODUCTION toggle ─────────────────
// Change only ONE line below:
// 🧪 TEST (no API call):  const isMock = true
// 🚀 PRODUCTION:          const isMock = false
const MOCK_VIDEO_URL =
    'https://v3b.fal.media/files/b/0a991ab9/W6-K7MPjvpUyp2V2Kp6P3_output.mp4'
const isMock = false
// ──────────────────────────────────────────────

export default function ResultPage() {
    const router = useRouter()
    const { storyData, updateStoryData } = useStory()
    const [isLoading, setIsLoading] = useState<boolean>(
        !storyData.videoUrl && !isMock,
    )
    const [error, setError] = useState<string | null>(null)
    const hasFetched = useRef(false)

    // 🧪 TEST MODE: returns mock URL
    // 🚀 PRODUCTION MODE: replace with just `storyData.videoUrl`
    const videoUrl = isMock ? MOCK_VIDEO_URL : storyData.videoUrl

    const isSharingRef = useRef(false)

    const handleShare = async () => {
        if (isSharingRef.current) return
        isSharingRef.current = true
        try {
            const shareData = {
                title: `${storyData.characterName || 'A'}'s story`,
                text:
                    storyData.storyTheme ||
                    'Check out this AI-generated story!',
                url: videoUrl,
            }
            if (navigator.share && navigator.canShare(shareData)) {
                await navigator.share(shareData)
            } else {
                await navigator.clipboard.writeText(videoUrl)
            }
        } catch (err) {
            if (err instanceof Error && err.name === 'AbortError') return
            throw err
        } finally {
            isSharingRef.current = false
        }
    }

    useEffect(() => {
        // 🧪 TEST MODE: skip API call
        if (isMock) return

        // 🚀 PRODUCTION MODE
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
                    <video src={videoUrl} controls className={styles.video} />
                    <Button
                        label="Share"
                        variant="outlined"
                        icon={<Share2 size={16} />}
                        onClick={handleShare}
                    />
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
