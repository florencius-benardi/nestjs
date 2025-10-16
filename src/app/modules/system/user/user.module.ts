import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '../../../domains/system/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../../database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
