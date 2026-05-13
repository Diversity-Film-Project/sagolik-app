'use client'
// Step 3 — Script Preview
import { useState, useEffect, useRef } from 'react'
import { PageLayout } from '@/components/layout/PageLayout/PageLayout'
import { Button } from '@/components/ui/Button/Button'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import { useRouter } from 'next/navigation'
import { useStory } from '@/context/StoryContext'
import { generatePrompt } from '@/services/generatePrompt'
import { Textarea } from '@/components/ui/Textarea/Textarea'
import { RefreshCw, Pencil, Check } from 'lucide-react'
import { fireConfetti } from '@/lib/fireConfetti'
import { buildParamsKey } from '@/lib/buildParamsKey'
import { VIDEO_CONSTRAINTS } from '@/lib/videoConstraints'
import { ConfirmModal } from '@/components/common/ConfirmModal/ConfirmModal'
import { useLanguage } from '@/context/LanguageContext'
import styles from './page.module.css'

// Max characters for the user-visible script (styleNote + VIDEO_CONSTRAINTS take the remaining ~900 chars up to Kling's 2500 limit)
const MAX_SCRIPT_LENGTH = 1600

export default function ScriptPage() {
    const router = useRouter()
    const { storyData, updateStoryData } = useStory()
    const { lang, t } = useLanguage()
    const [isLoading, setIsLoading] = useState(!storyData.finalPrompt)
    const [isEditing, setIsEditing] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showConfirm, setShowConfirm] = useState(false)
    const hasFetched = useRef(false)

    const scriptLength = storyData.finalPrompt.length
    const isOverLimit = scriptLength > MAX_SCRIPT_LENGTH

    const runGenerate = () => {
        setIsLoading(true)
        setIsEditing(false)
        setError(null)
        generatePrompt(
            storyData.characterName,
            storyData.storyTheme,
            storyData.sidekick,
            storyData.videoStyle,
            storyData.themeDescription,
            storyData.customStory,
            lang,
        )
            .then((result) => {
                updateStoryData({
                    generatedPrompt: result,
                    finalPrompt: result,
                    promptParamsKey: buildParamsKey(storyData),
                })
                setIsLoading(false)
                fireConfetti()
                // eslint-disable-next-line no-console
                console.log(
                    '=== FULL PROMPT FOR KLING AI ===\n' +
                        result +
                        VIDEO_CONSTRAINTS,
                )
            })
            .catch((err: Error) => {
                setIsLoading(false)
                setError(err.message)
            })
    }

    useEffect(() => {
        if (hasFetched.current) return
        hasFetched.current = true

        if (!storyData.photo || !storyData.characterName) {
            router.push('/upload')
            return
        }

        if (storyData.finalPrompt) return

        generatePrompt(
            storyData.characterName,
            storyData.storyTheme,
            storyData.sidekick,
            storyData.videoStyle,
            storyData.themeDescription,
            storyData.customStory,
            lang,
        )
            .then((result) => {
                updateStoryData({
                    generatedPrompt: result,
                    finalPrompt: result,
                    promptParamsKey: buildParamsKey(storyData),
                })
                setIsLoading(false)
                fireConfetti()
                // eslint-disable-next-line no-console
                console.log(
                    '=== FULL PROMPT FOR KLING AI ===\n' +
                        result +
                        VIDEO_CONSTRAINTS,
                )
            })
            .catch((err: Error) => {
                setIsLoading(false)
                setError(err.message)
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const pageTitle = isLoading
        ? t('story.loadingTitle')
        : error
          ? t('story.errorTitle')
          : t('story.readyTitle')

    const description = isLoading
        ? t('story.loadingDesc')
        : error
          ? t('story.errorDesc')
          : t('story.readyDesc')

    const charCountText = t('story.charCount')
        .replace('{n}', String(scriptLength))
        .replace('{max}', String(MAX_SCRIPT_LENGTH))

    return (
        <PageLayout currentStep={3}>
            <div className={styles.margin}>
                <PageTitle
                    text={pageTitle}
                    description={description}
                    animated={isLoading}
                />
                {isLoading ? (
                    <div className={styles.skeleton}>
                        <p className={styles.skeletonText}>
                            {t('story.skeletonText')}
                        </p>
                        <div className={styles.skeletonLine} />
                        <div className={styles.skeletonLine} />
                        <div
                            className={`${styles.skeletonLine} ${styles.skeletonLineShort}`}
                        />
                    </div>
                ) : error ? (
                    <div className={styles.errorBlock}>
                        <p className={styles.errorMessage}>{error}</p>
                        <p className={styles.errorHint}>
                            {t('story.errorHint')}
                        </p>
                        <button
                            className={styles.retryButton}
                            onClick={runGenerate}
                            title={t('common.tryAgain')}
                        >
                            <RefreshCw size={25} />
                        </button>
                    </div>
                ) : isEditing ? (
                    <Textarea
                        value={storyData.finalPrompt}
                        onChange={(e) =>
                            updateStoryData({ finalPrompt: e.target.value })
                        }
                    />
                ) : (
                    <div className={styles.markdownView}>
                        {storyData.finalPrompt}
                    </div>
                )}
                {!isLoading && !error && storyData.finalPrompt && (
                    <p
                        className={`${styles.charCount} ${isOverLimit ? styles.charCountOver : ''}`}
                    >
                        {charCountText}
                        {isOverLimit && t('story.charCountOver')}
                    </p>
                )}
                <div className={styles.editButtonWrapper}>
                    <Button
                        variant="regenerate"
                        onClick={runGenerate}
                        label={t('story.regenerate')}
                        icon={<RefreshCw size={16} />}
                    />
                    {isEditing ? (
                        <Button
                            variant="save"
                            onClick={() => setIsEditing(false)}
                            label={t('common.save')}
                            icon={<Check size={16} />}
                        />
                    ) : (
                        <Button
                            variant="outlined"
                            onClick={() => setIsEditing(true)}
                            label={t('common.edit')}
                            icon={<Pencil size={16} />}
                        />
                    )}
                </div>

                <div className={styles.buttonWrapper}>
                    <Button
                        label={t('common.continue')}
                        disabled={isLoading || !!error || isOverLimit}
                        onClick={() => setShowConfirm(true)}
                    />
                    <Button
                        label={t('common.back')}
                        variant="secondary"
                        onClick={() => router.push('/preferences')}
                    />
                </div>
            </div>

            {showConfirm && (
                <ConfirmModal
                    title={t('story.confirmTitle')}
                    confirmLabel={t('story.confirmButton')}
                    cancelLabel={t('story.confirmCancel')}
                    onConfirm={() => router.push('/result')}
                    onCancel={() => setShowConfirm(false)}
                >
                    <p className={styles.modalText}>
                        {t('story.confirmBody')}{' '}
                        <strong>{t('story.confirmBodyBold')}</strong>{' '}
                        {t('story.confirmBodyEnd')}
                    </p>
                    <p className={styles.modalLabel}>
                        {t('story.confirmLabel')}
                    </p>
                    <ul className={styles.modalList}>
                        <li>
                            {t('story.confirmCheck1')}{' '}
                            <strong>{t('story.confirmCheck1Bold')}</strong>{' '}
                            {t('story.confirmCheck1End')}
                        </li>
                        <li>
                            {t('story.confirmCheck2')}{' '}
                            <strong>{t('story.confirmCheck2Bold')}</strong>{' '}
                            {t('story.confirmCheck2End')}
                        </li>
                    </ul>
                    <p className={styles.modalText}>
                        {t('story.confirmFooter')}
                    </p>
                </ConfirmModal>
            )}
        </PageLayout>
    )
}
