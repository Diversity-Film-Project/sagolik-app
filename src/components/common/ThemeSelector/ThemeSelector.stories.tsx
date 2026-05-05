import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeSelector } from './ThemeSelector'
import '@/app/globals.css'
import { StoryProvider } from '@/context/StoryContext'

const meta: Meta<typeof ThemeSelector> = {
    title: 'components/ThemeSelector',
    component: ThemeSelector,
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

type Story = StoryObj<typeof ThemeSelector>

export const Default: Story = {
    args: {
        variant: 'default',
    },
}
