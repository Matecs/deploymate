# Contributing to Release Clarity

Thank you for taking the time to contribute! This document covers everything you need to know to make changes confidently.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Branching Strategy](#branching-strategy)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Testing](#testing)
- [Adding UI Components](#adding-ui-components)
- [Updating Translations](#updating-translations)
- [Pull Request Guidelines](#pull-request-guidelines)

---

## Prerequisites

- **Node.js ≥ 18** (use [nvm](https://github.com/nvm-sh/nvm) to manage versions)
- **npm** (bundled with Node.js)

```sh
git clone https://github.com/Matecs/release-clarity.git
cd release-clarity
npm install
```

---

## Branching Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready code, auto-deployed via Lovable |
| `feature/<short-description>` | New features or enhancements |
| `fix/<short-description>` | Bug fixes |
| `docs/<short-description>` | Documentation-only changes |

Create your branch from `main`:

```sh
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

---

## Development Workflow

```sh
# Start the dev server with HMR (http://localhost:8080)
npm run dev

# Lint the codebase
npm run lint

# Run tests once
npm test

# Run tests in interactive watch mode
npm run test:watch

# Production build to verify nothing is broken
npm run build
```

Always run `npm run lint` and `npm test` before opening a pull request.

---

## Code Style

The project uses **ESLint** (with `typescript-eslint`) for linting. Configuration lives in `eslint.config.js`. There is no separate Prettier setup — ESLint handles style rules.

Key conventions to follow:

- **TypeScript** everywhere — avoid `any` unless absolutely necessary.
- **Named exports** for components (e.g. `export const MyComponent = ...`), default exports are acceptable for page-level components.
- **`@/` path alias** — import from `src/` using `@/` (e.g. `import { useLang } from "@/lib/i18n"`).
- **Tailwind CSS** for all styling — avoid inline styles unless you are applying CSS custom properties (`var(--...)`).
- **Radix UI / shadcn-ui** primitives for interactive elements — prefer them over native HTML elements when an accessible equivalent exists.
- Keep components small and focused. Extract reusable UI into `src/components/ui/`.

---

## Testing

Tests live in `src/test/` and are run with **Vitest**. The global test setup (`src/test/setup.ts`) imports `@testing-library/jest-dom` matchers.

```sh
# Run the full test suite once
npm test

# Watch mode for TDD
npm run test:watch
```

**Run `npm test` after every code change** to catch regressions before proceeding further.

When adding a new feature, add at least one test that exercises the happy path. Tests should be placed in `src/test/` and follow the existing naming pattern (`<subject>.test.ts` or `<subject>.test.tsx`).

See [docs/testing.md](docs/testing.md) for a comprehensive guide covering component test patterns, mocking, and conventions.

---

## Adding UI Components

The project uses [shadcn-ui](https://ui.shadcn.com/). To add a new primitive:

```sh
npx shadcn-ui@latest add <component-name>
```

This generates the component inside `src/components/ui/`. Commit it as part of your feature branch.

---

## Updating Translations

All UI strings are defined in `src/lib/i18n.tsx`. To add or update a string:

1. Open `src/lib/i18n.tsx`.
2. Add a new key to the `t` object with **both** `en` and `hu` values.
3. Use the key in your component via the `useLang()` hook.

See [docs/i18n.md](docs/i18n.md) for a detailed guide and examples.

---

## Pull Request Guidelines

1. **One concern per PR** — keep changes focused and reviewable.
2. **Descriptive title** — use the imperative mood (e.g. `Add mobile menu animation`).
3. **Fill in the PR description** — explain *what* changed and *why*.
4. Ensure `npm run lint` and `npm test` pass locally before opening the PR.
5. **Review documentation** — if your change affects behavior, configuration, or public API, update the relevant docs in `docs/` and verify that `README.md` and `CONTRIBUTING.md` are still accurate.
6. Squash or tidy up commits before merging so that `main` history stays clean.
