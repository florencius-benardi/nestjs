import { IsOptional, IsString, MaxLength } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { BaseDatatable } from '../../base/base.validator';
import { isUnique } from '../../../commons/decorators/is-unique.decorator';
import { decodedID } from '../../../commons/utils/hashId.util';
import { isExist } from '../../../commons/decorators/is-exist.decorator';
import {
  ATTR_COLUMN_ROLE,
  Roles,
} from '../../../../database/entities/role.entity';

export class ReadRoles extends BaseDatatable {}

export class ReadRole {
  @Expose({ name: 'id' })
  @Transform(({ value }: { value: string }): string | number | undefined =>
    decodedID(value),
  )
  @isExist(Roles, ATTR_COLUMN_ROLE.INT_ID, true, {
    message: 'The role does not exist.',
  })
  role: number | string;
}

export class StoreRole {
  @Expose({ name: 'description' })
  @Transform(({ value }): string | undefined =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @IsString()
  @isUnique(
    Roles,
    ATTR_COLUMN_ROLE.CHAR_DESCRIPTION,
    undefined,
    undefined,
    false,
    {
      message: 'Role already exist.',
    },
  )
  @MaxLength(50, {
    message: 'The description must not be greater than $constraint1 character',
  })
  description: string;
}

export class UpdateRole {
  @Expose({ name: 'id' })
  id: string | number;

  @Expose({ name: 'description' })
  @Transform(({ value }): string | undefined =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @isUnique(
    Roles,
    ATTR_COLUMN_ROLE.CHAR_DESCRIPTION,
    ATTR_COLUMN_ROLE.INT_ID,
    'id',
    true,
    {
      message: 'role name already exist.',
    },
  )
  description: string;
}
