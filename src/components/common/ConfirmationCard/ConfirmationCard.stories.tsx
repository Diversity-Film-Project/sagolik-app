import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConfirmationCard } from './ConfirmationCard'
import '@/app/globals.css'

const meta: Meta<typeof ConfirmationCard> = {
    title: 'components/ConfirmationCard',
    component: ConfirmationCard,
    tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ConfirmationCard>

export const Default: Story = {
    args: {
        variant: 'default',
    },
}
