'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import styles from './ThemeSelector.module.css'
import { IconCard } from '../IconCard/IconCard'
import { useStory } from '@/context/StoryContext'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'
import { THEMES, Emoji, type ThemeProp } from '@/lib/themes'
import { useLanguage } from '@/context/LanguageContext'

const CARDS_PER_SLIDE = 6

type CardItem = { type: 'theme'; theme: ThemeProp } | { type: 'custom' }

function chunkArray<T>(arr: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size),
    )
}

interface ThemeSelectorProps {
    style: 'animated' | 'realistic'
}

export function ThemeSelector({ style }: ThemeSelectorProps) {
    const { storyData, updateStoryData } = useStory()
    const { lang, t } = useLanguage()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [draft, setDraft] = useState('')

    const selectedTheme = THEMES[style]?.find(
        (theme) => theme.name === storyData.storyTheme,
    )
    const isCustomSelected = Boolean(storyData.customStory)

    const handleOpenModal = () => {
        setDraft(storyData.customStory || '')
        setIsModalOpen(true)
    }

    const handleSave = () => {
        const trimmed = draft.trim()
        updateStoryData({
            customStory: trimmed,
            storyTheme: trimmed ? '' : storyData.storyTheme,
            themeDescription: trimmed ? '' : storyData.themeDescription,
        })
        setIsModalOpen(false)
    }

    const handleClose = () => {
        setIsModalOpen(false)
    }

    const allCards: CardItem[] = [
        { type: 'custom' },
        ...(THEMES[style]?.map((theme) => ({
            type: 'theme' as const,
            theme,
        })) ?? []),
    ]
    const slides = chunkArray(allCards, CARDS_PER_SLIDE)

    return (
        <div className={styles.flexWrapper}>
            <h2>{t('preferences.storyWorlds')}</h2>

            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                className={styles.swiper}
            >
                {slides.map((chunk, slideIndex) => (
                    <SwiperSlide key={slideIndex}>
                        <div className={styles.slideGrid}>
                            {chunk.map((card) =>
                                card.type === 'custom' ? (
                                    <IconCard
                                        key="custom"
                                        icon={<Emoji>✍️</Emoji>}
                                        label={t('preferences.yourStory')}
                                        isSelected={isCustomSelected}
                                        onClick={handleOpenModal}
                                    />
                                ) : (
                                    <IconCard
                                        key={card.theme.name}
                                        icon={card.theme.icon}
                                        label={card.theme.name}
                                        isSelected={
                                            storyData.storyTheme ===
                                            card.theme.name
                                        }
                                        onClick={() =>
                                            updateStoryData({
                                                storyTheme: card.theme.name,
                                                themeDescription:
                                                    card.theme.description,
                                                customStory: '',
                                            })
                                        }
                                    />
                                ),
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={styles.descriptionArea}>
                <p
                    className={`${styles.themeDescription} ${!selectedTheme && !isCustomSelected ? styles.themeDescriptionPlaceholder : ''}`}
                >
                    {selectedTheme
                        ? (lang === 'sv' && selectedTheme.descriptionSv) ||
                          selectedTheme.description
                        : isCustomSelected
                          ? storyData.customStory
                          : t('preferences.themeSelectHint')}
                </p>
            </div>

            {isModalOpen && (
                <div className={styles.backdrop} onClick={handleClose} />
            )}
            <div
                className={`${styles.bottomSheet} ${isModalOpen ? styles.bottomSheetOpen : ''}`}
            >
                <div className={styles.bottomSheetHeader}>
                    <span className={styles.bottomSheetTitle}>
                        {t('preferences.customSheetTitle')}
                    </span>
                    <button
                        className={styles.bottomSheetCloseBtn}
                        onClick={handleClose}
                        title="Close"
                    >
                        <X size={20} />
                    </button>
                </div>
                <textarea
                    className={styles.bottomSheetTextarea}
                    placeholder={t('preferences.customPlaceholder')}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                />
                <Button
                    label={t('common.save')}
                    variant="save"
                    onClick={handleSave}
                />
            </div>
        </div>
    )
}
