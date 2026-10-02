import {
  Test,
} from '@nestjs/testing';

import {
  ConflictException,
} from '@nestjs/common';

import {
  ReviewsService,
} from '../src/reviews/reviews.service';

import {
  getModelToken,
} from '@nestjs/mongoose';
import { Review } from '../src/reviews/reviews.schema';
import { ReviewRepository } from '../src/reviews/reviews.repository';


describe('ReviewsService', () => {
  const model = {
    getOne: vi.fn(),
    create: vi.fn(),
  };

  let service: ReviewsService;

  beforeEach(async () => {
    const module =
      await Test.createTestingModule({
        providers: [
          ReviewsService,

          {
            provide: ReviewRepository,
            useValue: model,
          },
        ],
      }).compile();

    service =
      module.get(
        ReviewsService,
      );

    vi.clearAllMocks();
  });

  it(
    'should reject duplicate review',
    async () => {
      model.getOne.mockResolvedValue({
        _id: '1',
      });

      await expect(
        service.create(
          '507f1f77bcf86cd799439011',
          550,
          {
            rating: 8,
            comment: 'Great',
            title: 'Fight Club',
          },
        ),
      ).rejects.toBeInstanceOf(
        ConflictException,
      );
    },
  );
});