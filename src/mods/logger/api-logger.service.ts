import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ApiLoggerService {
  private readonly logger = new Logger();

  error(message: any, references?: any[]) {
    this.logger.error('[ERROR]: ', message, references);
  }
}
