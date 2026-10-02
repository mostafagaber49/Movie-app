import { ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model, Types} from 'mongoose';
import { CreateReviewDto} from './dto/create-review.dto';
import { UpdateReviewDto} from './dto/update-review.dto';
import { ReviewRepository } from './reviews.repository';


@Injectable()
export class ReviewsService {
  constructor(private readonly reviewRepository: ReviewRepository){}

  async create(userId: string,movieId: number,dto: CreateReviewDto){
    
    const exists = await this.reviewRepository.getOne({userId,movieId})

    if (exists) 
      throw new ConflictException('You already reviewed this movie')
    
    return this.reviewRepository.create({...dto, movieId,userId:new Types.ObjectId(userId)})
  }


  findByMovie(movieId: number){
    return this.reviewRepository.getOne({ movieId })
  }

  
  async update(userId: string,reviewId: string,dto: UpdateReviewDto){

    const review = await this.reviewRepository.update(
        {_id: reviewId,userId},
        {$set: dto},
        {new: true, runValidators: true}
      )

    if(!review) 
      throw new NotFoundException('Review not found')
    
    return review
  }

  async remove(userId: string, reviewId: string){

    const review = await this.reviewRepository.delete({_id: reviewId,userId})

    if (!review) 
      throw new NotFoundException('Review not found')
    
    return {message:'Review deleted successfully'}
  }
}