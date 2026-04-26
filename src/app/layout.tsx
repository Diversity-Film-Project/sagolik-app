import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter, Lora } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
})

const lora = Lora({
    variable: '--font-lora',
    subsets: ['latin'],
})

// todo : fix description

export const metadata: Metadata = {
    title: 'Tales',
    description:
        'Create personalized AI-generated stories where your child becomes the hero. Upload a photo, pick a theme, and watch your family story come to life.',
    keywords: [
        'personalized children stories',
        'AI story generator',
        'kids storytelling app',
        'family stories',
        'children video generator',
        'personalized kids content',
    ],
    openGraph: {
        title: 'Tales — Your Child is the Hero',
        description:
            'Create personalized AI-generated stories where your child becomes the hero.',
        type: 'website',
        locale: 'en_US',
        siteName: 'Tales',
        // todo: add og:image - preview image for social media sharing
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tales — Your Child is the Hero',
        description:
            'Create personalized AI-generated stories where your child becomes the hero.',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${lora.variable} h-full antialiased`}
        >
            <head>
                <meta name="apple-mobile-web-app-title" content="Tales" />
            </head>
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    )
}
