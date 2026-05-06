import styles from './StyleCard.module.css'

interface StyleCardProps {
    style: string
    // isSelected?: boolean
    onClick?: () => void
}

export function StyleCard({
    style,
    // isSelected = false,
    onClick,
}: StyleCardProps) {
    return (
        <div onClick={onClick} className={styles.container}>
            {style}
        </div>
    )
}
