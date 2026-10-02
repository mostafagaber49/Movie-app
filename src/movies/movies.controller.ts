import { Controller, Get, Param, ParseIntPipe, Query, Version} from '@nestjs/common';
import { ApiOperation, ApiTags} from '@nestjs/swagger';
import { MoviesService} from './movies.service';
import { SearchMoviesDto} from './dto/search-movies.dto';



@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService){}

  @Version('1')
  @Get('popular')
  @ApiOperation({ summary: 'Get popular movies'})
  popular( @Query('page') page = '1'){


    return this.moviesService.popular(Number(page))
  }

  @Version('1')
  @Get('trending')
  trending(){

    return this.moviesService.trending()
  }

  @Version('1')
  @Get('now-playing')
  nowPlaying(@Query('page') page = '1'){

    return this.moviesService.nowPlaying(Number(page))
  }

  @Version('1')
  @Get('upcoming')
  upcoming( @Query('page') page = '1'){
    
    return this.moviesService.upcoming(Number(page))
  }

  @Version('1')
  @Get('genres')
  genres(){
   
    return this.moviesService.genres();
  }

  @Version('1')
  @Get('search')
  search( @Query() dto: SearchMoviesDto){

    return this.moviesService.search(dto)
  }

  @Version('1')
  @Get(':movieId')
  details(@Param('movieId',ParseIntPipe)movieId: number){

    return this.moviesService.details(movieId)
  }
}