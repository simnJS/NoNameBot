import colors from 'colors/safe';

export default class Logger {
  static info(message: string): void {
    Logger.log(message, LogLevels.info, colors.blue);
  }

  static warn(message: string): void {
    Logger.log(message, LogLevels.warn, colors.yellow);
  }

  static error(message: string): void {
    Logger.log(message, LogLevels.error, colors.red);
  }

  static log(message: string, level = LogLevels.debug, colorFn = (s: string) => s): void {
    const levelColors = {
      [LogLevels.debug]: colors.gray,
      [LogLevels.info]: colors.blue,
      [LogLevels.warn]: colors.yellow,
      [LogLevels.error]: colors.red,
    };
    const levelColor = levelColors[level];
    console.log(`${colorFn(levelColor(`[${LogLevels[level].toUpperCase()}]`))} ${colorFn(message)}`);
  }

  static dump(...obj: any[]): void {
    const str = obj.map((o) => JSON.stringify(o, null, 2)).join('\n');
    console.log(colors.gray(`[BOT] - DUMPING OBJECT =>\n${str}`));
  }
}

export enum LogLevels {
  debug,
  info,
  warn,
  error,
}