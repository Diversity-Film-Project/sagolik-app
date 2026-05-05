import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion } from './Accordion'

const meta: Meta<typeof Accordion> = {
    title: 'UI/Accordion',
    component: Accordion,
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
    args: {
        title: 'Why do we need a photo?',
        content: (
            <p>
                We use the photo to create a personalized story where your child
                is the hero. The photo helps us generate images that closely
                resemble your child, making the story more engaging and special.
            </p>
        ),
    },
}

export const WithList: Story = {
    args: {
        title: 'AI-Powered',
        content: (
            <>
                <p>This app uses AI to create your story experience:</p>
                <ul style={{ paddingLeft: '16px', marginTop: '8px' }}>
                    <li>
                        <strong>Google Gemini</strong> — generates the story
                        script
                    </li>
                    <li>
                        <strong>Kling 3.0 Pro</strong> — generates the video
                    </li>
                </ul>
            </>
        ),
    },
}
