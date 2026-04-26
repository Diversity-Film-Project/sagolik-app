import Image from 'next/image'
import { StarCanvas } from './StarCanvas'
import styles from './page.module.css'

export default function SplashPage() {
    return (
        <div className={styles.page}>
            {/* Background */}
            <div className={styles.bg} />
            <StarCanvas />
            <div className={styles.blobs}>
                <div className={`${styles.blob} ${styles.blob1}`} />
                <div className={`${styles.blob} ${styles.blob2}`} />
                <div className={`${styles.blob} ${styles.blob3}`} />
                <div className={`${styles.blob} ${styles.blob4}`} />
            </div>

            {/* Content */}
            <div className={styles.stage}>
                <div className={styles.logoWrap}>
                    <Image
                        src="/logo.svg"
                        alt="Tales logo"
                        width={108}
                        height={108}
                    />
                </div>

                <h1 className={styles.wordmark}>
                    Tales<span className={styles.dot}></span>
                </h1>

                <p className={styles.tagline}>Stories you make together</p>
                {/* todo: change slogan */}
            </div>
        </div>
    )
}
