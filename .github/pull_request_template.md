## What changed and why

<!-- Describe what this PR changes and the reason for the change. -->

## PR Closing Checklist

Every item below is **mandatory** before requesting review or merging.

- [ ] `npm run lint` passes with no errors
- [ ] `npm test` passes — all tests green
- [ ] `npm run build` exits with code 0
- [ ] **Browser test** — started the Vite dev server (`node_modules/.bin/vite --host 0.0.0.0 --port 8080`), ran the Playwright screenshot script from `docs/testing.md § Visual / Browser Testing`, and confirmed every section (hero, pain-points, audience, packages, how-it-works, credibility, cta) renders correctly with no unexpected console errors
- [ ] **Markdown review completed** — all affected `.md` files were reviewed after code changes and stale/invalid content was fixed
- [ ] **Documentation updated** — all affected `docs/` pages, `README.md`, and `CONTRIBUTING.md` are updated and consistent with current behavior
- [ ] **Learnings updated** — re-read `docs/testing.md § Visual / Browser Testing` learnings; corrected stale entries and appended any new gotchas discovered during this PR
