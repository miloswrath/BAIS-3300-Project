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
- For **all local test commands** in this feature (`pnpm lint`, `pnpm test:e2e`, and combined pre-PR gates), Nix-based environments must expose `libgm.so` to runtime linking.
- Before running tests in Nix shells, export:
	- `LIBGM_PATH=<absolute path to directory containing libgm.so>`
	- `NIX_LD_LIBRARY_PATH="${LIBGM_PATH}:${NIX_LD_LIBRARY_PATH:-}"`
- If `nix-ld` is not active in a given shell, use equivalent linker-path export semantics (for example `LD_LIBRARY_PATH`) while keeping `LIBGM_PATH` as the canonical source path variable.
- CI steps and contributor docs should call out the same requirement where Nix-based execution is expected.

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
- [ ] A test: export `LIBGM_PATH` and `LD_LIBRARY_PATH`, run `pnpm test:e2e` locally, and verify the smoke test passes on both projects. *(Currently blocked in this shell by missing Playwright Linux runtime libs such as `libgtk-3.so.0` and related dependencies.)*

***Checkpoint 4: PR CI Workflow (GitHub Actions)***
- [ ] Add a workflow in `.github/workflows/` triggered on `pull_request` to `main`.
- [ ] Configure steps for Node + pnpm setup, dependency install, Playwright browser install, and e2e execution.
- [ ] Use project scripts (`pnpm lint`, `pnpm test:e2e`) so CI matches local development commands.
- [ ] A test: validate workflow YAML and confirm required commands run successfully in a local dry run where possible.

***Checkpoint 5: Final Verification + Documentation Touch-Up***
- [ ] Verify scripts section includes stable commands for `dev`, `build`, `lint`, and `test:e2e`.
- [ ] Ensure generated artifacts and reports are ignored appropriately in `.gitignore`.
- [ ] Update this feature spec checklist status as implementation progresses by checkpoint commit.
- [ ] A test: export `LIBGM_PATH` and `NIX_LD_LIBRARY_PATH`, then run `pnpm lint && pnpm test:e2e` as the final pre-PR gate.