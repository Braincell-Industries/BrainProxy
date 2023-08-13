import { readFileSync, writeFileSync } from 'fs';
import { load, dump } from 'js-yaml'; // Import the 'dump' function
import type { Settings } from '../../interfaces/settings.js';

// Import Logger
import BrainLogger from '../logger.js';

// Define a default settings object
const defaultSettings: Settings = {
  proxy: {
    host: 'mc.hypixel.net',
    version: '1.8.9',
    port: 25565,
  },
  settings: {
    prefix: '/',
    locale: 'en-UK',
  },
  modules: {}, // Initialize the modules property as an empty object
  commands: {}, // Initialize the commands property as an empty object
};

const logger = new BrainLogger();

// This function retrieves the settings from a YAML file.
export function getSettings() {
  try {
    // Attempt to parse the contents of the 'settings.yml' file.
    const settings = load(readFileSync('./settings.yml', 'utf-8')) as Settings;
    return settings;
  } catch (e) {
    // If an error occurs while parsing, write the default settings to 'settings.yml' and return them.
    updateSettings(defaultSettings);
    return defaultSettings;
  }
}

// This function updates the settings in the YAML file.
export function updateSettings(settings: Settings) {
  // Serialize and write the updated settings to the 'settings.yml' file.
  writeFileSync('./settings.yml', dump(settings));
}
