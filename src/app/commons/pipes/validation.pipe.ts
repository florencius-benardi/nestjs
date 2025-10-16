import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

interface FormattedError {
  property: string;
  constraints: string[];
}

export function formatValidationErrors(
  errors: ValidationError[],
): FormattedError[] {
  return errors.map((error) => ({
    property: error.property,
    constraints: Object.values(error.constraints ?? {}),
  }));
}

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: { enableImplicitConversion: true },
    });
  }

  createExceptionFactory() {
    return (validationErrors = []) => {
      const formattedErrors = formatValidationErrors(validationErrors);

      const messageBag: Record<string, string[]> = {};
      const flatMessages: string[] = [];

      for (const err of formattedErrors) {
        messageBag[err.property] = err.constraints;
        flatMessages.push(...err.constraints);
      }
      return new UnprocessableEntityException({
        status: false,
        error: messageBag,
        message: 'Validation error.',
      });
    };
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (error) {
      if (metadata.type === 'param' || metadata.type === 'query') {
        const flatMessages: string =
          error.response?.message && typeof error.response?.error == 'object'
            ? Object.values(error.response.error).flat()
            : error.message;

        throw new BadRequestException({
          status: false,
          error: flatMessages,
          message: 'Validation error.',
        });
      }
      throw error;
    }
  }
}
