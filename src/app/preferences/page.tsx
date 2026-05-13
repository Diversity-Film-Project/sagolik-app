'use client'

// Step 2 — Pick Preferences
import { PageLayout } from '@/components/layout/PageLayout/PageLayout'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { useStory } from '@/context/StoryContext'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import { useState } from 'react'
import { Dropdown } from '@/components/ui/Dropdown/Dropdown'
import { StyleSelector } from '@/components/common/StyleSelector/StyleSelector'
import { buildParamsKey } from '@/lib/buildParamsKey'

const SIDEKICK_OPTIONS = [
    'No sidekick',
    'Person in photo',
    'Dragon',
    'Alien',
    'Robot',
    'Unicorn',
]

export default function PreferencesPage() {
    const { storyData, updateStoryData } = useStory()
    const router = useRouter()
    const [attempted, setAttempted] = useState(false)
    const error =
        attempted && !storyData.characterName
            ? 'Please enter a name to continue.'
            : null

    const handleContinue = () => {
        if (!storyData.characterName) {
            setAttempted(true)
            return
        }

        const currentKey = buildParamsKey(storyData)
        if (storyData.finalPrompt && storyData.promptParamsKey !== currentKey) {
            updateStoryData({
                finalPrompt: '',
                generatedPrompt: '',
                videoUrl: '',
                promptParamsKey: '',
            })
        }

        router.push('/story')
    }

    return (
        <PageLayout currentStep={2} href="/preferences">
            <div className={styles.margin}>
                <PageTitle
                    text="Personalise the story"
                    description="We'll use these to create a personalized story"
                />
                <StyleSelector />

                <div className={styles.inputRow}>
                    <Input
                        placeholder="Character Name"
                        value={storyData.characterName}
                        onChange={(e) =>
                            updateStoryData({ characterName: e.target.value })
                        }
                    />

                    <div className={styles.ageInput}>
                        <Input
                            placeholder="Age"
                            value={storyData.age}
                            onChange={(e) =>
                                updateStoryData({ age: e.target.value })
                            }
                        />
                    </div>
                </div>

                <Dropdown
                    label="SIDEKICK"
                    options={SIDEKICK_OPTIONS}
                    value={storyData.sidekick}
                    onChange={(value) => updateStoryData({ sidekick: value })}
                    variant="primary"
                />

                <div className={styles.buttonWrapper}>
                    <Button label="Continue" onClick={handleContinue} />
                    <div className={styles.errorWrapper}>
                        {error && <p className="error">{error}</p>}
                    </div>
                    <Button
                        label="Back"
                        variant="secondary"
                        onClick={() => router.push('/upload')}
                    />
                </div>
            </div>
        </PageLayout>
    )
}
