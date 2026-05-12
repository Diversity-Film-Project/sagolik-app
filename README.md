# Sagolik — AI Storytelling PWA

A mobile-first PWA where parents upload a photo of their child, pick story preferences, and receive a short personalized animated video. The child becomes the hero of the story.

**Client:** Diversity Film AB (Mani Maserrat, Stockholm)
**Team:** 5 frontend developers, Hyper Island — 5-week project

**Deploy:** [sagolik-app.vercel.app](https://sagolik-app.vercel.app)

## Tech Stack

- **Framework:** Next.js 16 + TypeScript (App Router)
- **Styling:** CSS Modules
- **UI Library:** tbd
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

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `npm run dev`       | Start development server       |
| `npm run storybook` | Start Storybook dev server     |
| `npm run lint`      | Run ESLint across the codebase |
| `npm run build`     | Build the app for production   |

---

## Project Structure

```
src/
├── app/                        # Next.js App Router — pages only, no business
│   ├── layout.tsx              # Root layout (fonts, global providers)
│   ├── globals.css             # Global styles and CSS variables
│   ├── page.tsx                # Step 1 — Upload Photo
│   ├── preferences/
│   │   └── page.tsx            # Step 2 — Pick Preferences
│   ├── script/
│   │   └── page.tsx            # Step 3 — Script Preview
│   └── result/
│       └── page.tsx            # Step 4 — Video Result
│
├── components/
│   ├── ui/                     # reusable components (Button,Input)
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   └── Button.stories.ts
│   │   ├── Input/...
│   ├── common/                 # project-specific composed components
│   │   ├── StepsHeader/
│   │   ├── PhotoUploader/
│   └── layout/                 # Layout wrappers and templates
│       ├── StepLayout/
│
├── hooks/                      # Custom React hooks
├── services/                   # API calls (Gemini, fal.ai/Kling)
└── types/                      # Shared TypeScript interfaces and types
```

---

## Code Conventions

See [CONTRIBUTING.md](CONTRIBUTING.md) for imports, naming, component structure, and tooling details.

---

## Git Workflow

This is the standard workflow our team follows. Please use these rules to avoid merge conflicts and keep the repository clean.

- Main branch is protected — no direct pushes (available only in public repos on GitHub Free)
- All changes go through a Pull Request
- PR requires 1 approval + CI checks passing (ESLint + Next.js build)

### Rules for branches and pull requests

**1. Always start by updating main**

```bash
git checkout main
git pull
```

**2. Create your feature branch from updated main**

Name your branch according to your task:

```bash
git checkout -b feature/footer
```

**3. Do your work —> add, commit, push**

```bash
git add .
git commit -m "your message"
git push
```

**4. Before creating a Pull Request — sync with main**

```bash
# Switch to main and pull latest
git checkout main
git pull

# Go back to your branch
git checkout your-branch-name

# Merge updated main into your branch
git merge origin/main
```

If there are conflicts — resolve them carefully, make sure you do not break main's current logic.

```bash
# Commit the merge and push
git add .
git commit -m "merge: update branch from main"
git push
```

**5. Create a Pull Request in VS Code or GitHub**

---
