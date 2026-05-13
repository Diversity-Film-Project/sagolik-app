import { Castle } from '@/components/ui/Icon/Castle'
import { Dragon } from '@/components/ui/Icon/Dragon'
import { Candy } from '@/components/ui/Icon/Candy'
import { Street } from '@/components/ui/Icon/Street'
import { Robot } from '@/components/ui/Icon/Robot'
import { Starfall } from '@/components/ui/Icon/Starfall'
import { Rocket } from '@/components/ui/Icon/Rocket'
import { Wave } from '@/components/ui/Icon/Wave'
import { Dino } from '@/components/ui/Icon/Dino'
import { Magic } from '@/components/ui/Icon/Magic'
import { Camp } from '@/components/ui/Icon/Camp'
import styles from '@/components/common/ThemeSelector/ThemeSelector.module.css'

export const Emoji = ({ children }: { children: string }) => (
    <span className={styles.emoji}>{children}</span>
)

export interface ThemeProp {
    name: string
    icon: React.ReactElement
    description: string // English — used in Kling AI prompt
    descriptionSv?: string // Swedish — shown in UI only
}

export interface StyleThemes {
    animated: ThemeProp[]
    realistic: ThemeProp[]
}

export const THEMES: StyleThemes = {
    realistic: [
        {
            name: 'Warm Family Adventure',
            icon: <Camp />,
            description:
                'Warm cinematic live-action style, golden sunlight, emotional family moments, natural camera movement, soft depth of field, realistic environments, cozy atmosphere, expressive acting, uplifting emotional tone, cinematic storytelling, adventurous but grounded.',
            descriptionSv:
                'Varm filmstil med gyllene solljus, rörande familjeögonblick och naturtrogna miljöer. Mysig och upplifterande stämning.',
        },
        {
            name: 'Dino Survival',
            icon: <Dino />,
            description:
                'Photorealistic jungle adventure, massive dinosaurs, cinematic suspense, dramatic lighting, handheld camera movement, immersive environments, realistic scale, exciting chase scenes, emotional reactions, family-friendly action movie atmosphere.',
            descriptionSv:
                'Fotorealistiskt djungeläventyr med jättelika dinosaurier, dramatisk belysning och spännande jaktscener. Actionfylld familjefilm.',
        },
        {
            name: 'Space Quest',
            icon: <Rocket />,
            description:
                'Cinematic futuristic universe, glowing planets, realistic spacecraft interiors, dramatic sci-fi lighting, large-scale environments, heroic child adventurers, emotional cinematic realism, epic atmosphere, immersive visual effects.',
            descriptionSv:
                'Episkt rymdäventyr med lysande planeter, realistiska rymdskepp och dramatisk sci-fi-belysning. Hjältemod i universum.',
        },
        {
            name: 'Magical Fantasy',
            icon: <Magic />,
            description:
                'Cinematic magical fantasy world, ancient castles, glowing magical effects, mysterious forests, realistic costumes, dramatic fantasy lighting, emotional adventure, whimsical atmosphere, immersive world-building.',
            descriptionSv:
                'Magisk fantasivärld med fornkastell, lysande trolldomseffekter och mystiska skogar. Filmisk och känsloladdad äventyrsstämning.',
        },
        {
            name: 'Pirate Treasure',
            icon: <Wave />,
            description:
                'Epic pirate adventure on realistic tropical oceans, cinematic storms, treasure caves, dramatic ship battles, adventurous child explorers, golden sunset lighting, immersive live-action realism, exciting family adventure tone.',
            descriptionSv:
                'Episkt pirateäventyr på tropiska hav, filmiska stormar, skattgrottor och dramatiska sjöslag. Spännande familjeäventyr.',
        },
        {
            name: 'Superhero',
            icon: <Starfall />,
            description:
                'Realistic superhero world, cinematic cityscapes, dramatic action sequences, emotional character moments, realistic powers and effects, dynamic handheld camera movement, photorealistic environments, grounded superhero atmosphere, large-scale cinematic action.',
            descriptionSv:
                'Realistisk superhjältevärld med dramatisk stadssilhuett, realistiska krafter och episka actionsekvenser. Jordnära hjältestämning.',
        },
        {
            name: 'Wild West Heroes',
            icon: <Emoji>🤠</Emoji>,
            description:
                'Cinematic American frontier, sweeping golden desert landscapes, dusty western towns, dramatic sunset skies, brave child heroes on horseback, authentic western costumes and props, wide-angle landscape cinematography, adventurous cowboy atmosphere, epic frontier adventure.',
            descriptionSv:
                'Filmisk amerikansk frontierland med gyllene öknar, dammiga westernstäder och modiga barnhjältar till häst. Cowboyäventyr.',
        },
        {
            name: 'Jungle Rescue Team',
            icon: <Emoji>🌿</Emoji>,
            description:
                'Photorealistic tropical rainforest, dense jungle canopy with dramatic natural light shafts, exotic wildlife, child heroes on an urgent rescue mission, realistic jungle environments, exciting action sequences, warm humid atmosphere, emotional nature-adventure story.',
            descriptionSv:
                'Fotorealistisk tropisk regnskog med exotisk fauna och barnhjältar på ett brådskande räddningsuppdrag. Varm naturaäventyrstämning.',
        },
        {
            name: 'Animal Safari Adventure',
            icon: <Emoji>🐾</Emoji>,
            description:
                'Cinematic African savanna, majestic animals in their natural habitat, golden hour wide-angle landscapes, thrilling wildlife encounters, photorealistic environments, emotional nature-documentary feel, child explorer on a life-changing journey through the wild.',
            descriptionSv:
                'Filmisk afrikansk savann med majestätiska djur i sin naturliga miljö. Naturfilmskänsla och episka panoramalandskap.',
        },
        {
            name: 'Underwater Kingdom',
            icon: <Emoji>🌊</Emoji>,
            description:
                'Photorealistic deep ocean world, stunning coral reef environments, majestic sea creatures, dramatic underwater light shafts, crystal-clear blue water, realistic currents, exciting marine discovery, cinematic underwater cinematography, sense of awe and wonder.',
            descriptionSv:
                'Fotorealistisk djuphavsvärd med fantastiska korallrev, majestätiska havsvarelser och dramatiska ljusbrytningar under ytan.',
        },
        {
            name: 'Fairy Tale Castle',
            icon: <Emoji>👑</Emoji>,
            description:
                'Cinematic live-action fairy tale, grand medieval castle with towering spires, practical magical effects, lush enchanted forest kingdoms, detailed period costumes, golden magical lighting, epic quest adventure, emotional storytelling, immersive storybook world brought to life.',
            descriptionSv:
                'Levande sagafilm med storslaget medeltidsslott, praktiska magiska effekter och förtrollade skogskungadömen. En berättelse som tar liv.',
        },
    ],
    animated: [
        {
            name: 'Dreamy Fantasy',
            icon: <Castle />,
            description:
                'Soft hand-painted animation style, dreamy fantasy landscapes, lush green forests, floating spirits, warm sunlight through trees, magical countryside villages, emotional atmosphere, whimsical creatures, gentle wind, watercolor textures, expressive eyes, cinematic framing, cozy and magical feeling, peaceful adventure.',
            descriptionSv:
                'Mjuk handmålad animation med drömska fantasilandskap, lysande andar och akvarellstrukturer. Mysigt och magiskt äventyr.',
        },
        {
            name: 'Dragon Adventure',
            icon: <Dragon />,
            description:
                'High-fidelity animation, painterly textures, golden hour lighting, soft bokeh, expressive characters, natural camera drifts, cozy atmosphere, uplifting emotional tone.',
            descriptionSv:
                'Högkvalitativ animation med konstnärliga texturer, guldljus och karismatiska drakar. Varm och upplifterande stämning.',
        },
        {
            name: 'Candy Kingdom',
            icon: <Candy />,
            description:
                'Colorful candy fantasy world, chocolate rivers, giant lollipops, playful candy creatures, whimsical animation style, magical desserts everywhere, joyful atmosphere, bright pastel colors, childlike wonder, energetic adventure.',
            descriptionSv:
                'Färgglatt godisvärld med chokladfloder, jättestora klubbor och lekfulla godisskapen. Pastellfärger och barnlig häpnad.',
        },
        {
            name: 'Street Samurai',
            icon: <Street />,
            description:
                'An animated sequence in a Cyberpunk style, featuring heavy cel-shading with neon-drenched cinematic lighting. The diegesis is a rain-slicked, high-tech metropolis with a gritty, industrial atmosphere.',
            descriptionSv:
                'Cyberpunk-animation med neonljus, regnvåta gator och dramatisk cel-shading. Hårdkokt industriell storstadsatmosfär.',
        },
        {
            name: 'Robot City',
            icon: <Robot />,
            description:
                'Futuristic robot city, neon lights, flying vehicles, cute helper robots, cozy sci-fi atmosphere, colorful holograms, child-friendly technology world, cinematic animation style, emotional storytelling, dynamic futuristic environments.',
            descriptionSv:
                'Futuristisk robotstad med neonljus, flygande fordon och söta hjälprobotar. Barnvänlig teknologivärld med colorglada hologram.',
        },
        {
            name: 'Superhero',
            icon: <Starfall />,
            description:
                'Massive animated superhero city, glowing stylized skyscrapers, flying child heroes, colorful energy powers, expressive animated characters, dramatic illustrated clouds, epic battles, emotional heroic atmosphere, vibrant comic-inspired animation style.',
            descriptionSv:
                'Animerad superhjältstad med lysande skyskrapor, flygande barnhjältar och färgglada krafter. Episka strider i seriestilsinspirerad animation.',
        },
        {
            name: 'Magic Forest Friends',
            icon: <Emoji>🧚</Emoji>,
            description:
                'Enchanted animated forest with glowing mushrooms and talking woodland creatures, soft dappled light through magical canopy, hand-painted watercolor textures, warm earthy tones, wonder-filled atmosphere, friendship-centered adventure, gentle magical energy throughout.',
            descriptionSv:
                'Förtrollad animerad skog med lysande svampar och pratande skogsdjur. Akvarellstrukturer och vänskapsfokuserat äventyr med mjuk magi.',
        },
        {
            name: 'Tiny Monster Party',
            icon: <Emoji>🎉</Emoji>,
            description:
                'Colorful animated world of friendly tiny monsters, oversized whimsical candy landscapes, playful chaos and silly creatures, bright neon colors, comic-style expressive faces, energetic party chaos, laugh-out-loud animated humor, joyful celebration adventure.',
            descriptionSv:
                'Färgglatt animerat världen av vänliga miniatyrmonster med kaotisk fest, neonljus och komiska uttrycksrika ansikten. Joyful äventyr.',
        },
        {
            name: 'Dino World Explorers',
            icon: <Emoji>🦕</Emoji>,
            description:
                'Bright animated prehistoric world, friendly cartoon dinosaurs with huge personalities, lush tropical jungles, giant colorful flowers, playful baby dinos, warm sunny atmosphere, discovery and wonder at every turn, joyful family adventure.',
            descriptionSv:
                'Ljusstark animerad förhistorisk värld med vänliga tecknade dinosaurier och tropiska djungler. Underbara upptäckter och glatt familjeäventyr.',
        },
        {
            name: 'Space Rangers Adventure',
            icon: <Emoji>🛸</Emoji>,
            description:
                'Colorful animated space opera, friendly alien planets with quirky inhabitants, small rocket ships and cute robot companions, bright neon nebulae, zero-gravity adventures, playful spacesuits, energetic heroic atmosphere, comic-style sci-fi world.',
            descriptionSv:
                'Färgglatt animerat rymdopera med quirky aliener, söta robotkompanjoner och lysande nebulosor. Lekfull hjältestämning i rymden.',
        },
        {
            name: 'Pirate Treasure Quest',
            icon: <Emoji>🏴‍☠️</Emoji>,
            description:
                'Swashbuckling animated pirate world, cartoon ships on sparkling seas, treasure maps with X marks the spot, friendly parrots and sea creatures, tropical island adventures, bold colors and expressive characters, fun action-packed discovery, joyful pirate crew atmosphere.',
            descriptionSv:
                'Tecknad pirateäventyr med segelfartyg på glänsande hav, skattkistor och vänliga papegojor. Djärva färger och actionfyllt äventyr.',
        },
        {
            name: 'Underwater Kingdom',
            icon: <Emoji>🐠</Emoji>,
            description:
                'Vibrant animated underwater world, colorful coral reefs and friendly sea creatures, shimmering light dancing through ocean water, fluid dreamy animation, playful dolphins and fish, bright aqua and gold color palette, magical ocean kingdom adventure.',
            descriptionSv:
                'Levande animerat undervattensvärld med färgglada korallrev, lekfulla delfiner och skimrande ljus. Magiskt havskungarike.',
        },
        {
            name: 'Fairy Tale Castle',
            icon: <Emoji>👸</Emoji>,
            description:
                'Classic fairy tale animation style, grand magical castle with glowing towers, enchanted ballrooms, friendly knights and baby dragons, sparkling spell effects, warm golden light, storybook illustration aesthetic, princess and hero adventure.',
            descriptionSv:
                'Klassisk sagaanimation med magiskt slott, förtrollade balrum och baby-drakar. Gyllene ljus och sagobokillustrationsestetik.',
        },
        {
            name: 'Animal Safari Adventure',
            icon: <Emoji>🦁</Emoji>,
            description:
                'Vibrant animated African savanna, colorful talking animals with big expressive eyes, sunny golden landscapes, acacia trees and wide open skies, playful lion cubs and towering giraffes, warm earthy tones, friendship-driven exploration adventure.',
            descriptionSv:
                'Levande animerad afrikansk savann med pratande djur och stora uttrycksfulla ögon. Lejonungar och giraffer i vänskapsdrivet äventyr.',
        },
        {
            name: 'Wild West Heroes',
            icon: <Emoji>🌵</Emoji>,
            description:
                'Animated American frontier, cartoon desert landscapes with rolling tumbleweeds, quirky western town characters, brave child cowboys and cowgirls, expressive animal companions, warm sunset colors, lighthearted frontier humor and heroism.',
            descriptionSv:
                'Animerat vilda väster med tecknade ökenlandskap, modiga barnkowboys och expressiva djurkompanjoner. Lättsam frontierhumor.',
        },
    ],
}
