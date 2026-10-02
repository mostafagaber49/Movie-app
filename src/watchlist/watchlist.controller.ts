import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, Version} from '@nestjs/common';
import { ApiBearerAuth, ApiTags} from '@nestjs/swagger'
import {IsOptional,IsString} from 'class-validator';
import {CurrentUser,} from '../common/decorators/current-user.decorator';
import { JwtAuthGuard,} from '../common/guards/jwt-auth.guard';
import {WatchlistService,} from './watchlist.service';


class AddWatchlistDto {

  @IsString()
  title: string

  @IsOptional()
  @IsString()
  posterPath?: string
}

@ApiTags('Watchlist')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService:WatchlistService){}


  @Version('1')
  @Post(':movieId')
  add(
    @CurrentUser()user: { sub: string },
    @Param('movieId',ParseIntPipe)movieId: number,
    @Body()dto: AddWatchlistDto){

    return this.watchlistService.add(user.sub, movieId, dto.title, dto.posterPath)
  }

  @Version('1')
  @Get()
  findAll(@CurrentUser() user: { sub: string }){

    return this.watchlistService.findAll(user.sub)

  }

  @Version('1')
  @Delete(':movieId')
  remove(@CurrentUser()user: { sub: string },@Param('movieId',ParseIntPipe)movieId: number){

    return this.watchlistService.remove(user.sub,movieId)
  }
}