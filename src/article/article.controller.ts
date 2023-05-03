import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {ArticleService} from "./article.service";
import {ArticleDto} from "./dto/article.dto";
import {AuthGuard} from "../auth/auth.guard";
import {AbilitiesGuards} from "../ability/abilities.guards";
import {CheckAbilities} from "../ability/abilities.decorator";
import {Action} from "../ability/ability.factory";
import {UserDto} from "../user/dto/user.dto";


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

}
