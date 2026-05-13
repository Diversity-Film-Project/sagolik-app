'use client'

import styles from './ConfirmationCard.module.css'
import { Check } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export function ConfirmationCard() {
    const { lang } = useLanguage()

    const text =
        lang === 'sv'
            ? {
                  title: 'Allt klart',
                  body: 'Din berättelsevideo skapas just nu',
              }
            : { title: 'All set', body: 'Your story video is being created' }

    return (
        <>
            <div className={styles.cardContainer}>
                <div className={styles.iconWrapper}>
                    <Check width={32} height={32} />
                </div>
                <div className={styles.textWrapper}>
                    <h1>{text.title}</h1>
                    <p>{text.body}</p>
                </div>
            </div>
        </>
    )
}
