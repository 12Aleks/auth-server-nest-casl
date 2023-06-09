import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {AbilityModule} from "../ability/ability.module";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./scheme/user.schema";

@Module({
  imports: [
      AbilityModule,
      MongooseModule.forFeature([{name: User.name, schema: UserSchema}])

  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
