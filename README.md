# Chris Folmar Portfolio

A modern, responsive personal portfolio website for Chris Folmar — Engineering Manager, Technical Lead, and software developer. The site showcases professional experience, skills, client projects, blog posts, and a contact form, with a focus on AI-powered development and modern engineering leadership.

Live at [chrisfolmar.com](https://chrisfolmar.com) | [cfolmar.com](https://cfolmar.com)

## Features

- **Responsive Design**: Optimized layouts for mobile, tablet, and desktop with device-aware rendering
- **Dark/Light Mode**: Theme toggle with persistent user preference
- **Interactive UI**: Scroll-triggered animations and smooth transitions powered by Framer Motion
- **Project Showcase**: Detailed project pages with descriptions, tech stacks, and live links
- **Professional Blog**: Articles on engineering leadership, AI-powered development, and industry insights
- **Contact Form**: Secure, spam-protected contact form with rate limiting and honeypot detection
- **SEO Optimized**: Open Graph, Twitter Cards, Schema.org JSON-LD, sitemap, and robots.txt for search visibility
- **Performance**: Lazy image loading, canvas effects only on desktop, and memoized components throughout

## Tech Stack

- **React**: Frontend library for building user interfaces
- **TypeScript**: Type safety and developer experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for smooth transitions
- **Express**: Backend server for API endpoints
- **Shadcn UI**: Component library for consistent design
- **PostgreSQL**: Database for storing messages and user data
- **SendGrid**: Email delivery for contact form submissions
- **Drizzle ORM**: Type-safe database access and schema management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/chrisfolmar/personal-website.git
   cd personal-website
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```
   DATABASE_URL=your_postgres_connection_string
   SENDGRID_API_KEY=your_sendgrid_api_key
   ```

4. Push the database schema
   ```bash
   npm run db:push
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

6. Open [http://localhost:5000](http://localhost:5000) in your browser

## Project Structure

- `/client` - Frontend React application
  - `/src/components` - Reusable UI components
  - `/src/pages` - Page components for routing
  - `/src/lib` - Utility functions and data
  - `/src/hooks` - Custom React hooks
- `/server` - Backend Express server
  - `/routes.ts` - API route definitions
  - `/storage.ts` - Data storage implementation
- `/shared` - Shared code between frontend and backend
  - `/schema.ts` - Database schema and types
- `/public` - Static assets (sitemap, robots.txt, manifest)

## Contact

For inquiries, reach out at: [contact@chrisfolmar.com](mailto:contact@chrisfolmar.com)

## License

This project is licensed under the MIT License - see the LICENSE file for details.