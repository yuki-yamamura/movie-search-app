import { cva } from 'class-variance-authority';

import { GenreEnumOptions, GenreEnum } from '@/app/(models)/movie/constants';

import type { GenreId } from '@/app/(models)/movie/constants';

import styles from './genre-badge.module.css';

type Props = {
  genreId: GenreId;
};

export const GenreBadge = ({ genreId }: Props) => {
  const genreName = GenreEnumOptions[genreId];

  return <span className={badge({ genre: genreId })}>{genreName}</span>;
};

const badge = cva(styles.base, {
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
