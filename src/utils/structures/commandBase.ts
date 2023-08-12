/* eslint-disable no-unused-vars */
// @ts-ignore - Technically not allowed to import those but who cares :)
import type { PacketMeta, ServerClient, Client } from 'prismarine-proxy';
import type { BrainProxy } from '../../client.js';
import type { Player } from '../../interfaces/player.js';

// Define the structure of command settings
interface CommandSettings {
  name: string;
  description: string;
  aliases: string[];
  enabled: boolean;
}

// Define the base class for a command
export class CommandBase {
  constructor(public settings: CommandSettings) {}
}

// Define the structure of a command, extending the CommandBase interface
export interface Command extends CommandBase {
  execute: (
    args: string[],
    data: any,
    meta: PacketMeta,
    toClient: ServerClient,
    toServer: Client,
    proxyClient: BrainProxy,
    player: Player,
  ) => Promise<void>;
}
