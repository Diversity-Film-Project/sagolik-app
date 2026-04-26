'use client'

// background canvas - from Claude design mockup

import { useEffect, useRef } from 'react'

export function StarCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const stars = Array.from({ length: 130 }, () => ({
            x: Math.random(),
            y: Math.random(),
            r: Math.random() * 1.4 + 0.3,
            speed: Math.random() * 0.0015 + 0.002,
            phase: Math.random() * Math.PI * 2,
        }))

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        let animId: number
        const draw = (t: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            stars.forEach((s) => {
                const opacity =
                    0.05 +
                    0.95 * (0.5 + 0.5 * Math.sin(t * s.speed * 0.15 + s.phase))
                ctx.beginPath()
                ctx.arc(
                    s.x * canvas.width,
                    s.y * canvas.height,
                    s.r,
                    0,
                    Math.PI * 2,
                )
                ctx.fillStyle = `rgba(255,255,255,${opacity})`
                ctx.fill()
            })
            animId = requestAnimationFrame(draw)
        }
        animId = requestAnimationFrame(draw)

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    )
}
