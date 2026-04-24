import styles from './PageLayout.module.css'
import React from 'react'
import { Dot, BadgeInfo } from 'lucide-react'
// import StepHeader from '@/components/common/StepHeader/StepHeader'

interface PageLayoutProps {
    children: React.ReactNode
    currentStep: 1 | 2 | 3 | 4
}

export function PageLayout({ children, currentStep }: PageLayoutProps) {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.logoSection}>
                    <div className={styles.logoContainer}>
                        <span className={styles.logo}>Tales</span>
                        <span className={styles.dot}>.</span>
                    </div>
                    <button className={styles.infoButton}>
                        <BadgeInfo />
                    </button>
                </div>

                <span className={styles.stepCounter}>
                    Step {currentStep} of 4
                </span>
            </header>

            {/* space for StepHeader */}

            <main className={styles.content}>{children}</main>
        </div>
    )
}
