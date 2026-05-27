# Overview

Personal portfolio website for Chris Folmar — Engineering Manager and AI Transformation Leader at Fullscript. The site is positioned as a senior engineering leader / operator portfolio (not a generic "modern personal site"): calm, sharp, editorial, premium. It surfaces case studies, the AI Transformation work (Team GSD), writing, current focus, résumé, and a contact form.

# Editorial design system — "Engineer's notebook" (May 2026)

After the April editorial overhaul read as generic Stripe/Linear-adjacent
operator-portfolio, the visual system was differentiated in May 2026.
Three directions were explored on a temporary `/visual-directions`
preview page and Direction B — "Engineer's notebook" — was graduated.

- **Palette**: deep navy primary (`hsl(215, 60%, 16%)` light / brass `hsl(41, 72%, 58%)` dark) on a warm cream background (`hsl(43, 50%, 92%)`); dark mode is deep navy (`hsl(215, 50%, 9%)`) with cream ink. A brass/amber "marker" accent (`--marker`, `--marker-soft`) carries eyebrows and headline highlights — used sparingly. Configured in `theme.json` and `client/src/index.css`.
- **Typography**: Inter Tight (display) + Inter (body) + IBM Plex Mono (eyebrows, metric labels, technical paths). The mono accent signals the dev-origin background without shouting. `radius` stays at `0.375`. The `.text-eyebrow` utility is mono+brass+uppercased.
- **Signature motif**: `<SignatureMotif />` is a reusable dotted-grid texture (with `variant="rule"` for the brass-dot + dashed hairline used in the hero, and `variant="band"` for full-width section dividers). It extends the look of the Hero `SystemsMap` across other surfaces (currently Hero + AITransformationSummary).
- **Marker highlight**: the `.marker-highlight` utility renders a translucent brass band behind the lower 35% of a span, used to emphasize a phrase in headlines (e.g. "how the work gets done").
- **Memorable interaction**: the Hero `SystemsMap` nodes are keyboard-focusable descriptive graphics (`role="img"` + `tabIndex={0}` + `aria-label`). Hover or focus lights the connected edges in brass and surfaces a one-line note about that part of the operating model (`teams: 3 globally distributed squads`, etc.). The lit-edge effect is a colour change only — safe with `prefers-reduced-motion`.
- **Motion**: a single `FadeIn` primitive (opacity 0→1, y 12→0, ~0.45s easeOut, viewport once). `prefers-reduced-motion` is honored globally. The legacy desktop particle background is a no-op.
- **Layout primitives** (in `client/src/components/`): `SectionHeader`, `MetricStrip`, `PrincipleCard`, `CaseStudyCard`, `WritingCard`, `QuoteCallout`, `CtaBand`, plus the new `SignatureMotif`. Buttons get a subtle `3px 3px 0 hsl(var(--marker))` offset shadow that reads as a stamped/notebook ink mark.
- **Hero**: editorial copy + inline systems-map SVG (Teams / Workflows / Systems / AI / Operations). The profile photo lives in the About section only.
- **Homepage rhythm** (`client/src/pages/home.tsx`): Hero → (Manifesto in dev) → MetricStrip → AITransformationSummary → WhatIDo → CurrentFocus → FeaturedCaseStudies → Writing → CtaBand. Reordered May 2026 (task #66) to surface the AI Transformation story within the first scroll, with the AI-flavored metrics leading the strip directly above it.

# "Reflection of me" content surfaces (May 2026)

Added in task #36 to give the site a personality layer (not just an
operator layer). All Chris-voice copy lives behind a placeholder
system so nothing leaks into production until he fills it in.

