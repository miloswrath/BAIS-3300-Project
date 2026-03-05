# Feature Spec -> "Previous Collection" Detail Page

## Source of Truth
- Figma file: https://www.figma.com/design/6QsHElVju3cXecvhmzqHZ6/BAIS-3300?node-id=11-140&m=dev
- Target node: `11:140`

## Scope
- Build the **previous collection detail page** from node `11:140`.
- Include the semantic page shell (`header`, `main`, `footer`) and all visible content blocks in the target node.
- This feature is frontend-only for now.

## Functional Requirements (FR)
- **FR-01 (Tech stack):** Implementation must use React TSX + Tailwind CSS.
- **FR-02 (Design implementation):** UI must be derived from the specified Figma node using the Figma MCP workflow.
- **FR-03 (Semantic HTML):** Markup must use appropriate semantic elements and avoid unnecessary wrapper-only `div` nesting.
- **FR-04 (Architecture):** Code must follow a modern, modular frontend structure with clear component boundaries that can later support backend/API integration.
- **FR-05 (Content parity):** Page must preserve the design content hierarchy for previous collection context, featured media region, supporting content block, and bottom navigation.
- **FR-06 (Code quality):** Code must be clean, readable, and maintainable (consistent naming, small focused components, and no dead code).
- **FR-07 (Responsive baseline):** The page must render correctly on common viewport sizes (mobile, tablet, desktop).
- **FR-08 (Accessibility baseline):** Use accessible structure and labels where needed (heading order, meaningful button/link text, and alt text for informative images).

## Out of Scope
- Backend implementation, API integration, and data persistence.
- Additional routes/pages beyond the target previous collection detail page.
- Advanced animation systems or interactions not required by this feature scope.

## Implementation Plan
---
***Checkpoint 1: Figma Extraction + Semantic Content Map***
- [x] Use Figma MCP on node `11:140` to capture full page content, hierarchy, and layout intent.
- [x] Translate the design into a semantic element map for `header`, `main`, and `footer` (no div-soup).
- [x] Record explicit component boundaries for modular frontend implementation.
- [x] A test: run `pnpm lint:nix` and confirm no lint violations after introducing initial semantic structure stubs.

### Checkpoint 1 Notes (2026-03-05)
- **Figma extraction source:** node `11:140` from file `6QsHElVju3cXecvhmzqHZ6` via Figma MCP (`get_design_context`).
- **Observed content hierarchy:** top nav row (menu + brand + CTA), previous-collection intro copy, featured media block with two annotation callouts, supporting 2x2 content grid with descriptive copy, and bottom navigation row.
- **Semantic map:** `header` → primary nav; `main` → intro (`h1` + supporting text), featured media section, supporting content section; `footer` → bottom nav.
- **Component boundaries recorded for implementation:** `PreviousCollectionHeader`, `PreviousCollectionIntro`, `PreviousCollectionFeaturedMedia`, `PreviousCollectionSupportingContent`, `PreviousCollectionBottomNavigation`, composed by `PreviousCollectionPage`.
- **Checkpoint 1 stub status:** initial semantic stubs + route scaffolded at `/previous-collection` in React TSX and organized under `src/features/previousCollection` + `src/pages/previousCollection`.
- **Validation:** `pnpm lint:nix` executed successfully on March 5, 2026 with no ESLint violations.

***Checkpoint 2: Page TSX Structure***
- [x] Implement the page shell and content structure in React TSX using semantic tags.
- [x] Keep sections and JSX organized for future extraction into dedicated components/files.
- [x] Ensure heading and content ordering reflects the Figma hierarchy and accessibility baseline.
- [x] A test: update/add e2e assertions in `e2e/app-shell.spec.ts` for shell landmarks and previous-collection heading content; run `pnpm test:e2e:nix`.

### Checkpoint 2 Notes (2026-03-05)
- **Page structure status:** route `/previous-collection` now renders a semantic shell (`header`, `main`, `footer`) via `PreviousCollectionPage` and composes modular feature sections.
- **Section organization:** content is split into intro, featured media, supporting content, and bottom navigation components to preserve clean extraction boundaries.
- **Heading/content order:** `h1` (`SS 25`) remains within the intro section, with additional section-level accessible headings for featured media and supporting content.
- **E2E updates:** `e2e/app-shell.spec.ts` now includes `previous collection page renders semantic shell and heading content` and asserts `banner`, `main`, `contentinfo`, and key heading/copy.
- **Validation:** `pnpm test:e2e:nix` executed successfully on March 5, 2026 with all 8 Playwright checks passing across mobile and desktop projects.

***Checkpoint 3: Tailwind Styling + Base Integration***
- [ ] Implement page styling with Tailwind utility classes aligned to the Figma visual intent.
- [ ] Add or adjust minimal shared styling only where needed using existing project conventions.
- [ ] Verify styling remains maintainable and avoids hard-coded design-system drift.
- [ ] A test: run `pnpm build` to validate production compilation and CSS processing, then run `pnpm lint:nix`.

***Checkpoint 4: Responsive + Accessibility Hardening***
- [ ] Add responsive Tailwind adjustments for mobile, tablet, and desktop behavior.
- [ ] Ensure baseline accessibility requirements are met across page sections.
- [ ] Keep implementation limited to current feature scope without adding unrelated UI.
- [ ] A test: extend e2e checks for at least one desktop and one mobile expectation, then run `pnpm test:e2e:nix`.

***Checkpoint 5: Final Verification + Spec Sync***
- [ ] Run full pre-PR validation for this feature branch.
- [ ] Confirm FR-01 through FR-08 are each satisfied by implemented code and test coverage.
- [ ] Update checklist progress (`[ ]` to `[x]`) checkpoint-by-checkpoint as commits land.
- [ ] A test: run `pnpm check:pr:nix` as the final gate before opening a PR.
