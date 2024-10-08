import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [
      JwtModule.register({
        secret: 'hardsecret',
        signOptions: { expiresIn: '1h' }
      }),
      DatabaseModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
