import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import './globals.css'

const inter = Inter({
    variable: '--font-primary',
    subsets: ['latin'],
    weight: ['400', '500', '600'],
})

const lora = Lora({
    variable: '--font-secondary',
    subsets: ['latin'],
    weight: ['400', '600'],
})

export const metadata: Metadata = {
    title: 'Tales',
    description: 'Personalised stories for your child',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${lora.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    )
}
