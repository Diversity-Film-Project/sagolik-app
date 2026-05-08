import styles from './ThemeSelector.module.css'
import { IconCard } from '../IconCard/IconCard'
import { useStory } from '@/context/StoryContext'
import { Questionmark } from '@/components/ui/Icon/Questionmark'
// import { Rocket } from '@/components/ui/Icon/Rocket'
// import { Wave } from '@/components/ui/Icon/Wave'
// import { Castle } from '@/components/ui/Icon/Castle'
// import { Dino } from '@/components/ui/Icon/Dino'
// import { Starfall } from '@/components/ui/Icon/Starfall'

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
            name: 'Warm Family Adventure',
            icon: <Questionmark />,
            description:
                'Warm cinematic live-action style, golden sunlight, emotional family moments, natural camera movement, soft depth of field, realistic environments, cozy atmosphere, expressive acting, uplifting emotional tone, cinematic storytelling, adventurous but grounded.',
        },
        {
            name: 'Dino Survival',
            icon: <Questionmark />,
            description:
                'Photorealistic jungle adventure, massive dinosaurs, cinematic suspense, dramatic lighting, handheld camera movement, immersive environments, realistic scale, exciting chase scenes, emotional reactions, family-friendly action movie atmosphere.',
        },
        {
            name: 'Space Quest',
            icon: <Questionmark />,
            description:
                'Cinematic futuristic universe, glowing planets, realistic spacecraft interiors, dramatic sci-fi lighting, large-scale environments, heroic child adventurers, emotional cinematic realism, epic atmosphere, immersive visual effects.',
        },
        {
            name: 'Magical Fantasy',
            icon: <Questionmark />,
            description:
                'Cinematic magical fantasy world, ancient castles, glowing magical effects, mysterious forests, realistic costumes, dramatic fantasy lighting, emotional adventure, whimsical atmosphere, immersive world-building.',
        },
        {
            name: 'Pirate Treasure',
            icon: <Questionmark />,
            description:
                'Epic pirate adventure on realistic tropical oceans, cinematic storms, treasure caves, dramatic ship battles, adventurous child explorers, golden sunset lighting, immersive live-action realism, exciting family adventure tone.',
        },
        {
            name: 'Superhero',
            icon: <Questionmark />,
            description:
                'Realistic superhero world, cinematic cityscapes, dramatic action sequences, emotional character moments, realistic powers and effects, dynamic handheld camera movement, photorealistic environments, grounded superhero atmosphere, large-scale cinematic action.',
        },
    ],
    animated: [
        {
            name: 'Dreamy Fantasy',
            icon: <Questionmark />,
            description:
                'Soft hand-painted animation style, dreamy fantasy landscapes, lush green forests, floating spirits, warm sunlight through trees, magical countryside villages, emotional atmosphere, whimsical creatures, gentle wind, watercolor textures, expressive eyes, cinematic framing, cozy and magical feeling, peaceful adventure.',
        },
        {
            name: 'Dragon Adventure',
            icon: <Questionmark />,
            description:
                'High-fidelity animation, painterly textures, golden hour lighting, soft bokeh, expressive characters, natural camera drifts, cozy atmosphere, uplifting emotional tone.',
        },
        {
            name: 'Candy Kingdom',
            icon: <Questionmark />,
            description:
                'Colorful candy fantasy world, chocolate rivers, giant lollipops, playful candy creatures, whimsical animation style, magical desserts everywhere, joyful atmosphere, bright pastel colors, childlike wonder, energetic adventure.',
        },
        {
            name: 'Street Samurai',
            icon: <Questionmark />,
            description:
                'An animated sequence in a Cyberpunk style, featuring heavy cel-shading with neon-drenched cinematic lighting. The diegesis is a rain-slicked, high-tech metropolis with a gritty, industrial atmosphere.',
        },
        {
            name: 'Robot City',
            icon: <Questionmark />,
            description:
                'Futuristic robot city, neon lights, flying vehicles, cute helper robots, cozy sci-fi atmosphere, colorful holograms, child-friendly technology world, cinematic animation style, emotional storytelling, dynamic futuristic environments.',
        },
        {
            name: 'Superhero',
            icon: <Questionmark />,
            description:
                'Massive animated superhero city, glowing stylized skyscrapers, flying child heroes, colorful energy powers, expressive animated characters, dramatic illustrated clouds, epic battles, emotional heroic atmosphere, vibrant comic-inspired animation style.',
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
            <h2>Story Worlds</h2>
            <div className={styles.wrapperContainer}>
                {THEMES[style]?.map((theme) => (
                    <IconCard
                        key={theme.name}
                        icon={theme.icon}
                        label={theme.name}
                        isSelected={storyData.storyTheme === theme.name}
                        onClick={() =>
                            updateStoryData({
                                storyTheme: theme.name,
                                themeDescription: theme.description,
                            })
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
