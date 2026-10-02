import { ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel,} from '@nestjs/mongoose';
import { Model, Types} from 'mongoose';
import { FavoriteRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoriteRepository: FavoriteRepository,
  ) {}

  async add(
    userId: string,
    movieId: number,
    title: string,
    posterPath?: string,
  ) {

    const exists = await this.favoriteRepository.getOne({userId,movieId})

    if (exists) 
      throw new ConflictException('Movie is already in favorites')
    
    return this.favoriteRepository.create({
      userId:new Types.ObjectId(userId),
      movieId,
      title,
      posterPath })
  }

  findAll(userId: string) {
    return this.favoriteRepository.getAll({ userId })
     
      }

  async remove( userId: string, movieId: number){

    const result = await this.favoriteRepository.delete({ userId, movieId})

    if (!result) 
      throw new NotFoundException('Favorite not found')
    

    return { message:'Movie removed from favorites'}
  }
  
}