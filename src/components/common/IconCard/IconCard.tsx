import styles from './IconCard.module.css'

interface IconCardProps {
    icon: React.ReactElement
    label: string
    isSelected: boolean
    onClick?: () => void
}

export function IconCard({
    icon,
    label = 'any theme',
    onClick,
    isSelected = false,
}: IconCardProps) {
    return (
        <button
            className={`${styles.cardContainer} ${styles[isSelected ? 'selected' : 'default']}`}
            onClick={onClick}
        >
            {icon}
            {label}
        </button>
    )
}
