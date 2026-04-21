# Sagolik — AI Storytelling PWA

A mobile-first PWA where parents upload a photo of their child, pick story preferences, and receive a short personalized animated video. The child becomes the hero of the story.

**Client:** Diversity Film AB (Mani Maserrat, Stockholm)
**Team:** 5 frontend developers, Hyper Island — 5-week project

---

## Tech Stack

- **Framework:** Next.js 16 + TypeScript (App Router)
- **Styling:** CSS Modules
- **UI Library:** Material UI v6
- **AI:** tbd
- **Deploy:** Vercel
- **Component library:** Storybook 10
- **Testing:** Vitest + Playwright (tbd)

---

## Getting Started

### Prerequisites

- Node.js 22+
- npm 10+

### Install dependencies

```bash
npm install
```

This also sets up Husky git hooks automatically via the `prepare` script.

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Run Storybook

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006)

---

## Available Scripts

| Command             | Description                |
| ------------------- | -------------------------- |
| `npm run dev`       | Start development server   |
| `npm run storybook` | Start Storybook dev server |

---

## Project Structure

```
src/
├── app/                  # Next.js App Router pages and layouts
│   ├── layout.tsx        # Root layout (fonts, MUI ThemeRegistry)
│   ├── globals.css       # Global styles and CSS variables
│   └── page.tsx          # Home page
│
├── components/           # Reusable UI components
│   └── ThemeRegistry/    # MUI SSR setup (do not remove)
│
├── hooks/                # Custom React hooks
├── services/             # API call functions (Claude, video, voiceover)
├── types/                # TypeScript interfaces and types
├── styles/               # Shared CSS Modules (if needed globally)
└── stories/              # Storybook stories (co-located with components or here)
```

---

## Code Conventions

See [CONTRIBUTING.md](CONTRIBUTING.md) for imports, naming, component structure, and tooling details.

---

## Git Workflow

- **Main branch is protected** — no direct pushes
- All changes go through a Pull Request
- PR requires 1 approval + CI checks passing
- CI runs on every PR: ESLint + Next.js build

---

## GDPR

No user data is stored server-side. Photos and generated videos are never saved. Consent screen is shown before any data is processed.
