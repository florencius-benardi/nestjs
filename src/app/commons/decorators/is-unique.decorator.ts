import { registerDecorator, ValidationOptions } from 'class-validator';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import { IsUniqueConstraint } from '../validators/is-unique.constraint';

export function isUnique(
  entity: EntityTarget<ObjectLiteral>,
  column: string = 'id',
  columnPK: string | number | undefined = undefined,
  paramName: string | number | undefined = undefined,
  exclude: boolean = false,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: `is_unique_${propertyName}`,
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, column, exclude, columnPK, paramName],
      validator: IsUniqueConstraint,
    });
  };
}
