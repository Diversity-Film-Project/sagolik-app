import styles from './StepHeader.module.css'
import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface StepHeaderProps {
    currentStep: 1 | 2 | 3 | 4
}

export const StepHeader: React.FC<StepHeaderProps> = ({ currentStep }) => {
    const { t } = useLanguage()
    const steps = [
        t('steps.photo'),
        t('steps.preferences'),
        t('steps.story'),
        t('steps.video'),
    ]

    return (
        <nav className={styles.stepNavigation}>
            <ol className={styles.stepList}>
                {steps.map((step, index) => (
                    <li
                        key={index}
                        className={`${styles.step} ${index + 1 <= currentStep ? styles.active : ''}`}
                    >
                        <span className={styles.stepIndicator}></span>
                        {step}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
