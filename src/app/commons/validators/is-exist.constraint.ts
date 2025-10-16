import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';
import { decodedID } from '../utils/hashId.util';

@ValidatorConstraint({ name: 'IsExist', async: true })
@Injectable()
export class IsExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(
    value: number | string | undefined,
    args: ValidationArguments,
  ): Promise<boolean> {
    const [entityClass, key = 'id', isDecode] = args.constraints as [
      EntityTarget<ObjectLiteral>,
      string?,
      boolean?,
    ];
    if (!value) return false;
    const val = isDecode && typeof value == 'string' ? decodedID(value) : value;
    const repo = this.dataSource.getRepository(entityClass);
    const found = await repo.findOne({ where: { [key]: val } });
    return !!found;
  }

  defaultMessage(args: ValidationArguments): string {
    const [, key = 'id'] = args.constraints as [
      EntityTarget<ObjectLiteral>,
      string?,
    ];

    return `${key} "${args.value}" does not exist.`;
  }
}
