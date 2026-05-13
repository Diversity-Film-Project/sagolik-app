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
import { ConfirmModal } from '@/components/common/ConfirmModal/ConfirmModal'
import { downloadVideo } from '@/lib/downloadVideo'
import { Download } from 'lucide-react'
import { fireConfetti } from '@/lib/fireConfetti'
import styles from './page.module.css'

// ─── TEST / PRODUCTION toggle ─────────────────
// Change only ONE line below:
// TEST (no API call):  const isMock = true
// PRODUCTION:          const isMock = false
const MOCK_VIDEO_URL =
    'https://v3b.fal.media/files/b/0a991ab9/W6-K7MPjvpUyp2V2Kp6P3_output.mp4'
const isMock = false
// ──────────────────────────────────────────────

export default function ResultPage() {
    const router = useRouter()
    const { storyData, updateStoryData, resetStory, hydrated } = useStory()
    const [isLoading, setIsLoading] = useState<boolean>(!isMock) // comment this line for testing loading state (to see 'All set' screen)
    // const [isLoading, setIsLoading] = useState<boolean>(true) //  uncomment this line for testing loading state (to see 'All set' screen)

    const [error, setError] = useState<string | null>(null)
    const [showNewVideoConfirm, setShowNewVideoConfirm] = useState(false)
    const [downloading, setDownloading] = useState(false)
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
                fireConfetti()
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
            fireConfetti()
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

    const handleDownload = async () => {
        if (downloading) return
        setDownloading(true)

        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            window.open(videoUrl, '_blank')
            setDownloading(false)
            return
        }

        try {
            await downloadVideo(
                videoUrl,
                `${storyData.characterName || 'story'}-video`,
            )
        } finally {
            setDownloading(false)
        }
    }

    return (
        <PageLayout currentStep={4}>
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
                        text={`${storyData.characterName || 'Your'}'s story is ready 🎉`}
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
                    <p className={styles.hint}>
                        Download the video to your device and share it with
                        anyone
                    </p>
                    <Button
                        label="Download"
                        variant="outlined"
                        icon={<Download size={16} />}
                        loading={downloading}
                        disabled={downloading}
                        onClick={handleDownload}
                    />
                    <Button
                        label="Create new video"
                        variant="primary"
                        onClick={() => setShowNewVideoConfirm(true)}
                    />
                </>
            )}

            {showNewVideoConfirm && (
                <ConfirmModal
                    title="Create a new video?"
                    confirmLabel="Yes, start over"
                    cancelLabel="Stay here"
                    onConfirm={() => {
                        resetStory()
                        router.push('/upload')
                    }}
                    onCancel={() => setShowNewVideoConfirm(false)}
                >
                    <p>
                        Your generated video will remain available in History on
                        this device until you clear your browser storage.
                    </p>
                    <p>We recommend downloading it before leaving.</p>
                </ConfirmModal>
            )}
        </PageLayout>
    )
}
