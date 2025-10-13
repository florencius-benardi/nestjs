import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { BaseDatatable } from '../../base.validator';

export class ReadUsers extends BaseDatatable {
  @IsOptional()
  @IsString()
  status?: string;

  @Expose({ name: 'last_name' })
  @IsOptional()
  @IsString()
  lastName?: string;
}

export class ReadUser {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  status?: string;
}

export class StoreUser {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  status?: string;
}
