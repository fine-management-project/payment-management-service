import {
  Injectable,
  Scope,
  LoggerService as NestLoggingService,
} from '@nestjs/common';
import {
  ILoggerService,
  LogErrorOptions,
  LogOptions,
  LogSeverity,
} from './logger.types';

@Injectable({ scope: Scope.TRANSIENT })
export class ConsoleLoggerService
  implements NestLoggingService, ILoggerService
{
  private _context: string;

  setContext(context: string): void {
    this._context = context;
  }

  getContext(): string | null {
    return this._context !== undefined ? this._context : null;
  }

  formatString(options: LogErrorOptions | LogOptions, severity: LogSeverity) {
    const usedContext = options.context ?? this._context ?? 'Not Set';
    const parsedMessage =
      typeof options.message === 'object'
        ? JSON.stringify(options.message)
        : String(options.message);

    let outputString = `[${severity.toUpperCase()}]: ${new Date().toString()}\r\n 
      [Message]: ${parsedMessage}\r\n 
      [Description]: ${options.description}\r\n
      [Context]: ${usedContext}\r\n
      `;

    if ('trace' in options) {
      outputString += `[Trace]: ${options.trace}\r\n`;
    }

    return outputString;
  }

  info(options: LogOptions) {
    console.info(this.formatString(options, 'info'));
  }

  log(options: LogOptions) {
    console.log(this.formatString(options, 'log'));
  }
  error(options: LogErrorOptions) {
    console.error(this.formatString(options, 'error'));
  }
  warn(options: LogOptions) {
    console.warn(this.formatString(options, 'warn'));
  }
}
