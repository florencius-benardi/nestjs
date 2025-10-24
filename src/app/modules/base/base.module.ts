import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../../database/entities/user.entity';
import { IsExistConstraint } from '../../commons/validators/is-exist.constraint';
import { IsUniqueConstraint } from '../../commons/validators/is-unique.constraint';
import { MAIN } from '../../../configs/typeorm.config';

// @Injectable({ scope: Scope.REQUEST })
@Module({
  imports: [TypeOrmModule.forFeature([Users], MAIN)],
  providers: [IsUniqueConstraint, IsExistConstraint],
  exports: [IsUniqueConstraint, IsExistConstraint],
})
export class ValidationModule {}
