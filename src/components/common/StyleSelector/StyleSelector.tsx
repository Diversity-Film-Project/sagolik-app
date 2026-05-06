import { useStory } from '@/context/StoryContext'
import { StyleCard } from '../StyleCard/StyleCard'
import { ThemeSelector } from '../ThemeSelector/ThemeSelector'
import { useEffect } from 'react'

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
        updateStoryData({ videoStyle: id, storyTheme: '' })
    }

    useEffect(() => {
        console.log(storyData.videoStyle) // eslint-disable-line no-console
        console.log(storyData.storyTheme) // eslint-disable-line no-console
    }, [storyData])

    return (
        <>
            <div>
                {STYLES.map((style) => (
                    <StyleCard
                        key={style.id}
                        style={style.label}
                        onClick={() => handleStyleClick(style.id)}
                    />
                ))}
            </div>
            {storyData.videoStyle && (
                <ThemeSelector style={storyData.videoStyle} />
            )}
        </>
    )
}
