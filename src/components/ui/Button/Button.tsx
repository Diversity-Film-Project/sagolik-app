import styles from './Button.module.css'

interface ButtonProps {
    label: string
    variant?: 'primary' | 'secondary' | 'outlined'
    disabled?: boolean
    onClick?: () => void
}

export const Button = ({
    label,
    variant = 'primary',
    disabled = false,
    onClick,
}: buttonProps) => {
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
