'use client'

import { useState, useEffect } from 'react'
import styles from './LoadingCard.module.css'
import { Check, LoaderCircle } from 'lucide-react'

const TIPS = [
    'This usually takes around 5 minutes — hang tight!',
    'Your photo and story script are on their way to Kling AI',
    'Kling 3.0 Pro is analysing your photo to place your child in the scene',
    'Google Gemini wrote the script — Kling AI is now bringing it to life',
    'Get ready to be amazed!',
    'Your child is about to become the hero of their own story',
    'Each video is one of a kind — this one exists only for you',
    'Something magical is being created just for you',
    'Keep this tab open while we work our magic',
    'Good things take time — your video is worth the wait',
    "We can't wait to show you the result!",
    'Generated videos are saved to your History — stored locally in your browser',
    'Your history is private — only visible on this device',
    "We don't store your photo or video on our servers after processing",
    'Clearing browser data will remove your saved videos from History',
    'AI-generated visuals may vary — each result is unique',
    "The appearance may differ slightly from the photo — that's AI being creative",
    'Sometimes the first result surprises you in the best possible way',
    'AI video technology is improving fast — results get better every week',
    "This is a demo version — we're continuously refining the experience",
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
