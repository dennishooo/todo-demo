import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class DefaultException {
  statusCode: HttpStatus;
  message: any;
  error: string;
}

export class SwaggerBadRequestException extends DefaultException {
  @ApiProperty({ default: 400 })
  statusCode: HttpStatus;

  @ApiProperty({
    default: [
      'status must be one of the following values: todo, ongoing, completed',
    ],
  })
  message: any;
  @ApiProperty({ default: 'Bad Request' })
  error: string;
}

export class SwaggerUnauthorizeException extends DefaultException {
  @ApiProperty({ default: 401 })
  statusCode: HttpStatus;

  @ApiProperty({ default: 'Unauthorized' })
  message: any;
}

export class SwaggerNotFoundException extends DefaultException {
  @ApiProperty({ default: 404 })
  statusCode: HttpStatus;

  @ApiProperty({ default: 'Nothing found' })
  message: any;

  @ApiProperty({ default: 'Not Found' })
  error: string;
}

export class SwaggerForbiddenException extends DefaultException {
  @ApiProperty({ default: 403 })
  statusCode: HttpStatus;

  @ApiProperty({ default: 'User is not allowed to do such operation' })
  message: any;

  @ApiProperty({ default: 'Forbidden' })
  error: string;
}

export class SwaggerConflictException extends DefaultException {
  @ApiProperty({ default: 409 })
  statusCode: HttpStatus;

  @ApiProperty({
    default: '[P2002]: Unique constraint failed on the fields: (`username`)',
  })
  message: any;
}
