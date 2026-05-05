'use client'
// Step 3 — Script Preview
import { useState, useEffect } from 'react'
import { PageLayout } from '@/components/layout/PageLayout/PageLayout'
import { Button } from '@/components/ui/Button/Button'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import { useRouter } from 'next/navigation'
import { useStory } from '@/context/StoryContext'
import { generatePrompt } from '@/services/lib/generatePrompt'
import { Textarea } from '@/components/ui/Textarea/Textarea'
import { RefreshCw, Pencil } from 'lucide-react'
import styles from './page.module.css'

export default function ScriptPage() {
    const router = useRouter()
    const { storyData, updateStoryData } = useStory()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!storyData.photo || !storyData.characterName) {
            router.push('/upload')
            return
        }
        generatePrompt(
            storyData.characterName,
            storyData.storyTheme,
            storyData.sidekick,
        ).then((result) => {
            updateStoryData({ generatedPrompt: result, finalPrompt: result })
            setIsLoading(false)
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <PageLayout currentStep={3} href="/script">
            <PageTitle
                text="Your script is ready"
                description="Here's a preview of the story"
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
            ) : (
                <Textarea
                    value={storyData.finalPrompt}
                    onChange={(e) =>
                        updateStoryData({ finalPrompt: e.target.value })
                    }
                    rows={6}
                />
            )}
            <div className={styles.editButtonWrapper}>
                <Button
                    variant="outlined"
                    onClick={() => alert('API call to generate prompt')}
                    label="Regenerate"
                    icon={<RefreshCw size={16} />}
                ></Button>
                <Button
                    variant="outlined"
                    onClick={() => alert('API call to generate prompt')}
                    label="Edit"
                    icon={<Pencil size={16} />}
                ></Button>
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
