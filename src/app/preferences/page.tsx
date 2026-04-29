// Step 2 — Pick Preferences
import { PageLayout } from '@/components/layout/PageLayout/PageLayout'
// import {generatePrompt} from '@/services/lib/generatePrompt'
// call this function on "Generate Prompt" (preferences page)

export default function PreferencesPage() {
    return (
        <PageLayout currentStep={2} href="/preferences">
            <h1>Preferences content</h1>
        </PageLayout>
    )
}
