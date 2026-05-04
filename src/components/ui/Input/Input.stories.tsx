import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,

    args: {
        label: 'CHARACTER NAME',
        value: '',
        placeholder: 'Placeholder',
        onChange: () => {},
    },
}

export default meta

type Story = StoryObj<typeof Input>

export const Primary: Story = {
    args: {
        value: '',
        placeholder: 'Placeholder',
        variant: 'primary',
    },
}

export const Secondary: Story = {
    args: {
        value: '',
        placeholder: 'Input field',
        variant: 'secondary',
    },
}
