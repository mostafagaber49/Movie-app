import { Module } from '@nestjs/common';

import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';

import {
  MongooseModule,
} from '@nestjs/mongoose';

import {
  ThrottlerModule,
} from '@nestjs/throttler';

import {
  AuthModule,
} from './auth/auth.module';

import {
  UsersModule,
} from './users/users.module';

import {
  MoviesModule,
} from './movies/movies.module';

import {
  FavoritesModule,
} from './favorites/favorites.module';

import {
  WatchlistModule,
} from './watchlist/watchlist.module';

import {
  ReviewsModule,
} from './reviews/reviews.module';

import {
  TmdbModule,
} from './tmdb/tmdb.module';
import { HealthModule } from './helth/health.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),

    MongooseModule.forRootAsync({
      inject: [
        ConfigService,
      ],

      useFactory: (
        config: ConfigService,
      ) => ({
        uri:
          config.getOrThrow<string>(
            'MONGO_URI',
          ),
      }),
    }),

    TmdbModule,

    AuthModule,

    UsersModule,

    MoviesModule,

    FavoritesModule,

    WatchlistModule,

    ReviewsModule,

    HealthModule,
  ],
})
export class AppModule {}