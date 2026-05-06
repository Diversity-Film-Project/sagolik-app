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
interface ThemeProp {
    name: string
    icon: React.ReactElement
    description: string
}

interface StyleThemes {
    animated: ThemeProp[]
    realistic: ThemeProp[]
}

const THEMES: StyleThemes = {
    realistic: [
        {
            name: 'Realistic theme 1',
            icon: <Questionmark />,
            description:
                'Warm cinematic live-action style, golden sunlight, emotional family moments, natural camera movement, soft depth of field, realistic environments, cozy atmosphere, expressive acting, uplifting emotional tone, cinematic storytelling, adventurous but grounded.',
        },
        {
            name: 'Realistic theme 2',
            icon: <Questionmark />,
            description:
                'Warm cinematic live-action style, golden sunlight, emotional family moments, natural camera movement, soft depth of field, realistic environments, cozy atmosphere, expressive acting, uplifting emotional tone, cinematic storytelling, adventurous but grounded.',
        },
    ],
    animated: [
        {
            name: 'Animated theme 1',
            icon: <Questionmark />,
            description:
                'Warm cinematic live-action style, golden sunlight, emotional family moments, natural camera movement, soft depth of field, realistic environments, cozy atmosphere, expressive acting, uplifting emotional tone, cinematic storytelling, adventurous but grounded.',
        },
        {
            name: 'Animated theme 2',
            icon: <Questionmark />,
            description:
                'Warm cinematic live-action style, golden sunlight, emotional family moments, natural camera movement, soft depth of field, realistic environments, cozy atmosphere, expressive acting, uplifting emotional tone, cinematic storytelling, adventurous but grounded.',
        },
    ],
}

interface ThemeSelectorProps {
    style: 'animated' | 'realistic'
}

export function ThemeSelector({ style }: ThemeSelectorProps) {
    const { storyData, updateStoryData } = useStory()
    const selectedTheme = THEMES[style]?.find(
        (theme) => theme.name === storyData.storyTheme,
    )

    return (
        <div className={styles.flexWrapper}>
            <h2>Story theme</h2>
            <div className={styles.wrapperContainer}>
                {THEMES[style]?.map((theme) => (
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
