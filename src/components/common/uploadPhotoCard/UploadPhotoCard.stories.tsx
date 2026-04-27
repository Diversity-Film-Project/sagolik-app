import type { Meta, StoryObj } from '@storybook/react-vite'
import { UploadPhotoCard } from './UploadPhotoCard'
import '@/app/globals.css'

const meta: Meta<typeof UploadPhotoCard> = {
    title: 'components/UploadPhotoCard',
    component: UploadPhotoCard,
    tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof UploadPhotoCard>

export const Default: Story = {
    args: {
        label: 'pick your image',
        variant: 'default',
    },
}

export const Loading: Story = {
    args: {
        label: 'loading text',
        variant: 'loading',
    },
}

export const Selected: Story = {
    args: {
        label: 'selected text',
        variant: 'selected',
    },
}
