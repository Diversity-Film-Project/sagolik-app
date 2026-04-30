import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconCard } from './IconCard'
import '@/app/globals.css'
import { Star } from 'lucide-react'
import { StoryProvider } from '@/context/StoryContext'

const meta: Meta<typeof IconCard> = {
    title: 'components/IconCard',
    component: IconCard,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <StoryProvider>
                <Story />
            </StoryProvider>
        ),
    ],
}
export default meta

type Story = StoryObj<typeof IconCard>

export const Default: Story = {
    args: {
        icon: <Star />,
        label: 'Any Theme',
    },
}

export const Selected: Story = {
    args: {
        icon: <Star />,
        label: 'Any Theme',
    },
}
