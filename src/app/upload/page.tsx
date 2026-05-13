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
import { Trash } from 'lucide-react'

export default function UploadPhotoPage() {
    const { storyData, updateStoryData } = useStory()
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

    //delete function
    const handleDeletePhoto = () => {
        updateStoryData({ photo: null })
    }

    return (
        <PageLayout currentStep={1}>
            <div className={styles.margin}>
                <PageTitle
                    text="Add your child's photo"
                    description="We'll place them as the hero of the story"
                />

                <UploadPhotoCard />
                {storyData.photo && (
                    <button
                        onClick={handleDeletePhoto}
                        className={styles.deleteIconButton}
                    >
                        <Trash size={18} />
                    </button>
                )}

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
