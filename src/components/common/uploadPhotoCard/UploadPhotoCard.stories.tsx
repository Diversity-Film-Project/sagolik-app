import type { Meta, StoryObj } from '@storybook/react-vite'
import { UploadPhotoCard } from './UploadPhotoCard'
import '@/app/globals.css'
import { StoryProvider } from '@/context/StoryContext'

const meta: Meta<typeof UploadPhotoCard> = {
    title: 'components/UploadPhotoCard',
    component: UploadPhotoCard,
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

type Story = StoryObj<typeof UploadPhotoCard>

export const Default: Story = {
    args: {
        initialState: 'default',
    },
}

export const Loading: Story = {
    args: {
        initialState: 'loading',
    },
}

export const Selected: Story = {
    args: {
        initialState: 'selected',
    },
}
