import '@testing-library/jest-dom';

// Mock environment variables for testing
process.env.NEXT_PUBLIC_TMDB_ACCESS_KEY = 'test-api-key';
process.env.NEXT_PUBLIC_TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN = 'test-access-token';
process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
