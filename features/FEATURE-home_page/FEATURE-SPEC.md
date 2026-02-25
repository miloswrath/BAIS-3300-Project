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
- [ ] Implement the minimal app shell and hero in `src/App.tsx` using React TSX and semantic tags.
- [ ] Keep sections and JSX cleanly organized for future extraction into dedicated components/files.
- [ ] Ensure heading and CTA/content ordering reflects the Figma hierarchy and accessibility baseline.
- [ ] A test: update/add e2e assertions in `e2e/app-shell.spec.ts` for shell landmarks and hero primary heading; run `pnpm test:e2e:nix`.

***Checkpoint 3: Tailwind Styling + Global Base Styles***
- [ ] Implement hero and shell styling with Tailwind utility classes aligned to the Figma visual intent.
- [ ] Add minimal global styles in `src/index.css` (font stack, base reset, and body defaults) using project conventions.
- [ ] Verify styling avoids hard-coded design-system drift and remains maintainable.
- [ ] A test: run `pnpm build` to validate production compilation and CSS processing, then run `pnpm lint:nix`.

***Checkpoint 4: Responsive + Accessibility Hardening***
- [ ] Add responsive Tailwind adjustments for mobile, tablet, and desktop behavior of shell + hero.
- [ ] Ensure baseline accessibility requirements are met (logical heading order, meaningful text, alt text where applicable).
- [ ] Keep implementation limited to current feature scope without adding extra pages/components.
- [ ] A test: extend e2e checks for at least one desktop and one mobile project expectation, then run `pnpm test:e2e:nix`.

***Checkpoint 5: Final Verification + Spec Sync***
- [ ] Run full pre-PR validation for this feature branch.
- [ ] Confirm FR-01 through FR-08 are each satisfied by implemented code and test coverage.
- [ ] Update this checklist progress (`[ ]` to `[x]`) checkpoint-by-checkpoint as commits land.
- [ ] A test: run `pnpm check:pr:nix` as the final gate before opening a PR.