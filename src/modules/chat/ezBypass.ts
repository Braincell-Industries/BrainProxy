// Import libraries
// @ts-ignore
import type { PacketMeta } from 'prismarine-proxy';

// Import structures
import { ModuleBase, Module } from '../../utils/structures/moduleBase.js';

// Define a list of allowed chat commands.
const allowedCommands = ['shout', 'msg', 'message', 'tell', 'whisper', 'w', 'r', 'reply', 'oc', 'ac', 'gc', 'pc'];

// Define a class that implements the Module interface.
export default class extends ModuleBase implements Module {
  constructor() {
    // Call the constructor of the parent class with module settings.
    super({
      name: 'ezBypass',
      description: 'Bypass the ez block with special characters',
      enabled: true,
    });
  }

  // Implement the 'parseIncoming' function required by the Module interface.
  parseIncoming = async (data: any, meta: PacketMeta) => {
    // Return original packet data without intercepting.
    return { intercept: false, data: data, meta: meta };
  };

  // Implement the 'parseOutgoing' function required by the Module interface.
  parseOutgoing = async (data: any, meta: PacketMeta) => {
    // If the channel is chat, replace ez with special characters and return the data
    if (meta.name === 'chat') {
      // Create a regular expression pattern for allowed chat commands.
      const regex = new RegExp(`${allowedCommands.map((v) => `/${v}s`).join('|')}`, 'gi');

      /// If the message starts with a command and is not in allowed commands, return original data.
      if (data.message[0] === '/' && !data.message.match(regex)) {
        return { intercept: false, data: data, meta: meta };
      }

      data.message = data.message.replaceAll(/(\s|^)ez(\s|$)/g, ' ｅｚ ');
      return { intercept: false, data: data, meta: meta };
    }
    // Return original packet data without intercepting.
    return { intercept: false, data: data, meta: meta };
  };
}
