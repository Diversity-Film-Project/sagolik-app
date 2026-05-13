import styles from './PageLayout.module.css'
import { useState } from 'react'
import React from 'react'
import { BadgeInfo, HistoryIcon } from 'lucide-react'
import Link from 'next/link'
import { StepHeader } from '@/components/common/StepHeader/StepHeader'
import { TopSheet } from '@/components/common/TopSheet/TopSheet'

interface PageLayoutProps {
    children: React.ReactNode
    currentStep: 1 | 2 | 3 | 4
}

export function PageLayout({ children, currentStep }: PageLayoutProps) {
    const [isInfoOpen, setIsInfoOpen] = useState(false)

    return (
        <div className={styles.page}>
            <TopSheet
                isOpen={isInfoOpen}
                onClose={() => setIsInfoOpen(false)}
            ></TopSheet>
            <header className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.logoSection}>
                        <div className={styles.logoContainer}>
                            <span className={styles.logo}>Tales</span>
                            <span className={styles.dot}></span>
                        </div>
                        <button
                            className={styles.infoButton}
                            onClick={() => setIsInfoOpen(!isInfoOpen)}
                        >
                            <BadgeInfo />
                        </button>
                    </div>

                    <div className={styles.stepsWrapper}>
                        <div className={styles.stepCounterWrapper}>
                            <span className={styles.stepCounter}>
                                Step {currentStep} of 4
                            </span>
                            <Link
                                href="/history"
                                className={styles.historyButton}
                            >
                                History <HistoryIcon size={14} />
                            </Link>
                        </div>

                        <StepHeader currentStep={currentStep} />
                    </div>
                </div>
            </header>

            <main className={`${styles.content} ${styles.container}`}>
                {children}
            </main>
        </div>
    )
}
