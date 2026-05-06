import styles from './Textarea.module.css'

interface TextareaProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    placeholder?: string
    readOnly?: boolean
    disabled?: boolean
}

export function Textarea({
    value,
    onChange,
    placeholder,
    readOnly = false,
    disabled = false,
}: TextareaProps) {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            className={`${styles.root} ${readOnly ? styles.readOnly : styles.editing}`}
        />
    )
}
