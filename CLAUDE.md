# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 movie search application that uses The Movie Database (TMDB) API to display popular movies and search functionality. The app uses React 19, TypeScript, and SWR for data fetching.

## Development Commands

### Essential Commands

- `npm run dev` - Start development server on localhost:3000 (auto-generates types)
- `npm run build` - Build production version (auto-generates types)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint and Stylelint checks
- `npm run format` - Format code using Prettier
- `npm run generate-types` - Generate TypeScript types from OpenAPI spec

### Testing Commands

- `npm run test` - Run tests with Vitest
- `npm run test:watch` - Run tests in watch mode
- `npx vitest run path/to/file.test.tsx` - Run a single test file

### Linting Commands

- `npm run lint:style` - Run Stylelint on CSS files
- `npm run lint` - Run both ESLint and Stylelint

## Architecture

### Directory Structure

The app follows a domain-driven design with Next.js App Router:

```
src/app/
├── (models)/movie/           # Movie domain logic
│   ├── components/          # Reusable movie components
│   ├── hooks/              # Custom hooks for data fetching
│   ├── logic/              # API calls and business logic
│   └── types/              # TypeScript type definitions
└── (pages)/movies/          # Page components
```

### Key Patterns

#### Data Fetching

- **Hybrid RSC + Client Pattern**: Initial data loads server-side, additional data loads client-side
- Uses SWR for client-side caching and data synchronization
- Custom hooks (`useInfiniteMovies`) wrap API calls with data accumulation using SWR Infinite
- **API Architecture**: Dual API pattern with `api/server.ts` (server actions) and `api/client.ts` (client-side calls)
- Server API handles initial data fetching, client API handles infinite loading and search
- **Type Safety**: Uses `openapi-fetch` with auto-generated types from TMDB OpenAPI spec (`specs/tmdb-api-v3.yaml`)
- Types are regenerated automatically during dev/build processes

#### Component Architecture

- **Server Components**: Handle initial data fetching and pass props to client components
- **Client Components**: Manage interactive features (search, filters, pagination)
- Components are co-located with their styles (`.module.css`)
- Each component has its own index file for clean imports
- Components follow a consistent props pattern with loading/error states

#### Environment Variables

Required environment variables (create `.env.local` by copying `.env.template`):

- `TMDB_API_ACCESS_TOKEN` - Your TMDB API access token
- `TMDB_API_BASE_URL` - TMDB API base URL (https://api.themoviedb.org)
- `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL` - TMDB image base URL (https://image.tmdb.org/t/p)
- `NEXT_PUBLIC_APP_URL` - App URL for production (http://localhost:3000 for dev)

### Testing Setup

- Uses Vitest with jsdom environment
- Testing Library React for component testing
- Tests are co-located with components (`.test.tsx` files)
- Global test setup in `vitest.setup.ts`

### Code Style

- Uses ESLint with Next.js config
- Stylelint for CSS linting with standard config
- Prettier for code formatting
- TypeScript strict mode enabled
- CSS Modules for styling

## Key Files to Understand

- `src/app/(models)/movie/api/server.ts` - Server-side TMDB API calls with custom year filtering
- `src/app/(models)/movie/api/client.ts` - Client-side TMDB API calls
- `src/app/(models)/movie/hooks/` - Data fetching hooks with SWR
- `src/app/(models)/movie/types/movie.ts` - Core type definitions
- `src/app/(pages)/movies/page.tsx` - Server component for initial data fetching
- `src/app/(pages)/movies/client-page.tsx` - Client component for interactivity
- `src/app/(models)/movie/hooks/use-infinite-movies.ts` - Infinite scroll functionality with SWR Infinite
- `src/types/generated/tmdb-api.d.ts` - Auto-generated API types from OpenAPI spec
- `specs/tmdb-api-v3.yaml` - OpenAPI specification for TMDB API
- `vitest.config.ts` - Test configuration with path aliases

## Development Notes

- The app uses CSS Modules for styling - import styles as `styles` object
- All API calls include proper error handling and loading states
- SWR is configured to not revalidate on focus/reconnect for better UX
- TypeScript path aliases are configured (`@/` points to `src/`)
- Image paths from TMDB API are handled with fallbacks to placeholder images
- **Infinite Scroll Pattern**: Uses SWR Infinite with data accumulation where server provides initial page and client fetches additional pages progressively
- **TMDB API Limitation**: Year filtering is implemented client-side because TMDB's year parameter doesn't work reliably
- **Next.js 15**: Server component props use `Promise<searchParams>` pattern requiring async/await
