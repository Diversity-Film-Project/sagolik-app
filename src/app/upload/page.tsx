//Step 1 — Upload Photo

// import styles from './page.module.css'
import { PageLayout } from '@/components/layout/PageLayout/PageLayout'

export default function UploadPhotoPage() {
    return (
        <PageLayout currentStep={1} href="/upload">
            <h1>Upload photo content</h1>
        </PageLayout>
    )
}
