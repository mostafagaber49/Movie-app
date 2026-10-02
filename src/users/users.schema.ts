import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';


export enum UserRole { USER = 'user', ADMIN = 'admin'}
export type UserDocument = HydratedDocument<User>

@Schema({timestamps: true})
export class User {
  @Prop({ required: true, trim: true, minlength: 2, maxlength: 50})
  name: string;

  @Prop({required: true, unique: true, lowercase: true, trim: true})
  email: string

  @Prop({required: true, minlength: 8, select: false})
  password: string

  @Prop({type: String,enum: UserRole, default: UserRole.USER})
  role: UserRole
}

export const UserSchema = SchemaFactory.createForClass(User)