import { writeFileSync, copyFileSync } from 'fs';
import { dump } from 'js-yaml';
import type { Settings } from '../../interfaces/settings.js';

// Import Logger
import BrainLogger from '../logger.js';
const logger = new BrainLogger();

// This function updates the settings in the YAML file.
export function updateSettings(settings: Settings) {
  logger.info('Updating settings');

  try {
    // Serialize and write the updated settings to the 'settings.yml' file in the root folder.
    writeFileSync('./settings.yml', dump(settings));
  } catch (e) {
    try {
      // Serialize and write the updated settings to the 'settings.yml' file in the dist folder.
      writeFileSync('./dist/settings.yml', dump(settings));
    } catch (e) {
      // If an error occurs while writing, create a default settings file in the root folder.
      logger.warn('No settings file was found, creating a default one');
      copyFileSync('./dist/utils/settings/settingsTemplate.yml', 'settings.yml');
    }
  }
}
