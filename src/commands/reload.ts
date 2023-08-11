// @ts-ignore - Technically not allowed to import those but who cares :)
import type { PacketMeta, ServerClient, Client } from 'prismarine-proxy';
// @ts-ignore
import prismarineChat from 'prismarine-chat';
// @ts-ignore
const MessageBuilder = prismarineChat('1.8.9').MessageBuilder;
import { CommandBase, Command } from '../utils/structures/commandBase.js';
import { BrainProxy } from '../client.js';

// Import Logger
import logger from '../utils/logger.js';
new logger();

// Define a class for the 'reload' command.
export default class ReloadCommand extends CommandBase implements Command {
  constructor() {
    // Call the constructor of the parent class with command settings.
    super({
      name: 'reload',
      description: 'Reload a given command or module.',
      aliases: ['rl'],
      enabled: true,
    });
  }

  // Implement the 'execute' function required by the Command interface.
  execute = async (
    args: string[],
    data: any,
    meta: PacketMeta,
    toClient: ServerClient,
    toServer: Client,
    proxyClient: BrainProxy,
  ) => {
    // Check if the argument matches 'module' or 'command' for specific reloads.
    if (args[0]?.match(/module/)) {
      await proxyClient.reloadModules();
    } else if (args[0]?.match(/command/)) {
      await proxyClient.reloadCommands();
    } else {
      await proxyClient.reloadCommands();
      await proxyClient.reloadModules();
    }

    // Construct a success message based on the reloaded entity.
    const successMessage = new MessageBuilder()
      .setText(
        `Successfully reloaded ${
          args[0]?.match(/module/) ? 'modules' : args[0]?.match(/command/) ? 'commands' : 'everything'
        }`,
      )
      .toString();

    // Send the success message to the client.
    toClient.write('chat', { message: successMessage });
  };
}
