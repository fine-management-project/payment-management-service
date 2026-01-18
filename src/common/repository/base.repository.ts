import { Inject } from '@nestjs/common';
import { ILoggerService } from '../logger/logger.types';
import { LOGGER_SERVICE } from '../shared/constants';

export abstract class BaseRepository<Entity> {
  @Inject(LOGGER_SERVICE)
  protected readonly loggerService: ILoggerService;

  constructor() {
    setTimeout(() => {
      this.loggerService.setContext(this.constructor.name);
    }, 0);
  }

  protected abstract mapToEntity(value: unknown): Entity;

  protected handleError<T>(operation: string, error: unknown): T {
    this.loggerService.error({
      message: {
        operation,
        error: String(error),
      },
    });

    throw new Error(JSON.stringify(error));
  }

  public async executeOperation<T>(
    operation: string,
    callback: () => Promise<T>,
  ): Promise<T> {
    try {
      this.loggerService.log({
        message: { title: `Repository Operation - ${operation} - started` },
      });

      const startTime = Date.now();
      const result = await callback();
      const duration = Date.now() - startTime;

      this.loggerService.log({
        message: {
          title: `Repository Operation - ${operation} - finished`,
          duration: `${duration}ms`,
        },
      });

      return result;
    } catch (e) {
      return this.handleError(operation, e);
    }
  }
}
