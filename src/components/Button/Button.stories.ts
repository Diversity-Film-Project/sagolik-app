import type {Meta, StoryObj} from '@storybook/react-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
    title: 'components/Button',
    component: Button,
    tags: ["autodocs"]
};
export default meta;

type Story = StoryObj<typeof Button>

export const Primary: Story = {
    args: {
        label: 'Continue',
        variant: 'primary'
    }
}

export const Secondary: Story = {
    args: {
        label: 'Back', 
        variant: 'secondary'
    }
}

export const Outlined: Story = { 
    args: {
        label: 'Outliend Btn Text', 
        variant: 'outlined'
    }
}

export const PrimaryDisabled: Story = { 
    args: {
        ...Primary.args,
        disabled:true
    }
}