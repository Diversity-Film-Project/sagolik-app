import styles from './PageTitle.module.css'

interface PageTitleProps {
    text: string
    description: string
}

export function PageTitle({ text, description }: PageTitleProps) {
    return (
        <>
            <h1 className={styles.title}>{text}</h1>
            <p className={styles.description}>{description}</p>
        </>
    )
}
