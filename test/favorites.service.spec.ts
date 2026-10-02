import {Test} from '@nestjs/testing';
import {ConflictException} from '@nestjs/common';
import {FavoritesService} from '../src/favorites/favorites.service';
import {getModelToken} from '@nestjs/mongoose';
import { Favorite } from '../src/favorites/favorites.schema';
import { FavoriteRepository } from '../src/favorites/favorites.repository';


describe('FavoritesService', () => {
  const model = {
    getOne: vi.fn(),
    create: vi.fn(),
  };

  let service: FavoritesService;

  beforeEach(async () => {
    const module =
      await Test.createTestingModule({
        providers: [
          FavoritesService,

          {
            provide:
              FavoriteRepository,
            useValue: model,
          },
        ],
      }).compile();

    service =
      module.get(
        FavoritesService,
      );

    vi.clearAllMocks();
  });

  it(
    'should reject duplicate favorites',
    async () => {
      model.getOne.mockResolvedValue({
        _id: '1',
      });

      await expect(
        service.add(
          '507f1f77bcf86cd799439011',
          550,
          'Fight Club',
        ),
      ).rejects.toBeInstanceOf(
        ConflictException,
      );
    },
  );
});