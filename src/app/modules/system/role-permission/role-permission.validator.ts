import { IsArray, IsOptional } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class StoreRolePermission {
  @Expose({ name: 'id' })
  id: string | number;

  @Expose({ name: 'permission' })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value as number[];
    if (typeof value === 'string') return value.split(',').map((v) => v.trim());
    return [];
  })
  @IsArray()
  @IsOptional()
  permission?: string[] | number[];
}
