export type LogOptions = {
  message: any;
  description?: string;
  context?: string;
};

export type LogErrorOptions = LogOptions & {
  trace?: string;
};

export type LogSeverity = 'error' | 'log' | 'warn' | 'info';

export interface ILoggerService {
  setContext(context: string): void;
  getContext(): string | null;
  log(options: LogOptions): void;
  info(options: LogOptions): void;
  error(options: LogErrorOptions): void;
  warn(options: LogOptions): void;
}
