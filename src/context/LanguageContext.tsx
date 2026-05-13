'use client'

import { createContext, useState, useContext, useEffect } from 'react'
import { translations, type Lang } from '@/lib/translations'

interface LanguageContextType {
    lang: Lang
    setLang: (lang: Lang) => void
    t: (path: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

const STORAGE_KEY = 'sagolik_lang'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Lang>('en')

    useEffect(() => {
        const restore = async () => {
            await Promise.resolve()
            try {
                const stored = localStorage.getItem(STORAGE_KEY)
                if (stored === 'en' || stored === 'sv') setLangState(stored)
            } catch {
                // ignore
            }
        }
        restore()
    }, [])

    const setLang = (next: Lang) => {
        setLangState(next)
        try {
            localStorage.setItem(STORAGE_KEY, next)
        } catch {
            // ignore
        }
    }

    const t = (path: string): string => {
        const parts = path.split('.')
        let current: unknown = translations[lang]
        for (const part of parts) {
            current = (current as Record<string, unknown>)[part]
        }
        return current as string
    }

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context)
        throw new Error('useLanguage must be wrapped in a LanguageProvider')
    return context
}
