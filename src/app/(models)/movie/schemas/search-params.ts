import { parseAsStringEnum, parseAsString } from 'nuqs';

import { AVAILABLE_YEARS } from '../constants/years';

export const searchParamsSchema = {
  search: parseAsString,
  releaseYear: parseAsStringEnum(AVAILABLE_YEARS.map(String)),
};