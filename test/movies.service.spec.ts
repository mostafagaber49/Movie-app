import {
  Test,
} from '@nestjs/testing';

import {
  MoviesService,
} from '../src/movies/movies.service';

import {
  TmdbService,
} from '../src/tmdb/tmdb.service';

describe('MoviesService', () => {
  const tmdb = {
    get: vi.fn(),
  };

  let service: MoviesService;

  beforeEach(async () => {
    const module =
      await Test.createTestingModule({
        providers: [
          MoviesService,

          {
            provide: TmdbService,
            useValue: tmdb,
          },
        ],
      }).compile();

    service =
      module.get(MoviesService);

    vi.clearAllMocks();
  });

  it(
    'should request popular movies',
    async () => {
      tmdb.get.mockResolvedValue({
        results: [],
      });

      await service.popular(2);

      expect(
        tmdb.get,
      ).toHaveBeenCalledWith(
        '/movie/popular',
        {
          page: 2,
          language: 'en-US',
        },
      );
    },
  );
});