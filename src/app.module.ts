import {Module} from "@nestjs/common";
import { UserModule } from './user/user.module';
import { AbilityModule } from './ability/ability.module';
import {MongooseModule} from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';

const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

@Module({
    imports: [
        MongooseModule.forRoot(`mongodb+srv://${USER}:${PASSWORD}cluster0.gpdoynu.mongodb.net/${DB_NAME}myFirstDatabase"`),
        UserModule,
        AbilityModule,
        AuthModule]
})
export class AppModule{}