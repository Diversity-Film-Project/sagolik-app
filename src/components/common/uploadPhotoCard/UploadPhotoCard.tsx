import { useState } from 'react'
import styles from './UploadPhotoCard.module.css'

type CardState = 'default' | 'loading' | 'selected'

export function UploadPhotoCard({}) {
    const [cardState, setCardState] = useState<CardState>('default')

    return (
        <div className={styles.root}>
            <p>photo card</p>
            {cardState === 'default' && <p>Upload photo</p>}
            {cardState === 'loading' && <p>Loading..</p>}
            {cardState === 'selected' && <p>Selected photo</p>}
        </div>
    )
}
