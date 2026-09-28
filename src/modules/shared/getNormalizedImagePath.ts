export const getNormalizedImagePath = (path: string): string => {
  if (!path) {
    return '';
  }

  return path.startsWith('/') ? path : `/${path}`;
};
