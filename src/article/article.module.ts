import {Module} from '@nestjs/common';
import {ArticleController} from './article.controller';
import {ArticleService} from './article.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Article, ArticleSchema} from "./schema/article.schema";
import {AbilityModule} from "../ability/ability.module";
import {Comment, CommentSchema} from "./schema/comment.schema";

@Module({
    imports: [
        AbilityModule,
        MongooseModule.forFeature([{name: Article.name, schema: ArticleSchema}]),
        MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}])
    ],
    controllers: [ArticleController],
    providers: [ArticleService],
    exports: [ArticleService]

})
export class ArticleModule {
}
