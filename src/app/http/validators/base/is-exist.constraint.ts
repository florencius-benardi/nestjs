import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';

@ValidatorConstraint({ name: 'IsExist', async: true })
@Injectable()
export class IsExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) { }

  async validate(
    value: number | string,
    args: ValidationArguments,
  ): Promise<boolean> {
    const [entityClass, key = 'id'] = args.constraints as [
      EntityTarget<ObjectLiteral>,
      string?,
    ];

    if (!value) return false;

    const repo = this.dataSource.getRepository(entityClass);
    const found = await repo.findOne({ where: { [key]: value } });

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
