import styles from './ConfirmationCard.module.css'
import { Check } from 'lucide-react'

export function ConfirmationCard() {
    return (
        <>
            <div className={styles.cardContainer}>
                <div className={styles.iconWrapper}>
                    <Check width={32} height={32} />
                </div>
                <div className={styles.textWrapper}>
                    <h1>All set</h1>
                    <p>Your story video is being created</p>
                </div>
            </div>
        </>
    )
}
