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
            className={`${inter.variable} ${lora.variable} h-full antialiased`}
        >
            <head>
                <meta name="apple-mobile-web-app-title" content="Tales" />
            </head>
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    )
}
