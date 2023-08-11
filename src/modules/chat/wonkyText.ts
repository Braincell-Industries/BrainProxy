// @ts-ignore - Technically not allowed to import those but who cares :)
import type { PacketMeta } from 'prismarine-proxy';
import { ModuleBase, Module } from '../../utils/structures/moduleBase.js';

// Define a class that implements the Module interface.
export default class extends ModuleBase implements Module {
  constructor() {
    // Call the constructor of the parent class with module settings.
    super({
      name: 'wonkyText',
      description: 'MaKe yOUr ChaT LoOk LikE tHiS',
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
      // Convert the message characters to randomly alternate between uppercase and lowercase.
      data.message = data.message
        .split('')
        .map((v: string) => (Math.random() < 0.5 ? v.toLowerCase() : v.toUpperCase()))
        .join('');
      return { intercept: false, data: data, meta: meta };
    }

    // Return original packet data without intercepting for other packet types.
    return { intercept: false, data: data, meta: meta };
  };
}
