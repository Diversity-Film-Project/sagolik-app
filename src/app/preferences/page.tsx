'use client'

// Step 2 — Pick Preferences
import { PageLayout } from '@/components/layout/PageLayout/PageLayout'
import { ThemeSelector } from '@/components/common/ThemeSelector/ThemeSelector'
// import {generatePrompt} from '@/services/lib/generatePrompt'
// call this function on "Generate Prompt" (preferences page)
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import { Button } from '@/components/ui/Button/Button'
import { usePreferences } from './hooks/usePreferences'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function PreferencesPage() {
    const { name, theme } = usePreferences()
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleContinue = () => {
        if (!name) {
            setError('Please enter a name to continue')
            return
        }
        if (!theme) {
            setError('Please select a theme to continue')
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
            <ThemeSelector />
            <Button label="Continue" onClick={handleContinue} />
            <Button
                label="Back"
                variant="secondary"
                onClick={() => {
                    window.history.back()
                }}
            />
            {error && <p className="error">{error}</p>}
        </PageLayout>
    )
}
