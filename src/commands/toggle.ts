// Import main files
import { BrainProxy } from '../client.js';

// Import libraries
// @ts-ignore
import type { PacketMeta, ServerClient, Client } from 'prismarine-proxy';
import prismarineChat from 'prismarine-chat';

// Import structures
import { CommandBase, Command } from '../utils/structures/commandBase.js';

const MessageBuilder = prismarineChat('1.8.9').MessageBuilder;

// Define a class for the 'toggle' command.
export default class ToggleCommand extends CommandBase implements Command {
  constructor() {
    // Call the constructor of the parent class with command settings.
    super({
      name: 'toggle',
      description: 'Toggle a given command or module',
      aliases: ['tl'],
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
    // Check if the argument matches 'command' for command toggle.
    if (args[0]?.match(/command/)) {
      // Retrieve the specified command.
      const command = proxyClient.commands.get(args[1]);
      if (!command) return;

      // Toggle the enabled status of the command.
      command.settings.enabled = !command.settings.enabled;

      // Create a success message for the command toggle.
      const successMessage = new MessageBuilder()
        .setText(
          `The command §3${command.settings.name}§f is now §3${command.settings.enabled ? 'enabled' : 'disabled'}`,
        )
        .toString();

      // Send the success message to the client.
      toClient.write('chat', { message: successMessage });
    }
    // Check if the argument matches 'module' for module toggle.
    else if (args[0]?.match(/module/)) {
      // Find the specified module in the list of modules.
      const module = proxyClient.modules.find((v) => v.settings.name === args[1]);
      if (!module) return;

      // Toggle the enabled status of the module.
      module.settings.enabled = !module.settings.enabled;

      // Create a success message for the module toggle.
      const successMessage = new MessageBuilder()
        .setText(`The module §3${module.settings.name}§f is now §3${module.settings.enabled ? 'enabled' : 'disabled'}`)
        .toString();

      // Send the success message to the client.
      toClient.write('chat', { message: successMessage });
    }

    // Update the settings after toggling.
    proxyClient.updateSettings();
  };
}
