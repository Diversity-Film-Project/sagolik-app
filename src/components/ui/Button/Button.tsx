import styles from './Button.module.css'

interface ButtonProps {
    label: string
    icon?: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outlined'
    disabled?: boolean
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function Button({
    label,
    icon,
    variant = 'primary',
    disabled = false,
    onClick,
}: ButtonProps) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`${styles.root} ${styles[variant]}`}
        >
            {label}
            {icon && <span className={styles.icon}>{icon}</span>}
        </button>
    )
}
