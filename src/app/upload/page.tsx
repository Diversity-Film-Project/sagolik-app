//Step 1 — Upload Photo
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import { PageLayout } from '@/components/layout/PageLayout/PageLayout'
import { UploadPhotoCard } from '@/components/common/uploadPhotoCard/UploadPhotoCard'
import { Button } from '@/components/ui/Button/Button'
import { useStory } from '@/context/StoryContext'

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
            <h1 className={styles.pageTitle}>Add your child&apos;s photo</h1>
            <p className={styles.pageDescription}>
                We&apos;ll place them as the hero of the story
            </p>
            <UploadPhotoCard />
            <p style={{ margin: '30px', fontSize: '14px', color: '#666' }}>
                space for infoCard Component - Roujeh&apos; ticket
            </p>

            <Button label="Continue" onClick={handleContinue} />
            {error && <p className="error">{error}</p>}
        </PageLayout>
    )
}
