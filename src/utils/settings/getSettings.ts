import { parse } from '@iarna/toml';
import { readFileSync, copyFileSync } from 'fs';
import type { Settings } from '../../interfaces/settings.js';

// Import Logger
import BrainLogger from '../logger.js';
const logger = new BrainLogger();

// This function retrieves the settings from a TOML file.
export function getSettings() {
  try {
    // Attempt to parse the contents of the 'settings.toml' file.
    const settings = parse(readFileSync('./settings.toml', 'utf-8'));
    return settings as unknown as Settings; // Cast to the 'Settings' type.
  } catch (e) {
    // If an error occurs while parsing, create a default settings file.
    logger.warn('No settings file was found, creating a default one');
    copyFileSync('./dist/utils/settings/settingsTemplate.toml', 'settings.toml');
    // Parse the newly created settings file.
    const settings = parse(readFileSync('./settings.toml', 'utf-8'));
    return settings; // Return the parsed settings.
  }
}
