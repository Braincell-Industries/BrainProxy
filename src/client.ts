// @ts-ignore
import { InstantConnectProxy } from 'prismarine-proxy';
import mcProtocal from 'minecraft-protocol';
const { ping } = mcProtocal;
type NewPingResult = mcProtocal.NewPingResult;
import { readdirSync } from 'fs';

// Import Logger
import BrainLogger from './utils/logger.js';
const logger = new BrainLogger();

// Set the version
let version = 'v1-DEV-0.0.0';

// Import required types from various modules
// @ts-ignore
import type { PacketMeta, ServerClient, Client } from 'prismarine-proxy';
import type { Settings } from './interfaces/settings.js';
import type { Command } from './utils/structures/commandBase.js';
import type { Module, ModuleReturn } from './utils/structures/moduleBase.js';
import { updateSettings } from './utils/settings/updateSettings.js';
import { EmptyPlayer, Player } from './interfaces/player.js';

// Define the BrainProxy class
export class BrainProxy {
  // Initialize properties for commands, modules, and player
  commands = new Map<string, Command>();
  modules: Module[] = [];
  player: Player = EmptyPlayer;

  constructor(public settings: Settings) {}

  // Method to start the proxy
  startProxy = async () => {
    // Initialize configuration and log start
    const config = this.settings;
    logger.info('Starting proxy');

    // Create a new instance of InstantConnectProxy
    const proxy = new InstantConnectProxy({
      // Login handler logic
      loginHandler: (client: any) => {
        logger.info(`Logging in as §3${client.profile.name}...`);
        this.player.username = client.username;

        return {
          username: client.username,
          auth: 'microsoft',
        };
      },
      // Server options for the proxy
      serverOptions: {
        validateChannelProtocol: false,
        port: this.settings.proxy.port,
        // Logic for modifying ping response
        async beforePing(response, client, callback) {
          let hypixel = (await ping({
            host: config.proxy.host,
            version: config.proxy.version,
          })) as NewPingResult;

          const description = `          §kX§r §6BrainProxy§r §4§l- §r§6${version} §r§kX§r\n`;
          hypixel.description = hypixel.description.toString().replace(/.*\n/, description);

          if (callback) callback(null, hypixel);
        },
        version: this.settings.proxy.version,
      },
      // Client options for the proxy
      clientOptions: {
        version: this.settings.proxy.version,
        host: this.settings.proxy.host,
      },
    });

    // Load commands, modules, and update settings
    logger.info('Loading commands');
    await this.loadCommands();
    logger.info('Loading modules');
    await this.loadModules();
    logger.info('Updating settings');
    this.updateSettings();

    // Log proxy start and return the proxy instance
    logger.success(`Proxy started using version §a${this.settings.proxy.version}`);
    return proxy;
  };

  // Method to load commands
  loadCommands = async () => {
    // Dynamically import command files
    const commandFiles = await importRecursively('./dist/commands');

    // Iterate through imported command classes
    for (const CommandBase of commandFiles) {
      const command = new CommandBase() as Command;
      command.settings.enabled = this.settings.commands?.[command.settings.name] ?? true;

      logger.success(`Added command §3${command.settings.name}`);
      this.commands.set(command.settings.name, command);

      // Add aliases for commands
      for (const alias of command.settings.aliases) {
        this.commands.set(alias, command);
      }
    }
  };

  // Method to reload commands
  reloadCommands = async () => {
    logger.success('§aReloaded commands');
    this.commands.clear();
    await this.loadCommands();
  };

  // Method to load modules
  loadModules = async () => {
    // Dynamically import module files
    const moduleFiles = await importRecursively('./dist/modules');

    // Iterate through imported module classes
    for (const ModuleBase of moduleFiles) {
      const module = new ModuleBase() as Module;
      module.settings.enabled = this.settings.modules?.[module.settings.name] ?? true;

      logger.success(`Added module §3${module.settings.name}`);
      this.modules.push(module);
    }
  };

  // Method to reload modules
  reloadModules = async () => {
    logger.success('§aReloaded modules');
    this.modules = [];
    await this.loadModules();
  };

  // Method to parse incoming and outgoing packets
  parsePacket = async (
    data: any,
    meta: PacketMeta,
    toClient: ServerClient,
    toServer: Client,
    type: 'incoming' | 'outgoing',
  ): Promise<ModuleReturn> => {
    let intercept = false;

    // Iterate through modules for packet processing
    for (const module of this.modules) {
      if (!module.settings.enabled) continue;

      let response;
      try {
        if (type === 'incoming')
          response = await module.parseIncoming(data, meta, toClient, toServer, this, this.player);
        else response = await module.parseOutgoing(data, meta, toClient, toServer, this, this.player);

        if (response.intercept) intercept = false;
      } catch (err) {
        logger.error(`Error trying to run ${module.settings.name}`);
        logger.error(`${err}`);
        response = [false, data];
      }

      data = response.data;
    }

    return { intercept: intercept, data: data, meta: meta };
  };

  // Method to update settings
  updateSettings = () => {
    this.commands.forEach((command) => {
      this.settings.commands[command.settings.name] = command.settings.enabled;
    });

    this.modules.forEach((module) => {
      this.settings.modules[module.settings.name] = module.settings.enabled;
    });

    updateSettings(this.settings);
  };
}

// Helper function to recursively import files from a directory
async function importRecursively(path: string, imports: Array<any> = []) {
  const files = readdirSync(path, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      const res = await importRecursively(`${path}/${file.name}`);
      imports.push(...res);
    } else {
      if (file.name.match('Base')) continue;
      const { default: defaultExport } = await import(`${path.replace('/dist', '')}/${file.name}?update=${Date.now()}`);
      imports.push(defaultExport as Module);
    }
  }

  return imports;
}
