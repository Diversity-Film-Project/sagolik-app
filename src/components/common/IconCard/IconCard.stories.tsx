import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconCard } from './IconCard'
import '@/app/globals.css'
import React from 'react'
import { Star } from 'lucide-react'

const meta: Meta<typeof IconCard> = {
    title: 'components/IconCard',
    component: IconCard,
    tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof IconCard>

export const Default: Story = {
    args: {
        variant: 'default',
        icon: <Star />,
        label: 'Favorites',
    },
}

export const Selected: Story = {
    args: {
        variant: 'selected',
        icon: <Star />,
        label: 'Favorites',
    },
}
