import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
// todo: handle errors properly and display to user (currently just console.log)
// todo: solution for error 500/503 (Gemini overload) and 429 (too many requests) — partially done: fallback to gemini-1.5-flash

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const SAFETY_SETTINGS = [
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
]

// Fallback order: if primary model returns 503/429, try the next one
const MODELS = ['gemini-2.5-flash', 'gemini-1.5-flash']

function isOverloaded(err: unknown): boolean {
    const msg = err instanceof Error ? err.message : String(err)
    return (
        msg.includes('503') || msg.includes('429') || msg.includes('overloaded')
    )
}

async function generateWithFallback(prompt: string): Promise<string> {
    for (const modelName of MODELS) {
        const model = genAI.getGenerativeModel({
            model: modelName,
            safetySettings: SAFETY_SETTINGS,
        })
        try {
            const result = await model.generateContent(prompt)
            return result.response.text()
        } catch (err) {
            if (isOverloaded(err) && modelName !== MODELS[MODELS.length - 1]) {
                continue
            }
            throw err
        }
    }
    throw new Error('All models unavailable')
}

export async function POST(req: NextRequest) {
    const {
        characterName,
        storyTheme,
        sidekick,
        videoStyle,
        themeDescription,
        customStory,
    } = await req.json()

    const storyInput = customStory
        ? `- Custom story idea: ${customStory}`
        : `- Story theme: ${storyTheme || 'any adventure theme'}`

    const prompt = `You are a prompt writer for a children's AI video storytelling app. Content must be safe, gentle, and age-appropriate. Never generate violent, sexual, or threatening content.

Write a structured 15-second video prompt for Kling AI with the following inputs:
- Hero name: ${characterName} (appearance comes from a reference photo — describe actions and emotions only, not appearance)
${storyInput}
- Sidekick: ${sidekick || 'none'}
- Visual style: ${videoStyle || 'realistic cinematic'}${themeDescription ? ` — ${themeDescription}` : ''}

${characterName} (based on reference photo) is clearly visible from the very first frame. Describe their role in this story and where they are. Include sidekick if provided. Start with a close or medium shot — no slow establishing intro.

The video must follow this 4-part structure (15 seconds total):

1. OPENING (0-4 sec):
${characterName} is already in the scene from frame one. Describe the setting, atmosphere, and what ${characterName} is doing. No assumptions about mood — let the theme guide it. No static shots.

2. DEVELOPMENT (4-9 sec):
Something happens that moves the story forward — it can be an encounter, a discovery, a change in environment, or any event that fits the theme naturally. Describe what ${characterName} and the sidekick (if any) experience.

3. KEY MOMENT (9-13 sec):
The story reaches its most vivid point. Describe the action or atmosphere in detail. Camera work and pacing should match the mood of the story — calm or dynamic, as appropriate.

4. CLOSING (13-15 sec):
The story settles into its ending. Describe the final image and atmosphere. Sound and music fade out gradually over these last seconds — ending should feel complete, not abrupt.

Style: ${themeDescription || videoStyle || 'Realistic cinematic'}. Let the chosen theme and style define the visual language — do not apply a generic tone.

Output rules:
- Plain text only — no asterisks, no markdown, no bold, no special symbols
- Keep your response under 1600 characters (style notes and video constraints are added separately, total must not exceed 2500)
- Return ONLY the 4-part story script. No constraints list, no style notes, no meta-commentary.`

    try {
        const text = await generateWithFallback(prompt)
        return NextResponse.json({ prompt: text })
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        const status = isOverloaded(err) ? 503 : 500
        return NextResponse.json({ error: message }, { status })
    }
}
