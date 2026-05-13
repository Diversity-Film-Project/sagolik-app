'use client'

import { useState, useEffect } from 'react'
import styles from './LoadingCard.module.css'
import { Check, LoaderCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/lib/translations'

interface LoadingCardProps {
    duration: number
}

export function LoadingCard({ duration = 2 }: LoadingCardProps) {
    const { lang, t } = useLanguage()
    const tips = translations[lang].loading.tips
    const [tipIndex, setTipIndex] = useState(0)
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const reset = async () => {
            await Promise.resolve()
            setTipIndex(0)
        }
        reset()
    }, [lang])

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false)
            setTimeout(() => {
                setTipIndex((i) => (i + 1) % tips.length)
                setVisible(true)
            }, 400)
        }, 5000)
        return () => clearInterval(interval)
    }, [tips.length])

    return (
        <div className={styles.cardContainer}>
            <ul className={styles.list}>
                <li>
                    <div className={styles.listItemWrapper}>
                        <div className={styles.iconWrapper}>
                            <Check width={14} height={14} />
                        </div>
                        <div className={styles.textWrapper}>
                            <p className={styles.upperText}>
                                {t('loading.photoUploaded')}
                            </p>
                            <p className={styles.lowerText}>
                                {t('loading.photoReady')}
                            </p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className={styles.listItemWrapper}>
                        <div className={styles.iconWrapper}>
                            <Check width={14} height={14} />
                        </div>
                        <div className={styles.textWrapper}>
                            <p className={styles.upperText}>
                                {t('loading.prefsSet')}
                            </p>
                            <p className={styles.lowerText}>
                                {t('loading.prefsCustomized')}
                            </p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className={styles.listItemWrapper}>
                        <div className={styles.loadingIconWrapper}>
                            <LoaderCircle
                                width={14}
                                height={14}
                                className={styles.spinner}
                            />
                        </div>
                        <div className={styles.textWrapper}>
                            <p className={styles.generatingText}>
                                {t('loading.generating')} {duration}{' '}
                                {t('loading.min')}
                            </p>
                            <p
                                key={`${lang}-${tipIndex}`}
                                className={`${styles.tipText} ${!visible ? styles.tipHidden : ''}`}
                            >
                                {tips[tipIndex]}
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}
