import { ApiPropertyOptional} from '@nestjs/swagger';
import { Type} from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min} from 'class-validator';


export class SearchMoviesDto {


  @ApiPropertyOptional({ example: 'Inception'})
  @IsString()
  query: string

  @ApiPropertyOptional({default: 1})
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(500)
  page = 1
}