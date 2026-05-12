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
import styles from './page.module.css'

export default function UploadPhotoPage() {
    const { storyData } = useStory()
    const router = useRouter()
    const [attempted, setAttempted] = useState(false)
    const error =
        attempted && !storyData.photo ? 'Please upload a photo to continue' : ''

    const handleContinue = () => {
        if (!storyData.photo) {
            setAttempted(true)
            return
        }
        router.push('/preferences')
    }

    return (
        <PageLayout currentStep={1} href="/upload">
            <div className={styles.margin}>
                <PageTitle
                    text="Add your child's photo"
                    description="We'll place them as the hero of the story"
                />
                <UploadPhotoCard />
                <InfoCard
                    title="Best results"
                    description="Facing the camera, good lighting. A portrait or headshot works best."
                />

                <div className={styles.buttonWrapper}>
                    <Button label="Continue" onClick={handleContinue} />
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
        </PageLayout>
    )
}
