import { IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { BaseDatatable } from '../../base/base.validator';

export class StoreUserRole {
  @Expose({ name: 'id' })
  id: string | number;

  @Expose({ name: 'user' })
  @IsOptional()
  user?: string | number;

  @Expose({ name: 'role' })
  @IsOptional()
  role?: string | number;
}

export class ReadUserRoles extends BaseDatatable {}
