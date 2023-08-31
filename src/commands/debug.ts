// Import libraries
// @ts-ignore
import type { PacketMeta, ServerClient } from 'prismarine-proxy';

// Import structures
import { CommandBase, Command } from '../utils/structures/commandBase.js';

// Define a class that implements the Command interface.
export default class extends CommandBase implements Command {
  constructor() {
    // Call the constructor of the parent class with command settings.
    super({
      name: 'debug',
      description: 'debug command',
      aliases: [],
      enabled: true,
    });
  }

  // Implement the 'execute' function required by the Command interface.
  execute = async (args: string[], data: any, meta: PacketMeta, toClient: ServerClient) => {
    // Create a message object for the client.
    const infos = [
      `§aVersion: §r${process.env.npm_package_version}`,
      `§aUptime: §r${Math.floor(process.uptime() / 60)} minutes`,
      `§aProxy Memory Usage: §r${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
      `§aProxy CPU Usage: §r${process.cpuUsage().system / 1000 / 1000}%`,
      `§aDevelopment build: §r${process.env.npm_package_version?.endsWith('-DEV') ? 'Yes' : 'No'}`,
      `§aBeta build: §r${process.env.npm_package_version?.endsWith('-BETA') ? 'Yes' : 'No'}`,
    ];

    // Send the message to the client.
    toClient.write('chat', { message: JSON.stringify(`\n§6BrainProxy §f- §6Debug info:\n\n§r${infos.join('\n')}`) });
  };
}
