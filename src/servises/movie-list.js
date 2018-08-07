export const imageUrl = path => {
  const image = `https://image.tmdb.org/t/p/w200`;
  const DEFAULT_PATH = `https://fakeimg.pl/200x300/?text=img`;
  return path ? image + path : DEFAULT_PATH;
};
// 'https://image.tmdb.org/t/p/w200' || 'https://fakeimg.pl/200x300/?text=img';

export const getShortOverview = overview =>
  overview.length > 100 ? `${overview.slice(0, 100)}...` : overview;

export const getReleaseDate = releaseDate => releaseDate.slice(0, 4);
