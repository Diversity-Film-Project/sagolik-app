import type { Meta, StoryObj } from '@storybook/react-vite'
import { LoadingCard } from './LoadingCard'
import '@/app/globals.css'

const meta: Meta<typeof LoadingCard> = {
    title: 'components/LoadingCard',
    component: LoadingCard,
    tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof LoadingCard>

export const Default: Story = {
    args: {
        duration: 2,
    },
}
