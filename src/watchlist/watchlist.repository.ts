import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "../common/model/abstract.repository";
import { Model } from "mongoose";
import { Watchlist, WatchlistDocument } from "./watchlist.schema";

export class WatchlistRepository extends AbstractRepository<WatchlistDocument>{
    constructor(@InjectModel(Watchlist.name) watchlistModel: Model<WatchlistDocument>){
        super(watchlistModel)
    }

}