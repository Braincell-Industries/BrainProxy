// Import main files
import { BrainProxy } from './client.js';

// Import utility modules
import BrainLogger from './utils/logger.js';
import { getSettings } from './utils/settings/getSettings.js';

// Import types
import type { Settings } from 'interfaces/settings.js';

// Create a new logger instance
const logger = new BrainLogger();

async function main() {
  // Get settings from utility function and cast to the appropriate type
  const settings = getSettings() as Settings;
  const prefix = settings.settings.prefix; // Extract prefix from settings

  // Create a new instance of BrainProxy using the retrieved settings
  const client = new BrainProxy(settings);

  // Start the proxy and store its instance
  const proxy = await client.startProxy();

  // Handle player join event
  proxy.on('start', (toClient: any) => {
    logger.info(`§3${toClient.username}§f connected to the proxy`);
  });

  // Handle player disconnect event
  proxy.on('end', (username: string) => {
    logger.info(`§3${username}§f disconnected from the proxy`);
  });

  // Handle incoming data packets
  proxy.on('incoming', async (data: any, meta: any, toClient: any, toServer: any) => {
    // Check if the incoming data's name is 'custom_payload' and channel is 'REGISTER'
    if (meta.name === 'custom_payload' && data.channel === 'REGISTER') {
      // Create a shallow copy of the data
      data = Object.assign({}, data);
    }

    let intercept = true;

    // Parse the packet using the client and update intercept and data accordingly
    const response = await client.parsePacket(data, meta, toClient, toServer, 'incoming');
    intercept = response.intercept;
    data = response.data;

    // If interception is disabled, write the data to the client
    if (!intercept) toClient.write(meta.name, data);
  });

  // Handle outgoing data packets
  proxy.on('outgoing', async (data: any, meta: any, toClient: any, toServer: any) => {
    let intercept = true;

    // Check if the outgoing data's name is 'chat' and extract command-related information
    if (meta.name === 'chat') {
      const message = data.message.split(' ') as string[];
      const possibleCommand = message[0];
      const args = message.slice(1);

      // Check if the message starts with the configured prefix
      if (possibleCommand.startsWith(prefix)) {
        const commandName = possibleCommand.slice(prefix.length);
        const command = client.commands.get(commandName);

        // If the command is enabled, execute it and handle any errors
        if (command?.settings.enabled) {
          try {
            logger.info(`Running command §3${commandName}`);
            await command.execute(args, data, meta, toClient, toServer, client, client.player);
            intercept = false;
          } catch (e) {
            // Notify the client about the error
            const insertThis = `Something went wrong running ${commandName}, please check the logs.`;
            const msg = `{"text":"${insertThis}"}`;
            toClient.write('chat', { message: msg });
            logger.error(`${e}`);
          }
        }
      }
    }

    // If interception is enabled, parse the packet using the client and update the data accordingly
    if (intercept) {
      const response = await client.parsePacket(data, meta, toClient, toServer, 'outgoing');
      data = response.data;

      // If interception is disabled, write the data to the server
      if (!response.intercept) toServer.write(meta.name, data);
    }
  });
}

main(); // Call the main function to start the proxy
