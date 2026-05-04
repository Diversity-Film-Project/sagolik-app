import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,

    args: {
        value: '',
        placeholder: 'Placeholder',
        onChange: () => {},
    },
}
// comment //

export default meta

type Story = StoryObj<typeof Input>

export const Primary: Story = {
    args: {
        value: '',
        placeholder: 'Character name',
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
