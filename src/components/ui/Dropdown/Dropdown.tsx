'use client'

import styles from './Dropdown.module.css'

type DropdownProps = {
    options: string[]
    value: string
    label?: string
    onChange: (value: string) => void
    variant?: 'primary' | 'secondary'
    disabled?: boolean
}

export const Dropdown = ({
    options,
    value,
    label,
    onChange,
    variant = 'primary',
    disabled = false,
}: DropdownProps) => {
    return (
        <div className={styles.wrapper}>
            {label && <label className={styles.label}>{label}</label>}

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`${styles.root} ${styles[variant]}`}
                disabled={disabled}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}
