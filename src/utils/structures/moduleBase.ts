// @ts-ignore - Technically not allowed to import those but who cares :)
import type { PacketMeta, ServerClient, Client } from 'prismarine-proxy';
import { BrainProxy } from '../../client.js';
import { Player } from '../../interfaces/player.js';

interface ModuleSettings {
  name: string;
  description: string;
  enabled: boolean;
}

// This class represents the base structure for all modules.
export class ModuleBase {
  constructor(public settings: ModuleSettings) {}
}

export interface ModuleReturn {
  intercept: boolean;
  data: any;
  meta: PacketMeta;
}

export interface Module extends ModuleBase {
  // This function is responsible for parsing incoming data from the server.
  parseIncoming: (
    data: any,
    meta: PacketMeta,
    toClient: ServerClient,
    toServer: Client,
    proxyClient: BrainProxy,
    player: Player,
  ) => Promise<ModuleReturn>;

  // This function is responsible for parsing outgoing data to the server.
  parseOutgoing: (
    data: any,
    meta: PacketMeta,
    toClient: ServerClient,
    toServer: Client,
    proxyClient: BrainProxy,
    player: Player,
  ) => Promise<ModuleReturn>;
}
