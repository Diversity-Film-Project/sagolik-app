import styles from './StepHeader.module.css'
import React from 'react'

interface StepHeaderProps {
    currentStep: 1 | 2 | 3 | 4
}

const steps = ['Photo', 'Preferences', 'Story', 'Video']

export const StepHeader: React.FC<StepHeaderProps> = ({ currentStep }) => {
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
