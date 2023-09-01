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
    const msg = err.message;

    // Rate limited
    if (
      msg.includes('RateLimiter disallowed request') ||
      (msg.includes('429 Too Many Requests') && msg.includes('"path" : "/authentication/login_with_xbox"'))
    ) {
      logger.error('You were RateLimited!');
      return;
    }

    // Port taken
    if (msg.includes('listen EADDRINUSE: address already in use')) {
      logger.error(
        'The Proxy Port is unavailable, check if another program is using it or if another instance of BrainProxy is running.',
      );
      process.exit(1);
    }

    logger.error(`Uncaught Exception: ${err.message}`);
    console.log(err, '\n', origin);
  });

  // Handle process warnings
  process.on('warning', (warn: Error) => {
    logger.warn(`Process Warning: ${warn.name} - ${warn.message}`);
    console.log(warn);
  });
};
