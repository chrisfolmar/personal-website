# Overview

Personal portfolio website for Chris Folmar — Engineering Manager and AI Transformation Leader at Fullscript. The site is positioned as a senior engineering leader / operator portfolio (not a generic "modern personal site"): calm, sharp, editorial, premium. It surfaces case studies, the AI Transformation work (Team GSD), writing, current focus, résumé, and a contact form.

# Editorial design system (April 2026 overhaul)

- **Palette**: deep emerald primary (`hsl(158, 60%, 28%)` light / `hsl(158, 50%, 50%)` dark), warm off-white background in light mode, near-black ink in dark mode. Single accent hue, no gradients, no neon. Configured in `theme.json` and `client/src/index.css`.
- **Typography**: Inter Tight for display/headings, Inter for body. Type scale exposed as utilities: `text-eyebrow`, `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`, `text-body`. `radius` set to `0.375` for restrained corner softness.
- **Motion**: a single `FadeIn` primitive (opacity 0→1, y 12→0, ~0.45s easeOut, viewport once). `prefers-reduced-motion` is honored globally. The legacy desktop particle background is a no-op.
- **Layout primitives** (in `client/src/components/`): `SectionHeader`, `MetricStrip`, `PrincipleCard`, `CaseStudyCard`, `WritingCard`, `QuoteCallout`, `CtaBand`. All sections are composed from these — including legacy components like `About`, `Skills`, `Contact`, `AITransformation`, which now use `SectionHeader` + `FadeIn`.
- **Hero**: editorial copy + inline systems-map SVG (Teams / Workflows / Systems / AI / Operations). The profile photo lives in the About section only.
- **Homepage rhythm** (`client/src/pages/home.tsx`): Hero → MetricStrip → WhatIDo → FeaturedCaseStudies → AITransformationSummary → Writing → CurrentFocus → CtaBand → About → Skills → Contact.

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