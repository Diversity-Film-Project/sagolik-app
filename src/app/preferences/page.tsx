'use client'

// Step 2 — Pick Preferences
import { PageLayout } from '@/components/layout/PageLayout/PageLayout'
import { ThemeSelector } from '@/components/common/ThemeSelector/ThemeSelector'
// import {generatePrompt} from '@/services/lib/generatePrompt'
// call this function on "Generate Prompt" (preferences page)
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { useStory } from '@/context/StoryContext'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function PreferencesPage() {
    const { storyData, updateStoryData } = useStory()
    const router = useRouter()

    return (
        <PageLayout currentStep={2} href="/preferences">
            <PageTitle
                text="Personalise the story"
                description="We'll use these to create a personalized story"
            />
            <Input
                placeholder="Your Name"
                value={storyData.characterName}
                onChange={(e) =>
                    updateStoryData({ characterName: e.target.value })
                }
            />
            <ThemeSelector />

            {/* Place for sidekick */}

            <div className={styles.buttonWrapper}>
                <Button label="Continue" />
                {/* todo : add inclick actions/ inesert Ghazal's code */}
                <Button
                    label="Back"
                    variant="secondary"
                    onClick={() => router.back()}
                />
            </div>
        </PageLayout>
    )
}
