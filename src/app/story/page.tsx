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
import ReactMarkdown from 'react-markdown'
import { VIDEO_CONSTRAINTS } from '@/lib/videoConstraints'
import styles from './page.module.css'

export default function ScriptPage() {
    const router = useRouter()
    const { storyData, updateStoryData } = useStory()
    const [isLoading, setIsLoading] = useState(!storyData.finalPrompt)
    const [isEditing, setIsEditing] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const hasFetched = useRef(false)

    const runGenerate = () => {
        setIsLoading(true)
        setIsEditing(false)
        setError(null)
        generatePrompt(
            storyData.characterName,
            storyData.storyTheme,
            storyData.sidekick,
            storyData.videoStyle,
        )
            .then((result) => {
                updateStoryData({
                    generatedPrompt: result,
                    finalPrompt: result,
                })
                setIsLoading(false)
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
        )
            .then((result) => {
                updateStoryData({
                    generatedPrompt: result,
                    finalPrompt: result,
                })
                setIsLoading(false)
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

    return (
        <PageLayout currentStep={3} href="/script">
            <PageTitle
                text="Your scenario is ready"
                description="Here's a preview of the story"
            />
            {error && <p className="error">{error}</p>}
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
            ) : isEditing ? (
                <Textarea
                    value={storyData.finalPrompt}
                    onChange={(e) =>
                        updateStoryData({ finalPrompt: e.target.value })
                    }
                />
            ) : (
                <div className={styles.markdownView}>
                    <ReactMarkdown>{storyData.finalPrompt}</ReactMarkdown>
                </div>
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
        </PageLayout>
    )
}
