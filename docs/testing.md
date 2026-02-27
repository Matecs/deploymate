# Testing Guide

Release Clarity uses **Vitest** as the test runner together with **@testing-library/react** for component tests. This document covers the test setup, patterns, and conventions used in the project.

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
  example.test.ts            # Baseline smoke test
  Header.test.tsx            # Tests for src/components/Header.tsx
  HeroSection.test.tsx       # Tests for src/components/HeroSection.tsx
  AudienceSection.test.tsx   # Tests for src/components/AudienceSection.tsx
  PackagesSection.test.tsx   # Tests for src/components/PackagesSection.tsx
  CredibilitySection.test.tsx
  CTASection.test.tsx
  Footer.test.tsx
  NavLink.test.tsx
  useBookingRateLimit.test.tsx  # Hook tests
  sfdpot.test.tsx            # Security / edge-case tests
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
expect(screen.getByText("Release & Compliance Operations Architect")).toBeInTheDocument();

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
