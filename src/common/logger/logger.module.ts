import { Global, Module } from '@nestjs/common';
import { LOGGER_SERVICE } from '../shared/constants';
import { ConsoleLoggerService } from './console-logger.service';

@Global()
@Module({
  providers: [
    {
      provide: LOGGER_SERVICE,
      useClass: ConsoleLoggerService,
    },
  ],
  exports: [LOGGER_SERVICE],
})
export class LoggerModule {}
