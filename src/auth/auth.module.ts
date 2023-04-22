import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Service } from './..service';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, Service]
})
export class AuthModule {}
