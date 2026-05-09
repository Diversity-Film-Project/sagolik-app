import type { Meta, StoryObj } from '@storybook/react-vite'
import { StyleCard } from './StyleCard'

const meta: Meta<typeof StyleCard> = {
    title: 'components/StyleCard',
    component: StyleCard,
    tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof StyleCard>

export const Animated: Story = {
    args: {
        label: 'animated',
    },
}

export const Realistic: Story = {
    args: {
        label: 'realistic',
    },
}
