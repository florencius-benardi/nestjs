import { registerDecorator, ValidationOptions } from 'class-validator';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import { IsUniqueConstraint } from '../validators/is-unique.constraint';

export function isUnique(
  entity: EntityTarget<ObjectLiteral>,
  column: string = 'id',
  exceptId: string | undefined = undefined,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: `is_unique_${propertyName}`,
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, column, exceptId],
      validator: IsUniqueConstraint,
    });
  };
}
