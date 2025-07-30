# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture Overview

This is a Next.js 15 real estate website for Marconi Inmobiliaria with React 19, TypeScript, and Tailwind CSS. Built using v0.dev components.

### Key Architecture Components

**Database & Backend:**
- Supabase for backend (PostgreSQL database)
- Three main tables: `properties`, `leads`, and `profiles`
- API routes in `app/api/` for database operations
- Environment variables required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

**Frontend Structure:**
- Main landing page: `app/page.tsx` - Real estate showcase with contact forms
- Admin panel: `app/admin/` - Property and lead management (authentication bypassed in middleware)
- Component library: `components/ui/` - shadcn/ui components
- Custom hooks: `hooks/` - Data fetching and UI state management

**Data Layer:**
- Services: `services/leads.ts`, `services/properties.ts` - API client classes
- Supabase client: `lib/supabase.ts` - Database configuration and TypeScript types
- Cloudinary integration: `lib/cloudinary.ts` - Image upload handling

**Styling:**
- Dark theme by default (configured in root layout)
- Custom CSS variables for brand colors (brand-orange)
- Responsive design with mobile-first approach

### Important Notes

- Authentication is currently bypassed in `middleware.ts` for development
- The app uses Spanish language throughout
- Database schema includes complete TypeScript definitions in `lib/supabase.ts`
- Image uploads handled via Cloudinary
- Lead management system with Kanban-style interface in admin
- Property management with image carousels and filtering

### Environment Setup

Required environment variables:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### Testing

No test framework is currently configured. Use manual testing via development server.