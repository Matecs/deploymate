# Production Build Checklist

> **⚠️ MANDATORY** — Every item must be verified before deploying to production.

---

## 1. Build & Source Maps

- [ ] Source maps disabled in production build (`vite.config.ts` → `build.sourcemap: false`)
- [ ] `npm run build` exits with code 0, no warnings
- [ ] Bundle size checked (`dist/` folder reasonable, no bloated chunks)

## 2. Security Headers & CSP

- [ ] `Content-Security-Policy` in `index.html` is production-ready
- [ ] `connect-src` updated if external services are used (Calendly, Analytics, etc.)
- [ ] `X-Content-Type-Options: nosniff` present
- [ ] `Referrer-Policy: strict-origin-when-cross-origin` present
- [ ] All external links have `rel="noopener noreferrer"`

## 3. Console & Debug Cleanup

- [ ] No `console.log` statements in production code
- [ ] `console.error` in `ErrorBoundary` acceptable (keep for error tracking)
- [ ] `console.error` removed from `NotFound` component (leaks path info)
- [ ] No `debugger` statements anywhere

## 4. SEO & Meta Tags

- [ ] `<title>` under 60 chars with primary keyword
- [ ] `<meta name="description">` under 160 chars
- [ ] `<link rel="canonical">` points to correct production URL
- [ ] Open Graph tags (`og:url`, `og:image`) point to production domain
- [ ] Twitter card tags verified
- [ ] JSON-LD structured data validated (https://validator.schema.org/)
- [ ] `robots.txt` allows crawling
- [ ] `sitemap.xml` is up to date

## 5. Assets & Performance

- [ ] Images optimized (WebP/AVIF where possible)
- [ ] Hero background images have both desktop and mobile versions
- [ ] Favicon present and correct
- [ ] `og-image.jpg` exists and is high quality (1200×630px)
- [ ] Lazy loading enabled for below-the-fold images

## 6. i18n

- [ ] All UI strings in `src/lib/i18n.tsx` — no hardcoded text in components
- [ ] Both `en` and `hu` translations complete and reviewed
- [ ] Language switcher works correctly
- [ ] `localStorage` language preference persists across reloads

## 7. Functionality

- [ ] All navigation links scroll to correct sections
- [ ] CTA buttons work (Calendly / contact form)
- [ ] Sticky CTA appears/disappears correctly based on scroll position
- [ ] Error Boundary shows fallback UI on crash (not white screen)
- [ ] 404 page renders for unknown routes
- [ ] Mobile hamburger menu opens/closes correctly

## 8. Cross-Browser & Responsive

- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested on mobile viewport (375px, 414px)
- [ ] Tested on tablet viewport (768px)
- [ ] Tested on desktop viewport (1280px, 1920px)
- [ ] No horizontal scroll on any viewport

## 9. Accessibility

- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Alt text on all images
- [ ] Semantic HTML (`<main>`, `<nav>`, `<section>`, `<footer>`)

## 10. Final Verification

- [ ] `npm run lint` — zero errors
- [ ] `npm test` — all tests pass
- [ ] `npm run build` — clean production build
- [ ] Preview production build locally (`npm run preview`)
- [ ] Lighthouse score checked (Performance, Accessibility, SEO, Best Practices)
- [ ] Domain DNS configured correctly
- [ ] HTTPS enforced

---

**Last reviewed:** _Fill in date before each deploy_
**Reviewed by:** _Name_
