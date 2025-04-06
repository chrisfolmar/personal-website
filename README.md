# Chris Folmar Portfolio

A modern, responsive personal portfolio website showcasing my professional experience, projects, and blog.

## Features

- **Responsive Design**: Fully responsive design that looks great on all devices
- **Dark/Light Mode**: Theme toggle for user preference
- **Interactive UI**: Engaging animations and transitions
- **Project Showcase**: Detailed project pages with descriptions and links
- **Professional Blog**: Share insights and experiences with blog articles
- **Contact Form**: Secure, spam-protected contact form for inquiries

## Tech Stack

- **React**: Frontend library for building user interfaces
- **TypeScript**: Type safety and developer experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for smooth transitions
- **Express**: Backend server for API endpoints
- **Shadcn UI**: Component library for consistent design
- **PostgreSQL**: Database for storing messages and user data

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/chrisfolmar/portfolio.git
   cd portfolio
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5000](http://localhost:5000) in your browser

## Project Structure

- `/client` - Frontend React application
  - `/src/components` - Reusable UI components
  - `/src/pages` - Page components for routing
  - `/src/lib` - Utility functions and data
  - `/src/hooks` - Custom React hooks
  - `/src/types` - TypeScript type definitions
- `/server` - Backend Express server
  - `/routes.ts` - API route definitions
  - `/storage.ts` - Data storage implementation
- `/shared` - Shared code between frontend and backend
  - `/schema.ts` - Database schema and types

## Contact

For inquiries, reach out to me at: contact@chrisfolmar.com

## License

This project is licensed under the MIT License - see the LICENSE file for details.