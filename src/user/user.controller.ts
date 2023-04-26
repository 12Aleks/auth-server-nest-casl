import {Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import {AbilityFactory, Action} from "../ability/ability.factory";
import {User} from "./entities/user.entity";

@Controller('users')
export class UserController {
  constructor(
      private readonly userService: UserService,
      private abilityFactory: AbilityFactory
      ) {}

  @Post()
  create(@Body() dto: UserDto) {

    const ability = this.abilityFactory.defineAbility(dto)
    const isAllowed = ability.can(Action.Create, User)

    if(!isAllowed){
      throw new ForbiddenException('only admin!!!')
    }

    return this.userService.create(dto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UserDto: UserDto) {
    return this.userService.update(+id, UserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
