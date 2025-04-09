export const useRecommendationsStore = () => {
  const featured = [
    {
      id: 'tt9603208',
      type: 'movie',
      customPoster: 'https://m.media-amazon.com/images/M/MV5BZTcwNzVjNDctMDVkZi00NDU3LTkyZmItYzcxNjU4MTE2MDM3XkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._CR476,153,1380,776_QL75_UY563_CR0,0,1000,563_.jpg',
    },
    {
      id: 'tt11280740',
      type: 'series',
      customPoster: 'https://m.media-amazon.com/images/M/MV5BOGRkNDczY2UtNmYzYy00NTFkLTkyNTMtNzE5NzJjY2IzMjZhXkEyXkFqcGc@._V1_FMjpg_UX2160_.jpg',
    },
    {
      id: 'tt26743210',
      type: 'movie',
      customPoster: 'https://m.media-amazon.com/images/M/MV5BNTBjZDIzZWYtY2M0MS00MTYzLWIwYzctYzY1ZjIwYWU1OTQ2XkEyXkFqcGc@._V1_FMjpg_UX2160_.jpg',
    },
  ];

  const trending = [
    {
      id: 'tt6208148',
      type: 'movie',
    },
    {
      id: 'tt3566834',
      type: 'movie',
    },
    {
      id: 'tt2172954',
      type: 'movie',
    },
    {
      id: 'tt17526714',
      type: 'movie',
    },
    {
      id: 'tt11280740',
      type: 'series',
    },
    {
      id: 'tt3581920',
      type: 'series',
    },
    {
      id: 'tt0816692',
      type: 'movie',
    },
    {
      id: 'tt13186482',
      type: 'movie',
    },
    {
      id: 'tt31806037',
      type: 'series',
    },
    {
      id: 'tt33305312',
      type: 'movie',
    },
    {
      id: 'tt28015403',
      type: 'movie',
    },
    {
      id: 'tt0141842',
      type: 'series'
    },
    {
      id: 'tt0411008',
      type: 'series'
    },
    {
      id: 'tt14688458',
      type: 'series'
    }
  ];

  return {
    featured,
    trending
  }
};
