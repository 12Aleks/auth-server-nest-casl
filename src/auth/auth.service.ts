import {UnauthorizedException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {signInDto} from "./dto/auth.dto";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userServices: UserService,
        private jwtService: JwtService
        ){}
    async login(dto: signInDto){
       const result = await this.userServices.findOneByEmail(dto.email)
       if(result) throw new UnauthorizedException('Email already exists in database')

       const payload = {username: result.name, id: result.id}

       return {
           access_token: await this.jwtService.signAsync(payload)
       }

    }

    async registration(){

    }
}
