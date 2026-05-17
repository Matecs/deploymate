# Security Policy

## Supported Versions

DeployMate is a continuously deployed static single-page application. There are no versioned releases — the live site at **[deploymate.hu](https://deploymate.hu)** always reflects the latest commit on the `main` branch, and only that deployment receives security fixes.

| Deployment | Supported |
| ---------- | --------- |
| Current `main` (live at deploymate.hu) | :white_check_mark: |
| Any previous snapshot / fork | :x: |

## Scope

This is a **static front-end only** application. It has:

- No back-end server or API
- No user authentication or session management
- No database or server-side data storage
- No collection of personally identifiable information beyond what a third-party scheduling service (Google Calendar) handles independently

Security issues that are relevant to this project include:

- **Cross-site scripting (XSS)** — injected scripts via React component props or dynamic content
- **Dependency vulnerabilities** — known CVEs in npm dependencies (`npm audit`)
- **Content Security Policy weaknesses** — headers served by the hosting platform
- **Supply-chain attacks** — compromised packages in the dependency tree
- **Sensitive information exposure** — secrets or credentials accidentally committed to the repository

The following are **out of scope** for this project:

- Server-side vulnerabilities (SQL injection, SSRF, RCE, etc.) — there is no server
- Authentication or authorisation bypasses — there is no auth
- Vulnerabilities in third-party services (Google Calendar, Lovable, Netlify/Vercel hosting)
- Social engineering or phishing attacks
- Denial-of-service against the CDN/hosting layer

## Reporting a Vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Use GitHub's built-in **[private vulnerability reporting](https://github.com/Matecs/release-clarity/security/advisories/new)** to submit a report confidentially. Alternatively, you can reach the maintainer by email at the address listed on [deploymate.hu](https://deploymate.hu).

When reporting, please include:

1. A clear description of the vulnerability and its potential impact
2. Steps to reproduce or a proof-of-concept
3. The URL or component where the issue occurs
4. Any suggested mitigations (optional)

## Response Timeline

| Milestone | Target |
| --------- | ------ |
| Acknowledgement of report | Within **48 hours** |
| Initial assessment and severity triage | Within **5 business days** |
| Fix deployed to `main` (for confirmed vulnerabilities) | Within **14 days** of confirmation |
| Public disclosure (coordinated) | After the fix is live, agreed with the reporter |

If a reported vulnerability is **declined** (out of scope, not reproducible, or informational only), you will receive an explanation within the same triage window.

## Disclosure Policy

We follow a **coordinated disclosure** model. Once a fix is deployed we will publish a GitHub Security Advisory crediting the reporter (unless they prefer to remain anonymous). We ask that reporters keep the details private until the advisory is published.
