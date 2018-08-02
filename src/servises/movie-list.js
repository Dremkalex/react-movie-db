export const IMG_URL = 'https://image.tmdb.org/t/p/w200';

export const getShortOverview = overview =>
  overview.length > 100 ? `${overview.slice(0, 100)}...` : overview;

export const getReleaseDate = releaseDate => releaseDate.slice(0, 4);
