import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min, MinLength} from 'class-validator';
import { Type} from 'class-transformer';


export class CreateReviewDto {

  @ApiProperty({example: 9,minimum: 1,maximum: 10})
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10)
  rating: number

  @ApiProperty({example: 'Amazing movie and great story.'})
  @IsString()
  @MinLength(3)
  comment: string

  @ApiProperty({example: 'Inception'})
  @IsString()
  title: string
}