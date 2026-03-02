# FIGMA Integration Rules (MCP) — Project Analysis

This document is a codebase-grounded guide for integrating Figma designs into this repository using Model Context Protocol workflows.

## Snapshot

- **Stack:** React 19 + TypeScript + Vite 7 + Tailwind CSS v4
- **Architecture maturity:** Minimal app shell (single `App` component), no shared UI library yet
- **Styling model:** Tailwind utility classes in JSX + one global CSS entry importing Tailwind
- **Testing/quality:** ESLint + Playwright smoke tests + PR CI checks
- **Current design-system status:** No explicit design-token layer, no icon package, no asset pipeline, no Storybook

---

## 1) Token Definitions

### Current state (observed)

- There is **no dedicated token file** (no `tokens.json`, `tailwind.config.*`, theme module, or CSS variables file).
- Color/typography/spacing values are currently expressed through Tailwind utility classes directly in JSX.
- Tailwind is enabled through CSS-first import:

```css
/* src/index.css */
@import 'tailwindcss';
```

- Example token usage in component markup:

```tsx
/* src/App.tsx */
<main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6">
  <div className="max-w-xl text-center space-y-4">
    <h1 className="text-3xl font-semibold">React + TypeScript + Tailwind</h1>
    <p className="text-slate-300">Frontend project initialized successfully.</p>
  </div>
</main>
```

### Token format/structure

- **Effective format today:** Tailwind utility class names in JSX (`bg-slate-950`, `text-3xl`, `space-y-4`, etc.).
- **Token ownership today:** Tailwind default theme palette/scale (framework-provided), not app-defined custom tokens.

### Token transformation systems

- No token transformation pipeline is present (e.g., no Style Dictionary, no Token Studio export ingestion, no custom build transform).

### MCP rule for this repo

1. Prefer mapping Figma styles to existing Tailwind classes first.
2. If repeated values appear across multiple components, introduce project tokens in a single place before broad rollout.
3. Keep token additions centralized (one layer), avoid per-component ad hoc color values.

---

## 2) Component Library

### Current state (observed)

- UI components currently exist only as app-level composition in:
  - `src/App.tsx`
- No shared component directory (`src/components/`) exists yet.
- No Storybook or component docs site is present.

### Component architecture

- Function component architecture with React JSX.
- Current pattern is a single root page component rendered from `src/main.tsx`:

```tsx
/* src/main.tsx */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### MCP rule for this repo

1. When implementing Figma screens, extract reusable primitives early into `src/components/` if used 2+ times.
2. Keep page-level composition in `App`/feature entry files; keep visual primitives in components.
3. Name components by UI role (`HeroSection`, `PrimaryButton`, `Card`) rather than by Figma node ID.

---

## 3) Frameworks & Libraries

### UI framework

- **React 19** (`react`, `react-dom`)
- **TypeScript** (strict mode enabled)

### Styling libraries

- **Tailwind CSS v4** via `@tailwindcss/vite`
- `autoprefixer` and `postcss` are installed

### Build system and bundler

- **Vite 7** with React plugin + Tailwind plugin:

```ts
/* vite.config.ts */
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### Tooling supporting design implementation quality

- ESLint flat config (`eslint.config.js`)
- Playwright e2e smoke tests (`e2e/app-shell.spec.ts`)
- PR CI workflow (`.github/workflows/pr-checks.yml`)

---

## 4) Asset Management

### Current state (observed)

- No app asset folders are currently present (`src/assets/` not found in current tree).
- No image/video files were found in repository at scan time.
- App entry in `index.html` only mounts React root and loads `src/main.tsx`.

### How assets are referenced

- Current codebase does not demonstrate image/video imports yet.
- In Vite projects, expected patterns are:
  - Static import in TSX (`import hero from './assets/hero.png'`)
  - Public root references from `/public` when needed

### Optimization/CDN

- No explicit optimization pipeline configured (no image minification step, no CDN config).
- Deployment/CDN behavior is external to this repository currently.

### MCP rule for this repo

1. For Figma-exported assets, prefer SVG for icons and logos when possible.
2. Keep new assets in a predictable location (`src/assets/...`), grouped by feature.
3. Avoid embedding raster assets for simple vector shapes that can be recreated with CSS/Tailwind.

---

