import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, Version} from '@nestjs/common';
import { ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import { CurrentUser} from '../common/decorators/current-user.decorator';
import { JwtAuthGuard} from '../common/guards/jwt-auth.guard';
import { CreateReviewDto} from './dto/create-review.dto';
import { UpdateReviewDto} from './dto/update-review.dto';
import { ReviewsService} from './reviews.service';


@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor( private readonly reviewsService: ReviewsService){}

  @Version('1')
  @Get('movie/:movieId')
  findByMovie(@Param('movieId',ParseIntPipe)movieId: number){

    return this.reviewsService.findByMovie(movieId)
  }


  @Version('1')
  @Post('movie/:movieId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(
    @CurrentUser()user: { sub: string },
    @Param('movieId',ParseIntPipe)movieId: number,
    @Body()dto: CreateReviewDto
  ){
    return this.reviewsService.create(user.sub,movieId,dto)
  }


  @Version('1')
  @Patch(':reviewId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(
    @CurrentUser()user: { sub: string },
    @Param('reviewId')reviewId: string,
    @Body()dto: UpdateReviewDto
  ){
    return this.reviewsService.update(user.sub,reviewId,dto)
  }

  @Version('1')
  @Delete(':reviewId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@CurrentUser()user: { sub: string },@Param('reviewId')reviewId: string){

    return this.reviewsService.remove(user.sub,reviewId)
  }
  
}