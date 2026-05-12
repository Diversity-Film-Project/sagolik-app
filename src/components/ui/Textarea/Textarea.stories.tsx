import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
    title: 'Components/Textarea',
    component: Textarea,
    args: {
        value: '',
        onChange: () => {},
        placeholder: 'Type something...',
    },
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {}

export const WithValue: Story = {
    args: {
        value: 'Once upon a time in a land far away...',
    },
}

export const ReadOnly: Story = {
    args: {
        value: 'This content cannot be edited.',
        readOnly: true,
    },
}

export const Disabled: Story = {
    args: {
        placeholder: 'Not available right now',
        disabled: true,
    },
}
