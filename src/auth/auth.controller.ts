import {Controller, Post, HttpStatus, HttpCode, Body} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {signInDto} from "./dto/auth.dto";
import {UserDto} from "../user/dto/user.dto";


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() dto: signInDto ){
      return this.authService.login({...dto})
    }

    @Post('registration')
    registration(@Body() dto: UserDto){
       return this.authService.registration(dto)
    }
}
