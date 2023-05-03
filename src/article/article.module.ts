import {Module} from '@nestjs/common';
import {ArticleController} from './article.controller';
import {ArticleService} from './article.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Article, ArticleSchema} from "./schema/article.schema";
import {UserService} from "../user/user.service";
import {AbilityModule} from "../ability/ability.module";

@Module({
    imports: [
        AbilityModule,
        MongooseModule.forFeature([{name: Article.name, schema: ArticleSchema}])
    ],
    controllers: [ArticleController],
    providers: [ArticleService],
    exports: [ArticleService]

})
export class ArticleModule {
}
