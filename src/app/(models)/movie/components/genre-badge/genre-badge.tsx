import { GenreEnumOptions, GenreEnum } from '@/app/(models)/movie/constants';
import { Badge } from '@/components/badge';

import type { GenreId } from '@/app/(models)/movie/constants';

type Props = {
  genreId: GenreId;
};

export const GenreBadge = ({ genreId }: Props) => {
  const genreName = GenreEnumOptions[genreId];
  const color = genreColorMap[genreId];

  return (
    <Badge size="small" color={color}>
      {genreName}
    </Badge>
  );
};

const genreColorMap = {
  [GenreEnum.ACTION]: 'red',
  [GenreEnum.ADVENTURE]: 'orange',
  [GenreEnum.ANIMATION]: 'cyan',
  [GenreEnum.COMEDY]: 'green',
  [GenreEnum.CRIME]: 'gray',
  [GenreEnum.DOCUMENTARY]: 'purple',
  [GenreEnum.DRAMA]: 'blue',
  [GenreEnum.HORROR]: 'dark',
  [GenreEnum.MYSTERY]: 'violet',
  [GenreEnum.THRILLER]: 'pink',
} as const satisfies Record<GenreId, string>;
