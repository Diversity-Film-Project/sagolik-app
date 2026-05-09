import styles from './StyleCard.module.css'

interface StyleCardProps {
    style: string
    label: string
    isSelected?: boolean
    onClick?: () => void
}

const styleClassProps: Record<string, string> = {
    animated: styles.animated,
    realistic: styles.realistic,
}

export function StyleCard({
    style,
    label,
    isSelected = false,
    onClick,
}: StyleCardProps) {
    const styleClass = styleClassProps[style] ?? ''
    const fullClass = [
        styles.container,
        styleClass,
        isSelected ? styles.selected : '',
    ]
        .filter(Boolean)
        .join(' ')
    return (
        <div onClick={onClick} className={fullClass}>
            {label}
        </div>
    )
}
