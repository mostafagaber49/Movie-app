import { Injectable} from '@nestjs/common';
import { TmdbService} from '../tmdb/tmdb.service';
import { SearchMoviesDto} from './dto/search-movies.dto';


@Injectable()
export class MoviesService {
  constructor(private readonly tmdb:TmdbService){}

  popular(page = 1){
    return this.tmdb.get('/movie/popular',{page,language: 'en-US'})

  }

  trending(){
    return this.tmdb.get('/trending/movie/week',{language: 'en-US'})

  }

  nowPlaying(page = 1){
    return this.tmdb.get('/movie/now_playing',{page, language: 'en-US'})

  }

  upcoming(page = 1) {
    return this.tmdb.get('/movie/upcoming',{ page, language: 'en-US'})

  }

  genres() {
    return this.tmdb.get('/genre/movie/list',{ language: 'en-US'})

  }

  details(movieId: number) {
    return this.tmdb.get(
      `/movie/${movieId}`,{ language: 'en-US',append_to_response:'credits,videos'})
    
    }

  search(dto: SearchMoviesDto){

    return this.tmdb.get(
      '/search/movie',
      {query: dto.query,page: dto.page,language: 'en-US',include_adult: 'false'})
  }
}