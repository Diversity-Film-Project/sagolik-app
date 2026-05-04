// input component
import styles from './Input.module.css'

interface InputProps {
    label?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    variant?: 'primary' | 'secondary'
    disabled?: boolean
}

export function Input({
    label,
    value,
    onChange,
    placeholder,
    variant = 'primary',
    disabled = false,
}: InputProps) {
    return (
        <div className={styles.wrapper}>
            {label}

            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`${styles.root} ${styles[variant]}`}
            />
        </div>
    )
}
