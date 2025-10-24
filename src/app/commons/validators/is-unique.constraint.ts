import { InjectDataSource } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource, EntityTarget, Not, ObjectLiteral } from 'typeorm';
import { RequestContext } from '../contexts/request.context';
import { MAIN } from '../../../configs/typeorm.config';

@ValidatorConstraint({ name: 'IsUnique', async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectDataSource(MAIN) private readonly dataSource: DataSource,
  ) {}

  async validate(
    value: number | string,
    args: ValidationArguments,
  ): Promise<boolean> {
    const req = RequestContext.getCurrentRequest();
    const [entityClass, columnName, exclude, columnPK, paramName] =
      args.constraints as [
        EntityTarget<ObjectLiteral>,
        string,
        boolean?,
        string?,
        string?,
      ];
    const repository = this.dataSource.getRepository(entityClass);
    const where: any = { [columnName]: value };

    if (exclude) where[columnPK] = Not(req[paramName]);

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
