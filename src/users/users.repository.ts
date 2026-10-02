import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "../common/model/abstract.repository";
import { User, UserDocument } from "../users/users.schema";
import { Model } from "mongoose";

export class UserRepository extends AbstractRepository<UserDocument>{
    constructor(@InjectModel(User.name) userModel: Model<UserDocument>){
        super(userModel)
    }

}