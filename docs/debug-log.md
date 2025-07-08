# Debug Log

## Common Issues and Solutions

### API Connection Errors

#### Issue: "The resource you requested could not be found" (404 Error)
**Date**: 2025-07-08  
**Context**: TMDB API integration  
**Error Message**: "Error loading movies: The resource you requested could not be found."

**Root Cause**: Base URL duplication causing malformed request URLs
- Environment variable: `NEXT_PUBLIC_TMDB_API_BASE_URL=https://api.themoviedb.org/3`
- API endpoint: `/3/movie/popular`
- Resulting URL: `https://api.themoviedb.org/3/3/movie/popular` (incorrect)

**Solution**: Remove API version path from base URL
- **Correct**: `NEXT_PUBLIC_TMDB_API_BASE_URL=https://api.themoviedb.org`
- **Result**: `https://api.themoviedb.org/3/movie/popular` (correct)

**Debugging Steps**:
1. Test API directly with curl to isolate client vs server issues
2. Verify environment variables are correctly set
3. Check complete request URL construction
4. Compare with official API documentation

**Prevention**: Always verify that base URLs and endpoints don't duplicate path segments

---

### Next.js 15 Server Component TypeScript Errors

#### Issue: "Type 'Props' does not satisfy the constraint 'PageProps'"
**Date**: 2025-07-08  
**Context**: Converting client component to server component in Next.js 15  
**Error Message**: `Types of property 'searchParams' are incompatible. Type '{ search?: string | undefined; releaseYear?: string | undefined; }' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]`

**Root Cause**: Next.js 15 changed `searchParams` from synchronous object to Promise
- **Old pattern**: `searchParams: { search?: string }`
- **New pattern**: `searchParams: Promise<{ search?: string }>`

**Solution**: Update component props and add async/await
```typescript
// Props type
type Props = {
  searchParams: Promise<{
    search?: string;
    releaseYear?: string;
  }>;
};

// Component implementation
const Page = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const search = params.search || '';
  // ... rest of component
};
```

**Prevention**: When upgrading to Next.js 15, always check server component prop types and add Promise wrapping where needed

---

## Debugging Methodology

### API Integration Issues
1. **Test API directly first** - Use curl to verify the API works outside the application
2. **Check environment variables** - Verify all required variables are set correctly
3. **Examine URL construction** - Ensure base URL + endpoint creates valid URL
4. **Review authentication** - Confirm API keys and headers are properly configured

### Type Generation Issues
1. **Verify OpenAPI schema** - Confirm schema file is valid and up-to-date
2. **Check build process** - Ensure type generation runs before compilation
3. **Review generated types** - Confirm generated types match expected structure
4. **Test type imports** - Verify all type imports resolve correctly