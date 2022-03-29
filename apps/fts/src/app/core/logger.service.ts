/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Simple logger system with the possibility of registering custom outputs.
 *
 * 4 different log levels are provided, with corresponding methods:
 * - debug   : for debug information
 * - info    : for informative status of the application (success, ...)
 * - warning : for non-critical errors that do not prevent normal application behavior
 * - error   : for critical errors that prevent normal application behavior
 *
 * Example usage:
 * ```
 * import { Logger } from 'app/core/logger.service';
 *
 * const log = new Logger('myFile');
 * ...
 * log.debug('something happened');
 * ```
 *
 * To disable debug and info logs in production, add this snippet to your root component:
 * ```
 * export class AppComponent implements OnInit {
 *   ngOnInit() {
 *     if (environment.production) {
 *       Logger.enableProductionMode();
 *     }
 *     ...
 *   }
 * }
 *
 * If you want to process logs through other outputs than console, you can add LogOutput functions to Logger.outputs.
 */

/**
 * The possible log levels.
 * LogLevel.Off is never emitted and only used with Logger.level property to disable logs.
 */
export enum LogLevel {
  Off = 0,
  Error,
  Warning,
  Info,
  Debug,
}

/**
 * Log output handler function.
 */
export type LogOutput = (
  source: string | undefined,
  level: LogLevel,
  ...objects: any[]
) => void;

export type ConsoleMethodNames = 'log' | 'info' | 'warn' | 'error';

export type ConsoleMethods =
  | Console['log']
  | Console['info']
  | Console['warn']
  | Console['error'];

export class Logger {
  /**
   * Current logging level.
   * Set it to LogLevel.Off to disable logs completely.
   */
  static level = LogLevel.Debug;

  /**
   * Additional log outputs.
   */
  static outputs: LogOutput[] = [];

  constructor(private source?: string) {}

  /**
   * Enables production mode.
   * Sets logging level to LogLevel.Warning.
   */
  static enableProductionMode() {
    Logger.level = LogLevel.Warning;
  }

  /**
   * Logs messages or objects  with the debug level.
   * Works the same as console.log().
   */
  debug(...objects: any[]) {
    this.log(console.log, LogLevel.Debug, objects);
  }

  /**
   * Logs messages or objects  with the info level.
   * Works the same as console.log().
   */
  info(...objects: any[]) {
    this.log(console.info, LogLevel.Info, objects);
  }

  /**
   * Logs messages or objects  with the warning level.
   * Works the same as console.log().
   */
  warn(...objects: any[]) {
    this.log(console.warn, LogLevel.Warning, objects);
  }

  /**
   * Logs messages or objects  with the error level.
   * Works the same as console.log().
   */
  error(...objects: any[]) {
    this.log(console.error, LogLevel.Error, objects);
  }

  private log(func: ConsoleMethods, level: LogLevel, objects: any[]) {
    // Compare number value of LogLevel enum
    if (level <= Logger.level) {
      // If a value was supplied to the Logger constructor for the source member,
      // put the string in a single element array, then combine it with the array of objects.
      const log = this.source
        ? ['[' + this.source + ']'].concat(objects)
        : objects;

      // Apply the method given to the func parameter to the console, giving the log array as arguments to the method
      // So, if this.info(...) was called:
      //   console.info(log);
      // Not sure if there's any advantage over just doing "func(log);"
      func.apply(console, log);

      //
      Logger.outputs.forEach((output) =>
        output.apply(output, [this.source, level, objects])
      );
    }
  }
}
