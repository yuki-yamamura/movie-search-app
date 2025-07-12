import { searchMovies } from '@/app/(models)/movie/api/server';
import { MovieGalleryPresenter } from '@/app/(models)/movie/components/movie-gallery/movie-gallery-presenter';

import type { MovieSearchParams } from '@/app/(models)/movie/schemas/movie-search-params';

type Props = MovieSearchParams;

export const MovieGallery = async (props: Props) => {
  const response = await searchMovies(props);

  return <MovieGalleryPresenter initialData={response} />;
};
