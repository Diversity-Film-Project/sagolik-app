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
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/lib/translations'

export default function PreferencesPage() {
    const { storyData, updateStoryData } = useStory()
    const { lang, t } = useLanguage()
    const router = useRouter()
    const [attempted, setAttempted] = useState(false)
    const error =
        attempted && !storyData.characterName
            ? t('preferences.nameError')
            : null

    const sidekickOptions = [...translations[lang].preferences.sidekickOptions]

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
        <PageLayout currentStep={2}>
            <div className={styles.margin}>
                <PageTitle
                    text={t('preferences.title')}
                    description={t('preferences.description')}
                />
                <StyleSelector />
                <Input
                    placeholder={t('preferences.namePlaceholder')}
                    value={storyData.characterName}
                    onChange={(e) =>
                        updateStoryData({ characterName: e.target.value })
                    }
                />

                <Dropdown
                    label={t('preferences.sidekickLabel')}
                    options={sidekickOptions}
                    value={storyData.sidekick}
                    onChange={(value) => updateStoryData({ sidekick: value })}
                    variant="primary"
                />

                <div className={styles.buttonWrapper}>
                    <Button
                        label={t('common.continue')}
                        onClick={handleContinue}
                    />
                    <div className={styles.errorWrapper}>
                        {error && <p className="error">{error}</p>}
                    </div>
                    <Button
                        label={t('common.back')}
                        variant="secondary"
                        onClick={() => router.push('/upload')}
                    />
                </div>
            </div>
        </PageLayout>
    )
}
