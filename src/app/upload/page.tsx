//Step 1 — Upload Photo
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout/PageLayout'
import { UploadPhotoCard } from '@/components/common/UploadPhotoCard/UploadPhotoCard'
import { Button } from '@/components/ui/Button/Button'
import { useStory } from '@/context/StoryContext'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import styles from './page.module.css'

export default function UploadPhotoPage() {
    const { storyData } = useStory()
    const router = useRouter()
    const [error, setError] = useState('')

    const handleContinue = () => {
        if (!storyData.photo) {
            setError('Please upload a photo to continue')
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

                <div className={styles.buttonWrapper}>
                    <Button label="Continue" onClick={handleContinue} />
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
        </PageLayout>
    )
}
