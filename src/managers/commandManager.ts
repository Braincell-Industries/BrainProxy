// Import libraries
import { join } from 'path';

// Import utility modules
import BrainLogger from '../utils/logger.js';

// Import helpers
import { importRecursively } from '../utils/helpers/importRecursively.js';

// Import structures
import { Command } from '../utils/structures/commandBase.js';

// Create a new logger instance
const logger = new BrainLogger();

// Method to load commands
export async function loadCommands(settings, proxy) {
  logger.info('Loading commands');

  // Dynamically import command files from the 'commands' directory
  const commandFiles = await importRecursively(join(__dirname, '../commands'));

  // Iterate through the imported command classes
  for (const commandObject of commandFiles) {
    const CommandClass = commandObject.default; // Access the default property

    const command = new CommandClass() as Command; // Instantiate the command class
    // Set the command's enabled status from settings, default to true
    command.settings.enabled = settings.commands?.[command.settings.name] ?? true;

    logger.success(`Added command §3${command.settings.name}`);
    proxy.commands.set(command.settings.name, command); // Add command to the proxy's commands map

    // Add aliases for the command
    for (const alias of command.settings.aliases) {
      proxy.commands.set(alias, command);
    }
  }
}

// Method to reload commands
export async function reloadCommands(settings, proxy) {
  logger.success('§aReloaded commands');
  proxy.commands.clear(); // Clear existing commands in the proxy's commands map
  await loadCommands(settings, proxy); // Load commands again
}
