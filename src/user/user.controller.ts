import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {UserService} from './user.service';
import {UserDto} from './dto/user.dto';
import {AbilityFactory} from "../ability/ability.factory";
import {Roles} from "../roles/roles.decorator";
import {Role} from "../roles/role.enum";


@Controller('users')
export class UserController {
  constructor(
      private readonly userService: UserService,
      private abilityFactory: AbilityFactory
      ) {}

  @Post()
  create(@Body() dto: UserDto) {

    // const ability = this.abilityFactory.defineAbility()
    // const isAllowed = ability.can(Action.Create, UserDto)
    //
    // if(!isAllowed){
    //   throw new ForbiddenException('only admin!!!')
    // }

    return this.userService.create(dto);
  }


  @Roles(Role.Admin)
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
