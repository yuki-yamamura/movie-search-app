# TASK-90: OpenAPI TypeScript Implementation Plan

## Overview
**Task ID**: TASK-90  
**Task Title**: OpenAPIスキーマからTypeScriptの型を生成 (Generate TypeScript types from OpenAPI schema)  
**Objective**: Replace manually defined TypeScript types with automatically generated types from TMDB's official OpenAPI schemas  
**Target API**: The Movie Database (TMDB) API v3  

## Discovery: Official OpenAPI Schemas Available

### TMDB Official OpenAPI Sources
✅ **Great News**: TMDB provides official OpenAPI specifications:
- **TMDB API v3**: `https://developer.themoviedb.org/openapi/64542913e1f86100738e227f`
- **TMDB API v4**: `https://developer.themoviedb.org/openapi/6453cc549c91cf004cd2a015`

### Current Application Usage
Our app currently uses **TMDB API v3** endpoints:
- `/3/movie/popular` - Get popular movies
- `/3/search/movie` - Search movies
- Image configuration for poster/backdrop URLs

**Recommendation**: Use **TMDB API v3** OpenAPI specification as it matches our current implementation.

## Current State Analysis

### Existing Codebase
- **Framework**: Next.js 15.3.3 with React 19
- **Language**: TypeScript 5
- **Current Types**: Manually defined in `src/app/(models)/movie/types/movie.ts`
- **API Integration**: Direct fetch calls in `src/app/(models)/movie/logic/api.ts`
- **Data Fetching**: SWR 2.3.3 for client-side data fetching

### Current Manual Types (To Be Replaced)
```typescript
export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
};

export type MovieListResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Genre = {
  id: number;
  name: string;
};
```

## Technical Approach

### 1. OpenAPI Schema Strategy
**✅ Use Official TMDB OpenAPI v3 Schema**
- Download schema from: `https://developer.themoviedb.org/openapi/64542913e1f86100738e227f`
- Benefits:
  - Official, maintained by TMDB
  - Comprehensive endpoint coverage
  - Accurate type definitions
  - Future-proof with API updates

### 2. Tool Selection
- **Primary Tool**: `openapi-typescript` - Generate TypeScript types from OpenAPI schemas
- **API Client**: `openapi-fetch` - Type-safe fetch client (alternative to manual fetch)
- **Integration**: Either replace or enhance existing SWR hooks

### 3. Architecture Decisions
- **Schema Location**: `schemas/tmdb-api-v3.yaml` - Downloaded official schema
- **Generated Types**: `src/types/generated/tmdb-api.d.ts` - Generated TypeScript definitions
- **Build Integration**: Add type generation to npm scripts
- **Migration Strategy**: Gradual replacement preserving existing functionality

## Implementation Plan

### Phase 1: Setup and Schema Download (Day 1)
1. **Install Dependencies**
   ```bash
   npm install -D openapi-typescript typescript
   npm install openapi-fetch  # Optional: for enhanced API client
   ```

2. **Download Official OpenAPI Schema**
   - Create `schemas/` directory
   - Download TMDB API v3 schema to `schemas/tmdb-api-v3.yaml`
   - Verify schema contains our required endpoints:
     - `/3/movie/popular`
     - `/3/search/movie`
     - Related response schemas

3. **Setup Build Scripts**
   - Add `generate-types` script to `package.json`
   - Configure TypeScript paths for generated types
   - Test initial type generation

### Phase 2: Type Generation and Validation (Day 1-2)
1. **Generate Initial Types**
   ```bash
   npx openapi-typescript schemas/tmdb-api-v3.yaml -o src/types/generated/tmdb-api.d.ts
   ```

2. **Type Mapping Analysis**
   - Compare generated types with current manual types
   - Identify any discrepancies or missing properties
   - Create type adapters if needed for backward compatibility

3. **Integration Testing**
   - Test type generation process
   - Verify TypeScript compilation with generated types
   - Ensure no breaking changes to existing functionality

### Phase 3: API Client Migration (Day 2-3)
1. **Option A: Enhanced Fetch Client (Recommended)**
   - Update `src/app/(models)/movie/logic/api.ts` to use `openapi-fetch`
   - Maintain existing function signatures for backward compatibility
   - Benefits: Type-safe requests, runtime validation, better error handling

