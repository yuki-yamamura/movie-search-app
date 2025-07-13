export const START_PAGE_INDEX = 1;

export const AVAILABLE_YEARS = [2025, 2024, 2023, 2022, 2021] as const;

export const GenreEnum = {
  ACTION: 28,
  ADVENTURE: 12,
  ANIMATION: 16,
  COMEDY: 35,
  CRIME: 80,
  DOCUMENTARY: 99,
  DRAMA: 18,
  HORROR: 27,
  MYSTERY: 9648,
  THRILLER: 53,
} as const;

export type GenreId = (typeof GenreEnum)[keyof typeof GenreEnum];

export const GenreEnumOptions = {
  [GenreEnum.ACTION]: 'アクション',
  [GenreEnum.ADVENTURE]: 'アドベンチャー',
  [GenreEnum.ANIMATION]: 'アニメーション',
  [GenreEnum.COMEDY]: 'コメディ',
  [GenreEnum.CRIME]: 'クライム',
  [GenreEnum.DOCUMENTARY]: 'ドキュメンタリー',
  [GenreEnum.DRAMA]: 'ドラマ',
  [GenreEnum.HORROR]: 'ホラー',
  [GenreEnum.MYSTERY]: 'ミステリー',
  [GenreEnum.THRILLER]: 'スリラー',
} as const satisfies Record<GenreId, string>;
