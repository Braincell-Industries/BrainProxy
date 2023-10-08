// Import necessary libraries
import { join } from 'path';

// Import utility modules
import BrainLogger from '../utils/logger.js';

// Import helper function for recursive imports
import { importRecursively } from '../utils/helpers/importRecursively.js';

// Import the module structure
import { Module } from '../utils/structures/moduleBase.js';

// Create a new logger instance
const logger = new BrainLogger();

// Method to load modules
export async function loadModules(settings, proxy) {
  // Log the start of the module loading process
  logger.info('Loading modules');
  const startTime = performance.now();

  // Recursively import all module files from the specified directory
  const moduleFiles = await importRecursively(join(__dirname, '../modules'));
  const modulePromises: Promise<void>[] = [];

  for (const moduleObject of moduleFiles) {
    const moduleStartTime = performance.now();

    // Get the default export
    const ModuleBase = moduleObject.default;
    const module = new ModuleBase() as Module;

    // Set the enabled status of the module based on settings or default to true
    module.settings.enabled = settings.modules?.[module.settings.name] ?? true;

    // Create a promise for setting up the module
    const promise = (async () => {
      // Add the module to the proxy's modules array
      proxy.modules.push(module);

      // Measure and log the load time for loading this module
      const moduleTimeCurrent = performance.now();
      const moduleLoadTimeCalculated = (moduleTimeCurrent - moduleStartTime).toFixed(2) + ' ms';
      logger.success(`&l├&r &3${module.settings.name}&r &l(&b${moduleLoadTimeCalculated}&r)`);
    })();

    modulePromises.push(promise);
  }

  // Wait for all module setup promises to complete
  await Promise.all(modulePromises);

  // Measure and log the total load time for loading all modules
  const endTime = performance.now();
  const loadTimeCalculated = (endTime - startTime).toFixed(2) + ' ms';
  logger.success(`└ Successfully loaded all modules in &b${loadTimeCalculated}`);
}

// Method to reload modules
export async function reloadModules(settings, proxy) {
  // Log that the modules are being reloaded
  logger.success('&3Reloaded modules');

  // Clear the existing modules in the proxy's modules array
  proxy.modules = [];

  // Load modules again using the loadModules function
  await loadModules(settings, proxy);
}
