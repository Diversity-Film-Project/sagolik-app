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
import { submitVideoJob, pollVideoStatus } from '@/services/generateVideo'
import { shareVideo } from '@/lib/shareVideo'
import { Share2 } from 'lucide-react'
import styles from './page.module.css'

// ─── TEST / PRODUCTION toggle ─────────────────
// Change only ONE line below:
// 🧪 TEST (no API call):  const isMock = true
// 🚀 PRODUCTION:          const isMock = false
const MOCK_VIDEO_URL =
    'https://v3b.fal.media/files/b/0a991ab9/W6-K7MPjvpUyp2V2Kp6P3_output.mp4'
const isMock = true
// ──────────────────────────────────────────────

export default function ResultPage() {
    const router = useRouter()
    const { storyData, updateStoryData, resetStory, hydrated } = useStory()
    // const [isLoading, setIsLoading] = useState<boolean>(!isMock)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [error, setError] = useState<string | null>(null)
    const hasFetched = useRef(false)

    const videoUrl = isMock ? MOCK_VIDEO_URL : storyData.videoUrl

    // Block browser back / swipe-back gesture while video is generating
    useEffect(() => {
        if (!isLoading) return
        const handlePopState = () => {
            history.pushState(null, '', window.location.href)
        }
        history.pushState(null, '', window.location.href)
        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [isLoading])

    // Show browser "leave page?" dialog if user tries to close/refresh during generation
    useEffect(() => {
        if (!isLoading) return
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault()
        }
        window.addEventListener('beforeunload', handleBeforeUnload)
        return () =>
            window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [isLoading])

    // Keep screen on during generation; re-acquire wake lock after screen wakes up
    useEffect(() => {
        if (!isLoading) return
        let wakeLock: WakeLockSentinel | null = null

        const acquire = async () => {
            try {
                if ('wakeLock' in navigator) {
                    wakeLock = await navigator.wakeLock.request('screen')
                }
            } catch {
                // not supported or permission denied — silent fail
            }
        }

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && wakeLock?.released) {
                acquire()
            }
        }

        acquire()
        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => {
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange,
            )
            wakeLock?.release()
        }
    }, [isLoading])

    const saveToHistory = (url: string) => {
        try {
            const stored = localStorage.getItem('sagolik_history')
            const history: {
                id: string
                videoUrl: string
                characterName: string
                storyTheme: string
                finalPrompt: string
                createdAt: string
            }[] = stored ? JSON.parse(stored) : []
            if (history.some((e) => e.videoUrl === url)) return
            history.unshift({
                id: Date.now().toString(),
                videoUrl: url,
                characterName: storyData.characterName,
                storyTheme: storyData.storyTheme,
                finalPrompt: storyData.finalPrompt,
                createdAt: new Date().toISOString(),
            })
            localStorage.setItem('sagolik_history', JSON.stringify(history))
        } catch {
            /* ignore */
        }
    }

    // Core generation logic — called both on initial load and on retry
    const runGeneration = async () => {
        // Already have a completed video (from this session or localStorage).
        // await breaks the synchronous call chain so setState isn't called mid-effect.
        if (storyData.videoUrl) {
            await Promise.resolve()
            setIsLoading(false)
            return
        }

        // Resume a job that was already submitted (e.g. user refreshed or re-opened the page)
        if (storyData.videoRequestId) {
            try {
                const url = await pollVideoStatus(storyData.videoRequestId)
                saveToHistory(url)
                updateStoryData({ videoUrl: url, videoRequestId: '' })
                setIsLoading(false)
            } catch (err: unknown) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Video generation failed.',
                )
                setIsLoading(false)
            }
            return
        }

        if (!storyData.finalPrompt || !storyData.photo) {
            router.push('/story')
            return
        }

        try {
            const requestId = await submitVideoJob(
                storyData.photo,
                storyData.finalPrompt,
                storyData.videoStyle,
                storyData.themeDescription,
            )
            updateStoryData({ videoRequestId: requestId })
            const url = await pollVideoStatus(requestId)
            saveToHistory(url)
            updateStoryData({ videoUrl: url, videoRequestId: '' })
            setIsLoading(false)
        } catch (err: unknown) {
            setError(
                err instanceof Error ? err.message : 'Video generation failed.',
            )
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (isMock) return
        if (!hydrated) return // wait for localStorage to be restored into context
        if (hasFetched.current) return
        hasFetched.current = true

        runGeneration()
    }, [hydrated]) // eslint-disable-line react-hooks/exhaustive-deps

    const isSharingRef = useRef(false)

    const handleShare = async () => {
        if (isSharingRef.current) return
        isSharingRef.current = true
        try {
            await shareVideo(
                `${storyData.characterName || 'A'}'s story`,
                storyData.storyTheme || 'Check out this AI-generated story!',
                videoUrl,
            )
        } finally {
            isSharingRef.current = false
        }
    }

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
                            setError(null)
                            setIsLoading(true)
                            runGeneration()
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
                    <video
                        src={videoUrl}
                        controls
                        playsInline
                        className={styles.video}
                    />
                    <Button
                        label="Share"
                        variant="outlined"
                        icon={<Share2 size={16} />}
                        onClick={handleShare}
                    />
                    <Button
                        label="Create new video"
                        variant="secondary"
                        onClick={() => {
                            resetStory()
                            router.push('/')
                        }}
                    />
                </>
            )}
        </PageLayout>
    )
}