- **Placeholder convention**: `client/src/lib/placeholder.tsx` exports
  `isDev`, `isPlaceholder()`, `devOnlyText()`, `<DevOnly>`, and
  `<PlaceholderBadge>`. Any string of the shape `[CHRIS: ...]` is
  treated as unfilled. In dev (`import.meta.env.DEV`) placeholders
  render as raw text (often wrapped in a dashed brass badge so
  they're obvious); in production they are hidden, and any whole
  surface whose body is still a placeholder is omitted from the DOM.
- **Surfaces**:
  - **Manifesto** (`client/src/components/Manifesto.tsx`) — pinned
    letter-style component mounted on home between Hero and
    MetricStrip. Wrapped in `<DevOnly>`; whole component disappears
    in production until filled. Includes a "Read what I currently
    believe" link to `/beliefs`.
  - **Things I believe** (`client/src/pages/beliefs.tsx`, route
    `/beliefs`, registered in `App.tsx`) — numbered, datable
    beliefs (target 5–8). Each belief is independently filterable.
    Linked from the Manifesto and the About page.
    `BELIEFS_METADATA` lives in `client/src/lib/metadata/routes.ts`,
    is plumbed through `resolvePageMetadata`, the sitemap (XML +
    HTML), and ships SSR'd `WebPage` JSON-LD.
  - **Richer /now** (`client/src/pages/now.tsx`) — three new
    sub-sections below the focus cards: *Currently reading*,
    *Currently using*, *Recently changed my mind on*. Each
    sub-section auto-hides in production if every item is still a
    placeholder; individual items render only when filled.
  - **MetricStrip human metric** (`client/src/components/MetricStrip.tsx`)
    — one brass-highlighted "human" card slots in next to the work
    metrics when filled; in production the strip falls back to the
    original five-up grid when still unfilled.
  - **About work-photo** (`client/src/components/About.tsx`) —
    a second photo of Chris (Fullscript jersey portrait) renders
    below the existing wife-and-Chris photo, served via
    `<picture>` + AVIF/WebP/JPEG srcsets out of
    `/assets/images/about-work-*`. Derivatives are regenerated by
    `node scripts/optimize-images.mjs` from the base
    `client/public/assets/images/about-work.jpg`.
  - **Footer sign-off** (`client/src/components/Footer.tsx`) — one
    refreshable italic line above the copyright row.
  - **Writing voice addendum** (`client/src/pages/writing.tsx`) —
    one-line uppercase mono addendum under the page header signaling
    the writing is opinionated.
- **Questionnaire artifact**: `.local/reflection-questionnaire.md`
  groups every `[CHRIS: ...]` prompt by surface with word-count
  guidance, anti-patterns, and shape-only examples. Fill that file
  (or paste numbered answers back) and the agent drops them into
  the scaffolded components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter (lightweight router) for client-side navigation with routes for home (`/`), blog posts (`/blog/:id`), and project details (`/project/:id`)
- **State Management**: React Query (`@tanstack/react-query`) for server state; React context for theme management
- **UI Components**: Shadcn UI component library built on Radix UI primitives, styled with Tailwind CSS
- **Animations**: Framer Motion for page transitions and scroll-triggered animations, with device-aware rendering (animations disabled on mobile for performance)
- **Theme**: Dark/light mode toggle with CSS variables defined in `index.css`, theme config in `theme.json`, and Replit's shadcn theme plugin
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

## Page Structure

The homepage is composed in `client/src/pages/home.tsx` from the editorial primitives above. Standalone routes: `/case-studies`, `/case-studies/:slug`, `/now`, `/resume`, `/blog/:id`, `/project/:id`, `/sitemap`, plus a 404. The legacy `Projects.tsx`, `Testimonials.tsx`, and `Blog.tsx` components are no longer mounted on the homepage — kept around only as references and not part of the new visual system.

### Writing — external posts

Posts that live on a third-party publication (e.g. the Fullscript Builders Corner blog) set `externalUrl` on the `BlogPost` entry in `client/src/lib/data.ts`. `WritingCard` renders these as outbound `<a target="_blank" rel="noopener noreferrer">` with a "Fullscript Builders Corner · {category}" eyebrow prefix and an `ExternalLink` icon. `/blog/:id` redirects to the external URL via `window.location.replace`, the XML sitemap (`server/sitemap.ts`) skips them, and `buildBlogPostingJsonLd` emits the external URL as canonical. Add a future external post by appending a `BlogPost` with `externalUrl` set and no `content` field — everything else flows from the convention.

## Backend Architecture

- **Framework**: Express.js running on Node with TypeScript (compiled via `tsx` for dev, `esbuild` for production)
- **API**: RESTful endpoints under `/api/` for contact form submissions
- **Security**: In-memory rate limiting (5 requests/hour per IP), spam content detection, form validation with Zod schemas, honeypot field for bot detection
- **Storage**: Currently uses in-memory storage (`MemStorage` class) with an `IStorage` interface, making it swappable for database-backed storage

## Data Layer

- **Schema**: Drizzle ORM with PostgreSQL dialect, defined in `shared/schema.ts`
- **Tables**: `users` (id, username, password) and `messages` (id, name, email, subject, message)
- **Validation**: Zod schemas generated from Drizzle schemas via `drizzle-zod`
- **Database**: Configured for Neon PostgreSQL (`@neondatabase/serverless`) with WebSocket support
- **Migrations**: Managed via `drizzle-kit push` command

## Content Management

- Portfolio content (experiences, skills, projects, blog posts, testimonials) is stored as static data in `client/src/lib/data.ts`
- Project and personal data were initially scraped/compiled using Python scripts (`scrape_projects.py`, `social_media_data.py`) and stored as JSON files for reference
- Blog post content includes HTML that is sanitized with DOMPurify before rendering

## Performance Optimizations

- Device-type detection hook (`use-mobile.tsx`) is still available but the editorial system intentionally uses the same layout across breakpoints for consistency.
- Lazy image loading with Intersection Observer (`LazyImage.tsx`).
- The canvas particle background has been retired; `ParticleBackground.tsx` is a no-op shim kept for backwards compatibility.
- Memoized components throughout (React.memo, useMemo, useCallback).
- The Hero no longer preloads or rotates profile photos — the only profile image lives in the About section.

## SEO

- Comprehensive meta tags (Open Graph, Twitter Cards, Schema.org JSON-LD)
- Dynamic page meta updates for blog posts and project detail pages
- Sitemap generation script (`scripts/sitemap-generator.js`)
- Static `robots.txt` and `manifest.json` in public directory
- Canonical URL: `chrisfolmar.com` with alternate `cfolmar.com`

## Build & Development

- **Dev**: `npm run dev` runs `tsx server/index.ts` which starts Express with Vite middleware for HMR
- **Build**: `npm run build` runs Vite build for frontend (output to `dist/public`) and esbuild for server (output to `dist/index.js`)
- **Production**: `npm start` runs `NODE_ENV=production node dist/index.js`
- **Database**: `npm run db:push` pushes schema to database via Drizzle Kit

# Engineering

Baseline engineering hygiene that the site is held to (added April 2026 in the
"engineering rigor pass"):

- **Tests**: `npm test` runs Vitest unit tests followed by a Playwright
  smoke suite. Use `npm run test:unit` or `npm run test:smoke` to run a
  single layer.
  - Unit (Vitest, `tests/server/`, `tests/client/`): contact-route
    handler (rate limiter, spam content, honeypot, Zod validation,
    storage stub via `IStorage`) and the SEO/metadata builders + SSR
    head HTML escaping.
  - Smoke (Playwright, `tests/smoke/`, chromium only): home renders
    without console errors, security headers (CSP/HSTS/X-Frame-Options/
    Referrer-Policy/X-Content-Type-Options) are present, `/writing`
    chip filter narrows visible cards, `/contact` empty submit shows
    validation errors, dark-mode toggle persists across reload, and
    `/blog/4` shows the archive banner. Playwright spins up
    `npm run dev` on port 5000 (`reuseExistingServer: true` locally).
- **Type-check**: `npm run check` runs `tsc --noEmit` cleanly. The previous
  `server/vite.ts` `allowedHosts` typing issue is contained behind a documented
  `as const` cast.
- **Lint + format**: `npm run lint` runs ESLint (typescript-eslint, react,
  react-hooks, jsx-a11y, prettier-compat) via flat config (`eslint.config.js`).
  `npm run format` runs Prettier (`.prettierrc`, `.prettierignore`).
  `lint-staged` + `husky` (`.husky/pre-commit`) format and lint staged files at
  commit time.
- **CI**: `.github/workflows/ci.yml` runs install → check → lint → test → build
  on Node 20 for every push and PR.
- **Security headers**: `helmet` is mounted in `server/index.ts` with a CSP
  that allows Google Fonts and the inline styles Tailwind/Radix need. HSTS,
  X-Content-Type-Options, X-Frame-Options=DENY, and
  Referrer-Policy=strict-origin-when-cross-origin are all set.
  - `script-src` is environment-conditional. In production it's nonce-only
    (no `'unsafe-inline'`): each request generates a fresh nonce stored on
    `res.locals.cspNonce` and propagated into the SSR head's inline JSON-LD
    `<script>` via `renderSsrHead(metadata, nonce)`. In dev it falls back to
    `'unsafe-inline'` so Vite's HMR preamble (an inline script injected by
    `@vitejs/plugin-react`) keeps working — browsers ignore `'unsafe-inline'`
    when a nonce is also present, so the two are mutually exclusive.
