// Import libraries
import { InstantConnectProxy } from 'prismarine-proxy';
import mcProtocal from 'minecraft-protocol';
// @ts-ignore
import type { PacketMeta, ServerClient, Client } from 'prismarine-proxy';

// Import interfaces
import { Player } from './interfaces/player.js';
import { EmptyPlayer } from './interfaces/player.js';
import { Settings } from './interfaces/settings.js';

// Import structures
import { Command } from './utils/structures/commandBase.js';
import { Module, ModuleReturn } from './utils/structures/moduleBase.js';

// Import utility modules
import BrainLogger from './utils/logger.js';
import errorHandler from './utils/errorHandler.js';
import { updateSettings } from './utils/settings/updateSettings.js';

// Import Managers
import { loadCommands } from './managers/commandManager.js';
import { loadModules } from './managers/moduleManager.js';

// Create a new logger instance
const logger = new BrainLogger();

const { ping } = mcProtocal;
type NewPingResult = mcProtocal.NewPingResult;

// Define the BrainProxy class
export class BrainProxy {
  // Initialize properties for commands, modules, and player
  commands = new Map<string, Command>();
  modules: Module[] = [];
  player: Player = EmptyPlayer;

  // eslint-disable-next-line no-unused-vars
  constructor(public settings: Settings) {} // Constructor with settings parameter

  // Method to start the proxy
  startProxy = async () => {
    const config = this.settings; // Store settings in a local variable
    logger.info(`Starting BrainProxy - ${process.env.npm_package_version}`); // Log proxy start

    // Log BrainProxy ASCII Logo
    console.log(`\n\n
    ____             _       ____                       
   / __ )_________ _(_)___  / __ \\_________  _  ____  __
  / __  / ___/ __ \`/ / __ \\/ /_/ / ___/ __ \\| |/_/ / / /
 / /_/ / /  / /_/ / / / / / ____/ /  / /_/ />  </ /_/ / 
/_____/_/   \\__,_/_/_/ /_/_/   /_/   \\____/_/|_|\\__, /  
                                               /____/   \n\n`);

    // Change process title
    process.title = `BrainProxy - ${process.env.npm_package_version}`;

    errorHandler(); // Start the error handler

    // Create a new instance of InstantConnectProxy
    const proxy = new InstantConnectProxy({
      // Login handler logic
      loginHandler: (client: any) => {
        this.player.username = client.username; // Set the player's username

        return {
          username: client.username,
          auth: 'microsoft',
        };
      },

      // Server and client options for the proxy
      serverOptions: {
        port: this.settings.proxy.port,
        version: this.settings.proxy.version,

        // Logic for modifying the ping response
        async beforePing(response, client, callback) {
          let hypixel = (await ping({
            host: config.proxy.host,
            version: config.proxy.version,
          })) as NewPingResult;

          const description = config.settings.motd;
          hypixel.description = hypixel.description.toString().replace(/.*\n/, description);

          if (callback) callback(null, hypixel);
        },
        validateChannelProtocol: false,
      },
      clientOptions: {
        version: this.settings.proxy.version,
        host: this.settings.proxy.host,

        // Handle Microsoft Authentication
        onMsaCode(data) {
          logger.info(
            `Please login to Microsoft to continue! Go to "${data.verification_uri}" and enter the code ${data.user_code} to authenticate!`,
          );
        },
      },
    });

    // Load commands, modules, and update settings
    await loadCommands(this.settings, this);
    await loadModules(this.settings, this);
    updateSettings(this.settings);

    // Log proxy start and return the proxy instance
    logger.success(`Proxy started using version §a${this.settings.proxy.version}`);
    return proxy;
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

        if (response.intercept) intercept = true;
      } catch (err) {
        // Handle errors while processing packets
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
    // Update settings for commands and modules
    this.commands.forEach((command) => {
      this.settings.commands[command.settings.name] = command.settings.enabled;
    });

    this.modules.forEach((module) => {
      this.settings.modules[module.settings.name] = module.settings.enabled;
    });

    updateSettings(this.settings); // Update settings using the utility function
  };
}
