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
                    Built by a Hyper Island Frontend Team for{' '}
                    <strong>Diversity Film AB</strong>.
                </p>
                <div className={styles.teamList}>
                    <a
                        href="https://www.linkedin.com/in/anna-baidikova/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.teamLink} ${styles.c1}`}
                    >
                        Anna Baidikova
                    </a>

                    <a
                        href="https://www.linkedin.com/in/julia-bohlin-5aaa94212/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.teamLink} ${styles.c2}`}
                    >
                        Julia Bohlin
                    </a>
                    <a
                        href="https://www.linkedin.com/in/simman-o-b5250524a/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.teamLink} ${styles.c3}`}
                    >
                        Simman Omar
                    </a>
                    <a
                        href="https://www.linkedin.com/in/ghazal-ajdar-55695a2a4/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.teamLink} ${styles.c4}`}
                    >
                        Ghazal Ajdar
                    </a>
                    <a
                        href="mailto:roujeh.aljunidi@hyperisland.se"
                        className={`${styles.teamLink} ${styles.c5}`}
                    >
                        Roujeh Aljunidi
                    </a>
                </div>
            </>
        ),
    },
    {
        title: 'AI-Powered',
        content: (
            <>
                <p>This app uses AI to generate personalised story videos:</p>
                <ul className={styles.list}>
                    <li>
                        <strong>
                            <a
                                href="https://ai.google.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                            >
                                Google Gemini
                            </a>
                        </strong>{' '}
                        — writes the story script
                    </li>
                    <li>
                        <strong>
                            <a
                                href="https://fal.ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                            >
                                Kling 3.0 Pro via fal.ai
                            </a>
                        </strong>{' '}
                        — generates the video from your photo
                    </li>
                </ul>
                <p>
                    Use of this app is subject to the terms and policies of the
                    respective AI providers. As a demo product, legal terms are
                    subject to review and may be updated before public release.
                </p>
            </>
        ),
    },
    {
        title: 'Your Privacy',
        content: (
            <>
                <p>
                    This app is a proxy between you and third-party AI services.
                    We do not operate any servers or databases.
                </p>
                <ul className={styles.list}>
                    <li>
                        Your photo and story are sent to AI providers for
                        processing — we do not store them ourselves
                    </li>
                    <li>
                        Your video history is stored only in your browser&apos;s
                        local storage — it stays on this device and is not
                        accessible to us or anyone else
                    </li>
                    <li>
                        History is not synced across devices — it exists only on
                        the device where it was created
                    </li>
                    <li>
                        Clearing your browser data will permanently delete your
                        history — save videos to your device to keep them
                    </li>
                </ul>
            </>
        ),
    },
    {
        title: 'Demo Version',
        content: (
            <>
                <p>
                    This is a demo version of the product, built for
                    presentation purposes. Each video generation has a real
                    cost, so the number of requests is currently limited due to
                    project funding.
                </p>
                <p>
                    Results may not always be perfect — AI video generation is
                    still evolving and outputs can vary. Thank you for your
                    understanding.
                </p>
            </>
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
                    <span className={styles.headerTitle}>App Info</span>
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
