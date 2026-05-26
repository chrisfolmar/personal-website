# Chris Folmar — Personal Website

Personal portfolio for Chris Folmar, Engineering Manager and AI Transformation Leader at Fullscript. Built as an editorial "Engineer's notebook" — calm, specific, and opinionated rather than generic.

**Live at [chrisfolmar.com](https://chrisfolmar.com)** | also [cfolmar.com](https://cfolmar.com)

---

## What's on the site

| Route | Description |
|---|---|
| `/` | Homepage — Hero, metrics, What I Do, Current Focus, Case Studies, AI Transformation, Writing |
| `/case-studies` | Case study index |
| `/case-studies/:slug` | Individual case study detail |
| `/now` | What I'm focused on this season |
| `/beliefs` | Things I currently believe (dated, updatable) |
| `/writing` | Field notes — engineering leadership, AI, business systems |
| `/resume` | Full résumé with experience and skills |
| `/services` | Freelance web work for small local businesses |
| `/contact` | Contact form |
| `/sitemap` | Human-readable sitemap |

---

## Design system

"Engineer's notebook" — differentiated from the generic operator-portfolio look:

- **Palette**: deep navy primary on warm cream background; brass/amber marker accent (`--marker`) for eyebrows and headline highlights
- **Typography**: Inter Tight (display) + Inter (body) + IBM Plex Mono (eyebrows, metric labels, technical paths)
- **Motif**: `<SignatureMotif />` — dotted-grid texture that threads through the Hero and section dividers
- **Motion**: single `<FadeIn />` primitive (opacity + y, ~0.45s, `prefers-reduced-motion` respected)
- **Buttons**: `3px 3px 0 hsl(var(--marker))` offset shadow — notebook ink mark effect

---

## Tech stack

**Frontend**
- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org) via [Vite](https://vitejs.dev)
- [Wouter](https://github.com/molefrog/wouter) — lightweight client-side routing
- [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com)
- [Framer Motion](https://www.framer.com/motion/) — scroll-triggered animations
- [TanStack Query](https://tanstack.com/query) — server state management

**Backend**
- [Express.js](https://expressjs.com) + TypeScript (`tsx` in dev, `esbuild` in production)
- RESTful API under `/api/` — contact form submissions
- [Helmet](https://helmetjs.github.io) — security headers (CSP, HSTS, X-Frame-Options, etc.)
- In-memory rate limiting (5 requests/hour per IP), spam detection, honeypot field

**Data**
- [Drizzle ORM](https://orm.drizzle.team) + [Neon PostgreSQL](https://neon.tech) (`@neondatabase/serverless`)
- [SendGrid](https://sendgrid.com) — contact form email delivery

---

## Getting started

### Prerequisites

- Node.js 20+
- A PostgreSQL database (Neon recommended)

### Environment variables

```
DATABASE_URL=your_neon_postgres_connection_string
SENDGRID_API_KEY=your_sendgrid_api_key
```

### Install and run

```bash
# Install dependencies
npm install

# Push the database schema
npm run db:push

# Start the development server (Express + Vite HMR on port 5000)
npm run dev
```

---

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Development server with HMR (port 5000) |
| `npm run build` | Production build — Vite (frontend) + esbuild (server) |
| `npm start` | Run the production build |
| `npm run check` | TypeScript type-check (`tsc --noEmit`) |
| `npm run lint` | ESLint (typescript-eslint, react, jsx-a11y, prettier-compat) |
| `npm run format` | Prettier |
| `npm run test:unit` | Vitest unit tests (`tests/server/`, `tests/client/`) |
| `npm run test:smoke` | Playwright smoke tests (`tests/smoke/`, chromium) |
| `npm test` | Unit + smoke |
| `npm run db:push` | Push schema changes to the database via Drizzle Kit |

---

## Project structure

```
├── client/
│   └── src/
│       ├── components/     # Layout primitives and section components
│       ├── pages/          # Route-level page components
│       ├── lib/            # Data, metadata, SEO utilities, placeholder system
│       └── hooks/          # Custom React hooks
├── server/
│   ├── index.ts            # Express entry point
│   ├── routes.ts           # API routes (contact form)
│   └── storage.ts          # IStorage interface + MemStorage implementation
├── shared/
│   └── schema.ts           # Drizzle schema, Zod validators, shared types
├── tests/
│   ├── server/             # Vitest unit tests — contact route, rate limiter
│   ├── client/             # Vitest unit tests — SEO/metadata builders
│   └── smoke/              # Playwright smoke tests — key visitor flows
├── scripts/                # Sitemap generator, image optimizer
└── .github/
    └── workflows/
        └── ci.yml          # CI: check → lint → test → build (Node 20)
```

---

## CI

GitHub Actions runs on every push and pull request:

1. `npm run check` — type-check
2. `npm run lint` — lint
3. `npm test` — unit + Playwright smoke (chromium)
4. `npm run build` — production build

Pre-commit hooks (husky + lint-staged) format and lint staged files locally.

---

## Security

- **CSP**: nonce-based in production (no `unsafe-inline`), `unsafe-inline` fallback in dev for Vite HMR
- **HSTS**, **X-Frame-Options: DENY**, **X-Content-Type-Options**, **Referrer-Policy** via Helmet
- **Rate limiting**: 5 contact form submissions per hour per IP (in-memory; swap for Redis before horizontal scaling)
- **Honeypot**: hidden `website` field on the contact form; submissions with it filled are silently discarded
- **Body size limit**: `express.json({ limit: "32kb" })`

---

## Contact

[contact@chrisfolmar.com](mailto:contact@chrisfolmar.com)
