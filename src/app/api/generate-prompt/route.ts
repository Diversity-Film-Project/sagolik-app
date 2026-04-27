import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
    const { heroName, theme, sidekick } = await req.json()

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `Create a short children's story prompt (2-3 sentences) for a personalized story with the following details:
- Main hero: ${heroName}
- Story theme: ${theme}
- Sidekick: ${sidekick}

The prompt should describe the setting, the hero's goal, and hint at an adventure. Write it in a warm, imaginative tone suitable for young children.`

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    return NextResponse.json({ prompt: text })
}
