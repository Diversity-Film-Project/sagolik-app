import confetti from 'canvas-confetti'

export function fireConfetti() {
    confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.3 },
        colors: ['#FF6B00', '#FF8C42', '#FFB347', '#FFD700'],
    })
}
