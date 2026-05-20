# Testing Guide

DeployMate uses **Vitest** as the test runner together with **@testing-library/react** for component tests. This document covers the test setup, patterns, and conventions used in the project.

---

## Table of Contents

- [Test Stack](#test-stack)
- [Running Tests](#running-tests)
- [File Structure and Naming](#file-structure-and-naming)
- [Global Setup](#global-setup)
- [Writing Component Tests](#writing-component-tests)
  - [Required Wrapper Providers](#required-wrapper-providers)
  - [Querying the DOM](#querying-the-dom)
  - [Firing Events](#firing-events)
- [Writing Unit Tests](#writing-unit-tests)
- [Mocking](#mocking)
- [What to Test](#what-to-test)
- [After Every Modification](#after-every-modification)
- [Visual / Browser Testing](#visual--browser-testing)
  - [PR Closing Checklist](#pr-closing-checklist)

---

## Test Stack

| Package | Purpose |
|---|---|
| [Vitest](https://vitest.dev) | Test runner, assertion library, and mock utilities |
| [@testing-library/react](https://testing-library.com/react) | Render React components and query the DOM |
| [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) | Custom DOM matchers (`toBeInTheDocument`, `toHaveAttribute`, etc.) |
| [jsdom](https://github.com/jsdom/jsdom) | DOM environment for Node.js (configured via `vitest.config.ts`) |

---

## Running Tests

```sh
# Run the full test suite once (exit after completion)
npm test

# Run tests in interactive watch mode (re-runs on file save)
npm run test:watch
```

> **Rule:** Run `npm test` after every code change to catch regressions immediately before making further modifications.

---

## File Structure and Naming

All test files live in `src/test/` and follow the naming convention:

```
src/test/
  setup.ts                   # Global Vitest setup (imported before every test file)
  Header.test.tsx            # Tests for src/components/Header.tsx
  HeroSection.test.tsx       # Tests for src/components/HeroSection.tsx
  AudienceSection.test.tsx   # Tests for src/components/AudienceSection.tsx
  PackagesSection.test.tsx   # Tests for src/components/PackagesSection.tsx
  CredibilitySection.test.tsx
  CTASection.test.tsx
  Footer.test.tsx
  NavLink.test.tsx
  sfdpot.test.tsx            # SFDPOT heuristic integration tests
```

Name new test files `<SubjectName>.test.ts` (plain logic) or `<SubjectName>.test.tsx` (JSX/React).

---

## Global Setup

`src/test/setup.ts` is executed before every test file (configured via `setupFiles` in `vitest.config.ts`). It:

1. Imports `@testing-library/jest-dom` to extend `expect` with DOM matchers.
2. Stubs `window.matchMedia` because jsdom does not implement it — many Radix UI components rely on it.

```ts
// src/test/setup.ts
import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
```

---

## Writing Component Tests

### Required Wrapper Providers

Every component that calls `useLang()` must be rendered inside `<LangProvider>`. Components with navigation links or `useNavigate` calls also need `<MemoryRouter>`.

Use a small factory function at the top of each test file:

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LangProvider } from "@/lib/i18n";
import MyComponent from "@/components/MyComponent";

const renderMyComponent = () =>
  render(
    <MemoryRouter>
      <LangProvider>
        <MyComponent />
      </LangProvider>
    </MemoryRouter>
  );
```

If a component does **not** use routing, you can omit `<MemoryRouter>`.

### Querying the DOM

Prefer queries in this order (most to least accessible):

| Query | Use when |
|---|---|
| `getByRole` | Button, link, heading, input, etc. |
| `getByLabelText` | Form fields with a label |
| `getByText` | Any visible text content |
| `getByAltText` | Images |
| `getAllBy*` | When multiple matching elements are expected |
| `queryBy*` | When the element may be absent |

```tsx
// ✅ Prefer role-based queries
expect(screen.getByRole("button", { name: /book a call/i })).toBeInTheDocument();

// ✅ Text queries for non-interactive content
expect(screen.getByText("QA-Driven Release & Compliance Operations")).toBeInTheDocument();

// ✅ getAllBy* when duplicates exist (e.g. desktop + mobile nav)
expect(screen.getAllByText("Services").length).toBeGreaterThan(0);
```

### Firing Events

Use `fireEvent` from `@testing-library/react` to simulate user interactions:

```tsx
import { fireEvent } from "@testing-library/react";

// Click a button
fireEvent.click(screen.getByRole("button", { name: /submit/i }));

// Change an input value
fireEvent.change(screen.getByRole("textbox"), { target: { value: "hello" } });
```

---

## Writing Unit Tests

For pure functions (utilities, hooks without React, etc.), use plain Vitest without a DOM:

```ts
import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("deduplicates conflicting Tailwind classes", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});
```

---

## Mocking

### Spies and stubs with `vi`

```tsx
import { vi, beforeEach } from "vitest";

beforeEach(() => {
  vi.restoreAllMocks(); // reset all mocks before each test
  localStorage.clear();
});

// Spy on a DOM method
const mockScrollIntoView = vi.fn();
const el = document.createElement("div");
el.id = "audience";
el.scrollIntoView = mockScrollIntoView;
document.body.appendChild(el);

// Assert after interaction
expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });

// Clean up
document.body.removeChild(el);
```

### Module mocks

```ts
vi.mock("@/lib/someModule", () => ({
  someFunction: vi.fn().mockReturnValue("mocked"),
}));
```

---

## What to Test

| Scenario | Recommended approach |
|---|---|
| Component renders key content | `getByText` / `getByRole` assertions |
| Translated strings display correctly | Render with `LangProvider`, assert default (EN) text |
| Language toggle works | Click toggle button, assert new language strings appear |
| Links point to correct URLs | `toHaveAttribute("href", "...")` |
| Buttons trigger the expected side effect | Spy on the target method, `fireEvent.click`, assert spy called |
| New utility function | Unit test with `describe`/`it`/`expect` |
| New custom hook | Use `renderHook` from `@testing-library/react` |

Every new feature must include **at least one test** covering the happy path.

---

## After Every Modification

> **This rule applies to all contributors, including GitHub Copilot.**

After making any code change — no matter how small — run the full test suite:

```sh
npm test
```

If any tests fail, fix the failures **before** proceeding with further changes. This keeps regressions from accumulating and makes debugging easier.

---

## Visual / Browser Testing

> **Rule: Test the website in a real browser after every PR is done** — run the unit tests first, then boot the site and capture screenshots of each section to confirm the UI is intact.

The sandbox environment (GitHub Copilot agent) cannot open a browser GUI, so the workflow below uses the Vite dev server plus a headless Chromium driven by Python Playwright.

### 1 — Start the dev server

`npm run dev` only binds to `localhost` which the headless browser cannot reach inside the sandbox. Use the explicit flag instead:

```sh
node_modules/.bin/vite --host 0.0.0.0 --port 8080 &
VITE_PID=$!
```

Wait ~3 s and confirm it is listening:

```sh
netstat -tlnp | grep 8080
# Expected: tcp  0  0  0.0.0.0:8080  0.0.0.0:*  LISTEN
```

To stop the server once testing is done:

```sh
kill $VITE_PID
```

### 2 — Install Python Playwright (first run only)

```sh
pip install playwright
python3 -m playwright install chromium
```

These are downloaded to `~/.cache/ms-playwright` and survive between sessions on the same runner. The packages are **not** committed to the repo.

### 3 — Capture screenshots and check for console errors

```python
from playwright.sync_api import sync_playwright

js_errors = []

with sync_playwright() as p:
    browser = p.chromium.launch(args=["--no-sandbox", "--disable-setuid-sandbox"])
    page = browser.new_page(viewport={"width": 1280, "height": 900})

    # Capture JS / CSP errors
    page.on("console", lambda msg: js_errors.append(msg.text) if msg.type == "error" else None)

    page.goto("http://127.0.0.1:8080", wait_until="networkidle", timeout=20000)
    page.wait_for_timeout(1500)

    # Hero section
    page.screenshot(path="/tmp/site-hero.png")

    # Scroll to each section (framer-motion sections start at opacity:0 and
    # animate in on scroll — scrollIntoView triggers the animation)
    for section_id in ["pain-points", "audience", "packages", "how-it-works", "credibility", "cta"]:
        page.evaluate("id => document.getElementById(id)?.scrollIntoView({behavior:'instant'})", section_id)
        page.wait_for_timeout(800)
        page.screenshot(path=f"/tmp/site-{section_id}.png")

    browser.close()

print("Console errors:", js_errors or "none")
```

### 4 — Console error expectation

The app should render with **no console errors** during visual testing.

### 5 — What to look for

| Check | Pass criteria |
|---|---|
| No unexpected JS errors | Console output contains no errors |
| Hero section renders | Logo, headline, stats, CTA button visible |
| All page sections render | Pain-points, Audience, Packages, How It Works, Credibility, CTA all show content |
| Build succeeds | `npm run build` exits with code 0 and no warnings |

### 6 — CSP notes (learned from security audit)

- `frame-ancestors` is **silently ignored** by all browsers when delivered via `<meta http-equiv="Content-Security-Policy">`. It only works as an HTTP response header. Remove it from the meta tag to avoid the browser warning.
- If external font imports are reintroduced later, ensure CSP allows the font stylesheet/asset origins; otherwise the browser blocks them at runtime.

### 7 — Learnings from the "Remove unnecessary functions and files" PR

- **`node_modules/.bin/vite --host 0.0.0.0 --port 8080 &`** must be run as a detached background process (`detach: true` in the bash tool), otherwise the Vite server exits when the shell session ends and Playwright gets `ERR_CONNECTION_REFUSED`.
- After removing `QueryClientProvider` from `App.tsx`, the site still renders correctly and the `@tanstack/react-query` package is still in `package.json` — that is fine; a future `npm prune` can remove it if desired.
- The `useBookingRateLimit.test.tsx` file in `docs/testing.md § File Structure` listing was stale after the hook was deleted — always update the file-listing table when test files are removed.
- The previous React warning for `fetchPriority` on the hero image is resolved by removing the unsupported prop.
- The previous sandbox Google Fonts DNS error is resolved by removing the external Google Fonts `@import`.
- Marketing-copy-heavy tests drift quickly; when content changes in `src/lib/i18n.tsx`, update related assertions before treating the change as a UI regression.
- `Logo` renders both light/dark image variants with the same alt text; tests should use `getAllByAltText(...)` instead of `getByAltText(...)` to avoid false failures.

---

## PR Closing Checklist

> **This checklist must be completed on every PR, without exception, before the session is finished — even if the user does not explicitly ask.**

```
- [ ] npm run lint            — no lint errors
- [ ] npm test                — all tests green
- [ ] npm run build           — exits with code 0, no warnings
- [ ] Browser test            — screenshots captured for hero, pain-points, audience, packages, how-it-works, credibility, cta; no unexpected console errors
- [ ] Docs updated            — affected docs/, README.md, CONTRIBUTING.md updated
- [ ] Learnings updated       — new gotchas appended / stale entries corrected in § Visual / Browser Testing
```

Copy this checklist into the PR description (the pull_request_template.md does it automatically) and tick each box before requesting review.
