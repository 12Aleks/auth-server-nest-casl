import {UnauthorizedException, Injectable, ForbiddenException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {signInDto} from "./dto/auth.dto";
import { JwtService } from '@nestjs/jwt';
import {generatePassword, comparePassword} from "../utils/bcrypt";
import {UserDto} from "../user/dto/user.dto";
import {User} from "../user/scheme/user.schema";


@Injectable()
export class AuthService {
    constructor(
        private userServices: UserService,
        private jwtService: JwtService
        ){}
    async login(dto: signInDto){
        const user = await this.userServices.findOneByEmail(dto.email)
        if (!user) throw new UnauthorizedException()

        const comPassword = comparePassword(dto.password, user.password);
        if(!comPassword) throw new ForbiddenException("The password was entered incorrectly")

        const payload = {username: user.name, userRole: user.role, id: user._id };

        return {
            access_token: await this.jwtService.signAsync(payload)
        }

    }

    async registration(dto: UserDto) {
        const result = await this.userServices.findOneByEmail(dto.email)

        if(result) throw new UnauthorizedException('Email already exists in database')

        const hashPassword = generatePassword(dto.password)
        console.log(hashPassword)
        return await this.userServices.create({...dto, password: hashPassword})
    }
}
