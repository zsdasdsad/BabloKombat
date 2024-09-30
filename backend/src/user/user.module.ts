import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'veryhardsecret',
      signOptions: { expiresIn: '1h' }
    })
  ],
  controllers: [UserController],
  providers: [UserService, DatabaseService],
  exports: [UserService]
})
export class UserModule {}