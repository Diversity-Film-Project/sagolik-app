'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StarBackground } from '@/components/common/StarBackground/StarBackground'
import { Button } from '@/components/ui/Button/Button'
import Image from 'next/image'
import styles from './page.module.css'

export default function LoginPage() {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!password || loading) return

        setLoading(true)
        setError(null)

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            })

            if (res.ok) {
                router.push('/')
                router.refresh()
            } else {
                setError('Incorrect password. Try again.')
                setPassword('')
            }
        } catch {
            setError('Something went wrong. Try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.page}>
            {/* Background */}
            <StarBackground />
            <div className={styles.card}>
                <div className={styles.logoWrap}>
                    <Image
                        src="/logo.svg"
                        alt="Tales logo"
                        width={108}
                        height={108}
                    />
                </div>
                <div className={styles.logoRow}>
                    <span className={styles.logo}>Tales</span>
                    <span className={styles.dot}></span>
                </div>
                <p className={styles.subtitle}>Demo access</p>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="Enter access code"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        autoFocus
                    />
                    {error && <p className={styles.error}>{error}</p>}
                    <Button
                        label={loading ? 'Checking…' : 'Continue'}
                        type="submit"
                        variant="primary"
                        disabled={!password || loading}
                    />
                </form>
            </div>
        </div>
    )
}
