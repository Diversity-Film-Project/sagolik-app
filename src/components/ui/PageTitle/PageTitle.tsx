import styles from './PageTitle.module.css'

interface PageTitleProps {
    text: string
    description: string
    animated?: boolean
}

export function PageTitle({ text, description, animated }: PageTitleProps) {
    return (
        <div>
            <h1
                className={`${styles.title}${animated ? ` ${styles.titleAnimated}` : ''}`}
            >
                {text}
            </h1>
            <p className={styles.description}>{description}</p>
        </div>
    )
}
