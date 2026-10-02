import { Injectable, ServiceUnavailableException,} from '@nestjs/common';
import { ConfigService,} from '@nestjs/config';
import { HttpService,} from '@nestjs/axios';
import {firstValueFrom} from 'rxjs';


@Injectable()
export class TmdbService {

  private readonly baseUrl: string
  private readonly apiKey: string

  constructor(
    private readonly http: HttpService,
    config: ConfigService,
  ){

    this.baseUrl = config.getOrThrow<string>('TMDB_BASE_URL')
    this.apiKey = config.getOrThrow<string>('TMDB_API_KEY')
  }


  async get<T>(path: string,params: Record<string,string | number>= {}){

    try{
      const response = await firstValueFrom(this.http.get<T>(
        `${this.baseUrl}${path}`,
          {params: {...params,api_key: this.apiKey}}
        )
        )


      return response.data  }
    catch {throw new ServiceUnavailableException('TMDB service is unavailable')}
  }
}