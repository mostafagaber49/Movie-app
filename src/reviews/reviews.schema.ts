import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument,Types} from 'mongoose';

export type ReviewDocument =HydratedDocument<Review>;

@Schema({timestamps: true})
export class Review {

  @Prop({type: Types.ObjectId,ref: 'User',required: true,index: true})
  userId: Types.ObjectId

  @Prop({required: true,index: true})
  movieId: number

  @Prop({required: true,min: 1, max: 10})
  rating: number

  @Prop({required: true,minlength: 3,maxlength: 2000})
  comment: string

  @Prop({required: true})
  title: string
}

export const ReviewSchema = SchemaFactory.createForClass(Review)
ReviewSchema.index({userId: 1,movieId: 1},{unique: true})