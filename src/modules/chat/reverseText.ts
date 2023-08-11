// @ts-ignore - Technically not allowed to import those but who cares :)
import type { PacketMeta } from 'prismarine-proxy';
import { ModuleBase, Module } from '../../utils/structures/moduleBase.js';

// Define a class that implements the Module interface.
export default class extends ModuleBase implements Module {
  constructor() {
    // Call the constructor of the parent class with module settings.
    super({
      name: 'reversedText',
      description: 'Reverses the text in chat messages',
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
    if (meta.name === 'chat') {
      // Check if the message is a command (starts with '/').
      if (!data.message.startsWith('/')) {
        // Reverse the message characters.
        data.message = data.message.split('').reverse().join('');
      }
      return { intercept: false, data: data, meta: meta };
    }

    // Return original packet data without intercepting for other packet types.
    return { intercept: false, data: data, meta: meta };
  };
}
