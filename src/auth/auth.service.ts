import {UnauthorizedException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {signInDto} from "./dto/auth.dto";
import { JwtService } from '@nestjs/jwt';
import {generatePassword} from "../utils/bcrypt";
import {UserDto} from "../user/dto/user.dto";


@Injectable()
export class AuthService {
    constructor(
        private userServices: UserService,
        private jwtService: JwtService
        ){}
    async login(dto: signInDto){


    }

    async registration(dto: UserDto) {
        const result = await this.userServices.findOneByEmail(dto.email)

        if(result) throw new UnauthorizedException('Email already exists in database')

        const hashPassword = generatePassword(dto.password)
        console.log(hashPassword)
        return await this.userServices.create({...dto, password: hashPassword})
    }
}
