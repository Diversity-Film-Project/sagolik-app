import styles from './ThemeSelector.module.css'
import { IconCard } from '../IconCard/IconCard'
import { useStory } from '@/context/StoryContext'
import { Questionmark } from '@/components/ui/Icon/Questionmark'
import { Rocket } from '@/components/ui/Icon/Rocket'
import { Wave } from '@/components/ui/Icon/Wave'
import { Castle } from '@/components/ui/Icon/Castle'
import { Dino } from '@/components/ui/Icon/Dino'
import { Starfall } from '@/components/ui/Icon/Starfall'

export function ThemeSelector() {
    const { storyData, updateStoryData } = useStory()

    return (
        <div className={styles.wrapperContainer}>
            <div className={styles.flexContainer}>
                <IconCard
                    icon={<Questionmark />}
                    label="Any Theme"
                    isSelected={storyData.storyTheme === 'Any Theme'}
                    onClick={() => updateStoryData({ storyTheme: 'Any Theme' })}
                />
                <IconCard
                    icon={<Rocket />}
                    label="Space Quest"
                    isSelected={storyData.storyTheme === 'Space Quest'}
                    onClick={() =>
                        updateStoryData({ storyTheme: 'Space Quest' })
                    }
                />
                <IconCard
                    icon={<Wave />}
                    label="Ocean Deep"
                    isSelected={storyData.storyTheme === 'Ocean Deep'}
                    onClick={() =>
                        updateStoryData({ storyTheme: 'Ocean Deep' })
                    }
                />
            </div>
            <div className={styles.flexContainer}>
                <IconCard
                    icon={<Castle />}
                    label="Royal Castle"
                    isSelected={storyData.storyTheme === 'Royal Castle'}
                    onClick={() =>
                        updateStoryData({ storyTheme: 'Royal Castle' })
                    }
                />
                <IconCard
                    icon={<Dino />}
                    label="Dino World"
                    isSelected={storyData.storyTheme === 'Dino World'}
                    onClick={() =>
                        updateStoryData({ storyTheme: 'Dino World' })
                    }
                />
                <IconCard
                    icon={<Starfall />}
                    label="Fairy Tales"
                    isSelected={storyData.storyTheme === 'Fairy Tales'}
                    onClick={() =>
                        updateStoryData({ storyTheme: 'Fairy Tales' })
                    }
                />
            </div>
        </div>
    )
}
