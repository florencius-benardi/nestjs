import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource, EntityTarget, Not, ObjectLiteral } from 'typeorm';
import { RequestContext } from '../contexts/request.context';

@ValidatorConstraint({ name: 'IsUnique', async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

  async validate(
    value: number | string,
    args: ValidationArguments,
  ): Promise<boolean> {
    const req = RequestContext.getCurrentRequest();
    const [entityClass, columnName, exceptId] = args.constraints as [
      EntityTarget<ObjectLiteral>,
      string,
      string?,
    ];
    const repository = this.dataSource.getRepository(entityClass);
    const where: any = { [columnName]: value };

    if (exceptId) where.id = Not(req[exceptId]);

    const found = await repository.findOne({ where });
    return !found;
  }

  defaultMessage(args: ValidationArguments): string {
    const [, columnName] = args.constraints as [
      EntityTarget<ObjectLiteral>,
      string?,
    ];

    return `${columnName} "${args.value}" already exists`;
  }
}
