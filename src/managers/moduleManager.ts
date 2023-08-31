// Import libraries
import { join } from 'path';

// Import utility modules
import BrainLogger from '../utils/logger.js';

// Import helpers
import { importRecursively } from '../utils/helpers/importRecursively.js';

// Import structures
import { Module } from '../utils/structures/moduleBase.js';

// Create a new logger instance
const logger = new BrainLogger();

// Method to load modules
export async function loadModules(settings, proxy) {
  logger.info('Loading modules');

  // Dynamically import module files from the 'modules' directory
  const moduleFiles = await importRecursively(join(__dirname, '../modules'));

  // Iterate through the imported module objects
  for (const moduleObject of moduleFiles) {
    const ModuleBase = moduleObject.default; // Access the default property

    const module = new ModuleBase() as Module; // Instantiate the module class
    // Set the module's enabled status from settings, default to true
    module.settings.enabled = settings.modules?.[module.settings.name] ?? true;

    logger.success(`Added module §3${module.settings.name}`);
    proxy.modules.push(module); // Add the module to the proxy's modules array
  }
}

// Method to reload modules
export async function reloadModules(settings, proxy) {
  logger.success('§aReloaded modules');
  proxy.modules.clear(); // Clear existing modules in the proxy's modules array
  await loadModules(settings, proxy); // Load modules again
}
