import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '../../../domains/system/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../../../database/entities/user.entity';
import { MAIN, SESSION } from '../../../../configs/typeorm.config';
import { AccessJWTStrategy } from '../../../../configs/auth/strategies/access.strategy';
import { PersonalAccessToken } from '../../../../database/entities/session/token.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users], MAIN),
    TypeOrmModule.forFeature([PersonalAccessToken], SESSION),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, AccessJWTStrategy],
})
export class UserModule {}
