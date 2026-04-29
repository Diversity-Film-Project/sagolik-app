'use client'
// Step 3 — Script Preview
import { useState } from 'react'
import { PageLayout } from '@/components/layout/PageLayout/PageLayout'
import { Button } from '@/components/ui/Button/Button'
import styles from './page.module.css'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
// import {generatePrompt} from '@/services/lib/generatePrompt'
// call this function on "Regenerate" (script page)

// todo : change this text area to component with appropriate styles

export default function ScriptPage() {
    const [prompt, setPrompt] = useState('')

    return (
        <PageLayout currentStep={3} href="/script">
            <PageTitle
                text="Your script is ready"
                description="Here's a preview of the story"
            />
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
            />
            <div className={styles.button_group}>
                <Button
                    variant="outlined"
                    onClick={() => alert('API call to generate prompt')}
                    label="Regenerate"
                ></Button>
                <Button
                    variant="outlined"
                    onClick={() => alert('API call to generate prompt')}
                    label="Edit"
                ></Button>
            </div>
        </PageLayout>
    )
}
