//Step 1 — Upload Photo
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout/PageLayout'
import { UploadPhotoCard } from '@/components/common/UploadPhotoCard/UploadPhotoCard'
import { Button } from '@/components/ui/Button/Button'
import { useStory } from '@/context/StoryContext'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import { Accordion } from '@/components/ui/Accordion/Accordion'

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
            <PageTitle
                text="Add your child's photo"
                description="We'll place them as the hero of the story"
            />
            <UploadPhotoCard />

            <Button label="Continue" onClick={handleContinue} />
            {error && <p className="error">{error}</p>}

            <Accordion
                title="Why do we need a photo?"
                content={
                    <p>
                        We use the photo to create a personalized story where
                        your child is the hero. The photo helps us generate
                        images that closely resemble your child, making the
                        story more engaging and special for them.
                    </p>
                }
            />
        </PageLayout>
    )
}
