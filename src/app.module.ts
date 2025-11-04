import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MAIN,
  SESSION,
  typeOrmConfig,
  typeOrmSessionConfig,
} from './configs/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './app/modules/system/auth/auth.module';
import { PermissionModule } from './app/modules/system/permission/permission.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './app/modules/system/user/user.module';
import { ValidationModule } from './app/modules/base/base.module';
import { RoleModule } from './app/modules/system/role/role.module';
import { RolePermissionModule } from './app/modules/system/role-permission/role-permission.module';
import { UserRoleModule } from './app/modules/system/user-role/user-role.module';
import { SettingModule } from './app/modules/system/setting/setting.module';

@Module({
  imports: [
    AuthModule,
    PermissionModule,
    UserModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 6000,
          limit: 10,
        },
      ],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      name: MAIN,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    TypeOrmModule.forRootAsync({
      name: SESSION,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmSessionConfig,
    }),
    ValidationModule,
    RoleModule,
    RolePermissionModule,
    UserRoleModule,
    SettingModule,
  ],
})
export class AppModule {}
