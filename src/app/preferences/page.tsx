'use client'

// Step 2 — Pick Preferences
import { PageLayout } from '@/components/layout/PageLayout/PageLayout'
import { ThemeSelector } from '@/components/common/ThemeSelector/ThemeSelector'
// import {generatePrompt} from '@/services/lib/generatePrompt'
// call this function on "Generate Prompt" (preferences page)
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'

export default function PreferencesPage() {
    return (
        <PageLayout currentStep={2} href="/preferences">
            <PageTitle
                text="Personalise the story"
                description="We'll use these to create a personalized story"
            />
            <ThemeSelector />
        </PageLayout>
    )
}
