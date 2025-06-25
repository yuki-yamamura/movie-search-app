import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MovieCard } from '../movie-card';

import type { Movie } from '@/app/(models)/movie/types/movie';

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  overview: 'This is a test movie overview that should be displayed on the card.',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  popularity: 100.5,
  genre_ids: [28, 12],
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
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    render(<MovieCard movie={movieWithoutPoster} />);

    expect(screen.getByText('No Image')).toBeInTheDocument();
  });

  it('handles movie without release date', () => {
    const movieWithoutDate = { ...mockMovie, release_date: '' };
    render(<MovieCard movie={movieWithoutDate} />);

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });
});
