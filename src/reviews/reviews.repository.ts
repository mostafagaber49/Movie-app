import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "../common/model/abstract.repository";
import { Model } from "mongoose";
import { Review, ReviewDocument } from "./reviews.schema";

export class ReviewRepository extends AbstractRepository<ReviewDocument>{
    constructor(@InjectModel(Review.name) reviewModel: Model<ReviewDocument>){
        super(reviewModel)
    }

}