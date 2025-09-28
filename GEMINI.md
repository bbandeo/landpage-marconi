# Gemini Project Context: Marconi Inmobiliaria

## Project Overview

This repository contains the source code for Marconi Inmobiliaria, a comprehensive real estate platform built with a modern tech stack. The project is tailored for the Argentine market and features public-facing property listings, a complete admin dashboard for managing properties and leads, and a sophisticated, built-in analytics system.

The architecture is based on Next.js 15 using the App Router, with TypeScript for type safety. The backend is powered by Supabase for the database and authentication, and Cloudinary for image management. The UI is built with Tailwind CSS and shadcn/ui.

A key feature is the custom, GDPR-compliant analytics system designed specifically for real estate needs, including property view tracking, lead source attribution, and performance monitoring.

## Building and Running

The project uses `pnpm` as the recommended package manager.

- **Install Dependencies:**
  ```bash
  pnpm install
  ```

- **Run Development Server:**
  Starts the server on `http://localhost:5000`.
  ```bash
  pnpm dev
  ```

- **Build for Production:**
  ```bash
  pnpm build
  ```

- **Run Production Server:**
  ```bash
  pnpm start
  ```

- **Linting:**
  ```bash
  pnpm lint
  ```

## Development Conventions

- **Structure:** The project follows a feature-oriented structure within the `app` directory. Reusable logic and components are organized into dedicated top-level directories:
    - `app/`: Next.js App Router pages, including API routes.
    - `components/`: Shared and UI-specific React components.
    - `services/`: Business logic (e.g., analytics, properties, leads).
    - `hooks/`: Custom React hooks.
    - `lib/`: Core utility functions and client initializations (e.g., Supabase).
    - `types/`: TypeScript type definitions.
    - `styles/`: Global CSS and theme files.
    - `scripts/`: Database migration and utility scripts.
- **Styling:** Styling is handled with Tailwind CSS and a `premium-theme.css` for specific theming. UI components are based on `shadcn/ui`.
- **State Management:** State is managed through a combination of React hooks, context, and server-side data fetching via Next.js.
- **Database:** The project uses Supabase (PostgreSQL). Database schema changes and migrations are managed via SQL scripts in the `/scripts` directory.
- **Analytics:** A custom analytics engine is a core part of the application. It uses client-side tracking (`lib/analytics-client.ts`), server-side processing via API routes (`app/api/analytics/`), and dedicated hooks (`hooks/useAnalytics.ts`).
