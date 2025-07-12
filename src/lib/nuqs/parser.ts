import { createParser } from 'nuqs/server';

export const parseAsEncodedString = createParser({
  parse: (value: string) => {
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  },
  serialize: (value: string) => encodeURIComponent(value),
});
