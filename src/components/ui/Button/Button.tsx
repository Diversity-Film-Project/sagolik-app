import styles from './Button.module.css'

interface ButtonProps {
    label: string
    icon?: React.ReactNode
    iconPosition?: 'left' | 'right'
    variant?: 'primary' | 'secondary' | 'outlined' | 'save' | 'regenerate'
    disabled?: boolean
    loading?: boolean
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function Button({
    label,
    icon,
    iconPosition = 'right',
    variant = 'primary',
    disabled = false,
    loading = false,
    onClick,
}: ButtonProps) {
    return (
        <button
            disabled={disabled || loading}
            onClick={onClick}
            className={`${styles.root} ${styles[variant]}${loading ? ` ${styles.loading}` : ''}`}
        >
            {icon && iconPosition === 'left' && (
                <span className={styles.iconLeft}>{icon}</span>
            )}
            {label}
            {icon && iconPosition === 'right' && (
                <span className={styles.iconRight}>{icon}</span>
            )}
        </button>
    )
}
