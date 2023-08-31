// Import libraries
// @ts-ignore
import type { PacketMeta, ServerClient, Client } from 'prismarine-proxy';

// Import structures
import { CommandBase, Command } from '../utils/structures/commandBase.js';

// Import utility modules
import BrainLogger from '../utils/logger.js';

// Create a new logger instance
const logger = new BrainLogger();

// Define a class that implements the Command interface.
export default class extends CommandBase implements Command {
  constructor() {
    // Call the constructor of the parent class with command settings.
    super({
      name: 'test',
      description: 'a testing command',
      aliases: [],
      enabled: true,
    });
  }

  // Implement the 'execute' function required by the Command interface.
  execute = async (args: string[], data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client) => {
    // Log information about the executed command.
    logger.notice(`Test command ran with these args: §3${args}`);

    // Create a message object for the client.
    const message = {
      text: `\n §4§kX§r test command ran with these args: §6${args}§r §4§kX§r \n`,
    };

    // Send the message to the client.
    toClient.write('chat', { message: JSON.stringify(message) });

    // Send a chat message to the server.
    toServer.write('chat', {
      message: 'test',
    });
  };
}
