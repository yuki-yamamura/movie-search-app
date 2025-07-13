import path from 'path';

export const getImageUrl = ({
  imagePath,
  size = 'w500',
}: {
  imagePath?: string;
  size?: 'w200' | 'w500' | 'original';
}) => {
  if (!process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL) {
    throw new Error('TMDB_IMAGE_BASE_URL environment variable is not set');
  }

  return imagePath && path.join(process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL, size, imagePath);
};
