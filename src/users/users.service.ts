import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,} from 'mongoose';
import { UserRepository } from './users.repository';


@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository){}


  async getProfile(userId: string){
    
    const user = await this.userRepository.getOne({userId})

    if (!user)
      throw new NotFoundException('User not found')

    return user
  }


  async deleteProfile(userId: string){

    const user = await this.userRepository.delete({userId})

    if (!user) 
      throw new NotFoundException('User not found')
    
    return {message:'Account deleted successfully'}
  }
}