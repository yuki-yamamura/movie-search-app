# Runtime Validation for TMDB API Types

## Overview

This directory contains documentation and setup for runtime validation of TMDB API responses. While our OpenAPI-generated types provide excellent compile-time type safety, runtime validation adds an additional layer of protection against unexpected API changes.

## Current Implementation Status

**Status**: 📋 **Documentation Only** (Foundation for future implementation)

Currently, our application relies on:
- ✅ **Compile-time type safety** via OpenAPI-generated types
- ✅ **Type guards** in `movie-utils.ts` for basic runtime checks
- ✅ **Enhanced error handling** via `TMDBError` class

## Recommended Future Implementation

### Option 1: Zod Integration (Recommended)

[Zod](https://zod.dev/) provides TypeScript-first schema validation with excellent developer experience.

#### Installation
```bash
npm install zod
```

#### Example Implementation

```typescript
// src/types/validation/movie-schemas.ts
import { z } from 'zod';

// Movie schema based on our generated types
export const MovieSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  overview: z.string().optional(),
  poster_path: z.string().optional(),
  backdrop_path: z.string().optional(),
  release_date: z.string().optional(),
  vote_average: z.number(),
  vote_count: z.number(),
  popularity: z.number(),
  genre_ids: z.array(z.number()).optional(),
  adult: z.boolean().optional(),
  original_language: z.string().optional(),
  original_title: z.string().optional(),
  video: z.boolean().optional(),
});

export const MovieListResponseSchema = z.object({
  page: z.number(),
  results: z.array(MovieSchema).optional(),
  total_pages: z.number(),
  total_results: z.number(),
});

// Infer types from schemas (should match our generated types)
export type ValidatedMovie = z.infer<typeof MovieSchema>;
export type ValidatedMovieListResponse = z.infer<typeof MovieListResponseSchema>;
```

#### Integration with API Layer

```typescript
// src/app/(models)/movie/logic/api.ts (enhanced version)
import { MovieListResponseSchema } from '@/types/validation/movie-schemas';

export const getMovies = async (page: number = 1): Promise<PopularMovieResponse> => {
  const { data, error } = await tmdbClient.GET("/3/movie/popular", {
    params: { query: { page: page.toString() } }
  });

  if (error) {
    throw new TMDBError(error);
  }

  // Runtime validation
  const validationResult = MovieListResponseSchema.safeParse(data);
  
  if (!validationResult.success) {
    console.warn('API response validation failed:', validationResult.error);
    // Option 1: Throw error for strict validation
    // throw new Error('Invalid API response format');
    
    // Option 2: Log warning and continue (graceful degradation)
    // Return data as-is but log the validation issue
  }

  return data;
};
```

### Option 2: Yup Integration

[Yup](https://github.com/jquense/yup) is another popular validation library with good TypeScript support.

#### Installation
```bash
npm install yup
npm install -D @types/yup
```

#### Example Implementation

```typescript
// src/types/validation/movie-schemas.ts
import * as yup from 'yup';

export const movieSchema = yup.object({
  id: yup.number().required(),
  title: yup.string().optional(),
  overview: yup.string().optional(),
  poster_path: yup.string().nullable().optional(),
  backdrop_path: yup.string().nullable().optional(),
  release_date: yup.string().optional(),
  vote_average: yup.number().required(),
  vote_count: yup.number().required(),
  popularity: yup.number().required(),
  genre_ids: yup.array().of(yup.number()).optional(),
});

export const movieListResponseSchema = yup.object({
  page: yup.number().required(),
  results: yup.array().of(movieSchema).optional(),
  total_pages: yup.number().required(),
  total_results: yup.number().required(),
});
```

### Option 3: Custom Validation Functions

For lighter-weight solutions, custom validation functions can be implemented:

```typescript
// src/types/validation/movie-validators.ts
import type { Movie, MovieListResponse } from '@/types/generated/movie-types';

export const isValidMovie = (obj: unknown): obj is Movie => {
  if (typeof obj !== 'object' || obj === null) return false;
  
  const movie = obj as Movie;
  
  return (
    typeof movie.id === 'number' &&
    typeof movie.vote_average === 'number' &&
    typeof movie.vote_count === 'number' &&
    typeof movie.popularity === 'number'
  );
};

export const isValidMovieListResponse = (obj: unknown): obj is MovieListResponse => {
  if (typeof obj !== 'object' || obj === null) return false;
  
  const response = obj as MovieListResponse;
  
  return (
    typeof response.page === 'number' &&
    typeof response.total_pages === 'number' &&
    typeof response.total_results === 'number' &&
    (Array.isArray(response.results) || response.results === undefined)
  );
};
```

## Implementation Strategy

### Phase 1: Research and Planning
1. **Evaluate options** - Compare Zod, Yup, and custom solutions
2. **Performance analysis** - Measure validation overhead
3. **Integration planning** - Determine validation points in the application

### Phase 2: Schema Definition
1. **Create validation schemas** for all TMDB API response types
2. **Ensure schema compatibility** with generated OpenAPI types
3. **Add comprehensive test coverage** for validation schemas

### Phase 3: API Integration
1. **Integrate validation** into API layer functions
2. **Implement error handling** for validation failures
3. **Add configuration options** for validation strictness

### Phase 4: Monitoring and Optimization
1. **Add logging** for validation failures
2. **Monitor performance impact** in production
3. **Optimize schemas** based on real-world usage

## Benefits of Runtime Validation

### 🛡️ **Enhanced Reliability**
- Catch unexpected API changes before they break the UI
- Provide early warning of data quality issues
- Protect against malformed responses

### 🐛 **Better Debugging**
- Clear error messages for invalid data
- Detailed validation reports
- Easier identification of API inconsistencies

### 📊 **Data Quality Monitoring**
- Track validation failure rates
- Identify patterns in data inconsistencies
- Proactive monitoring of API health

### 🔄 **Graceful Degradation**
- Handle partial data gracefully
- Provide fallbacks for missing fields
- Maintain functionality despite minor API changes

## Considerations

### Performance Impact
- Runtime validation adds computational overhead
- Consider validation only in development/staging environments
- Implement selective validation for critical data paths

### Maintenance Burden
- Validation schemas need to stay in sync with OpenAPI types
- Consider automated schema generation from OpenAPI spec
- Balance validation coverage with maintenance effort

### Error Handling Strategy
- Decide between strict validation (throw errors) vs. graceful degradation
- Implement proper logging for validation failures
- Consider user experience impact of validation errors

## Next Steps

1. **Choose validation library** based on project requirements
2. **Create proof of concept** with a single API endpoint
3. **Measure performance impact** and adjust strategy accordingly
4. **Implement validation** incrementally across the application
5. **Add monitoring and alerting** for validation failures

## Files to Create (Future Implementation)

```
src/types/validation/
├── README.md                     # This file
├── movie-schemas.ts              # Validation schemas
├── movie-validators.ts           # Custom validation functions
├── validation-config.ts          # Configuration options
└── __tests__/
    ├── movie-schemas.test.ts     # Schema tests
    └── movie-validators.test.ts  # Validator tests
```

## Related Documentation

- [Zod Documentation](https://zod.dev/)
- [Yup Documentation](https://github.com/jquense/yup)
- [TypeScript Handbook - Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
- [TMDB API Documentation](https://developer.themoviedb.org/docs)

---

*This documentation serves as a foundation for implementing robust runtime validation in the TMDB movie search application.*