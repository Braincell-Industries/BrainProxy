// @ts-ignore - Technically not allowed to import those but who cares :)
import type { PacketMeta } from 'prismarine-proxy';
import { ModuleBase, Module } from '../../utils/structures/moduleBase.js';

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
      data.message = data.message.replaceAll(/(\s|^)ez(\s|$)/g, ' ｅｚ ');
      return { intercept: false, data: data, meta: meta };
    }
    // Return original packet data without intercepting.
    return { intercept: false, data: data, meta: meta };
  };
}
