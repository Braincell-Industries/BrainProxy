import chalk from 'chalk';
import util from 'util';
import { minecraftColorCodes } from '../data/mcColorCodes.js';

//TODO - Add support for both & and § characters to color the output
//TODO - Add support for colored numbers in a string

export default class BrainLogger {
  private origin: string;

  constructor() {
    // Get the origin of the log message
    this.origin = this.getLogOrigin().split(/[\\/]/).pop();
  }

  private getLogOrigin() {
    let filename: any;
    // Save the current Error.prepareStackTrace function.
    let _pst = Error.prepareStackTrace;
    Error.prepareStackTrace = function (err, stack) {
      // Override Error.prepareStackTrace to capture stack trace.
      return stack;
    };

    try {
      let err: any = new Error();
      let callerFile: string;
      let currentFile: string;

      // Get the current file name.
      currentFile = err.stack.shift().getFileName();

      while (err.stack.length) {
        // Get the file name of the caller
        callerFile = err.stack.shift().getFileName();

        if (currentFile !== callerFile) {
          filename = callerFile;
          break;
        }
      }
    } catch (err) {
      console.log(err);
    }

    // Restore the original Error.prepareStackTrace function
    Error.prepareStackTrace = _pst;

    // Return the file name of the origin
    return filename;
  }

  private convertMinecraftColorsToAnsi(input: string): string {
    for (const color of minecraftColorCodes) {
      const regex = new RegExp(`(${color.colorCode})`, 'g');
      input = input.replace(regex, color.ansiEscapeCode);
    }
    return input;
  }

  private formatContent(content: any, json?: boolean): string {
    if (json) {
      return JSON.stringify(content, null, 2);
    } else if (typeof content === 'object') {
      // Format JSON objects
      return util.inspect(content, { colors: true, depth: null });
    } else {
      // Format strings
      return this.convertMinecraftColorsToAnsi(content);
    }
  }

  public fatal(content: string, jsonContent?: object): void {
    if (jsonContent !== undefined) {
      console.log(
        chalk.hex('#aee4ed')(new Date().toLocaleTimeString()) +
          chalk.hex('#b0b4b8')(` (pid:${process.pid} ${this.origin}) `) +
          chalk.hex('#eb544e')(`[fatal] `) +
          this.formatContent(jsonContent),
      );
    } else {
      console.log(
        chalk.hex('#aee4ed')(new Date().toLocaleTimeString()) +
          chalk.hex('#b0b4b8')(` (pid:${process.pid} ${this.origin}) `) +
          chalk.hex('#eb544e')(`[fatal] `) +
          this.formatContent(content),
      );
    }
  }

  public panic(content: string, jsonContent?: object): void {
    if (jsonContent !== undefined) {
      console.log(
        chalk.hex('#aee4ed')(new Date().toLocaleTimeString()) +
          chalk.hex('#b0b4b8')(` (pid:${process.pid} ${this.origin}) `) +
          chalk.hex('#eb554e')(`[panic] `) +
          this.formatContent(jsonContent),
      );
    } else {
      console.log(
        chalk.hex('#aee4ed')(new Date().toLocaleTimeString()) +
          chalk.hex('#b0b4b8')(` (pid:${process.pid} ${this.origin}) `) +
          chalk.hex('#eb554e')(`[panic] `) +
          this.formatContent(content),
      );
    }
  }

  public error(content: string, jsonContent?: object): void {
    if (jsonContent !== undefined) {
      console.log(
        chalk.hex('#aee4ed')(new Date().toLocaleTimeString()) +
          chalk.hex('#b0b4b8')(` (pid:${process.pid} ${this.origin}) `) +
          chalk.hex('#ee7c68')(`[error] `) +
          this.formatContent(jsonContent),
      );
    } else {
      console.log(
        chalk.hex('#aee4ed')(new Date().toLocaleTimeString()) +
          chalk.hex('#b0b4b8')(` (pid:${process.pid} ${this.origin}) `) +
          chalk.hex('#ee7c68')(`[error] `) +
          this.formatContent(content),
      );
    }
  }

