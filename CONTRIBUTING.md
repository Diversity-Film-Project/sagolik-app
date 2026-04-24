# Contributing Guide (to be updated)

Project conventions, tooling notes etc.

---

## Imports

Always use path aliases — never relative paths going up more than one level.

```ts
// Good
import { Button } from '@/components/Button/Button'
import { useStory } from '@/hooks/useStory'
import type { Story } from '@/types/story'

// Bad
import { Button } from '../../components/Button/Button'
```

Alias `@/` maps to `src/` (configured in `tsconfig.json`).

---

## Components

- One component per file
- File name matches component name: `Button.tsx`, not `button.tsx`
- CSS Module file lives next to the component: `Button.module.css`
- Export as named export, not default (easier to refactor and find in IDEs)
- **Exception:** `app/**/page.tsx` and `app/**/layout.tsx` use `export default` — required by Next.js

```tsx
// Components — named export (why? Enforces a single consistent name across the codebase. IDEs auto-suggest the correct import — no accidental renaming.)
export function Button({ label }: ButtonProps) { ... }

// Pages — default export (why? Required by Next.js. The framework imports page files internally and expects a default export. This is not a style choice.)

export default function UploadPhotoPage() { ... }
```

---

## Styling

CSS Modules only — no inline styles, no Tailwind, no styled-components.

```tsx
import styles from './Button.module.css'

export function Button({ label }: ButtonProps) {
    return <button className={styles.root}>{label}</button>
}
```

Global CSS variables (design tokens) go in `src/app/globals.css`.

Material UI components can be used directly. To override MUI styles, use CSS Modules with the `sx` prop or MUI `theme` — not inline styles.

---

## TypeScript

- All props must be typed — no `any`
- Interfaces go in `src/types/` if shared across multiple files, or at the top of the component file if used only there
- Use `type` for object shapes, `interface` for extendable component props

```ts
// Shared type
// src/types/story.ts
export type Story = {
    id: string
    title: string
    theme: 'adventure' | 'friendship' | 'magic'
}

// Local props
interface ButtonProps {
    label: string
    onClick: () => void
    disabled?: boolean
}
```

---

## Storybook

Every component in `src/components/` should have a story.

Story file lives next to the component:

```
src/components/Button/
├── Button.tsx
├── Button.module.css
└── Button.stories.ts
```

Minimum: one `Default` story. Add more stories for meaningful variants (disabled, loading, error states).

---

## API calls

All external API calls go in `src/services/`. Never call APIs directly from components.

```ts
// src/services/script.ts
export async function generateScript(prompt: string): Promise<string> { ... }
```

Use Next.js API Routes (`src/app/api/`) as a proxy for third-party APIs (Claude, ElevenLabs, Kling) — never expose API keys to the client.

---

## Server vs Client Components

Next.js App Router uses Server Components by default. Add `'use client'` only when you need:

- `useState` / `useEffect` / other hooks
- Browser APIs
- Event listeners

Keep `'use client'` boundary as low in the tree as possible.

---

## Tooling

### Format on save

Prettier runs automatically on save in VS Code (configured in `.vscode/settings.json`).
Requires the **Prettier** extension (`esbenp.prettier-vscode`).

### Pre-commit hook

Husky + lint-staged runs Prettier and ESLint `--fix` on staged `.ts` and `.tsx` files before every commit. Installed automatically with `npm install`.

### CI

GitHub Actions runs `npm run lint` and `npm run build` on every PR to `main`. PR cannot be merged if either check fails.
