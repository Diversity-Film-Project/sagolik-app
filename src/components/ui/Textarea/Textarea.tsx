import styles from './Textarea.module.css'

interface TextareaProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    placeholder?: string
    rows?: number
    disabled?: boolean
}

export function Textarea({
    value,
    onChange,
    placeholder,
    rows = 6,
    disabled = false,
}: TextareaProps) {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            className={styles.root}
        />
    )
}
