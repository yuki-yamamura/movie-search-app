export const pathMap = {
  /**
   * ページのパスを定義
   */
  '/': {
    get: () => '/',
  },
  '/movies': {
    get: () => '/movies',
  },
  /**
   * APIのパスを定義
   */
  '/api/movies': {
    get: () => '/api/movies',
  },
} as const satisfies Record<string, { get: (...args: never) => string }>;
