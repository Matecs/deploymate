---
name: auto-unit-tests
description: Automatically generate Vitest unit tests in src/test/ whenever a new React component, custom hook, utility function, or any exported function is added or significantly modified in the DeployMate codebase. Triggers on any code change that introduces new testable surface area, without waiting for the user to ask.
---

# Auto Unit Tests

After ANY edit that adds or meaningfully changes an exported function, React component, or custom hook, you MUST create or update a matching Vitest test file in `src/test/` in the SAME turn — before reporting completion to the user.

## When to trigger

Trigger automatically when an edit:
- Adds a new file under `src/components/`, `src/hooks/`, `src/lib/`, `src/utils/`, or `src/pages/`.
- Adds a new exported function, component, or hook to an existing file.
- Changes the public signature (props, params, return) of an existing exported symbol.

Skip only for:
- Pure styling tweaks (className-only changes).
- Files under `src/components/ui/` (shadcn primitives — already covered upstream).
- Type-only files (`*.d.ts`, pure `type`/`interface` exports).
- Test files themselves.

Do NOT ask permission. Generating the test is part of "done".

## Where tests go

- Location: `src/test/<Subject>.test.tsx` (components/hooks) or `src/test/<subject>.test.ts` (utils).
- One test file per subject. If it already exists, **extend it surgically — do not rewrite the file**.
- Naming mirrors the source: `Header.tsx` → `Header.test.tsx`, `utils.ts` → `utils.test.ts`.

## Existing-file workflow (MANDATORY before writing)

Before generating any test, run this check:

1. **Detect** — Check whether `src/test/<Subject>.test.{ts,tsx}` already exists (use `code--list_dir src/test` or `code--view`).
2. **Read it fully** — If it exists, view the whole file. Identify which of the four coverage buckets (happy / edge / error / i18n EN+HU) are already covered for the symbol you're changing. Note the existing `describe` block name, render helper (e.g. `renderWith`, `renderCredibility`), import style, and assertion patterns.
3. **Diff against your change** — Decide the minimal set of edits:
   - **New `it(...)` blocks** for buckets not yet covered, or for newly added exports/props/behavior. Append inside the existing `describe` using `code--line_replace` (insert before the closing `});`).
   - **Modify an existing `it(...)`** only if the change broke that specific assertion (e.g. signature change, renamed string). Replace just that block, not surrounding tests.
   - **Add a new `describe`** only when adding a brand-new exported symbol to a file that already tests a different symbol.
4. **Never** overwrite an existing test file with `code--write`. Never duplicate an `it(...)` that already covers the same case. Never remove unrelated existing tests.
5. Reuse the file's existing render helper and import aliases — do not introduce a second helper with a different name.

Only use the full templates below when the test file does **not** yet exist.

## Required coverage per subject

Every generated test file must cover all four buckets that apply:

1. **Happy path** — renders / executes successfully with valid default input. At least one `expect`.
2. **Edge cases** — empty arrays, zero, null/undefined, boundary values, long strings. 1–2 cases.
3. **Error / negative path** — invalid input, error throws, error UI states. 1 case (skip only if truly N/A, e.g. pure presentational with no logic — note why in a comment).
4. **i18n EN/HU** — if the subject renders any text from `useLang()`, render it once wrapped in `<LangProvider>` with `lang="en"` and once with `lang="hu"`, asserting a known string from each translation in `src/lib/i18n.tsx`.

## Project conventions (follow exactly)

- Imports use the `@/` alias.
- React Testing Library + Vitest globals (`describe`, `it`, `expect`) — no need to import them.
- Setup at `src/test/setup.ts` already provides `@testing-library/jest-dom` and `matchMedia`.
- Components that consume `useLang()` MUST be wrapped in `<LangProvider>` from `@/lib/i18n`.
- Components using `react-router` links must be wrapped in `<MemoryRouter>`.
- Components using `react-helmet-async` must be wrapped in `<HelmetProvider>`.
- Mock `framer-motion` only if assertions fail due to animation timing — prefer not to.
- Never hardcode UI strings inside test assertions if the same string exists in `src/lib/i18n.tsx`; import or read from the dictionary so renames don't silently break tests.

## Component test template

```tsx
import { render, screen } from "@testing-library/react";
import { LangProvider } from "@/lib/i18n";
import { Subject } from "@/components/Subject";

const renderWith = (lang: "en" | "hu" = "en") =>
  render(
    <LangProvider initialLang={lang}>
      <Subject />
    </LangProvider>
  );

describe("Subject", () => {
  it("renders happy path", () => {
    renderWith();
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("handles edge case (empty / boundary input)", () => {
    // …
  });

  it("renders Hungarian copy when lang=hu", () => {
    renderWith("hu");
    expect(screen.getByText(/<known HU string>/)).toBeInTheDocument();
  });
});
```

If `LangProvider` does not accept `initialLang`, set `localStorage.setItem("lang", "hu")` before render — check `src/lib/i18n.tsx` for the exact API before writing the test.

## Hook test template

```ts
import { renderHook, act } from "@testing-library/react";
import { useThing } from "@/hooks/useThing";

describe("useThing", () => {
  it("returns initial state", () => {
    const { result } = renderHook(() => useThing());
    expect(result.current.value).toBe(/* … */);
  });
  it("updates on action", () => {
    const { result } = renderHook(() => useThing());
    act(() => result.current.set(42));
    expect(result.current.value).toBe(42);
  });
  it("handles invalid input", () => { /* … */ });
});
```

## Utility test template

```ts
import { doThing } from "@/lib/utils";

describe("doThing", () => {
  it("returns expected value for valid input", () => { /* … */ });
  it("handles empty / boundary input", () => { /* … */ });
  it("throws / returns fallback on invalid input", () => { /* … */ });
});
```

## After writing the test

1. Look at existing examples in `src/test/` (e.g. `Header.test.tsx`, `CredibilitySection.test.tsx`, `utils.test.ts`) and match their style.
2. Read the actual subject file to use REAL prop names, REAL exported strings, and REAL public API — do not invent.
3. Do NOT run `npm test` yourself (the harness runs builds/tests). Just write the file.
4. In your final reply, mention briefly that you added/updated `src/test/<file>` so the user knows tests exist.

## What "done" means

A code change is not complete until its test file exists in `src/test/` and covers happy path + edges + error + (if applicable) EN/HU i18n. If you cannot meaningfully test something (e.g. trivial re-export), add a one-line comment in the test file explaining why and a single smoke assertion.
