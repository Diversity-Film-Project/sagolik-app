import styles from './InfoCard.module.css'

type InfoCardProps = {
    title: string
    description: string
}

export default function InfoCard({ title, description }: InfoCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.icon}></div>

            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>

                <p className={styles.description}>{description}</p>
            </div>
        </div>
    )
}
