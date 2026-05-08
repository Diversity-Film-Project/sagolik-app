import { useStory } from '@/context/StoryContext'
import { StyleCard } from '../StyleCard/StyleCard'
import { ThemeSelector } from '../ThemeSelector/ThemeSelector'
import { useEffect } from 'react'
import styles from './StyleSelector.module.css'

const STYLES = [
    {
        id: 'animated' as const,
        label: 'Animated',
    },
    {
        id: 'realistic' as const,
        label: 'Realistic',
    },
]

export function StyleSelector() {
    const { storyData, updateStoryData } = useStory()

    function handleStyleClick(id: 'animated' | 'realistic') {
        updateStoryData({
            videoStyle: id,
            storyTheme: '',
            themeDescription: '',
        })
    }

    useEffect(() => {
        console.log(storyData.videoStyle) // eslint-disable-line no-console
        console.log(storyData.storyTheme) // eslint-disable-line no-console
    }, [storyData])

    return (
        <>
            <div className={styles.flexWrapper}>
                <h2>Pick your style</h2>
                <div className={styles.cardContainer}>
                    {STYLES.map((style) => (
                        <StyleCard
                            label={style.label}
                            key={style.id}
                            style={style.id}
                            isSelected={storyData.videoStyle === style.id}
                            onClick={() => handleStyleClick(style.id)}
                        />
                    ))}
                </div>
            </div>
            {storyData.videoStyle && (
                <ThemeSelector style={storyData.videoStyle} />
            )}
        </>
    )
}
