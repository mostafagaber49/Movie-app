import { ApiProperty } from '@nestjs/swagger';
import { IsEmail,IsString,MinLength} from 'class-validator';

export class RegisterDto {
  @ApiProperty({example: 'Mostafa Gaber'})
  @IsString()
  @MinLength(2)
  name: string

  @ApiProperty({example: 'mostafa@example.com'})
  @IsEmail()
  email: string

  @ApiProperty({example: 'StrongPassword123!'})
  @IsString()
  @MinLength(8)
  password: string
}