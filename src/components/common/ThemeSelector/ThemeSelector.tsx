import styles from './ThemeSelector.module.css'
import { IconCard } from '../IconCard/IconCard'
import { useStory } from '@/context/StoryContext'
import { Questionmark } from '@/components/ui/Icon/Questionmark'
import { Rocket } from '@/components/ui/Icon/Rocket'
import { Wave } from '@/components/ui/Icon/Wave'
import { Castle } from '@/components/ui/Icon/Castle'
import { Dino } from '@/components/ui/Icon/Dino'
import { Starfall } from '@/components/ui/Icon/Starfall'

// i moved iconcard info to this array. Its easier to add/remove themes

const themes = [
    {
        name: 'Any Theme',
        icon: <Questionmark />,
        description: 'Let AI surprise you — a unique theme will be picked',
    },
    {
        name: 'Space Quest',
        icon: <Rocket />,
        description:
            'Blast off on an intergalactic adventure among stars and planets',
    },
    {
        name: 'Ocean Deep',
        icon: <Wave />,
        description:
            'Discover hidden worlds and friendly creatures beneath the waves',
    },
    {
        name: 'Royal Castle',
        icon: <Castle />,
        description: 'Rule kingdoms, solve mysteries, and go on noble quests',
    },
    {
        name: 'Dino World',
        icon: <Dino />,
        description:
            'Journey back in time to when mighty dinosaurs roamed the Earth',
    },
    {
        name: 'Fairy Tales',
        icon: <Starfall />,
        description:
            'A magical world where wishes come true and anything is possible',
    },
]

export function ThemeSelector() {
    const { storyData, updateStoryData } = useStory()
    const selectedTheme = themes.find(
        (theme) => theme.name === storyData.storyTheme,
    )

    return (
        <div className={styles.flexWrapper}>
            <h2>Story theme</h2>
            <div className={styles.wrapperContainer}>
                {themes.map((theme) => (
                    <IconCard
                        key={theme.name}
                        icon={theme.icon}
                        label={theme.name}
                        isSelected={storyData.storyTheme === theme.name}
                        onClick={() =>
                            updateStoryData({ storyTheme: theme.name })
                        }
                    />
                ))}
            </div>

            {selectedTheme && (
                <p className={styles.themeDescription}>
                    {selectedTheme.description}
                </p>
            )}
        </div>
    )
}
