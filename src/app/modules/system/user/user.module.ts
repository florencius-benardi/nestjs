import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '../../../domains/system/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../../../database/entities/user.entity';
import { MAIN } from '../../../../configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forFeature([Users], MAIN)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
