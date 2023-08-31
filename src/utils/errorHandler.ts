// Import Logger
import BrainLogger from './logger.js';
const logger = new BrainLogger();

// Export a function that sets up various event listeners to handle errors and warnings
export default () => {
  // Indicate that the error handler setup has started
  logger.success('Error Handler has started!');

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    logger.warn(`Unhandled Promise Rejection: ${reason}`);
    console.log(reason, '\n', promise);
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err: Error, origin: string) => {
    logger.error(`Uncaught Exception: ${err.message}`);
    console.log(err, '\n', origin);
  });

  // Handle uncaught exceptions being monitored
  process.on('uncaughtExceptionMonitor', (err: Error, origin: string) => {
    logger.error(`Uncaught Exception (Monitor): ${err.message}`);
    console.log(err, '\n', origin);
  });

  // Handle process warnings
  process.on('warning', (warn: Error) => {
    logger.warn(`Process Warning: ${warn.name} - ${warn.message}`);
    console.log(warn);
  });
};
