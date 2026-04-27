import { useState } from 'react'
import styles from './UploadPhotoCard.module.css'
import { Image as ImageIcon, LoaderCircle, Check, X } from 'lucide-react'
import { useStory } from '@/context/StoryContext'
import Image from 'next/image'

type CardState = 'default' | 'loading' | 'selected'

type UploadPhotoCardProps = {
    initialState?: CardState
}

export function UploadPhotoCard({
    initialState = 'default',
}: UploadPhotoCardProps) {
    const [cardState, setCardState] = useState<CardState>(initialState)
    const [selectedFile, setSelectedFile] = useState<HTMLInputElement | null>(
        null,
    )
    const { storyData, updateStoryData } = useStory()

    const handleClick = () => {
        selectedFile?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setCardState('loading')
            setTimeout(() => {
                updateStoryData({ photo: file })
                setCardState('selected')
            }, 1000)
        }
    }

    const resetUpload = () => {
        setCardState('loading')
        setTimeout(() => {
            updateStoryData({ photo: null })
            setCardState('default')
        }, 1000)
    }

    return (
        <div
            className={`${styles.root} ${styles[cardState]}`}
            onClick={cardState === 'default' ? handleClick : undefined}
        >
            <input
                ref={setSelectedFile}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            {cardState === 'default' && (
                <>
                    <div className={styles.iconWrapper}>
                        <ImageIcon />
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
                    <X onClick={resetUpload} />
                    {/* <Image src={JSON.stringify(storyData.photo)} alt="test" /> */}
                </>
            )}
        </div>
    )
}