2. **Option B: Type-Only Migration (Conservative)**
   - Keep existing fetch logic
   - Only replace type imports with generated types
   - Minimal risk, maintains current architecture

3. **Update Type Imports**
   - Replace imports in:
     - `src/app/(models)/movie/hooks/use-get-movies.ts`
     - `src/app/(models)/movie/hooks/use-search-movies.ts`
     - `src/app/(models)/movie/components/movie-list/movie-list.tsx`
     - `src/app/(models)/movie/components/movie-list/movie-card/movie-card.tsx`

### Phase 4: Testing and Validation (Day 3)
1. **Unit Tests**
   - Run existing tests: `npm run test`
   - Update test files to use generated types
   - Verify all tests pass

2. **Integration Tests**
   - Test API calls with generated types
   - Verify proper error handling
   - Test edge cases and error responses

3. **Build Validation**
   - Test development build: `npm run dev`
   - Test production build: `npm run build`
   - Verify linting: `npm run lint`

### Phase 5: Documentation and Optimization (Day 4)
1. **Update Documentation**
   - Update README with OpenAPI integration
   - Document type generation process
   - Add developer guidelines

2. **CI/CD Integration**
   - Add type generation to build process
   - Consider automated schema updates

3. **Performance Optimization**
   - Monitor bundle size impact
   - Optimize generated types if needed

## File Structure

```
movie-search-app/
├── schemas/
│   └── tmdb-api-v3.yaml                # Downloaded official schema
├── src/
│   ├── types/
│   │   └── generated/
│   │       └── tmdb-api.d.ts           # Generated TypeScript types
│   ├── app/(models)/movie/
│   │   ├── types/
│   │   │   └── movie.ts                # [DEPRECATED] Manual types
│   │   ├── logic/
│   │   │   └── api.ts                  # Updated API client
│   │   ├── hooks/
│   │   │   ├── use-get-movies.ts       # Updated with generated types
│   │   │   └── use-search-movies.ts    # Updated with generated types
│   │   └── components/                 # Updated components
│   └── lib/
│       └── api-client.ts               # [Optional] New openapi-fetch client
├── package.json                        # Updated scripts
└── tsconfig.json                       # Updated paths
```

## Dependencies

### New Dependencies
```json
{
  "dependencies": {
    "openapi-fetch": "^0.12.2"  // Optional: for enhanced API client
  },
  "devDependencies": {
    "openapi-typescript": "^7.4.0"
  }
}
```

### Updated Scripts
```json
{
  "scripts": {
    "generate-types": "openapi-typescript schemas/tmdb-api-v3.yaml -o src/types/generated/tmdb-api.d.ts",
    "postinstall": "npm run generate-types",
    "dev": "npm run generate-types && next dev",
    "build": "npm run generate-types && next build"
  }
}
```

## Risk Assessment

### Technical Risks
- **Schema Complexity**: Official schema may be more complex than needed
- **Type Compatibility**: Generated types may differ from current manual types
- **Build Dependency**: Type generation becomes build requirement

### Mitigation Strategies
- **Gradual Migration**: Implement alongside existing types first
- **Type Adapters**: Create compatibility layers if needed
- **Comprehensive Testing**: Extensive testing during migration
- **Rollback Plan**: Keep manual types as backup during transition

## Success Metrics
- [x] All current functionality works with generated types
- [x] Type generation is integrated into build process
- [x] No runtime errors or type mismatches
- [x] Development experience is maintained or improved
- [x] Code maintainability is improved through automated type generation

## Implementation Status: COMPLETED ✅

**Date Completed**: 2025-07-08  
**Implementation Summary**: Successfully replaced all manual TypeScript types with automatically generated types from TMDB's official OpenAPI v3 schema. All tests pass, builds work correctly, and the application maintains full functionality with improved type safety.

## Timeline
- **Day 1**: Setup, schema download, initial type generation
- **Day 2**: Type migration, compatibility testing
- **Day 3**: API client update, comprehensive testing
- **Day 4**: Documentation, optimization, final validation

## Next Steps
1. **Immediate**: Install dependencies and download official TMDB OpenAPI schema
2. **Short-term**: Generate types and verify compatibility with existing code
3. **Long-term**: Complete migration and establish automated type generation

---

*This plan leverages TMDB's official OpenAPI specifications to ensure accurate, maintainable, and future-proof TypeScript type generation for the movie search application.*