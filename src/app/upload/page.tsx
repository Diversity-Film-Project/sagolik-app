//Step 1 — Upload Photo
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout/PageLayout'
import { UploadPhotoCard } from '@/components/common/UploadPhotoCard/UploadPhotoCard'
import { InfoCard } from '@/components/common/InfoCard/InfoCard'
import { Button } from '@/components/ui/Button/Button'
import { useStory } from '@/context/StoryContext'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import { useLanguage } from '@/context/LanguageContext'
import styles from './page.module.css'

export default function UploadPhotoPage() {
    const { storyData } = useStory()
    const { t } = useLanguage()
    const router = useRouter()
    const [attempted, setAttempted] = useState(false)
    const error = attempted && !storyData.photo ? t('upload.error') : ''

    const handleContinue = () => {
        if (!storyData.photo) {
            setAttempted(true)
            return
        }
        router.push('/preferences')
    }

    return (
        <PageLayout currentStep={1}>
            <div className={styles.margin}>
                <PageTitle
                    text={t('upload.title')}
                    description={t('upload.description')}
                />
                <UploadPhotoCard />
                <InfoCard
                    title={t('upload.infoTitle')}
                    description={t('upload.infoDescription')}
                />

                <div className={styles.buttonWrapper}>
                    <Button
                        label={t('common.continue')}
                        onClick={handleContinue}
                    />
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
        </PageLayout>
    )
}
