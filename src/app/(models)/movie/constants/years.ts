export const AVAILABLE_YEARS = [2025, 2024, 2023, 2022, 2021] as const;
export type ReleaseYear = typeof AVAILABLE_YEARS[number];