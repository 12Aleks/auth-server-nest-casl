import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Article, ArticleDocument} from "./schema/article.schema";
import {Model, ObjectId, Types} from "mongoose";
import {IArticle} from "../utils/types";
import {ArticleDto} from "./dto/article.dto";
import {CommentDto} from "./dto/comment.dto";
import {Comment, CommentDocument} from "./schema/comment.schema";


@Injectable()
export class ArticleService {
    constructor(
        @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
        @InjectModel(Comment.name) private  commentModel: Model<CommentDocument>
        ) {}

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


    async addComment(dto: CommentDto): Promise<Comment>{
      const article = await this.articleModel.findById(dto.articleId)
      const comment = await this.commentModel.create({...dto})
      article.comments.push(comment.id)
      await article.save()
      return comment
    }
}
