// @ts-ignore - Technically not allowed to import those but who cares :)
import type { PacketMeta } from 'prismarine-proxy';
import { ModuleBase, Module } from '../../utils/structures/moduleBase.js';
import { pirateDictionary } from '../../data/pirateSpeakLang.js';

// Define a list of allowed chat commands.
const allowedCommands = ['shout', 'msg', 'message', 'tell', 'whisper', 'w', 'r', 'reply', 'oc', 'ac', 'gc', 'pc'];

// Define a class that implements the Module interface.
export default class extends ModuleBase implements Module {
  constructor() {
    // Call the constructor of the parent class with module settings.
    super({
      name: 'pirateSpeak',
      description: 'Transform your chat into pirate speak!',
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
      // Create a regular expression pattern for allowed chat commands.
      const regex = new RegExp(`${allowedCommands.map((v) => `/${v}s`).join('|')}`, 'gi');

      // If the message starts with a command and is not in allowed commands, return original data.
      if (data.message[0] === '/' && !data.message.match(regex)) {
        return { intercept: false, data: data, meta: meta };
      }

      // Convert the message characters to pirate speak.
      data.message = this.convertToPirateSpeak(data.message);
      return { intercept: false, data: data, meta: meta };
    }

    // Return original packet data without intercepting for other packet types.
    return { intercept: false, data: data, meta: meta };
  };

  // Helper function to convert text to pirate speak.
  private convertToPirateSpeak(text: string): string {
    return text
      .split(' ')
      .map((word) => pirateDictionary[word.toLowerCase()] || word)
      .join(' ');
  }
}
