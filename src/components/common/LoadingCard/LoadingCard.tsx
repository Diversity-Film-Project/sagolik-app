'use client'

import { useState, useEffect } from 'react'
import styles from './LoadingCard.module.css'
import { Check, LoaderCircle } from 'lucide-react'

const TIPS = [
    'This takes around 5 minutes — hang tight!',
    'Your photo is on its way to Kling AI',
    'Kling AI is placing your child in the scene',
    'Gemini wrote the script — Kling brings it to life',
    'Get ready to be amazed!',
    'Your child is about to become a story hero',
    'Every video is one of a kind — just for you',
    'Something magical is being created right now',
    'Keep this tab open while we work our magic',
    'Good things take time — worth the wait!',
    "We can't wait to show you the result!",
    'Videos are saved locally in your History',
    'Your history is private — only on this device',
    "We don't store your data after processing",
    'Clear browser data to remove saved videos',
    'AI visuals may vary — each result is unique',
    'Appearance may differ slightly — AI being creative',
    'First results can surprise in the best way!',
    'AI video tech improves fast — getting better weekly',
    "Demo version — we're continuously improving",
    'Fingers crossed it turns out amazing!',
]

interface LoadingCardProps {
    duration: number
}

export function LoadingCard({ duration = 2 }: LoadingCardProps) {
    const [tipIndex, setTipIndex] = useState(0)
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false)
            setTimeout(() => {
                setTipIndex((i) => (i + 1) % TIPS.length)
                setVisible(true)
            }, 400)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className={styles.cardContainer}>
            <ul className={styles.list}>
                <li>
                    <div className={styles.listItemWrapper}>
                        <div className={styles.iconWrapper}>
                            <Check width={14} height={14} />
                        </div>
                        <div className={styles.textWrapper}>
                            <p className={styles.upperText}>Photo uploaded</p>
                            <p className={styles.lowerText}>Ready to go</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className={styles.listItemWrapper}>
                        <div className={styles.iconWrapper}>
                            <Check width={14} height={14} />
                        </div>
                        <div className={styles.textWrapper}>
                            <p className={styles.upperText}>Preferences set</p>
                            <p className={styles.lowerText}>Story customized</p>
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
                                Generating video ~ {duration} min
                            </p>
                            <p
                                key={tipIndex}
                                className={`${styles.tipText} ${!visible ? styles.tipHidden : ''}`}
                            >
                                {TIPS[tipIndex]}
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}
