# Overview

This is a personal portfolio website for Chris Folmar, a Software Engineering Manager and technologist. The site showcases professional experience, skills, client projects (primarily WordPress sites), blog posts, testimonials, and a contact form. It's a full-stack application with a React frontend and Express backend, designed as a single-page application with detail pages for blog posts and projects.

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
The homepage is a single-page layout with sections: Hero, About, Skills, Projects, Testimonials, Blog, and Contact. Blog posts and project details have their own routed pages. A 404 page handles unknown routes.

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
- Device-type detection hook (`use-mobile.tsx`) with separate rendering paths for mobile, tablet, and desktop
- Lazy image loading with Intersection Observer (`LazyImage.tsx`)
- Canvas particle background only renders on desktop
- Memoized components throughout (React.memo, useMemo, useCallback)
- Profile image preloading and rotation in Hero section

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