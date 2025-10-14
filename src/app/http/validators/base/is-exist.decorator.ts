import { registerDecorator, ValidationOptions } from 'class-validator';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import { IsExistConstraint } from './is-exist.constraint';

export function isExist(
  entity: EntityTarget<ObjectLiteral>,
  key: string = 'id',
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, key],
      validator: IsExistConstraint,
    });
  };
}
