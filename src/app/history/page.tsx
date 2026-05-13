'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStory } from '@/context/StoryContext'
import { downloadVideo } from '@/lib/downloadVideo'
import { Button } from '@/components/ui/Button/Button'
import { ArrowLeft, Download } from 'lucide-react'
import styles from './page.module.css'

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
    const [downloadingId, setDownloadingId] = useState<string | null>(null)

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

    const handleDownload = (entry: HistoryEntry) => {
        if (downloadingId) return
        setDownloadingId(entry.id)
        downloadVideo(entry.videoUrl, `${entry.characterName || 'tales'}-story`)
        setTimeout(() => setDownloadingId(null), 1500)
    }

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.logoContainer}>
                    <span className={styles.logo}>Tales</span>
                    <span className={styles.dot}></span>
                </div>
                <Button
                    label="+ New video"
                    variant="outlined"
                    onClick={handleNewVideo}
                ></Button>
            </header>

            <main className={styles.content}>
                <Button
                    label="Back"
                    variant="outlined"
                    onClick={() => router.back()}
                    icon={<ArrowLeft size={20} />}
                    iconPosition="left"
                ></Button>
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
                                        {entry.characterName || 'Unnamed'}
                                        <span className={styles.cardSeparator}>
                                            {' '}
                                            |{' '}
                                        </span>
                                        {entry.storyTheme || 'Custom story'}
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
                                <video
                                    src={entry.videoUrl}
                                    controls
                                    playsInline
                                    className={styles.video}
                                />
                                <p className={styles.hint}>
                                    Download the video to your device and share
                                    it with anyone.
                                </p>
                                <div className={styles.cardActions}>
                                    <Button
                                        label="Download"
                                        variant="outlined"
                                        icon={<Download size={16} />}
                                        loading={downloadingId === entry.id}
                                        disabled={!!downloadingId}
                                        onClick={() => handleDownload(entry)}
                                    />
                                </div>
                                {entry.finalPrompt && (
                                    <details className={styles.promptDetails}>
                                        <summary
                                            className={styles.promptSummary}
                                        >
                                            Scenario
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
