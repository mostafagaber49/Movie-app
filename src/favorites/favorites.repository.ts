import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "../common/model/abstract.repository";
import { Model } from "mongoose";
import { Favorite, FavoriteDocument } from "./favorites.schema";

export class FavoriteRepository extends AbstractRepository<FavoriteDocument>{
    constructor(@InjectModel(Favorite.name) favoriteModel: Model<FavoriteDocument>){
        super(favoriteModel)
    }

}