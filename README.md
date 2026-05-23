# DeployMate

A bilingual (English / Hungarian) professional services landing page for a **QA-Driven Release & Compliance Operations**. The site presents three consulting packages aimed at 20–150 person SaaS teams that are preparing for SOC2/ISO27001 audits or struggling with unstable release pipelines.

**Live site:** [deploymate.hu](https://deploymate.hu)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Internationalization](#internationalization)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Features

- **Single-page layout** with smooth-scroll navigation (Hero → Audience → Services → Track Record → CTA → Footer)
- **Three service packages** with pricing displayed in EUR
- **Bilingual UI** — English and Hungarian, switchable at runtime with preference persisted to `localStorage`
- **Responsive design** — mobile navigation via a slide-out sheet, desktop navigation bar
- **Book-a-call CTA** linked directly to a Google Calendar scheduling page
- **Accessible components** built on Radix UI primitives

---

## Tech Stack

| Category | Technology |
|---|---|
| Language | TypeScript 5 |
| Framework | React 18 |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 3, PostCSS |
| UI primitives | shadcn-ui (Radix UI) |
| Icons | Lucide React |
| Routing | React Router DOM 6 |
| State / data | TanStack React Query 5 |
| Forms | React Hook Form 7 + Zod |
| Testing | Vitest 3, Testing Library |
| Linting | ESLint 9, typescript-eslint |

---

## Project Structure

```
deploymate/
├── public/                  # Static assets served as-is
├── src/
│   ├── assets/              # Images and other imported assets
│   ├── components/          # Page section components
│   │   ├── Header.tsx       # Fixed navigation + language/theme controls
│   │   ├── HeroSection.tsx
│   │   ├── PainPointsSection.tsx
│   │   ├── AudienceSection.tsx
│   │   ├── PackagesSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── CredibilitySection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── StickyCTA.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── SectionDivider.tsx
│   │   ├── Footer.tsx
│   │   ├── Logo.tsx
│   │   ├── NavLink.tsx
│   │   └── ui/              # shadcn-ui generated primitives
│   ├── hooks/               # Custom React hooks
│   │   ├── use-mobile.tsx   # Detects mobile viewport
│   │   └── use-toast.ts     # Toast notification helpers
│   ├── lib/
│   │   ├── i18n.tsx         # Translation dictionary + LangContext provider
│   │   ├── theme.tsx        # Theme provider and theme hook
│   │   └── utils.ts         # Utility helpers (cn, etc.)
│   ├── pages/
│   │   ├── Index.tsx        # Main page — composes all sections
│   │   ├── BrandPreview.tsx # Internal brand/asset preview route
│   │   └── NotFound.tsx     # 404 page
│   ├── test/
│   │   ├── setup.ts         # Vitest global setup (jest-dom)
│   │   ├── Header.test.tsx
│   │   ├── HeroSection.test.tsx
│   │   ├── ...              # Section/component/hook/unit tests
│   │   └── sfdpot.test.tsx  # Site-wide structure/content heuristic tests
│   ├── App.tsx              # Root component, routing, global providers
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global CSS and Tailwind directives
├── components.json          # shadcn-ui configuration
├── index.html               # HTML shell
├── tailwind.config.ts       # Tailwind theme configuration
├── vite.config.ts           # Vite bundler configuration
├── vitest.config.ts         # Vitest test runner configuration
├── tsconfig.json            # Root TypeScript configuration
├── tsconfig.app.json        # Application TypeScript configuration
└── tsconfig.node.json       # Node/tooling TypeScript configuration
```

For a deeper explanation of component relationships and data flow see [docs/architecture.md](docs/architecture.md).
For the testing guide see [docs/testing.md](docs/testing.md).

---

## Getting Started

### Prerequisites

- **Node.js ≥ 18** — install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** (bundled with Node.js)

### Local development

```sh
# 1. Clone the repository
git clone https://github.com/Matecs/deploymate.git
cd deploymate

# 2. Install dependencies
npm install

# 3. Start the development server (http://localhost:8080)
npm run dev
```

The dev server supports Hot Module Replacement (HMR), so changes to source files are reflected instantly in the browser.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server on port 8080 |
| `npm run build` | Production build output to `dist/` |
| `npm run build:dev` | Development-mode build (includes source maps) |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Run ESLint across the entire project |
| `npm test` | Run the Vitest test suite once |
| `npm run test:watch` | Run Vitest in interactive watch mode |

---

## Internationalization

The site supports **English** and **Hungarian**. Language preference is stored in `localStorage` under the key `lang` and defaults to English.

All translatable strings live in `src/lib/i18n.tsx` as a single typed dictionary. Components access translations through the `useLang()` hook:

```tsx
import { useLang } from "@/lib/i18n";

const MyComponent = () => {
  const { t, lang, setLang } = useLang();
  return <h1>{t("hero.title")}</h1>;
};
```

To add a new string, add an entry to the `t` object in `src/lib/i18n.tsx` with both `en` and `hu` values. TypeScript will enforce that every key has both translations.

For a full guide see [docs/i18n.md](docs/i18n.md).

---

## Testing

The project uses **Vitest** and **@testing-library/react**. Test files live in `src/test/`.

```sh
# Run the full test suite once
npm test

# Watch mode for TDD
npm run test:watch
```

> **Run `npm test` after every code change** to catch regressions before proceeding further.

> **Documentation rule:** after code changes, review all affected `.md` files (`docs/`, `README.md`, `CONTRIBUTING.md`, PR template references) and fix stale or invalid content before opening/updating the PR.

For patterns, mocking, and conventions see [docs/testing.md](docs/testing.md).

---

## Deployment

The project produces a fully static bundle and can be hosted on any static host (Netlify, Vercel, GitHub Pages, etc.).

```sh
npm run build
# Upload the contents of dist/ to your hosting provider
```

**Lovable:** The repository is connected to a [Lovable](https://lovable.dev) project. Pushing to the default branch automatically triggers a Lovable deployment. You can also deploy directly from the Lovable dashboard via **Share → Publish**.

**Custom domain:** In the Lovable dashboard go to **Project → Settings → Domains** and click **Connect Domain**. See the [Lovable custom domain docs](https://docs.lovable.dev/features/custom-domain#custom-domain) for details.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on branching, code style, testing, and submitting pull requests.
