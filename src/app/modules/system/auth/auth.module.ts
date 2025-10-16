import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../../database/entities/user.entity';
import { UserService } from '../../../domains/system/user/user.service';
import { AuthService } from '../../../domains/system/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [UserService, AuthService],
})
export class AuthModule {}
