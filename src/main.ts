import {config} from "dotenv";
import { NestFactory } from '@nestjs/core';
import {AppModule} from "./app.module";

config()


const PORT = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => {
    console.log(`Server working on port ${PORT}`)
  });
}
bootstrap();
