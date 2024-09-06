import { Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const dateHour = new Date().toISOString();

    (req['timeStartRequest'] as unknown as number) = Date.now();

    // this.logger.log(`[${method}] ${originalUrl}`);

    res.on('finish', () => {
      const responseTime = Date.now() - (req['timeStartRequest'] as unknown as number);

      const message = `${dateHour} | [${method}] ${originalUrl} | status: ${res.statusCode} | ${responseTime}ms`;
      this.logger.warn(message);
    });

    next();
  }
}
