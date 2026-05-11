import styles from './InfoCard.module.css'

type InfoCardProps = {
    title: string
    description: string
    icon?: React.ReactNode
}

export function InfoCard({ title, description, icon }: InfoCardProps) {
    return (
        <aside className={styles.card}>
            {icon && <div className={styles.icon}>{icon}</div>}
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>
        </aside>
    )
}
