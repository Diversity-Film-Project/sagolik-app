// input component
import styles from './Input.module.css'

interface InputProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    variant?: 'primary' | 'secondary'
    disabled?: boolean
}

export function Input({
    value,
    onChange,
    placeholder,
    variant = 'primary',
    disabled = false,
}: InputProps) {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`${styles.root} ${styles[variant]}`}
        />
    )
}
