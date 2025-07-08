import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MovieCard } from '../movie-card';

import type { Movie } from '@/types/generated/movie-types';

const mockMovie: Movie = {
  adult: false,
  backdrop_path: '/test-backdrop.jpg',
  genre_ids: [28, 12],
  id: 1,
  original_language: 'en',
  original_title: 'Test Movie Original',
  overview: 'This is a test movie overview that should be displayed on the card.',
  popularity: 100.5,
  poster_path: '/test-poster.jpg',
  release_date: '2023-01-01',
  title: 'Test Movie',
  video: false,
  vote_average: 8.5,
  vote_count: 1000,
};

describe('MovieCard', () => {
  it('renders movie information correctly', () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('★ 8.5')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test movie overview that should be displayed on the card.'),
    ).toBeInTheDocument();
  });

  it('handles movie without poster image', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: undefined };
    render(<MovieCard movie={movieWithoutPoster} />);

    expect(screen.getByText('No Image')).toBeInTheDocument();
  });

  it('handles movie without release date', () => {
    const movieWithoutDate = { ...mockMovie, release_date: undefined };
    render(<MovieCard movie={movieWithoutDate} />);

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });
});
