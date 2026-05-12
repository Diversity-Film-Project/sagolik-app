import { StarCanvas } from '@/components/common/StarCanvas/StarCanvas'
import styles from './StarBackground.module.css'

export function StarBackground() {
    return (
        <>
            <div className={styles.bg} />
            <StarCanvas />
            <div className={styles.blobs}>
                <div className={`${styles.blob} ${styles.blob1}`} />
                <div className={`${styles.blob} ${styles.blob2}`} />
                <div className={`${styles.blob} ${styles.blob3}`} />
                <div className={`${styles.blob} ${styles.blob4}`} />
            </div>
        </>
    )
}
