import styles from './IconCard.module.css'

interface IconCardProps {
    icon: React.ReactElement
    label: string
    variant: 'default' | 'selected'
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function IconCard({
    icon,
    label = 'any theme',
    variant = 'default',
    onClick,
}: IconCardProps) {
    return (
        <button
            className={`${styles.cardContainer} ${styles[variant]}`}
            onClick={onClick}
        >
            {icon}
            {label}
        </button>
    )
}
