import styles from './LoadingCard.module.css'
import { Check } from 'lucide-react'
import { LoaderCircle } from 'lucide-react'

interface LoadingCardProps {
    duration: number
}

export function LoadingCard({ duration = 2 }: LoadingCardProps) {
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
                            <p className={styles.upperText}>Generating video</p>
                            <p className={styles.lowerText}>
                                Around {duration} minutes
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}
