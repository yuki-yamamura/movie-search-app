import { cva } from 'class-variance-authority';

import { GenreEnumOptions, GenreEnum } from '@/app/(models)/movie/constants';
import { Badge } from '@/components/badge';

import type { GenreId } from '@/app/(models)/movie/constants';

import styles from './genre-badge.module.css';

const genreBadgeVariants = cva('', {
  variants: {
    genre: {
      [GenreEnum.ACTION]: styles.action,
      [GenreEnum.ADVENTURE]: styles.adventure,
      [GenreEnum.ANIMATION]: styles.animation,
      [GenreEnum.COMEDY]: styles.comedy,
      [GenreEnum.CRIME]: styles.crime,
      [GenreEnum.DOCUMENTARY]: styles.documentary,
      [GenreEnum.DRAMA]: styles.drama,
      [GenreEnum.HORROR]: styles.horror,
      [GenreEnum.MYSTERY]: styles.mystery,
      [GenreEnum.THRILLER]: styles.thriller,
    },
  },
});

type Props = {
  genreId: GenreId;
};

export const GenreBadge = ({ genreId }: Props) => {
  const genreName = GenreEnumOptions[genreId];

  return (
    <Badge size="small" className={genreBadgeVariants({ genre: genreId })}>
      {genreName}
    </Badge>
  );
};
