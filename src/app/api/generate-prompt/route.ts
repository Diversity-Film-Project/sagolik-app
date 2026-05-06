import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { HarmCategory, HarmBlockThreshold } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
    const { characterName, storyTheme, sidekick, videoStyle } = await req.json()

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

    const prompt = `You are a prompt writer for a children's AI video storytelling app. Content must be safe, gentle, and age-appropriate. Never generate violent, sexual, or threatening content.

Write a structured 15-second video prompt for Kling AI with the following inputs:
- Hero name: ${characterName} (appearance comes from a reference photo — describe actions and emotions only, not appearance)
- Story theme: ${storyTheme || 'any adventure theme'}
- Sidekick: ${sidekick || 'none'}
- Visual style: ${videoStyle || 'realistic cinematic'}

Fill in EXACTLY this 4-part structure. Each section must describe only what the camera sees — no narration, no dialogue. Be specific: location, what ${characterName} is doing, atmosphere, sound or music cues.

**${characterName} (based on reference photo) is clearly visible from the very first frame. [Describe their role in this story and where they are.] [Include sidekick if provided.] Start with a close or medium shot — no slow establishing intro.**

**The video must follow this 4-part structure (15 seconds total):**

**1. OPENING (0–4 sec):**
[${characterName} is already in the scene from frame one. Describe the setting, atmosphere, and what ${characterName} is doing. No assumptions about mood — let the theme guide it. No static shots.]

**2. DEVELOPMENT (4–9 sec):**
[Something happens that moves the story forward — it can be an encounter, a discovery, a change in environment, or any event that fits the theme naturally. Describe what ${characterName} and the sidekick (if any) experience.]

**3. KEY MOMENT (9–13 sec):**
[The story reaches its most vivid point. Describe the action or atmosphere in detail. Camera work and pacing should match the mood of the story — calm or dynamic, as appropriate.]

**4. CLOSING (13–15 sec):**
[The story settles into its ending. Describe the final image and atmosphere. Sound and music fade out gradually over these last seconds — ending should feel complete, not abrupt.]

**Style:**
${videoStyle || 'Realistic cinematic'}. Let the chosen theme and style define the visual language — do not apply a generic tone.

**Important constraints:**
- ${characterName} must appear in the first second and remain the visual focus throughout
- Each scene transition must be logical — no unexplained location jumps or sudden appearances
- Describe only what is visible on screen — no internal thoughts or narration
- Keep the content safe and age-appropriate
- Audio and music must fade out gradually in the CLOSING section
- The generated video must follow this script precisely — do not introduce actions or characters not described here

Return ONLY the story script using the 4-part structure above. Do not include the constraints list, style notes, or any meta-commentary in your response.`

    try {
        const result = await model.generateContent(prompt)
        const text = result.response.text()
        return NextResponse.json({ prompt: text })
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        const status = message.includes('503')
            ? 503
            : message.includes('429')
              ? 429
              : 500
        return NextResponse.json({ error: message }, { status })
    }
}
