import { useState } from 'react'
import styles from './UploadPhotoCard.module.css'
import { Image as ImageIcon, LoaderCircle, Check } from 'lucide-react'
import { useStory } from '@/context/StoryContext'

type CardState = 'default' | 'loading' | 'selected'

type UploadPhotoCardProps = {
    initialState?: CardState
}

export function UploadPhotoCard({
    initialState = 'default',
}: UploadPhotoCardProps) {
    const [cardState, setCardState] = useState<CardState>(initialState)
    const { storyData, updateStoryData } = useStory()

    function openLibrary(): void {
        console.log('choose pic')
    }

    return (
        <div className={`${styles.root} ${styles[cardState]}`}>
            {cardState === 'default' && (
                <>
                    <div className={styles.iconWrapper}>
                        <ImageIcon onClick={() => openLibrary} />
                    </div>
                    <div className={styles.textContainer}>
                        <p>Upload a photo</p>
                        <p className={styles.lowerText}>or tap to browse</p>
                    </div>
                </>
            )}
            {cardState === 'loading' && (
                <LoaderCircle className={styles.spinner} />
            )}
            {cardState === 'selected' && (
                <>
                    <div className={styles.iconWrapper}>
                        <Check />
                    </div>
                    <p>Your photo is uploaded</p>
                </>
            )}
        </div>
    )
}
