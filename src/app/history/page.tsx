'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStory } from '@/context/StoryContext'
import styles from './page.module.css'

// todo - redisign this page

type HistoryEntry = {
    id: string
    videoUrl: string
    characterName: string
    storyTheme: string
    finalPrompt: string
    createdAt: string
}

export default function HistoryPage() {
    const router = useRouter()
    const { resetStory } = useStory()
    const [entries, setEntries] = useState<HistoryEntry[]>([])

    useEffect(() => {
        const load = async () => {
            await Promise.resolve()
            try {
                const stored = localStorage.getItem('sagolik_history')
                if (stored) setEntries(JSON.parse(stored))
            } catch {
                /* ignore */
            }
        }
        load()
    }, [])

    const handleNewVideo = () => {
        resetStory()
        router.push('/upload')
    }

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <span className={styles.logo}>Tales</span>
                <button className={styles.newButton} onClick={handleNewVideo}>
                    + New video
                </button>
            </header>

            <main className={styles.content}>
                <h1 className={styles.title}>History</h1>

                {/* todo - replace div with proper component */}
                <div className={styles.disclaimer}>
                    <strong>Demo version.</strong> Your history is stored only
                    on this device. Clearing browser storage or opening the app
                    on another device will erase it. We recommend saving videos
                    to your phone library.
                </div>

                {entries.length === 0 ? (
                    <p className={styles.empty}>No videos generated yet.</p>
                ) : (
                    <ul className={styles.list}>
                        {entries.map((entry) => (
                            <li key={entry.id} className={styles.card}>
                                <div className={styles.cardMeta}>
                                    <span className={styles.cardName}>
                                        {entry.characterName ||
                                            'Unnamed character'}
                                    </span>
                                    <span className={styles.cardDate}>
                                        {new Date(
                                            entry.createdAt,
                                        ).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>
                                {entry.storyTheme && (
                                    <p className={styles.cardTheme}>
                                        {entry.storyTheme}
                                    </p>
                                )}
                                <video
                                    src={entry.videoUrl}
                                    controls
                                    className={styles.video}
                                />
                                {entry.finalPrompt && (
                                    <details className={styles.promptDetails}>
                                        <summary
                                            className={styles.promptSummary}
                                        >
                                            Story script
                                        </summary>
                                        <p className={styles.promptText}>
                                            {entry.finalPrompt}
                                        </p>
                                    </details>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    )
}
