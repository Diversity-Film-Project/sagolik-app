import styles from './Button.module.css'

interface ButtonProps {
    label: string
    variant?: 'primary' | 'secondary' | 'outlined'
    disabled?: boolean
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function Button({
    label,
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
        </button>
    )
}
