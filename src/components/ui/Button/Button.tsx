import styles from './Button.module.css'

interface buttonProps {
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
            className={`${styles.root} ${variant ? styles[variant] : ''}`}
        >
            {label}
        </button>
    )
}
