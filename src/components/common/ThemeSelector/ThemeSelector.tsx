import styles from './ThemeSelector.module.css'
import { IconCard } from '../IconCard/IconCard'
import { Star } from 'lucide-react'

export function ThemeSelector({}) {
    return (
        <div className={styles.wrapperContainer}>
            <div className={styles.flexContainer}>
                <IconCard
                    icon={<Star />}
                    label="Star Theme"
                    variant="default"
                />
                <IconCard
                    icon={<Star />}
                    label="Star Theme"
                    variant="selected"
                />
                <IconCard
                    icon={<Star />}
                    label="Star Theme"
                    variant="default"
                />
            </div>
            <div className={styles.flexContainer}>
                <IconCard
                    icon={<Star />}
                    label="Star Theme"
                    variant="default"
                />
                <IconCard
                    icon={<Star />}
                    label="Star Theme"
                    variant="default"
                />
                <IconCard
                    icon={<Star />}
                    label="Star Theme"
                    variant="default"
                />
            </div>
        </div>
    )
}
