import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {UserDto} from './dto/user.dto';
import {Roles} from "../roles/roles.decorator";
import {Role} from "../roles/role.enum";
import {RolesGuard} from "../roles/roles.guard";
import {AuthGuard} from "../auth/auth.guard";
import {CheckAbilities} from "../ability/abilities.decorator";
import {Action} from "../ability/ability.factory";


@Controller('users')
export class UserController {
  constructor(
      private readonly userService: UserService
      ) {}

  @Post()
  create(@Body() dto: UserDto) {

    return this.userService.create(dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @Roles(Role.User)
  @CheckAbilities({action: Action.Read, subject: UserDto})
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  @Roles(Role.User)
  @CheckAbilities({action: Action.Read, subject: UserDto})
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
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
