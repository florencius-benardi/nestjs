import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class BaseDatatable {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  start?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  length?: number = 10;

  @Expose({ name: 'order_by[]' })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(',').map((v) => v.trim());
    return [];
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  orderBy?: string[];

  @Expose({ name: 'sort_order[]' })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(',').map((v) => v.trim());
    return [];
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  sortOrder?: string[];
}
