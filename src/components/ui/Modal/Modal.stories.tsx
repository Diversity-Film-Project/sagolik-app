import type { Meta, StoryObj } from '@storybook/react-vite'
import { Modal } from './Modal'
import '@/app/globals.css'

const meta: Meta<typeof Modal> = {
    title: 'components/Modal',
    component: Modal,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        onClose: () => {},
    },
}
export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
    render: (args) => (
        <Modal {...args}>
            <p
                style={{
                    fontFamily: 'var(--font-primary)',
                    margin: 0,
                    color: 'var(--color-text-body)',
                }}
            >
                This is a modal window. Click outside to close.
            </p>
        </Modal>
    ),
}

export const WithTitle: Story = {
    render: (args) => (
        <Modal {...args}>
            <h2
                style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: 18,
                    fontWeight: 600,
                    margin: '0 0 12px',
                    color: 'var(--color-text-primary)',
                }}
            >
                Modal title
            </h2>
            <p
                style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: 14,
                    margin: 0,
                    color: 'var(--color-text-body)',
                    lineHeight: 1.6,
                }}
            >
                Any content can go here — text, forms, lists, images. The Modal
                component only handles the overlay and the card container.
            </p>
        </Modal>
    ),
}

export const WithActions: Story = {
    render: (args) => (
        <Modal {...args}>
            <h2
                style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: 18,
                    fontWeight: 600,
                    margin: '0 0 12px',
                    color: 'var(--color-text-primary)',
                }}
            >
                Ready to generate your video?
            </h2>
            <p
                style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: 14,
                    margin: '0 0 8px',
                    color: 'var(--color-text-body)',
                    lineHeight: 1.6,
                }}
            >
                Video generation takes around <strong>5 minutes</strong> and
                uses API credits.
            </p>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    marginTop: 16,
                }}
            >
                <button
                    style={{
                        padding: '14px',
                        borderRadius: 10,
                        border: 'none',
                        background: 'linear-gradient(92deg, #ff6700, #ff300b)',
                        color: '#fff',
                        fontWeight: 500,
                        cursor: 'pointer',
                    }}
                >
                    Generate video
                </button>
                <button
                    style={{
                        padding: '14px',
                        borderRadius: 10,
                        border: 'none',
                        background: 'none',
                        color: 'var(--color-text-secondary)',
                        cursor: 'pointer',
                    }}
                >
                    Back to edit
                </button>
            </div>
        </Modal>
    ),
}
