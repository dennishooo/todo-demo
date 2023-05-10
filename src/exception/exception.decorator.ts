import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  SwaggerBadRequestException,
  SwaggerNotFoundException,
  SwaggerUnauthorizeException,
} from './exception';

export function Unauthorized() {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: 'The user is not authorized to do this action',
      status: 401,
      type: () => SwaggerUnauthorizeException,
    }),
  );
}

export function NotFound(name: string) {
  return applyDecorators(
    ApiNotFoundResponse({
      description: `The ${name} was not found`,
      status: 404,
      type: SwaggerNotFoundException,
    }),
  );
}

export function BadRequest(name: string) {
  return applyDecorators(
    ApiBadRequestResponse({
      description: `The ${name} creation failed`,
      status: 400,
      type: SwaggerBadRequestException,
    }),
  );
}

export function Ok<T>(name: string, type: () => T) {
  return applyDecorators(
    ApiOkResponse({
      description: `The ${name} item created successfully`,

      type,
    }),
  );
}
