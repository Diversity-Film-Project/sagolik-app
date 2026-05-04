'use client'

import { useRef } from 'react'
import { X } from 'lucide-react'
import styles from './TopSheet.module.css'
import { Accordion } from '@/components/ui/Accordion/Accordion'

interface TopSheetProps {
    isOpen: boolean
    onClose: () => void
}

const infoContent = [
    {
        title: 'About this app',
        content: (
            <>
                <p>
                    Built by a Hyper Island Frontend Team for Diversity Film AB.
                </p>
                <p>TODO: add team member links</p>
            </>
        ),
    },
    {
        title: 'AI-Powered',
        content: (
            <>
                <p>
                    This app uses artificial intelligence to create your story
                    experience:
                </p>
                <ul className={styles.list}>
                    <li>
                        <strong>Google Gemini</strong> — generates the story
                        script based on your preferences
                    </li>
                    <li>
                        <strong>Kling 3.0 Pro via fal.ai</strong> — generates a
                        15-second video based on your photo and story prompt
                    </li>
                </ul>
                <p>
                    By using this app, you acknowledge and accept the terms and
                    policies of{' '}
                    <a
                        href="https://ai.google.dev/gemini-api/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        Google Gemini
                    </a>{' '}
                    and{' '}
                    <a
                        href="https://fal.ai/policies/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        fal.ai
                    </a>
                    .
                </p>
            </>
        ),
    },
    {
        title: 'Your Privacy',
        content: (
            <>
                <p>
                    This app acts as a proxy between you and the AI services
                    above. We do not store any of your data:
                </p>
                <ul className={styles.list}>
                    <li>
                        Your photo is sent directly to the AI for video
                        generation and is deleted when your session ends
                    </li>
                    <li>
                        No personal data, photos, or videos are stored on our
                        servers
                    </li>
                    <li>
                        Generated videos are available for you to download or
                        share — after that, they are gone
                    </li>
                </ul>
            </>
        ),
    },
    {
        title: 'Demo Version',
        content: (
            <p>
                This is a demo version of the product, built for presentation
                purposes. Each video generation has a real cost, so the number
                of requests is currently limited due to project funding. Thank
                you for your understanding.
            </p>
        ),
    },
]

export function TopSheet({ isOpen, onClose }: TopSheetProps) {
    const touchStartY = useRef<number>(0)

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        const delta = touchStartY.current - e.changedTouches[0].clientY
        if (delta > 80) onClose()
    }

    return (
        <>
            {isOpen && <div className={styles.backdrop} onClick={onClose} />}
            <div
                className={`${styles.sheet} ${isOpen ? styles.open : ''}`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div className={styles.header}>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <div className={styles.content}>
                    {infoContent.map((item, index) => (
                        <Accordion
                            key={index}
                            title={item.title}
                            content={item.content}
                        />
                    ))}
                </div>
                <div className={styles.dragHandle} />
            </div>
        </>
    )
}
