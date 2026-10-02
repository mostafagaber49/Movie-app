import {ConflictException,Injectable,NotFoundException}from '@nestjs/common';
import {InjectModel}from '@nestjs/mongoose';
import {Model,Types}from 'mongoose';
import { WatchlistRepository } from './watchlist.repository';


@Injectable()
export class WatchlistService {
  constructor(private readonly watchlistRepository: WatchlistRepository){}


  async add(userId: string,movieId: number,title: string,posterPath?: string){

    const exists = await this.watchlistRepository.getOne({userId,movieId})

    if (exists)
      throw new ConflictException('Movie is already in watchlist')
    
    return this.watchlistRepository.create(
      {userId:new Types.ObjectId(userId),movieId,title,posterPath})
  }

  findAll(userId: string){

    return this.watchlistRepository.getAll({ userId })
  }

  async remove(userId: string,movieId: number){

    const result = await this.watchlistRepository.delete({userId,movieId})

    if (!result)
      throw new NotFoundException('Watchlist item not found')

    return {message:'Movie removed from watchlist'}
  }
}