import { LoggerService } from '@nestjs/common';

// Define ANSI color codes
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

export class CustomLoggerService implements LoggerService {
  private readonly serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  private getContextString(): string {
    return `[${this.serviceName}]`;
  }

  private getDate(): string {
    // Given timestamp in UTC
    const utcTimestamp = new Date().toISOString();

    // Step 1: Convert UTC to GMT+5.30
    const utcDate = new Date(utcTimestamp);
    // const gmt530Offset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    const gmt530Timestamp = new Date(utcDate.getTime());

    // Step 2: Format the new timestamp as "DD/MM/YYYY, HH:mm:ss"
    const day = String(gmt530Timestamp.getDate()).padStart(2, '0');
    const month = String(gmt530Timestamp.getMonth() + 1).padStart(2, '0');
    const year = gmt530Timestamp.getFullYear();
    const hours = String(gmt530Timestamp.getHours()).padStart(2, '0');
    const minutes = String(gmt530Timestamp.getMinutes()).padStart(2, '0');
    const seconds = String(gmt530Timestamp.getSeconds()).padStart(2, '0');
    const milliseconds = String(gmt530Timestamp.getMilliseconds()).padStart(
      3,
      '0',
    );
    const formattedTimestamp = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}:${milliseconds}`;

    return formattedTimestamp; // Output: 01/08/2023, 09:53:34:01
  }

  private formatMessage(level: string, message: string): string {
    switch (level) {
      case 'log':
        return `${COLORS.white}${message}${COLORS.reset}`;
      case 'error':
        return `${COLORS.red}${message}${COLORS.reset}`;
      case 'warn':
        return `${COLORS.yellow}${message}${COLORS.reset}`;
      case 'debug':
        return `${COLORS.cyan}${message}${COLORS.reset}`;
      case 'verbose':
        return `${COLORS.magenta}${message}${COLORS.reset}`;
      default:
        return message;
    }
  }

  private logMessage(level: string, message: string): void {
    const ctxString = this.getContextString();
    const date = this.getDate();
    console.log(
      this.formatMessage(level, `${date} : ${ctxString} : ${message}`),
    );
  }

  log(message: string): void {
    this.logMessage('log', message);
  }

  error(message: string): void {
    this.logMessage('error', message);
  }

  warn(message: string): void {
    this.logMessage('warn', message);
  }

  debug(message: string): void {
    this.logMessage('debug', message);
  }

  verbose(message: string): void {
    this.logMessage('verbose', message);
  }
}
