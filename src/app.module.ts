import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
// import { UserService } from './app/domains/system/user/user.service';
// import { UserController } from './app/modules/system/user/user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './app/modules/system/user/user.module';
import { ValidationModule } from './app/modules/base/base.module';

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
  ],
  // controllers: [UserController],
  // providers: [UserService],
})
export class AppModule {}
