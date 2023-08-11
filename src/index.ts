import { getSettings } from './utils/settings/getSettings.js';
import { BrainProxy } from './client.js';
import type { Settings } from './interfaces/settings.js';

// Import Logger
import BrainLogger from './utils/logger.js';
const logger = new BrainLogger();

// Get settings from utility function.
const settings = getSettings() as Settings;
const prefix = settings.settings.prefix;

// Create a new instance of BrainProxy using the retrieved settings.
const client = new BrainProxy(settings);

// Start the proxy.
const proxy = await client.startProxy();

// Handle incoming data packets.
proxy.on('incoming', async (data, meta, toClient, toServer) => {
  // If the incoming data's name is 'custom_payload' and channel is 'REGISTER',
  // create a shallow copy of the data.
  if (meta.name === 'custom_payload' && data.channel === 'REGISTER') {
    data = Object.assign({}, data);
  }

  let intercept = true;

  // Parse the packet using the client and update the intercept and data accordingly.
  const response = await client.parsePacket(data, meta, toClient, toServer, 'incoming');
  intercept = response.intercept;
  data = response.data;

  // If interception is disabled, write the data to the client.
  if (!intercept) toClient.write(meta.name, data);
});

// Handle outgoing data packets.
proxy.on('outgoing', async (data, meta, toClient, toServer) => {
  let intercept = true;

  // If the outgoing data's name is 'chat', extract command-related information.
  if (meta.name === 'chat') {
    const message = data.message.split(' ') as string[];
    const possibleCommand = message[0];
    const args = message.slice(1);

    // Check if the message starts with the configured prefix.
    if (possibleCommand.startsWith(prefix)) {
      const commandName = possibleCommand.slice(prefix.length);
      const command = client.commands.get(commandName);

      // If the command is enabled, execute it and handle any errors.
      if (command?.settings.enabled) {
        try {
          logger.info(`Running command §3${commandName}`);
          await command.execute(args, data, meta, toClient, toServer, client, client.player);
        } catch (e) {
          // Notify the client about the error.
          const insertThis = `Something went wrong running ${commandName}, please check the logs.`;
          const msg = `{"text":"${insertThis}"}`;
          toClient.write('chat', { message: msg });
          logger.error(`${e}`);
        }

        intercept = true;
      }
    }
  }

  // Parse the packet using the client and update the intercept and data accordingly.
  const response = await client.parsePacket(data, meta, toClient, toServer, 'outgoing');
  if (intercept) intercept = response.intercept;
  data = response.data;

  // If interception is disabled, write the data to the server.
  if (!intercept) toServer.write(meta.name, data);
});
