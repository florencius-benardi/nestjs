import { registerDecorator, ValidationOptions } from 'class-validator';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import { IsExistConstraint } from '../validators/is-exist.constraint';

export function isExist(
  entity: EntityTarget<ObjectLiteral>,
  key: string = 'id',
  isDecode: boolean = false,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: `is_exist_${propertyName}`,
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, key, isDecode],
      validator: IsExistConstraint,
    });
  };
}
