import {Prop,Schema,SchemaFactory}from '@nestjs/mongoose';
import {HydratedDocument,Types }from 'mongoose';


export type WatchlistDocument = HydratedDocument<Watchlist>;

@Schema({timestamps: true})
export class Watchlist {
  @Prop({type: Types.ObjectId,ref: 'User',required: true,index: true})
  userId: Types.ObjectId

  @Prop({required: true,index: true})
  movieId: number

  @Prop({required: true})
  title: string

  @Prop()
  posterPath?: string
}

export const WatchlistSchema = SchemaFactory.createForClass(Watchlist)
WatchlistSchema.index({userId: 1,movieId: 1},{unique: true})