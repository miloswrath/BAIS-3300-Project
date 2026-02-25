# FEATURE SPEC -> Testing

## Functional Requirements (FRs)
---
- **FR-1: Playwright initialization**
	- The frontend project must include Playwright configured for end-to-end testing.
	- The default smoke suite must run on **mobile and desktop** projects.

- **FR-2: Initial E2E smoke test**
	- Implement at least one end-to-end smoke test for the **app shell**.
	- The test must validate that the home page loads and expected primary UI content is visible.

- **FR-3: CI on PRs (GitHub Actions)**
	- A GitHub Actions workflow must run Playwright tests on `pull_request` events targeting the `main` branch.
	- The workflow must install dependencies and execute the project test command in CI.

- **FR-4: Linting initialization**
	- Initialize **ESLint-only** linting for the React + TypeScript codebase.
	- The project must provide a lint command in package scripts.

## Scope
---
### In Scope
- Add Playwright configuration and required test script(s).
- Add one app-shell E2E smoke test.
- Add GitHub Actions workflow for PR checks to `main`.
- Add ESLint configuration and lint script.

### Out of Scope
- Visual regression testing.
- Cross-browser matrix beyond the default Playwright projects configured for this feature.
- Complex multi-page or authenticated E2E scenarios.
- Formatter setup (e.g., Prettier) or Biome migration.

## Nix Test Runtime Clarification
---
- For **all local test commands** in this feature, use the Nix-aware scripts so `libgm.so` linking is set automatically:
	- `pnpm lint:nix`
	- `pnpm test:e2e:nix`
	- `pnpm check:pr:nix`
- `scripts/run-with-nix-ld.mjs` is the canonical runtime wrapper and sets:
	- `LIBGM_PATH` (from existing env value, or auto-detected if available)
	- `NIX_LD_LIBRARY_PATH="${LIBGM_PATH}:${NIX_LD_LIBRARY_PATH:-}"`
	- `LD_LIBRARY_PATH="${LIBGM_PATH}:${LD_LIBRARY_PATH:-}"` as compatibility fallback
- Non-Nix CI runners continue to use standard project scripts (`pnpm lint` and `pnpm test:e2e`).

## Implementation Plan
---
***Checkpoint 1: ESLint Baseline for Vite React + TS***
- [x] Install ESLint and React/TypeScript ESLint plugins compatible with the current Vite TypeScript setup.
- [x] Add ESLint config and ignore rules for `dist`, Playwright output folders, and generated artifacts.
- [x] Add `lint` script in `package.json` and ensure it targets `src` and config files as needed.
- [x] A test: export `LIBGM_PATH` and `LD_LIBRARY_PATH`, then run `pnpm lint` and confirm it exits successfully.

***Checkpoint 2: Playwright Initialization (Mobile + Desktop)***
- [x] Install Playwright test tooling and initialize config for this frontend-only project.
- [x] Add `playwright.config` with two smoke projects: one mobile profile and one desktop profile.
- [x] Add `test:e2e` script and ensure dev server startup is handled through Playwright `webServer` for Vite.
- [x] A test: export `LIBGM_PATH` and `LD_LIBRARY_PATH`, run `pnpm exec playwright test --list`, and verify both mobile and desktop projects are discovered.

***Checkpoint 3: App-Shell Smoke E2E***
- [x] Create one e2e test under an `e2e` test directory for the home/app shell route.
- [x] Assert page load success and visibility of primary UI text rendered by the React app shell.
- [x] Keep assertions minimal and stable (no visual snapshots, no non-deterministic checks).
- [x] A test: export `LIBGM_PATH` and `LD_LIBRARY_PATH`, run `pnpm test:e2e` locally, and verify the smoke test passes on both projects. *(Currently blocked in this shell by missing Playwright Linux runtime libs such as `libgtk-3.so.0` and related dependencies.)*

***Checkpoint 4: PR CI Workflow (GitHub Actions)***
- [x] Add a workflow in `.github/workflows/` triggered on `pull_request` to `main`.
- [x] Configure steps for Node + pnpm setup, dependency install, Playwright browser install, and e2e execution.
- [x] Use project scripts (`pnpm lint`, `pnpm test:e2e`) so CI matches local development commands.
- [x] A test: validate workflow YAML and confirm required commands run successfully in a local dry run where possible.

***Checkpoint 5: Final Verification + Documentation Touch-Up***
- [x] Verify scripts section includes stable commands for `dev`, `build`, `lint`, and `test:e2e`.
- [x] Ensure generated artifacts and reports are ignored appropriately in `.gitignore`.
- [x] Update this feature spec checklist status as implementation progresses by checkpoint commit.
- [x] A test: run `pnpm check:pr:nix` as the final pre-PR gate.