## 5) Icon System

### Current state (observed)

- No icon library dependency present (e.g., `lucide-react`, `heroicons`, `react-icons` not installed).
- No icon directory found in source tree.
- No icon naming convention established yet.

### MCP rule for this repo

1. If Figma designs require icons, choose one icon strategy and enforce consistency:
   - Preferred for speed: add a React icon package
   - Preferred for full control: local SVG components under `src/components/icons/`
2. Use semantic names (`IconSearch`, `IconChevronRight`) and consistent size API (`className`/`size`).
3. Do not mix multiple icon packs in the same feature unless required.

---

## 6) Styling Approach

### CSS methodology

- Utility-first Tailwind in JSX.
- No CSS Modules, Styled Components, Emotion, or Sass observed.

### Global styles

- Global stylesheet exists at `src/index.css` and currently only imports Tailwind.

### Responsive design

- Tailwind class approach supports responsive variants (`sm:`, `md:`, `lg:`), though current `App.tsx` is a simple centered layout with no explicit breakpoints.

### MCP rule for this repo

1. Convert Figma auto-layout constraints into Tailwind flex/grid + spacing utilities.
2. Use mobile-first responsive classes; avoid fixed pixel layouts unless unavoidable.
3. Keep global CSS minimal; prefer utilities and component composition.

---

## 7) Project Structure

### Current organization

```text
.
├─ src/
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ e2e/
│  └─ app-shell.spec.ts
├─ features/
│  ├─ FEATURE-home_page/FEATURE-SPEC.md
│  └─ FEATURE-testing/FEATURE-SPEC.md
├─ .github/workflows/pr-checks.yml
├─ vite.config.ts
├─ eslint.config.js
├─ playwright.config.ts
└─ package.json
```

### Feature organization pattern

- Feature requirements are documented in `features/FEATURE-*/FEATURE-SPEC.md`.
- Implementation code is currently centralized under `src/` rather than split by feature folders.

### MCP rule for this repo

1. Treat `features/FEATURE-*/FEATURE-SPEC.md` as the source of truth for scope.
2. For larger Figma-driven work, create feature folders in code (`src/features/<feature>/...`) aligned to feature spec names.
3. Keep tests close to UX outcomes (Playwright for app-shell/user-visible flows).

---

## Figma MCP Implementation Rules (Actionable)

Use this workflow when converting Figma designs into code in this repo:

1. **Fetch design context first**
   - Use MCP design-context tooling for the target node.
   - Treat generated code as reference; adapt to React + Tailwind conventions already used here.

2. **Map to existing stack conventions**
   - JSX function components
   - Tailwind utility classes
   - Minimal global CSS changes

3. **Normalize spacing/typography/colors**
   - Reuse Tailwind defaults where possible.
   - If Figma repeatedly introduces custom values, add a centralized token layer before scaling changes.

4. **Build components incrementally**
   - Start with page composition matching spec.
   - Extract reusable pieces into `src/components/` after repetition appears.

5. **Asset/icon decisions**
   - Prefer vectors (SVG/icons) over bitmap exports where feasible.
   - Add one icon system only when needed; avoid fragmentation.

6. **Validate integration**
   - Run lint + e2e smoke checks after integrating key Figma UI updates.
   - Keep assertions on stable, user-visible content.

---

## Quick Reference: Key Files

- App entry: `src/main.tsx`
- Root UI: `src/App.tsx`
- Global styles: `src/index.css`
- Build/plugins: `vite.config.ts`
- Toolchain deps/scripts: `package.json`
- Lint rules: `eslint.config.js`
- E2E config: `playwright.config.ts`
- Smoke tests: `e2e/app-shell.spec.ts`
- CI checks: `.github/workflows/pr-checks.yml`
- Feature requirements: `features/FEATURE-home_page/FEATURE-SPEC.md`, `features/FEATURE-testing/FEATURE-SPEC.md`

---

## Gaps to Address Before Large Figma Rollouts

1. Create explicit design token source (colors/type/spacing), then align Tailwind consumption.
2. Introduce shared component library folder and naming conventions.
3. Establish icon strategy and folder/package standard.
4. Add asset organization conventions (`src/assets/` by feature).
5. Optionally add component documentation (Storybook or lightweight MDX docs) once component count grows.
