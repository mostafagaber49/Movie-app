import {Controller,Delete,Get,UseGuards,Version,} from '@nestjs/common';
import {ApiBearerAuth,ApiTags} from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import {JwtAuthGuard,} from '../common/guards/jwt-auth.guard';
import {UsersService,} from './users.service';


@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService:UsersService){}


  @Version('1')
  @Get('profile')
  getProfile(@CurrentUser()user: { sub: string }){

    return this.usersService.getProfile(user.sub)
  }

  @Version('1')
  @Delete('profile')
  deleteProfile(@CurrentUser()user: { sub: string }){
  
    return this.usersService.deleteProfile(user.sub)
  }
}