'use client'
// Step 3 — Script Preview
import { useState, useEffect, useRef } from 'react'
import { PageLayout } from '@/components/layout/PageLayout/PageLayout'
import { Button } from '@/components/ui/Button/Button'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import { useRouter } from 'next/navigation'
import { useStory } from '@/context/StoryContext'
import { generatePrompt } from '@/services/lib/generatePrompt'
import { Textarea } from '@/components/ui/Textarea/Textarea'
import { RefreshCw, Pencil, Check } from 'lucide-react'
import confetti from 'canvas-confetti'
import { VIDEO_CONSTRAINTS } from '@/lib/videoConstraints'
import styles from './page.module.css'

// Max characters for the user-visible script (styleNote + VIDEO_CONSTRAINTS take the remaining ~900 chars up to Kling's 2500 limit)
const MAX_SCRIPT_LENGTH = 1600

function buildParamsKey(data: {
    characterName: string
    storyTheme: string
    sidekick: string
    videoStyle: string
    themeDescription: string
}) {
    return `${data.characterName}|${data.storyTheme}|${data.sidekick}|${data.videoStyle}|${data.themeDescription}`
}

export default function ScriptPage() {
    const router = useRouter()
    const { storyData, updateStoryData } = useStory()
    const [isLoading, setIsLoading] = useState(!storyData.finalPrompt)
    const [isEditing, setIsEditing] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const hasFetched = useRef(false)

    const scriptLength = storyData.finalPrompt.length
    const isOverLimit = scriptLength > MAX_SCRIPT_LENGTH

    const runGenerate = () => {
        setIsLoading(true)
        setIsEditing(false)
        setError(null)
        generatePrompt(
            storyData.characterName,
            storyData.storyTheme,
            storyData.sidekick,
            storyData.videoStyle,
            storyData.themeDescription,
        )
            .then((result) => {
                updateStoryData({
                    generatedPrompt: result,
                    finalPrompt: result,
                    promptParamsKey: buildParamsKey(storyData),
                })
                setIsLoading(false)
                confetti({
                    particleCount: 80,
                    spread: 60,
                    origin: { y: 0.3 },
                    colors: ['#FF6B00', '#FF8C42', '#FFB347', '#FFD700'],
                })
                // eslint-disable-next-line no-console
                console.log(
                    '=== FULL PROMPT FOR KLING AI ===\n' +
                        result +
                        VIDEO_CONSTRAINTS,
                )
            })
            .catch((err: Error) => {
                setIsLoading(false)
                setError(err.message)
            })
    }

    useEffect(() => {
        if (hasFetched.current) return
        hasFetched.current = true

        if (!storyData.photo || !storyData.characterName) {
            router.push('/upload')
            return
        }

        if (storyData.finalPrompt) return

        generatePrompt(
            storyData.characterName,
            storyData.storyTheme,
            storyData.sidekick,
            storyData.videoStyle,
            storyData.themeDescription,
        )
            .then((result) => {
                updateStoryData({
                    generatedPrompt: result,
                    finalPrompt: result,
                    promptParamsKey: buildParamsKey(storyData),
                })
                setIsLoading(false)
                confetti({
                    particleCount: 80,
                    spread: 60,
                    origin: { y: 0.3 },
                    colors: ['#FF6B00', '#FF8C42', '#FFB347', '#FFD700'],
                })
                // eslint-disable-next-line no-console
                console.log(
                    '=== FULL PROMPT FOR KLING AI ===\n' +
                        result +
                        VIDEO_CONSTRAINTS,
                )
            })
            .catch((err: Error) => {
                setIsLoading(false)
                setError(err.message)
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const pageTitle = isLoading
        ? 'Creating your story...'
        : error
          ? 'Could not generate story'
          : 'Your scenario is ready!'

    const description = isLoading
        ? 'Gemini is working hard to create a magical story for you'
        : error
          ? 'Please try regenerating the story. If the problem persists, it may be due to high demand on the AI service — please try again later.'
          : 'Feel free to edit the scenario before moving on to video generation'

    return (
        <PageLayout currentStep={3} href="/script">
            <div className={styles.margin}>
                <PageTitle
                    text={pageTitle}
                    description={description}
                    animated={isLoading}
                />
                {isLoading ? (
                    <div className={styles.skeleton}>
                        <p className={styles.skeletonText}>
                            Gemini is creating your story right now...
                        </p>
                        <div className={styles.skeletonLine} />
                        <div className={styles.skeletonLine} />
                        <div
                            className={`${styles.skeletonLine} ${styles.skeletonLineShort}`}
                        />
                    </div>
                ) : error ? (
                    <div className={styles.errorBlock}>
                        <p className={styles.errorMessage}>{error}</p>
                        <p className={styles.errorHint}>
                            AI service is temporarily busy. Please try again in
                            a moment.
                        </p>
                        <button
                            className={styles.retryButton}
                            onClick={runGenerate}
                            title="Try again"
                        >
                            <RefreshCw size={25} />
                        </button>
                    </div>
                ) : isEditing ? (
                    <Textarea
                        value={storyData.finalPrompt}
                        onChange={(e) =>
                            updateStoryData({ finalPrompt: e.target.value })
                        }
                    />
                ) : (
                    <div className={styles.markdownView}>
                        {storyData.finalPrompt}
                    </div>
                )}
                {!isLoading && !error && storyData.finalPrompt && (
                    <p
                        className={`${styles.charCount} ${isOverLimit ? styles.charCountOver : ''}`}
                    >
                        {scriptLength} / {MAX_SCRIPT_LENGTH} characters
                        {isOverLimit && ' — too long, please edit'}
                    </p>
                )}
                <div className={styles.editButtonWrapper}>
                    <Button
                        variant="regenerate"
                        onClick={runGenerate}
                        label="Regenerate"
                        icon={<RefreshCw size={16} />}
                    />
                    {isEditing ? (
                        <Button
                            variant="save"
                            onClick={() => setIsEditing(false)}
                            label="Save"
                            icon={<Check size={16} />}
                        />
                    ) : (
                        <Button
                            variant="outlined"
                            onClick={() => setIsEditing(true)}
                            label="Edit"
                            icon={<Pencil size={16} />}
                        />
                    )}
                </div>

                <div className={styles.buttonWrapper}>
                    {/* continue temporary hardcoded */}
                    <Button
                        label="Continue"
                        onClick={() => router.push('/result')}
                    />

                    <Button
                        label="Back"
                        variant="secondary"
                        onClick={() => router.push('/preferences')}
                    />
                </div>
            </div>
        </PageLayout>
    )
}
