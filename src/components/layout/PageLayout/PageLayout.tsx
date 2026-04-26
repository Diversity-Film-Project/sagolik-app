import styles from './PageLayout.module.css'
import React from 'react'
import { BadgeInfo } from 'lucide-react'
import Link from 'next/link'
// import StepHeader from '@/components/common/StepHeader/StepHeader'

interface PageLayoutProps {
    children: React.ReactNode
    currentStep: 1 | 2 | 3 | 4
    href: string
}

export function PageLayout({ children, currentStep, href }: PageLayoutProps) {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.logoSection}>
                    <Link className={styles.logoContainer} href={href}>
                        <span className={styles.logo}>Tales</span>
                        <span className={styles.dot}></span>
                    </Link>
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
