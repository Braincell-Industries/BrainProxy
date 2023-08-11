// @ts-ignore - Technically not allowed to import those but who cares :)
import type { PacketMeta, ServerClient, Client } from 'prismarine-proxy';
import { CommandBase, Command } from '../utils/structures/commandBase.js';
// @ts-ignore
import pJson from '../../package.json' assert { type: 'json' };

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
  execute = async (args: string[], data: any, meta: PacketMeta, toClient: ServerClient, toServer: Client) => {
    // Create a message object for the client.
    const infos = [
      `§aVersion: §r${pJson.version}`,
      `§aUptime: §r${Math.floor(process.uptime() / 60)} minutes`,
      `§aProxy Memory Usage: §r${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
      `§aProxy CPU Usage: §r${process.cpuUsage().system / 1000 / 1000}%`,
      `§aDevelopment build: §r${pJson.version.endsWith('-DEV') ? 'Yes' : 'No'}`,
      `§aBeta build: §r${pJson.version.endsWith('-BETA') ? 'Yes' : 'No'}`,
    ];

    // Send the message to the client.
    toClient.write('chat', { message: JSON.stringify(`\n§6BrainProxy §f- §6Debug info:\n\n§r${infos.join('\n')}`) });
  };
}
