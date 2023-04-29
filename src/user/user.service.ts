import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./scheme/user.schema";
import {Model} from "mongoose";


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: UserDto): Promise<User>  {
    let user = await this.userModel.create({...dto})
    return user
  }

  async findAll(): Promise<User[]> {
    let users = await this.userModel.find()
    return users
  }

  async findOne(id: number): Promise<User> {
     let user = await this.userModel.findById(id)
     return user
  }

  async findOneByEmail(email: string): Promise<User | undefined>{
    return await this.userModel.findOne({email});
  }

  update(id: number, updateUserDto: UserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
