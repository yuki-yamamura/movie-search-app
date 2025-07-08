# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 movie search application that uses The Movie Database (TMDB) API to display popular movies and search functionality. The app uses React 19, TypeScript, and SWR for data fetching.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint and Stylelint checks
- `npm run format` - Format code using Prettier

### Testing Commands
- `npm run test` - Run tests with Vitest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI interface

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
- Uses SWR for caching and data synchronization
- Custom hooks (`useGetMovies`, `useSearchMovies`) wrap API calls
- All API logic centralized in `logic/api.ts`

#### Component Architecture
- Components are co-located with their styles (`.module.css`)
- Each component has its own index file for clean imports
- Components follow a consistent props pattern with loading/error states

#### Environment Variables
Required environment variables:
- `NEXT_PUBLIC_TMDB_API_BASE_URL`
- `NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN`
- `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL`

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

- `src/app/(models)/movie/logic/api.ts` - All TMDB API interactions
- `src/app/(models)/movie/hooks/` - Data fetching hooks with SWR
- `src/app/(models)/movie/types/movie.ts` - Core type definitions
- `src/app/(pages)/movies/page.tsx` - Main movies page with search
- `vitest.config.ts` - Test configuration with path aliases

## Development Notes

- The app uses CSS Modules for styling - import styles as `styles` object
- All API calls include proper error handling and loading states
- SWR is configured to not revalidate on focus/reconnect for better UX
- TypeScript path aliases are configured (`@/` points to `src/`)
- Image paths from TMDB API are handled with fallbacks to placeholder images