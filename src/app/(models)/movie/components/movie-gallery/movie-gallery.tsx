import { searchMovies } from '@/app/(models)/movie/api';
import { MovieList } from '@/app/(models)/movie/components/movie-list';

import type { MovieSearchParams } from '@/app/(models)/movie/schemas/movie-search-params';

type Props = MovieSearchParams;
export const MovieGallery = async (props: Props) => {
  const result = await searchMovies(props);

  return <MovieList {...result} />;
};
