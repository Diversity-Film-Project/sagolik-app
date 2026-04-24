//Step 1 — Upload Photo

import styles from './page.module.css'

export default function UploadPhotoPage() {
    return (
        <main className={styles.page}>
            {/* Header */}
            {/* from common components */}
            <div>Header placeholder</div>

            {/* Progress bar */}
            {/* from common components */}
            <div>Progress bar placeholder</div>

            {/* Page title */}
            <section className={styles.content}>
                <h1 className={styles.title}>Add your child&apos;s photo</h1>
                <p className={styles.subtitle}>
                    We&apos;ll place them as the hero of the story
                </p>

                {/* Upload area */}
                <div className={styles.uploadArea}>
                    <span className={styles.uploadIcon}>[image icon]</span>
                    <p className={styles.uploadPrimary}>Upload a photo</p>
                    <p className={styles.uploadSecondary}>or drag and drop</p>
                    <p className={styles.uploadHint}>PNG, JPG up to 10MB</p>
                </div>

                {/* Tip card */}
                {/* it's might be reusable part, then -> paste tipcard from common components */}
                <div className={styles.tipCard}>
                    <p className={styles.tipTitle}>Best results</p>
                    <p className={styles.tipText}>
                        Use a clear photo with good lighting and a single child
                        facing the camera
                    </p>
                </div>
            </section>

            {/* Actions */}
            <footer className={styles.actions}>
                {/* Buttons from ui reusable components */}
                <button>Btn</button>
                <button>Btn</button>
            </footer>
        </main>
    )
}
