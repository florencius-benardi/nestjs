import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './app/modules/system/user/user.module';
import { ValidationModule } from './app/modules/base/base.module';
import { AuthModule } from './app/modules/system/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    ValidationModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
