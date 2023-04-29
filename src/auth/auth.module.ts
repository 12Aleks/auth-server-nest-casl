import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../user/scheme/user.schema";



@Module({
  imports: [
      UserModule,
      JwtModule.register({
        global: true,
        secret: process.env.SECRET_KEY,
        signOptions: {expiresIn: '60m'}
      })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
