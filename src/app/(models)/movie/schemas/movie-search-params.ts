import { parseAsInteger, parseAsNumberLiteral } from 'nuqs/server';

import { AVAILABLE_YEARS, START_PAGE_INDEX } from '@/app/(models)/movie/constants';
import { parseAsEncodedString } from '@/lib/nuqs';

import type { inferParserType } from 'nuqs';

export const movieSearchParamsSchema = {
  search: parseAsEncodedString,
  releaseYear: parseAsNumberLiteral(AVAILABLE_YEARS),
  page: parseAsInteger.withDefault(START_PAGE_INDEX),
};

export type MovieSearchParams = inferParserType<typeof movieSearchParamsSchema>;
