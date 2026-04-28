//Step 1 — Upload Photo
'use client'

import styles from './page.module.css'
import { PageLayout } from '@/components/layout/PageLayout/PageLayout'
import { UploadPhotoCard } from '@/components/common/uploadPhotoCard/UploadPhotoCard'

export default function UploadPhotoPage() {
    return (
        <PageLayout currentStep={1} href="/upload">
            <h1 className={styles.pageTitle}>Add your child&apos;s photo</h1>
            <p className={styles.pageDescription}>
                We&apos;ll place them as the hero of the story
            </p>
            <UploadPhotoCard />
        </PageLayout>
    )
}
