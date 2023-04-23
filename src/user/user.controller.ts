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
  create(@Body() createUserDto: UserDto) {
    const user = {id: 1, isAdmin: false}
    const ability = this.abilityFactory.defineAbility(user)

    const isAllowed = ability.can(Action.Create, User)

    if(!isAllowed){
      throw new ForbiddenException('only admin!!!')
    }

    return this.userService.create(createUserDto);
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
