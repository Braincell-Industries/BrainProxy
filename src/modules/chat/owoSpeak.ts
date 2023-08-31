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
      name: 'owoSpeak',
      description: 'M-Make youw chat wook wike this :3',
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

      // Split the message into words and consider command prefix if present.
      let splitMessage = data.message.split(' ') as string[];
      const prefix = data.message.match(regex) ? splitMessage.shift() : null;

      // List of suffixes for chat.
      const suffixes = ['UwU', 'OwO', 'XwX', ':3', 'rawr'];

      // Modify words in the message to give them a "owo" twist.
      splitMessage = splitMessage.map((word) => word.replaceAll(/L|R/g, 'W').replaceAll(/l|r/g, 'w'));

      // Add a hyphen to some words randomly for variation.
      splitMessage = splitMessage.map((word) => {
        if (Math.random() < 0.2 && word.length > 4) {
          const chars = Math.random() < 0.5 ? 1 : 2;
          return `${word.slice(0, chars)}-${word}`;
        }
        return word;
      });

      // Add a suffix to the message randomly, sometimes in lowercase.
      if (Math.random() < 0.5) {
        const randomIndex = Math.floor(Math.random() * suffixes.length);
        splitMessage.push(suffixes[randomIndex]);
        if (Math.random() < 0.2) splitMessage[-1] = splitMessage[-1].toLowerCase();
      }

      // If there was a command prefix, add it back and modify the message.
      if (prefix) data.message.unshift(prefix);
      data.message = splitMessage.join(' ');

      // Return modified packet data.
      return { intercept: false, data: data, meta: meta };
    }
    // Return original packet data without intercepting for other types.
    return { intercept: false, data: data, meta: meta };
  };
}
