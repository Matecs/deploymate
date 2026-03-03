

## SEO Improvements Plan

### Current State
- Basic meta tags exist in `index.html` (title, description, OG, Twitter)
- `robots.txt` exists but has no `Sitemap` reference
- No `sitemap.xml`
- No structured data (JSON-LD)
- No OG image specified
- Missing `og:locale`, `og:site_name`
- No `lang` attribute switching (always `en`)
- No semantic HTML landmarks (`<main>`, `<article>`)

### Changes

**1. `public/sitemap.xml`** — Create a static sitemap for the single-page site pointing to `https://datamate.hu/`.

**2. `public/robots.txt`** — Add `Sitemap: https://datamate.hu/sitemap.xml` directive.

**3. `index.html`** — Enhance meta tags:
- Add `og:image` and `twitter:image` (use the desktop hero background as a fallback social share image)
- Add `og:locale` (`en_US`), `og:site_name` (`DataMate`)
- Add `theme-color` meta tag
- Add structured data (JSON-LD) for `ProfessionalService` schema with service details, contact info, and pricing

**4. `src/pages/Index.tsx`** — Wrap content in `<main>` for semantic HTML. Add `lang` attribute switching on `<html>` element based on current i18n language.

**5. Semantic sections** — Add `aria-label` attributes to key `<section>` elements in components (HeroSection, PainPointsSection, etc.) for accessibility and SEO crawlability.

### Technical Details

JSON-LD schema will include:
- `@type: ProfessionalService`
- Name, description, URL, contact point (email, phone)
- `areaServed`, `serviceType` for B2B SaaS compliance consulting
- `priceRange` indicator

The `lang` attribute on `<html>` will be dynamically updated via a `useEffect` in `Index.tsx` based on the current language from the i18n provider, improving hreflang signals for search engines.

