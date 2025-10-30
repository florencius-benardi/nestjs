import { Module } from '@nestjs/common';
import { UserRoleController } from './user-role.controller';
import { UserRoleService } from '../../../domains/system/user-role/user-role.service';
import { AccessJWTStrategy } from '../../../../configs/auth/strategies/access.strategy';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalAccessToken } from '../../../../database/entities/session/token.entity';
import { MAIN, SESSION } from '../../../../configs/typeorm.config';
import { Users } from '../../../../database/entities/user.entity';
import { UserRoles } from '../../../../database/entities/userRole.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, UserRoles], MAIN),
    TypeOrmModule.forFeature([PersonalAccessToken], SESSION),
    AuthModule,
  ],
  controllers: [UserRoleController],
  providers: [UserRoleService, AccessJWTStrategy],
})
export class UserRoleModule {}
