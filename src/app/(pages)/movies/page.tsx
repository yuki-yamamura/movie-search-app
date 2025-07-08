import { Suspense } from 'react';

import { AVAILABLE_YEARS } from '@/app/(models)/movie/constants/years';
import { discoverMovies } from '@/app/(models)/movie/logic/api';

import { ClientPage } from './client-page';

type Props = {
  searchParams: Promise<{
    search?: string;
    releaseYear?: string;
    page?: string;
  }>;
};

const Page = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const search = params.search || '';
  const releaseYear = params.releaseYear || '';
  const pageParam = params.page || '1';
  
  // Validate release year is in available years
  const validReleaseYear = releaseYear && AVAILABLE_YEARS.map(String).includes(releaseYear) 
    ? releaseYear 
    : '';

  // Validate and parse page number
  const page = Math.max(1, parseInt(pageParam) || 1);

  // Fetch initial data server-side (always page 1 for initial load)
  const initialData = await discoverMovies({
    query: search || undefined,
    year: validReleaseYear ? parseInt(validReleaseYear) : undefined,
    page: 1,
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientPage 
        initialData={initialData}
        initialSearch={search}
        initialReleaseYear={validReleaseYear}
        initialPage={page}
      />
    </Suspense>
  );
};

export default Page;
