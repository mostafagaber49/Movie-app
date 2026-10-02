import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards,Version} from '@nestjs/common';
import { ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { IsOptional, IsString} from 'class-validator';
import { CurrentUser} from '../common/decorators/current-user.decorator';
import {JwtAuthGuard} from '../common/guards/jwt-auth.guard';
import {FavoritesService,} from './favorites.service';

class AddFavoriteDto {
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  posterPath?: string
}

@ApiTags('Favorites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor( private readonly favoritesService: FavoritesService){}

  @Version('1')
  @Post(':movieId')
  add(
    @CurrentUser() user: { sub: string },
    @Param('movieId',ParseIntPipe)movieId: number,
    @Body()dto: AddFavoriteDto)


  { return this.favoritesService.add(user.sub, movieId, dto.title,dto.posterPath)}


  @Version('1')
  @Get()
  findAll(@CurrentUser()user: { sub: string }){

    return this.favoritesService.findAll(user.sub)
  }

  @Version('1')
  @Delete(':movieId')
  remove(@CurrentUser()user: { sub: string },@Param('movieId',ParseIntPipe)movieId: number){


    return this.favoritesService.remove(user.sub,movieId)
  }
}