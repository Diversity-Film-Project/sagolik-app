import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'
import { RefreshCw, Check } from 'lucide-react'
import '@/app/globals.css'

const meta: Meta<typeof Button> = {
    title: 'components/Button',
    component: Button,
    tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
    args: {
        label: 'Continue',
        variant: 'primary',
    },
}

export const Secondary: Story = {
    args: {
        label: 'Back',
        variant: 'secondary',
    },
}

export const Outlined: Story = {
    args: {
        label: 'Edit',
        variant: 'outlined',
    },
}

export const PrimaryDisabled: Story = {
    args: {
        ...Primary.args,
        disabled: true,
    },
}

export const WithIconRight: Story = {
    args: {
        label: 'Regenerate',
        variant: 'outlined',
        icon: <RefreshCw size={16} />,
        iconPosition: 'right',
    },
}

export const WithIconLeft: Story = {
    args: {
        label: 'Back',
        variant: 'secondary',
        icon: <RefreshCw size={16} />,
        iconPosition: 'left',
    },
}

export const Save: Story = {
    args: {
        label: 'Save',
        variant: 'save',
        icon: <Check size={16} />,
        iconPosition: 'right',
    },
}
