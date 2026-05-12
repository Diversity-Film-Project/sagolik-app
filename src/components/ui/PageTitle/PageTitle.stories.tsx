import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageTitle } from './PageTitle'

const meta: Meta<typeof PageTitle> = {
    title: 'components/PageTitle',
    component: PageTitle,
}

export default meta
type Story = StoryObj<typeof PageTitle>

export const Default: Story = {
    args: {
        text: "Add your child\'s photo",
        description: "We\'ll place them as the hero of the story",
    },
}

export const Loading: Story = {
    args: {
        text: 'Creating your story...',
        description: 'Gemini is working hard to create a magical story for you',
        animated: true,
    },
}

export const Error: Story = {
    args: {
        text: 'Could not generate story',
        description:
            'AI service is temporarily busy. Please try again in a moment.',
    },
}

export const Ready: Story = {
    args: {
        text: 'Your scenario is ready!',
        description:
            'Feel free to edit the scenario before moving on to video generation',
    },
}
