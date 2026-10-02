import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../users/dto/register.dto';
import { LoginDto } from '../users/dto/login.dto';
import { AuthRepository } from './auth.repository';


@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository : AuthRepository,
    private readonly jwtService: JwtService
  ){}

  async register(dto: RegisterDto) {

    const exists = await this.authRepository.getOne({email: dto.email})

    if (exists) 
      throw new ConflictException('Email already exists')

    const hashedPassword = await bcrypt.hash(dto.password,12)

    const user = await this.authRepository.create({ ...dto,password: hashedPassword})

  
  }

  async login(dto: LoginDto) {
    const userexist =
      await this.authRepository.getOne({email: dto.email})
      if (!userexist) throw new BadRequestException('invalid email or password')

    const isvalidpassword =  bcrypt.compare(dto.password, userexist.password)

    if(!isvalidpassword) 
      throw new BadRequestException('invalid password')

 const accesstoken =  this.jwtService.sign({sub: userexist._id, type: 'access'},{ expiresIn: '15m' })
 const refreshtoken =  this.jwtService.sign({sub : userexist._id, type: 'refresh'},{ expiresIn: '7d' })

 return {accesstoken , refreshtoken}

  }
}