// Import libraries
import chalk from 'chalk';
import util from 'util';
import fs from 'fs/promises';
import path from 'path';

// Import data
import { minecraftColors } from '../data/minecraftColors.js'; // Importing color codes for Minecraft colors

// Define a constant for the log folder path
const LOG_FOLDER = './logs';

// Define a class for logging functionality
export default class BrainLogger {
  private origin: string; // Store the origin of the log message

  constructor() {
    // Initialize the origin by extracting it from the call stack
    this.origin = this.getLogOrigin().split(/[\\/]/).pop() || 'Unknown';
  }

  // Function to extract the origin from the call stack
  private getLogOrigin(): string {
    const stack = new Error().stack || '';
    const stackLines = stack.split('\n');
    for (let i = 1; i < stackLines.length; i++) {
      if (!stackLines[i].includes(__filename)) {
        const match = stackLines[i].match(/\(([^)]+)\)/);
        if (match) {
          return match[1];
        }
      }
    }
    return 'Unknown';
  }

  // Function to get the current timestamp
  private getCurrentTimestamp(): string {
    const date = new Date();
    return `${date.toLocaleTimeString()} `;
  }

  // Function to write log content to a file
  private async writeLogToFile(logLevel: string, content: string): Promise<void> {
    const logFileName = this.getLogFileName();
    const logEntry = `[${this.getCurrentTimestamp()}] [${logLevel}] (pid:${process.pid}) [${this.origin}] ${content}\n`; // Include PID and filename in the log entry

    try {
      await fs.mkdir(LOG_FOLDER, { recursive: true }); // Create the log folder if it doesn't exist
      await fs.appendFile(logFileName, logEntry); // Append the log entry to the log file
    } catch (error) {
      console.error(`Error writing log to file: ${error}`);
    }
  }

  // Function to generate a log file name based on the current date
  private getLogFileName(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const timestamp = `${year}-${month}-${day}`;
    return path.join(LOG_FOLDER, `${timestamp}.log`);
  }

  // Function to format log content based on whether it's JSON or text
  private formatContent(content: any, json?: boolean): string {
    if (json) {
      return JSON.stringify(content, null, 2);
    } else if (typeof content === 'object') {
      return util.inspect(content, { colors: true, depth: null });
    } else {
      return this.convertMinecraftColorsToAnsi(content);
    }
  }

  // Function to convert Minecraft color codes to ANSI color codes
  private convertMinecraftColorsToAnsi(input: string): string {
    for (const color of minecraftColors) {
      const regex = new RegExp(`(${color.colorCode})`, 'g');
      input = input.replace(regex, color.ansiEscapeCode);
    }
    return input;
  }

  // Function to log a message with a specified log level
  private logMessage(logLevel: string, content: string, jsonContent?: object): void {
    const timestamp = this.getCurrentTimestamp();
    const pidAndOrigin = `(pid:${process.pid} ${this.origin}) `;
    const formattedContent = this.formatContent(jsonContent || content, !!jsonContent);
    const coloredTimestamp = chalk.hex('#aee4ed')(timestamp);
    const coloredPidAndOrigin = chalk.hex('#b0b4b8')(pidAndOrigin);
    const coloredLogLevel = chalk.hex(this.getLogLevelColor(logLevel))(`[${logLevel}] `);

    const message = `${coloredTimestamp}${coloredPidAndOrigin}${coloredLogLevel}${formattedContent}`;
    console.log(message); // Output the formatted log message to the console
    this.writeLogToFile(logLevel, formattedContent); // Write the log message to a file
  }

  // Function to get the color for a log level
  private getLogLevelColor(logLevel: string): string {
    switch (logLevel) {
      case 'fatal':
        return '#eb544e';
      case 'panic':
        return '#eb554e';
      case 'error':
        return '#ee7c68';
      case 'warn':
        return '#ee7c68';
      case 'success':
        return '#75fb8d';
      case 'notice':
        return '#6eaeea';
      case 'info':
        return '#86ccde';
      case 'debug':
        return '#cd7acd';
      case 'trace':
        return '#7b7f81';
      default:
        return '#ffffff';
    }
  }

  // Public methods for different log levels
  public fatal(content: string, jsonContent?: object): void {
    this.logMessage('fatal', content, jsonContent);
  }

  public panic(content: string, jsonContent?: object): void {
    this.logMessage('panic', content, jsonContent);
  }

  public error(content: string, jsonContent?: object): void {
    this.logMessage('error', content, jsonContent);
  }

  public warn(content: string, jsonContent?: object): void {
    this.logMessage('warn', content, jsonContent);
  }

  public success(content: string, jsonContent?: object): void {
    this.logMessage('success', content, jsonContent);
  }

  public notice(content: string, jsonContent?: object): void {
    this.logMessage('notice', content, jsonContent);
  }

  public info(content: string, jsonContent?: object): void {
    this.logMessage('info', content, jsonContent);
  }

  public debug(content: string, jsonContent?: object): void {
    this.logMessage('debug', content, jsonContent);
  }

  public trace(content: string, jsonContent?: object): void {
    this.logMessage('trace', content, jsonContent);
  }
}
