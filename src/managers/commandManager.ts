// Import necessary libraries
import { join } from 'path';

// Import utility modules
import BrainLogger from '../utils/logger.js';

// Import helper function for recursive imports
import { importRecursively } from '../utils/helpers/importRecursively.js';

// Import the command structure
import { Command } from '../utils/structures/commandBase.js';

// Create a new logger instance
const logger = new BrainLogger();

// Method to load commands
export async function loadCommands(settings, proxy) {
  // Log the start of the command loading process
  logger.info('Loading commands');
  const startTime = performance.now();

  // Recursively import all command files from the specified directory
  const commandFiles = await importRecursively(join(__dirname, '../commands'));
  const commandPromises: Promise<void>[] = [];

  for (const commandObject of commandFiles) {
    const commandStartTime = performance.now();

    // Get the default export
    const CommandClass = commandObject.default;
    const command = new CommandClass() as Command;

    // Set the enabled status of the command based on settings or default to true
    command.settings.enabled = settings.commands?.[command.settings.name] ?? true;

    // Create a promise for setting up the command
    const promise = (async () => {
      // Add the command to the proxy's commands map
      proxy.commands.set(command.settings.name, command);
      for (const alias of command.settings.aliases) {
        proxy.commands.set(alias, command);
      }

      // Measure and log the load time for loading this command
      const commandTimeCurrent = performance.now();
      const commandLoadTimeCalculated = (commandTimeCurrent - commandStartTime).toFixed(2) + ' ms';
      logger.success(`&l├&r &3${command.settings.name}&r &l(&b${commandLoadTimeCalculated}&r)`);
    })();

    commandPromises.push(promise);
  }

  // Wait for all command setup promises to complete
  await Promise.all(commandPromises);

  // Measure and log the total load time for loading all commands
  const endTime = performance.now();
  const LoadTimeCalculated = (endTime - startTime).toFixed(2) + ' ms';
  logger.success(`└ Successfully loaded all commands in &b${LoadTimeCalculated}`);
}

// Method to reload commands (clears existing commands and loads them again)
export async function reloadCommands(settings, proxy) {
  // Log that the commands are being reloaded
  logger.success('&3Reloaded commands');

  // Clear the existing commands from the proxy
  proxy.commands.clear();

  // Load commands again using the loadCommands function
  await loadCommands(settings, proxy);
}
