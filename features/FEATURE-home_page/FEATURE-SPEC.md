# Feature Spec -> Home "Hero" Page

## Source of Truth
- Figma file: https://www.figma.com/design/6QsHElVju3cXecvhmzqHZ6/BAIS-3300?node-id=8-8&t=UsKcz6tZrfIOg4hu-4
- Target node: `8:8`

## Scope
- Build the **hero section** from node `8:8`.
- Include a minimal page shell using semantic tags: `header`, `main`, and `footer`.
- This feature is frontend-only for now.

## Functional Requirements (FR)
- **FR-01 (Tech stack):** Implementation must use React TSX + Tailwind CSS.
- **FR-02 (Design implementation):** UI must be derived from the specified Figma node using the Figma MCP workflow.
- **FR-03 (Semantic HTML):** Markup must use appropriate semantic HTML elements and avoid unnecessary wrapper-only `div` nesting.
- **FR-04 (Architecture):** Code must follow a modern, modular frontend structure with clear component boundaries and organization that can later support backend/API integration.
- **FR-05 (Global styles):** Define minimal global styles (e.g., font stack, base reset, and base body styling) consistent with Tailwind tokens and project conventions.
- **FR-06 (Code quality):** Code must be clean, readable, and maintainable (consistent naming, small focused components, and no dead code).
- **FR-07 (Responsive baseline):** Hero + shell must render correctly on common viewport sizes (mobile, tablet, desktop).
- **FR-08 (Accessibility baseline):** Use accessible structure and labels where needed (e.g., heading hierarchy, meaningful button/link text, alt text for informative images).

## Out of Scope
- Backend implementation, API integration, and data persistence.
- Additional pages/routes beyond the home hero page shell.
- Advanced theming systems (e.g., full light/dark mode framework) beyond minimal global defaults.

## Implementation Plan
---
***Checkpoint 1: Figma Extraction + Semantic Content Map***
- [x] Use Figma MCP on node `8:8` to capture hero content, hierarchy, and layout intent.
- [x] Translate the design into a semantic element map for `header`, `main`, and `footer` (no div-soup).
- [x] Record explicit component boundaries for a modular frontend structure that can later consume API data.
- [x] A test: run `pnpm lint:nix` and confirm no lint violations after introducing initial semantic structure stubs.

### Checkpoint 1 Notes (2026-02-25)
- **Figma extraction source:** node `8:8` from file `6QsHElVju3cXecvhmzqHZ6` via Figma MCP (`get_design_context` + `get_metadata`).
- **Observed content hierarchy:** top utility row (menu, brand, cart CTA), hero heading + intro copy, current collection feature card ("Current Collection" + "FW 26"), previous collections row ("SS25", "FW25", "SS24"), bottom nav labels ("Home", "Collections", "Orders").
- **Semantic map (initial):**
	- `header` -> primary nav with menu action, brand text, cart action.
	- `main` -> hero section (`h1` + intro paragraph), current collection card (`h2` + season label), previous collections list (`h2` + list of collection chips/cards).
	- `footer` -> secondary navigation for Home/Collections/Orders.
- **Initial component boundaries (in-file, ready for extraction):** `AppHeader`, `HeroSection`, and `AppFooter` in `src/App.tsx`.
- **Architecture intent:** preserve clean boundaries so hero data (titles, descriptions, collection items, navigation destinations) can later be replaced by API-backed props/state without restructuring semantic landmarks.

***Checkpoint 2: Shell + Hero TSX Structure***
- [x] Implement the minimal app shell and hero in `src/App.tsx` using React TSX and semantic tags.
- [x] Keep sections and JSX cleanly organized for future extraction into dedicated components/files.
- [x] Ensure heading and CTA/content ordering reflects the Figma hierarchy and accessibility baseline.
- [x] A test: update/add e2e assertions in `e2e/app-shell.spec.ts` for shell landmarks and hero primary heading; run `pnpm test:e2e:nix`.

### Checkpoint 2 Notes (2026-02-25)
- **Shell + hero structure status:** semantic shell (`header`, `main`, `footer`) and hero hierarchy remain implemented via modular home feature components (`HomeHeader`, `HeroSection`, `HomeFooter`) routed from the app entry.
- **E2E updates:** `e2e/app-shell.spec.ts` now asserts `banner`, `main`, and `contentinfo` landmarks and validates the hero `h1` text (`Obsidian Artifact Co.`).
- **Validation:** `pnpm test:e2e:nix` executed successfully with both configured Playwright projects passing.

***Checkpoint 3: Tailwind Styling + Global Base Styles***
- [x] Implement hero and shell styling with Tailwind utility classes aligned to the Figma visual intent.
- [x] Add minimal global styles in `src/index.css` (font stack, base reset, and body defaults) using project conventions.
- [x] Verify styling avoids hard-coded design-system drift and remains maintainable.
- [x] A test: run `pnpm build` to validate production compilation and CSS processing, then run `pnpm lint:nix`.

### Checkpoint 3 Notes (2026-03-02)
- **Visual direction:** applied a warm stone palette with glass-like header/footer shells, a dark featured collection panel, and archive cards that preserve the Figma-inspired editorial hierarchy without introducing a new design system.
- **Global base styles:** `src/index.css` now defines shared font stacks, background/text tokens, box-sizing reset, body defaults, and root sizing so Tailwind classes can consume stable CSS variables instead of repeated hard-coded values.
- **Maintainability:** styling remains localized to `HomeHeader`, `HeroSection`, `HomeFooter`, and `HomePage`, preserving the branch's component boundaries for later extraction or API-backed content.
- **Validation:** `pnpm build` completed successfully inside `nix develop`; `pnpm lint:nix` was launched in the same environment and produced no lint errors before exit.

***Checkpoint 4: Responsive + Accessibility Hardening***
- [x] Add responsive Tailwind adjustments for mobile, tablet, and desktop behavior of shell + hero.
- [x] Ensure baseline accessibility requirements are met (logical heading order, meaningful text, alt text where applicable).
- [x] Keep implementation limited to current feature scope without adding extra pages/components.
- [x] A test: extend e2e checks for at least one desktop and one mobile project expectation, then run `pnpm test:e2e:nix`.

### Checkpoint 4 Notes (2026-03-02)
- **Responsive behavior:** the hero intro, feature panel, archive cards, and image selector now adapt across mobile, tablet, and desktop layouts with explicit breakpoint changes rather than relying on default wrapping.
- **Accessibility hardening:** the current collection card now exposes descriptive `aria-describedby` content, a polite live region for the active slide, preserved heading order, and clearer navigation state via `aria-current` on the footer home link.
- **Scope control:** changes stayed within the existing homepage shell/components and Playwright spec; no additional routes or unrelated feature work were introduced.
- **Validation:** `pnpm lint:nix` and `pnpm test:e2e:nix` both completed successfully inside `nix develop`, with 6 Playwright checks passing across `mobile-chromium` and `desktop-chromium`.

***Checkpoint 5: Final Verification + Spec Sync***
- [ ] Run full pre-PR validation for this feature branch.
- [ ] Confirm FR-01 through FR-08 are each satisfied by implemented code and test coverage.
- [ ] Update this checklist progress (`[ ]` to `[x]`) checkpoint-by-checkpoint as commits land.
- [ ] A test: run `pnpm check:pr:nix` as the final gate before opening a PR.
