import { parseAsString, parseAsInteger, parseAsNumberLiteral } from 'nuqs';

import { START_PAGE_INDEX } from '@/app/(models)/movie/constants';
import { AVAILABLE_YEARS } from '@/app/(models)/movie/constants/years';

import type { inferParserType } from 'nuqs';

export const movieSearchParamsSchema = {
  search: parseAsString,
  releaseYear: parseAsNumberLiteral(AVAILABLE_YEARS),
  page: parseAsInteger.withDefault(START_PAGE_INDEX),
};

export type MovieSearchParams = inferParserType<typeof movieSearchParamsSchema>;
