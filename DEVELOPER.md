# Developer Guide

This document is for developers taking over or extending this project. It covers environment setup, API routes, architecture, and known limitations.

For code conventions, component structure, and tooling — see [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Environment Variables

Create a `.env.local` file in the project root. All three variables are required for the app to work in production.

| Variable         | Required | Description                                                                            |
| ---------------- | -------- | -------------------------------------------------------------------------------------- |
| `DEMO_PASSWORD`  | Yes      | Password for the demo access gate. Set any string. Users enter this on the login page. |
| `GEMINI_API_KEY` | Yes      | Google Gemini API key for story script generation.                                     |
| `FAL_KEY`        | Yes      | fal.ai API key for image upload and Kling video generation.                            |

### Where to get the keys

**`GEMINI_API_KEY`**

1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Sign in with a Google account
3. Click **Get API key** → **Create API key**
4. The free tier is sufficient for development

**`FAL_KEY`**

1. Go to [fal.ai](https://fal.ai) and create an account
2. Go to **Settings → API Keys**
3. Create a new key
4. Note: Kling 3.0 Pro video generation has a real cost per request (~$0.15–0.30 per video). The current account has a limited budget.

**`DEMO_PASSWORD`**
Set to any string, e.g. `demo2026`. Share with anyone who needs access to the demo.

### Vercel deployment

In Vercel project settings → **Environment Variables**, add all three variables. They are not committed to the repository.

---

## Architecture Overview

The app is a 4-step flow: **Upload → Preferences → Story → Result**.

```
User
  │
  ▼
Next.js App (client)
  │
  ├── StoryContext (React context)
  │     └── Persists to localStorage:
  │           finalPrompt, videoUrl, videoRequestId
  │
  ├── /upload       → photo stored as File in context (not persisted)
  ├── /preferences  → characterName, storyTheme, sidekick, videoStyle stored in context
  ├── /story        → calls /api/generate-prompt → Gemini API
  └── /result       → calls /api/generate-video  → fal.ai (upload) → Kling AI (generate)
                       then polls /api/generate-video?requestId=... until complete
```

**The app never stores data on its own servers.** It acts as a proxy:

- Photo is uploaded to fal.ai storage (temporary public URL, used only during generation)
- Generated video is hosted on fal.ai CDN
- Video history is stored in the user's browser localStorage only

---

## API Routes

### `POST /api/auth`

Demo access gate. Validates the password and sets a session cookie.

**Request body:**

```json
{ "password": "your-password" }
```

**Response:**

```json
{ "ok": true }
// or
{ "error": "Wrong password" }  // 401
```

**Cookie set on success:** `demo_auth` — httpOnly, 7-day expiry. Checked by middleware on every request.

---

### `POST /api/generate-prompt`

Generates a story script using Google Gemini.

**Request body:**

```json
{
    "characterName": "Emma",
    "storyTheme": "Dragon Adventure",
    "sidekick": "Dragon",
    "videoStyle": "animated",
    "themeDescription": "A brave child tames a friendly dragon",
    "customStory": ""
}
```

**Response:**

```json
{ "prompt": "Emma stood at the edge of the misty mountain..." }
// or
{ "error": "..." }  // 500 or 503
```

**Models used:**

- Primary: `gemini-2.5-flash`
- Fallback (on overload): `gemini-1.5-flash`

**Output is limited to ~1600 characters** — enforced on the client before sending to Kling. The full prompt sent to Kling = script + style note + `VIDEO_CONSTRAINTS` (from `src/lib/videoConstraints.ts`).

---

### `POST /api/generate-video`

Uploads the photo to fal.ai and submits a video generation job to Kling 3.0 Pro. Returns immediately with a `requestId` — does **not** wait for the video to finish.

**Request:** `multipart/form-data`
| Field | Type | Description |
|---|---|---|
| `image` | File | The child's photo (compressed to max 1200px before sending) |
| `prompt` | string | The story script |
| `videoStyle` | string | `"animated"` or `"realistic"` |
| `themeDescription` | string | Short visual description of the theme |

**Response:**

```json
{ "requestId": "abc123..." }
// or
{ "error": "..." }
```

---

### `GET /api/generate-video?requestId=...`

Polls the status of a video generation job.

**Response:**

```json
// Still processing:
{ "status": "processing" }

// Done:
{ "status": "completed", "videoUrl": "https://..." }

// Failed:
{ "status": "failed", "error": "..." }
```

**Client polling interval:** every 5 seconds, max 72 attempts (~6 minutes timeout).

---

## Key Implementation Details

### Mock / Production toggle

In `src/app/result/page.tsx` at the top:

```ts
const isMock = true // Uses a hardcoded video URL — no API calls, no cost
const isMock = false // Real generation — uses Gemini + Kling credits
```

**Always set `isMock = false` before shipping.** During development, keep it `true` to avoid burning API credits.

There are also two commented lines for testing the loading state UI:

```ts
const [isLoading, setIsLoading] = useState<boolean>(!isMock) // normal
// const [isLoading, setIsLoading] = useState<boolean>(true)  // force loading screen
```

---

### Resume capability

If the user refreshes the page during video generation, the job is not lost. The `videoRequestId` is persisted to localStorage via `StoryContext`. On next load, the result page detects it and resumes polling.

---

### Video history

Generated videos are saved to `localStorage` under the key `sagolik_history`. Each entry contains:

```ts
{
    id: string // timestamp
    videoUrl: string // fal.ai CDN URL
    characterName: string
    storyTheme: string
    finalPrompt: string
    createdAt: string // ISO date
}
```

**Important:** fal.ai CDN URLs may expire. If a video URL stops working, it cannot be recovered — the user needs to regenerate.

---

### Middleware (auth gate)

`src/middleware.ts` protects all routes except `/login` and `/api/auth`. It checks the `demo_auth` cookie against the `DEMO_PASSWORD` env var.

Static assets (`_next/`, `favicon.ico`, `logo.svg`, `images/`) are excluded from the matcher so they load on the login page.

To remove the password gate entirely — delete `src/middleware.ts` and `src/app/login/` and `src/app/api/auth/`.

---

### Image compression

Before sending to Kling, the photo is compressed in the browser (`src/lib/compressImage.ts`):

- Max dimension: 1200px
- Format: JPEG
- Quality: 85%

This reduces upload time and API costs.

---

## Known Limitations

| Issue                     | Details                                                                                                                                      |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **iOS video download**    | iOS Safari blocks programmatic downloads. The Download button opens the video in a new tab — user must long-press to save.                   |
| **Share button removed**  | Web Share API with video files had inconsistent behaviour across devices. Removed. Users should download and share manually.                 |
| **fal.ai CDN URL expiry** | Videos stored in History may stop playing if the CDN URL expires. No fix without storing videos elsewhere.                                   |
| **No cross-device sync**  | History is localStorage only — not available on other devices. By design for this demo.                                                      |
| **Gemini overload (503)** | Handled with a fallback model. If both fail, the user sees a retry button.                                                                   |
| **Single language**       | App is in English only. Swedish localisation was planned but not implemented. Recommended approach: `next-intl` (see discussion in project). |

---

## Services & External Dependencies

| Service                  | Used for                  | Docs                                   |
| ------------------------ | ------------------------- | -------------------------------------- |
| Google Gemini 2.5 Flash  | Story script generation   | [ai.google.dev](https://ai.google.dev) |
| Kling 3.0 Pro via fal.ai | Image-to-video generation | [fal.ai/models/kling](https://fal.ai)  |
| Vercel                   | Hosting & deployment      | [vercel.com](https://vercel.com)       |

---

## Project Structure (key files)

```
src/
├── app/
│   ├── api/
│   │   ├── auth/route.ts           ← demo password gate
│   │   ├── generate-prompt/route.ts ← Gemini integration
│   │   └── generate-video/route.ts  ← Kling/fal.ai integration
│   ├── login/page.tsx              ← password entry UI
│   ├── upload/page.tsx             ← Step 1
│   ├── preferences/page.tsx        ← Step 2
│   ├── story/page.tsx              ← Step 3 (script preview + edit)
│   ├── result/page.tsx             ← Step 4 (video generation + display)
│   └── history/page.tsx            ← saved videos
│
├── context/StoryContext.tsx        ← global state + localStorage persistence
├── middleware.ts                   ← auth gate (protects all routes)
├── services/
│   ├── generatePrompt.ts           ← client wrapper for /api/generate-prompt
│   └── generateVideo.ts            ← client wrapper for /api/generate-video (submit + poll)
└── lib/
    ├── compressImage.ts            ← browser-side image compression
    ├── shareVideo.ts               ← Web Share API (currently unused)
    └── videoConstraints.ts         ← quality/safety rules appended to every Kling prompt
```