  public warn(content: string, jsonContent?: object): void {
    if (jsonContent !== undefined) {
      console.log(
        chalk.hex('#aee4ed')(new Date().toLocaleTimeString()) +
          chalk.hex('#b0b4b8')(` (pid:${process.pid} ${this.origin}) `) +
          chalk.hex('#ee7c68')(`[error] `) +
          this.formatContent(jsonContent),
      );
    } else {
      console.log(
        chalk.hex('#aee4ed')(new Date().toLocaleTimeString()) +
          chalk.hex('#b0b4b8')(` (pid:${process.pid} ${this.origin}) `) +
          chalk.hex('#ee7c68')(`[error] `) +
          this.formatContent(content),
      );
    }
  }

  public success(content: string, jsonContent?: object): void {
    if (jsonContent !== undefined) {
      console.log(
        chalk.hex('#aee4ed')(new Date().toLocaleTimeString()) +
          chalk.hex('#b0b4b8')(` (pid:${process.pid} ${this.origin}) `) +
          chalk.hex('#75fb8d')(`[success] `) +
          this.formatContent(jsonContent),
      );
    } else {
      console.log(
        chalk.hex('#aee4ed')(new Date().toLocaleTimeString()) +
          chalk.hex('#b0b4b8')(` (pid:${process.pid} ${this.origin}) `) +
          chalk.hex('#75fb8d')(`[success] `) +
          this.formatContent(content),
      );
    }
  }

  public notice(content: string, jsonContent?: object): void {
    if (jsonContent !== undefined) {
      console.log(
        chalk.hex('#aee4ed')(new Date().toLocaleTimeString()) +
          chalk.hex('#b0b4b8')(` (pid:${process.pid} ${this.origin}) `) +
          chalk.hex('#6eaeea')(`[notice] `) +
          this.formatContent(jsonContent),
      );
    } else {
      console.log(
        chalk.hex('#aee4ed')(new Date().toLocaleTimeString()) +
          chalk.hex('#b0b4b8')(` (pid:${process.pid} ${this.origin}) `) +
          chalk.hex('#6eaeea')(`[notice] `) +
          this.formatContent(content),
      );
    }
  }

  public info(content: string, jsonContent?: object): void {
    if (jsonContent !== undefined) {
      console.log(
        chalk.hex('#aee4ed')(new Date().toLocaleTimeString()) +
          chalk.hex('#b0b4b8')(` (pid:${process.pid} ${this.origin}) `) +
          chalk.hex('#86ccde')(`[info] `) +
          this.formatContent(jsonContent),
      );
    } else {
      console.log(
        chalk.hex('#aee4ed')(new Date().toLocaleTimeString()) +
          chalk.hex('#b0b4b8')(` (pid:${process.pid} ${this.origin}) `) +
          chalk.hex('#86ccde')(`[info] `) +
          this.formatContent(content),
      );
    }
  }

  public debug(content: string, jsonContent?: object): void {
    if (jsonContent !== undefined) {
      console.log(
        chalk.hex('#aee4ed')(new Date().toLocaleTimeString()) +
          chalk.hex('#b0b4b8')(` (pid:${process.pid} ${this.origin}) `) +
          chalk.hex('#cd7acd')(`[debug] `) +
          this.formatContent(jsonContent),
      );
    } else {
      console.log(
        chalk.hex('#aee4ed')(new Date().toLocaleTimeString()) +
          chalk.hex('#b0b4b8')(` (pid:${process.pid} ${this.origin}) `) +
          chalk.hex('#cd7acd')(`[debug] `) +
          this.formatContent(content),
      );
    }
  }

  public trace(content: string, jsonContent?: object): void {
    if (jsonContent !== undefined) {
      console.log(
        chalk.hex('#aee4ed')(new Date().toLocaleTimeString()) +
          chalk.hex('#b0b4b8')(` (pid:${process.pid} ${this.origin}) `) +
          chalk.hex('#7b7f81')(`[trace] `) +
          this.formatContent(jsonContent),
      );
    } else {
      console.log(
        chalk.hex('#aee4ed')(new Date().toLocaleTimeString()) +
          chalk.hex('#b0b4b8')(` (pid:${process.pid} ${this.origin}) `) +
          chalk.hex('#7b7f81')(`[trace] `) +
          this.formatContent(content),
      );
    }
  }
}
