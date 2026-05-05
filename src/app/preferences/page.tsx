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
import { useState } from 'react'
import { Dropdown } from '@/components/ui/Dropdown/Dropdown'

export default function PreferencesPage() {
    const { storyData, updateStoryData } = useStory()
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)

    const handleContinue = () => {
        if (!storyData.characterName) {
            setError('Please enter a name to continue.')
            return
        }

        router.push('/story')
    }

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

            <Dropdown
                label="SIDEKICK"
                options={[
                    'No sidekick',
                    'Person in photo',
                    'Dragon',
                    'Alien',
                    'Robot',
                    'Unicorn',
                ]}
                value={storyData.sidekick}
                onChange={(value) => updateStoryData({ sidekick: value })}
                variant="primary"
            />

            <div className={styles.buttonWrapper}>
                <Button label="Continue" onClick={handleContinue} />
                <div className={styles.errorWrapper}>
                    {' '}
                    {error && <p className="error">{error}</p>}
                </div>
                <Button
                    label="Back"
                    variant="secondary"
                    onClick={() => router.push('/upload')}
                />
            </div>
        </PageLayout>
    )
}
