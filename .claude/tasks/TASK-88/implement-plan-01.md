# Implementation Plan: Movie Release Year Filtering

## Task ID: TASK-88
## Title: 映画をリリース年で絞り込める

## 1. Objectives & Scope

### Main Objective
Add a release year filter dropdown to the movie search application that allows users to filter movies by their release year.

### Key Requirements
- Add year filter dropdown with fixed years (2025-2021)
- Place filter UI to the right of the search button
- Auto-refresh results when year is selected
- Work together with keyword search
- Display current filter conditions as text
- Use nuqs library for URL search params management
- Keep sort order as popularity (fixed)
- Default dropdown shows "リリース年を選択" (Select release year)

### Out of Scope
- Other filtering options (genre, rating, etc.)
- Dynamic year calculation
- Custom sort orders
- Advanced filter combinations

## 2. Technical Approach

### API Changes
- Switch from `/movie/popular` to `/discover/movie` endpoint
- Add support for `primary_release_year` parameter
- Maintain backward compatibility for non-filtered views

### State Management
- Use nuqs library for URL search params
- Synchronize filter state with URL (e.g., `?releaseYear=2024`)
- Preserve filter state on page reload/navigation

### UI Architecture
- Create new `ReleaseYearFilter` component for the dropdown
- Create `FilterStatus` component to display active filters
- Update existing page layout to accommodate new components
- Maintain responsive design

## 3. Files to Create/Modify

### New Files
```
src/app/(models)/movie/
├── components/
│   ├── release-year-filter/
│   │   ├── index.ts
│   │   ├── release-year-filter.tsx
│   │   └── release-year-filter.module.css
│   └── filter-status/
│       ├── index.ts
│       ├── filter-status.tsx
│       └── filter-status.module.css
├── hooks/
│   └── use-discover-movies.ts
├── schemas/
│   └── search-params.ts
└── constants/
    └── years.ts
```

### Modified Files
```
- package.json (add nuqs dependency)
- src/app/(models)/movie/logic/api.ts (add discover endpoint)
- src/app/(pages)/movies/page.tsx (integrate new components)
- src/app/(pages)/movies/page.module.css (update layout styles)
```

## 4. Implementation Phases

### Phase 1: Setup & Dependencies
1. Install nuqs library: `npm install nuqs`
2. Create constants file with year options (2025-2021)
3. Create search params schema with nuqs parsers
4. Set up basic project structure for new components

### Phase 2: API Layer Updates
1. Add `discoverMovies` function to `api.ts`
   - Support both keyword search and year filter
   - Handle parameter combinations properly
2. Create `useDiscoverMovies` hook
   - Replace `useGetMovies` for filtered views
   - Support all filter parameters
   - Maintain SWR caching strategy

### Phase 3: ReleaseYearFilter Component
1. Create dropdown component with:
   - Default "リリース年を選択" option
   - Years 2025-2021 in descending order
   - onChange handler that updates URL params
2. Style to match existing UI
3. Add proper accessibility attributes

### Phase 4: FilterStatus Component
1. Create component to display active filters
   - Show selected year if any
   - Show search keyword if any
   - Format: "検索条件: キーワード「Batman」、リリース年「2024」"
2. Style as subtle info text
3. Only show when filters are active

### Phase 5: Integration
1. Update movies page:
   - Add ReleaseYearFilter next to search button
   - Add FilterStatus below header
   - Replace movie fetching logic
2. Implement nuqs search params:
   - `releaseYear` for year filter
   - Preserve existing search functionality
3. Handle filter combinations:
   - Keyword + year should work together
   - Empty keyword with year should show all movies from that year

### Phase 6: Testing & Polish
1. Test all filter combinations
2. Verify URL state persistence
3. Check responsive design
4. Add loading states
5. Handle edge cases (no results, errors)

## 5. Detailed Implementation Steps

### Step 1: Create Year Constants
```typescript
// src/app/(models)/movie/constants/years.ts
export const AVAILABLE_YEARS = [2025, 2024, 2023, 2022, 2021] as const;
export type ReleaseYear = typeof AVAILABLE_YEARS[number];
```

### Step 2: Update API Layer
```typescript
// Add to src/app/(models)/movie/logic/api.ts
export const discoverMovies = async ({
  query,
  year,
  page = 1,
}: {
  query?: string;
  year?: number;
  page?: number;
}): Promise<MovieListResponse> => {
  const baseUrl = `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/3/discover/movie`;
  const params = new URLSearchParams({
    page: page.toString(),
    sort_by: 'popularity.desc',
    ...(year && { primary_release_year: year.toString() }),
    ...(query && { with_keywords: query }),
  });
  
  // Implementation details...
};
```

### Step 3: Create Search Params Schema
```typescript
// src/app/(models)/movie/schemas/search-params.ts
import { parseAsStringEnum, parseAsString } from 'nuqs';
import { AVAILABLE_YEARS } from '../constants/years';

export const searchParamsSchema = {
  search: parseAsString,
  releaseYear: parseAsStringEnum(AVAILABLE_YEARS.map(String)),
};
```

### Step 4: Create ReleaseYearFilter Component
```typescript
// src/app/(models)/movie/components/release-year-filter/release-year-filter.tsx
'use client';

import { useQueryState } from 'nuqs';
import { searchParamsSchema } from '../../schemas/search-params';
import { AVAILABLE_YEARS } from '../../constants/years';
import styles from './release-year-filter.module.css';

export const ReleaseYearFilter = () => {
  const [releaseYear, setReleaseYear] = useQueryState(
    'releaseYear',
    searchParamsSchema.releaseYear
  );
  
  // Component implementation...
};
```

### Step 5: Update Movies Page
```typescript
// src/app/(pages)/movies/page.tsx
// Add nuqs provider wrapper
// Integrate ReleaseYearFilter and FilterStatus components
// Update data fetching logic
```

## 6. Testing Approach

### Unit Tests
- ReleaseYearFilter component renders correctly
- Filter changes update URL params
- FilterStatus displays correct information

### Integration Tests
- Year filter + keyword search combination
- URL state persistence across navigation
- API calls with correct parameters

### Manual Testing Checklist
- [ ] Year dropdown shows all years (2025-2021)
- [ ] Default shows "リリース年を選択"
- [ ] Selecting year updates results immediately
- [ ] URL updates with releaseYear param
- [ ] Keyword search works with year filter
- [ ] Filter status shows current filters
- [ ] Page reload preserves filters
- [ ] No year selected shows all movies
- [ ] Error handling for API failures
- [ ] Responsive design on mobile/tablet

## 7. Success Criteria
- Users can filter movies by release year
- Filters persist in URL and survive page reload
- UI is intuitive and matches existing design
- Performance remains fast with SWR caching
- No regression in existing search functionality

## 8. Potential Challenges & Solutions

### Challenge 1: Search + Discover Endpoint Differences
- Search endpoint uses `query` parameter
- Discover endpoint doesn't support direct text search
- **Solution**: Use search endpoint when keyword exists, discover when only filtering

### Challenge 2: nuqs Integration with App Router
- Ensure proper client/server component boundaries
- **Solution**: Use 'use client' directive appropriately

### Challenge 3: Performance with Multiple API Calls
- Different endpoints for different filter combinations
- **Solution**: Leverage SWR's request deduplication and caching

## 9. Future Enhancements
- Add more filter options (genre, rating)
- Save user's preferred filters
- Add filter presets
- Implement advanced search with all TMDB filters