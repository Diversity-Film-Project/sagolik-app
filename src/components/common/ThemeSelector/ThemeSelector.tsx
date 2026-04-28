import styles from './ThemeSelector.module.css'
import { IconCard } from '../IconCard/IconCard'
import { Star } from 'lucide-react'
import { useStory } from '@/context/StoryContext'

export function ThemeSelector() {
    const { storyData, updateStoryData } = useStory()

    return (
        <div className={styles.wrapperContainer}>
            <div className={styles.flexContainer}>
                <IconCard
                    icon={<Star />}
                    label="Any Theme"
                    isSelected={storyData.storyTheme === 'Any Theme'}
                    onClick={() => updateStoryData({ storyTheme: 'Any Theme' })}
                />
                <IconCard
                    icon={<Star />}
                    label="Space Quest"
                    isSelected={storyData.storyTheme === 'Space Quest'}
                    onClick={() =>
                        updateStoryData({ storyTheme: 'Space Quest' })
                    }
                />
                <IconCard
                    icon={<Star />}
                    label="Ocean Deep"
                    isSelected={storyData.storyTheme === 'Ocean Deep'}
                    onClick={() =>
                        updateStoryData({ storyTheme: 'Ocean Deep' })
                    }
                />
            </div>
            <div className={styles.flexContainer}>
                <IconCard
                    icon={<Star />}
                    label="Royal Castle"
                    isSelected={storyData.storyTheme === 'Royal Castle'}
                    onClick={() =>
                        updateStoryData({ storyTheme: 'Royal Castle' })
                    }
                />
                <IconCard
                    icon={<Star />}
                    label="Dino World"
                    isSelected={storyData.storyTheme === 'Dino World'}
                    onClick={() =>
                        updateStoryData({ storyTheme: 'Dino World' })
                    }
                />
                <IconCard
                    icon={<Star />}
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
