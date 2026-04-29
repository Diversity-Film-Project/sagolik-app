import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageTitle } from './PageTitle'

const meta: Meta<typeof PageTitle> = {
    title: 'UI/PageTitle',
    component: PageTitle,
}

export default meta
type Story = StoryObj<typeof PageTitle>

export const Default: Story = {
    args: {
        text: "Add your child\'s photo",
        description: "We\'ll place them as the hero of the story",
    },
}
