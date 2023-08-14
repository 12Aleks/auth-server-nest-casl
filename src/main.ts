require('dotenv').config()
import { NestFactory } from '@nestjs/core';
import {AppModule} from "./app.module";




const PORT = process.env.PORT || 5000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(PORT, () => {
    console.log(`Server working on port ${PORT}`)
  });
}
bootstrap();
