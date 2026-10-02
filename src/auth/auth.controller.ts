import {Body,Controller,Post,Version} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from '../users/dto/register.dto';
import { LoginDto } from '../users/dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService:AuthService){}


  @Version('1')
  @Post('register')
  register(@Body() dto: RegisterDto) {

    return this.authService.register(dto);
  }

  @Version('1')
  @Post('login')
  login(@Body() dto: LoginDto) {
    
    return this.authService.login(dto);
  }
}