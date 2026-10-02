import {Test} from '@nestjs/testing';
import {ConflictException,} from '@nestjs/common';
import { AuthService} from '../src/auth/auth.service';
import {getModelToken,} from '@nestjs/mongoose';
import {JwtService} from '@nestjs/jwt';
import { User } from '../src/users/users.schema';
import { AuthRepository } from '../src/auth/auth.repository';


describe('AuthService', () => {
  const userModel = {
    getOne: vi.fn(),
    create: vi.fn(),
  };

  const jwtService = {
    signAsync: vi.fn(),
  };

  let service: AuthService;

  beforeEach(async () => {
    const module =
      await Test.createTestingModule({
        providers: [
          AuthService,

          {
            provide:
             AuthRepository,
            useValue: userModel,
          },

          {
            provide: JwtService,

            useValue: jwtService,
          },
        ],
      }).compile();

    service =
      module.get(AuthService);

    vi.clearAllMocks();
  });

  it(
    'should reject duplicate email',
    async () => {
      userModel.getOne.mockResolvedValue({
        _id: '1',
      });

      await expect(
        service.register({
          name: 'Mostafa',
          email:
            'test@example.com',
          password:
            'Password123!',
        }),
      ).rejects.toBeInstanceOf(
        ConflictException,
      );
    },
  );
});