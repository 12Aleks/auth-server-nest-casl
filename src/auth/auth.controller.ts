import {Controller, Post, HttpStatus, HttpCode, Body} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {signInDto} from "./dto/auth.dto";


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post()
    login(@Body() dto: signInDto ){
      return this.authService.login({...dto})
    }

    @Post()
    registration(){

    }
}
