'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function AutoRedirect({ to, delay }: { to: string; delay: number }) {
    const router = useRouter()
    useEffect(() => {
        const timer = setTimeout(() => router.push(to), delay)
        return () => clearTimeout(timer)
    }, [router, to, delay])
    return null
}
