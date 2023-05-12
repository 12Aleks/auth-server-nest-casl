import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Article, ArticleDocument} from "./schema/article.schema";
import {Model, ObjectId, Types} from "mongoose";
import {IArticle} from "../utils/types";
import {ArticleDto} from "./dto/article.dto";



@Injectable()
export class ArticleService {
    constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {
    }

    async create(dto: ArticleDto): Promise<IArticle> {
        return await this.articleModel.create({...dto})
    }

    async getAll(): Promise<IArticle[]> {
        const articles = await this.articleModel.find();
        return articles
    }

    async delete(id: ObjectId):Promise<IArticle[]>{
        await this.articleModel.findByIdAndDelete(id)
        return this.getAll()
    }

    async update(id: ObjectId, dto: ArticleDto):Promise<IArticle[]> {
        await this.articleModel.findByIdAndUpdate({_id: id}, {...dto}, {new: true}).exec()
        return this.getAll()
    }
}
