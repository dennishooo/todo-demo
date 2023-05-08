import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleWare implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    switch (req.method) {
      case 'POST':
        this.logger.log(
          `${req.method} ${req.baseUrl} ${JSON.stringify(req.body)}`,
        );
        break;
      case 'PATCH':
        this.logger.log(
          `${req.method} ${req.baseUrl} ${JSON.stringify(req.body)}`,
        );
        break;
      default:
        this.logger.log(`${req.method} ${req.baseUrl}`);
        break;
    }

    next();
  }
}
