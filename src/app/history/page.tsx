'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStory } from '@/context/StoryContext'
import { downloadVideo } from '@/lib/downloadVideo'
import { Button } from '@/components/ui/Button/Button'
import { ArrowLeft, Download } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
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
    const { lang, setLang, t } = useLanguage()
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

    const handleDownload = async (entry: HistoryEntry) => {
        if (downloadingId) return
        setDownloadingId(entry.id)
        try {
            await downloadVideo(
                entry.videoUrl,
                `${entry.characterName || 'tales'}-story`,
            )
        } finally {
            setDownloadingId(null)
        }
    }

    const dateLocale = lang === 'sv' ? 'sv-SE' : 'en-GB'

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.logoContainer}>
                    <span className={styles.logo}>Tales</span>
                    <span className={styles.dot}></span>
                </div>
                <div className={styles.headerActions}>
                    <button
                        className={styles.langToggle}
                        onClick={() => setLang(lang === 'en' ? 'sv' : 'en')}
                        aria-label="Switch language"
                    >
                        {lang === 'en' ? 'SV' : 'EN'}
                    </button>
                    <Button
                        label={t('history.newVideo')}
                        variant="outlined"
                        onClick={handleNewVideo}
                    />
                </div>
            </header>

            <main className={styles.content}>
                <Button
                    label={t('common.back')}
                    variant="outlined"
                    onClick={() => router.back()}
                    icon={<ArrowLeft size={20} />}
                    iconPosition="left"
                />
                <h1 className={styles.title}>{t('history.title')}</h1>

                {/* todo - replace div with proper component */}
                <div className={styles.disclaimer}>
                    <strong>{t('history.disclaimerBold')}</strong>{' '}
                    {t('history.disclaimer')}
                </div>

                {entries.length === 0 ? (
                    <p className={styles.empty}>{t('history.empty')}</p>
                ) : (
                    <ul className={styles.list}>
                        {entries.map((entry) => (
                            <li key={entry.id} className={styles.card}>
                                <div className={styles.cardMeta}>
                                    <span className={styles.cardName}>
                                        {entry.characterName ||
                                            t('history.unnamed')}
                                        <span className={styles.cardSeparator}>
                                            {' '}
                                            |{' '}
                                        </span>
                                        {entry.storyTheme ||
                                            t('history.customStory')}
                                    </span>
                                    <span className={styles.cardDate}>
                                        {new Date(
                                            entry.createdAt,
                                        ).toLocaleDateString(dateLocale, {
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
                                    {t('history.hint')}
                                </p>
                                <div className={styles.cardActions}>
                                    <Button
                                        label={t('common.download')}
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
                                            {t('history.scenario')}
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
