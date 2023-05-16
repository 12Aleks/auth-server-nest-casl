import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ArticleService} from "./article.service";
import {ArticleDto} from "./dto/article.dto";
import {AuthGuard} from "../auth/auth.guard";
import {AbilitiesGuards} from "../ability/abilities.guards";
import {CheckAbilities} from "../ability/abilities.decorator";
import {Action} from "../ability/ability.factory";
import {ObjectId} from "mongoose";
import {CommentDto} from "./dto/comment.dto";


@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {
    }

    @Post()
    @UseGuards(AuthGuard, AbilitiesGuards)
    @CheckAbilities({action: Action.Create, subject: ArticleDto})
    create(@Body() dto: ArticleDto) {
        return this.articleService.create(dto)
    }

    @Get()
    getAll() {
        return this.articleService.getAll()
    }



    @Put(':id')
    @UseGuards(AuthGuard, AbilitiesGuards)
    @CheckAbilities({action: Action.Update, subject: ArticleDto})
    update(@Param('id') id: ObjectId, @Body() dto: ArticleDto){
        return this.articleService.update(id, dto)
    }

    @Delete(':id')
    @UseGuards(AuthGuard, AbilitiesGuards)
    @CheckAbilities({action: Action.Delete, subject: ArticleDto})
    delete(@Param('id') id: ObjectId){
        return this.articleService.delete(id)
    }



    @Post('/comment')
    addComment(@Body() dto: CommentDto){
       return this.articleService.addComment(dto)
    }



}