- **Body-size limit**: `express.json({ limit: "32kb" })` — the contact form is
  small text, so anything bigger is presumed abuse.
- **Honeypot**: the contact form has a hidden `website` field on the client
  (`client/src/components/Contact.tsx`); the server (`server/routes.ts`)
  silently accepts and discards any submission with that field filled,
  returning 200 so bots don't learn the field is a trap.
- **Known limitation**: the rate limiter is in-memory per-process and won't
  work across multiple instances. Replace with a shared store (Redis) before
  scaling horizontally.
- **/now freshness**: the `/now` page (`client/src/pages/now.tsx`) shows a
  "Last updated: <month year>" line driven by the `lastUpdated` constant near
  the bottom of the file. Whenever any of the /now content arrays change
  (`focusAreas`, `currentlyReading`, `currentlyUsing`, `recentlyChangedMyMind`),
  bump `lastUpdated` in the same change. A visibly stale /now page undermines
  the whole point of the page.

# External Dependencies

## Database

- **PostgreSQL** via Neon Serverless (`@neondatabase/serverless`) — requires `DATABASE_URL` environment variable

## Email Service

- **SendGrid** (`@sendgrid/mail`) — sends contact form submissions as email notifications to `contact@chrisfolmar.com`; requires `SENDGRID_API_KEY` environment variable

## AI Integration

- **Anthropic SDK** (`@anthropic-ai/sdk`) — listed as a dependency, specific usage not visible in provided files

## Key NPM Packages

- `react`, `wouter`, `@tanstack/react-query` — frontend core
- `framer-motion` — animations
- `tailwindcss`, Radix UI primitives, `class-variance-authority` — styling/components
- `drizzle-orm`, `drizzle-kit` — database ORM and migrations
- `zod`, `zod-validation-error`, `react-hook-form`, `@hookform/resolvers` — form validation
- `dompurify` — HTML sanitization for blog content
- `embla-carousel-react` — carousel/slider component
- `express`, `express-session`, `connect-pg-simple` — server and session management
