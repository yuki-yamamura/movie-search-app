export const pathMap = {
  '/': {
    get: () => '/',
  },
  '/movies': {
    get: () => '/movies',
  },
} as const satisfies Record<string, { get: (...args: never) => string }>;
