# GitHub Copilot Instructions

## ⚠️ Mandatory PR Closing Steps

> These steps are **non-negotiable** and must be completed on **every PR** before the session is finished, even if the user does not explicitly ask for them.

1. **Lint** — `npm run lint` must pass with no errors.
2. **Run the full test suite** — `npm test` must pass.
3. **Run the production build** — `npm run build` must exit with code 0.
4. **Visual browser test** — start the dev server (`node_modules/.bin/vite --host 0.0.0.0 --port 8080` as a detached background process), run the Playwright screenshot script documented in `docs/testing.md § Visual / Browser Testing`, confirm every section (hero, pain-points, audience, packages, how-it-works, credibility, cta) renders with no unexpected console errors, and share the screenshots in the PR.
5. **Update affected docs** — update any `docs/` pages, `README.md`, or `CONTRIBUTING.md` that describe the behavior you changed.
6. **Update learnings** — append new gotchas or correct stale entries in the `docs/testing.md § Visual / Browser Testing` learnings section.

Failure to complete steps 4–6 violates the project's PR guidelines and will require a follow-up session.

---

## Project Overview

Release Clarity is a React single-page application that helps users understand and manage release notes. It is built with Vite, TypeScript, Tailwind CSS, and shadcn-ui (Radix UI primitives), and supports English and Hungarian through a custom i18n layer.

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 18 |
| Language | TypeScript (strict) |
| Build tool | Vite |
| Styling | Tailwind CSS + `tailwind-merge` + `class-variance-authority` |
| Component library | shadcn-ui (Radix UI) |
| Routing | React Router v6 |
| Server state | TanStack Query v5 |
| Forms | React Hook Form + Zod |
| Testing | Vitest + Testing Library |
| Linting | ESLint + typescript-eslint |

## Repository Layout

```
src/
  assets/          Static assets imported by components
  components/
    ui/            Primitive shadcn-ui components (generated via CLI)
  hooks/           Custom React hooks
  lib/
    i18n.tsx       All UI strings (English + Hungarian)
    utils.ts       Shared utility functions (cn helper, etc.)
  pages/           Route-level page components
  test/            Vitest test files (*.test.ts / *.test.tsx)
  App.tsx          Root component with router
  main.tsx         Entry point
```

## Development Commands

```sh
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:8080 with HMR
npm run lint       # Lint with ESLint
npm test           # Run test suite once (Vitest)
npm run test:watch # Run tests in watch mode
npm run build      # Production build
```

Always run `npm run lint` and `npm test` before opening a pull request.

**After every code modification, run the full test suite (`npm test`) to catch regressions immediately before proceeding further.**

## Code Conventions

- **TypeScript everywhere** — avoid `any`; prefer explicit types and Zod schemas for runtime validation.
- **Named exports** for all components (`export const MyComponent = ...`). Default exports are acceptable only for top-level page components.
- **`@/` path alias** maps to `src/`; always use it for non-relative imports (e.g., `import { useLang } from "@/lib/i18n"`).
- **Tailwind CSS** for all styling. Avoid inline styles unless applying a CSS custom property (`var(--...)`). Compose class names with `cn()` from `@/lib/utils`.
- **Radix UI / shadcn-ui** primitives for interactive elements — prefer them over native HTML elements when an accessible equivalent exists.
- **Small, focused components** — extract reusable UI into `src/components/ui/`.
- **React hooks rules** — respect the rules of hooks; never call hooks inside loops, conditions, or nested functions.

## i18n

All visible UI strings must be defined in `src/lib/i18n.tsx` with both `en` and `hu` translations. Access strings through the `useLang()` hook inside components. Do not hardcode display text.

## Adding shadcn-ui Components

```sh
npx shadcn-ui@latest add <component-name>
```

The generated file is placed in `src/components/ui/`. Commit it as part of the relevant feature branch.

## Testing

- Tests live in `src/test/` and follow the naming pattern `<subject>.test.ts` or `<subject>.test.tsx`.
- The global test setup (`src/test/setup.ts`) imports `@testing-library/jest-dom` matchers.
- Every new feature must include at least one test covering the happy path.
- Use `@testing-library/react` for component tests and plain Vitest `describe`/`it`/`expect` for unit tests.
- **Run `npm test` after every code change** to verify that existing tests still pass before making further modifications.

See [docs/testing.md](../docs/testing.md) for a comprehensive guide on writing and running tests.

## Pull Request Guidelines

1. One concern per PR — keep changes focused and reviewable.
2. Use the imperative mood in the title (e.g., `Add mobile menu animation`).
3. Describe *what* changed and *why* in the PR body.
4. `npm run lint` and `npm test` must pass before requesting review.
5. **Test the website in a browser** — after all code changes are committed, boot the site and visually verify every section still renders correctly. Follow the workflow in [docs/testing.md § Visual / Browser Testing](../docs/testing.md#visual--browser-testing).
6. **Review documentation** — if your change affects behavior, configuration, or public API, update the relevant docs in `docs/` and verify that `README.md` and `CONTRIBUTING.md` are still accurate.
7. **Review and update learnings** — re-read the learnings recorded in `docs/testing.md` (Visual / Browser Testing section). Correct any entries that are no longer accurate and append any new experiences or gotchas discovered during this PR.
8. Squash or tidy commits before merging to keep `main` history clean.

## Branching

| Branch pattern | Purpose |
|---|---|
| `main` | Production-ready; auto-deployed |
| `feature/<description>` | New features or enhancements |
| `fix/<description>` | Bug fixes |
| `docs/<description>` | Documentation-only changes |

Always branch from `main`.
