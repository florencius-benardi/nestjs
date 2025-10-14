import { registerDecorator, ValidationOptions } from 'class-validator';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import { IsUniqueConstraint } from './is-unique.constraint';

export function isUnique(
  entity: EntityTarget<ObjectLiteral>,
  column: string = 'id',
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: propertyName,
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, column],
      validator: IsUniqueConstraint,
    });
  };
}
