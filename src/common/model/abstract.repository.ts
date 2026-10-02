import { Model, ProjectionType, QueryFilter, QueryOptions, UpdateQuery } from "mongoose";

export class AbstractRepository<T>{

constructor(private _model : Model<T>){

}

get model(){

    return this._model
}

public async create(item: Partial<T>){

    const doc = new this._model(item)
    return doc.save()
} 

public async delete(filter: QueryFilter<T>){

    return await this._model.deleteOne(filter)
}



public async update(
    filter: QueryFilter<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions){

return await this._model.findOneAndUpdate(filter, update, options)

}


public async getAll(
    filter : QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions){

        return await this._model.find(filter,projection,options)
    }



    
public async getOne(
    filter : QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions){

        return await this._model.findOne(filter,projection,options)
    }
}