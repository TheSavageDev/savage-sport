import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logging } from '@google-cloud/logging';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);
  private readonly cloudLogger = new Logging();

  async use(req: Request, res: Response, next: NextFunction) {
    const requestId = uuid();
    req.headers['x-request-id'] = requestId;
    const requestStartTime = Date.now();

    // Add request ID to logs
    const metadata = { resource: { type: 'global' }, labels: { requestId } };
    const log = this.cloudLogger.log('http-request');

    // Log incoming request with request ID
    const entry = log.entry(metadata, {
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      body: req.body,
    });
    await log.write(entry);

    res.on('finish', () => {
      const duration = Date.now() - requestStartTime;

      // Log response details
      this.logger.log(
        `HTTP ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
      );

      // Write to Google Cloud Logging
      const responseEntry = log.entry(metadata, {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        duration,
      });
      log.write(responseEntry).catch((err) => {
        this.logger.error(
          `Failed to write log to Google Cloud: ${err.message}`,
        );
      });
    });

    next();
  }
}
