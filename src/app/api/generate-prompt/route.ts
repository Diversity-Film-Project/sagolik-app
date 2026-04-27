import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { HarmCategory, HarmBlockThreshold } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
    const { characterName, storyTheme, sidekick } = await req.json()

    const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        safetySettings: [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            },
        ],
    })

    const prompt = `You are a prompt writer for a children's storytelling app. Content must be safe, gentle, and age-appropriate. Do not generate any violent, sexual, or bullying content under any circumstances.

Write a short video prompt for Kling AI (1-2 sentences, plain text) for a 15-second realistic cinematic video with the following details:
- Main hero: ${characterName} (appearance is defined by the reference photo)
- Story theme: ${storyTheme || 'any theme'}
- Sidekick: ${sidekick || 'no sidekick'}

Include sounds or music that matches the scene atmosphere.
Describe one single action happening in one specific location. Focus on what the camera sees: the hero doing something, the environment around them, and the camera angle. Realistic, cinematic style. No narration, no dialogue, no lighting details — just a concise visual scene description.`

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    return NextResponse.json({ prompt: text })
}
