import { stringify } from '@iarna/toml';
import { writeFileSync, copyFileSync } from 'fs';
import type { Settings } from '../../interfaces/settings.js';

// Import Logger
import BrainLogger from '../logger.js';
const logger = new BrainLogger();

// This function updates the settings in the TOML file.
export function updateSettings(settings: Settings) {
  try {
    // Serialize and write the updated settings to the 'settings.toml' file.
    writeFileSync('./settings.toml', stringify(settings as any));
  } catch (e) {
    // If an error occurs while writing, create a default settings file.
    logger.warn('No settings file was found, creating a default one');
    copyFileSync('./dist/utils/settings/settingsTemplate.toml', 'settings.toml');
  }
}
