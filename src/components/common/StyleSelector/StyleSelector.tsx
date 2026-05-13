import { useStory } from '@/context/StoryContext'
import { StyleCard } from '../StyleCard/StyleCard'
import { ThemeSelector } from '../ThemeSelector/ThemeSelector'
import { useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import styles from './StyleSelector.module.css'

export function StyleSelector() {
    const { storyData, updateStoryData } = useStory()
    const { t } = useLanguage()

    const STYLES = [
        { id: 'animated' as const, label: t('preferences.animated') },
        { id: 'realistic' as const, label: t('preferences.realistic') },
    ]

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
                <h2>{t('preferences.styleTitle')}</h2>
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
