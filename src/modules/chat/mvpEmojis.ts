// Import libraries
// @ts-ignore
import type { PacketMeta } from 'prismarine-proxy';

// Import structures
import { ModuleBase, Module } from '../../utils/structures/moduleBase.js';

const emojis = {
  '<3': '❤',
  ':star:': '✮',
  ':yes:': '✔',
  ':no:': '✖',
  ':java:': '☕',
  ':arrow:': '➜',
  ':shrug:': '¯\\_(ツ)_/¯',
  ':tableflip:': '(╯°□°）╯︵ ┻━┻',
  'o/': '( ﾟ◡ﾟ)/',
  ':123:': '123',
  ':totem:': '☉_☉',
  ':typing:': '✎...',
  ':maths:': '√(π+x)=L',
  ':snail:': "@'-'",
  ':thinking:': '(0.o?)',
  ':gimme:': '༼つ◕_◕༽つ',
  ':wizard:': "('-')⊃━☆ﾟ.*･｡ﾟ",
  ':pvp:': '⚔',
  ':peace:': '✌',
  ':oof:': 'OOF',
  ':puffer:': "<('O')>",
  ':yey:': 'ヽ (◕◡◕) ﾉ',
  ':cat:': '= ＾● ⋏ ●＾ =',
  ':dab:': '<o/',
  ':dj:': 'ヽ(⌐■_■)ノ♬',
  ':snow:': '☃',
  '^_^': '^_^',
  'h/': 'ヽ(^◇^*)/',
  '^-^': '^-^',
  ':sloth:': '(・⊝・)',
  ':cute:': '(✿◠‿◠)',
  ':dog:': '(ᵔᴥᵔ)',
};

// Define a list of allowed chat commands.
const allowedCommands = ['shout', 'msg', 'message', 'tell', 'whisper', 'w', 'r', 'reply', 'oc', 'ac', 'gc', 'pc'];

// Define a class that implements the Module interface.
export default class extends ModuleBase implements Module {
  constructor() {
    // Call the constructor of the parent class with module settings.
    super({
      name: 'mvpEmojis',
      description: 'Be able to use MVP++ emojis without MVP++',
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
    // Check if the channel is chat
    if (meta.name === 'chat') {
      // Create a regular expression pattern for allowed chat commands.
      const regex = new RegExp(`${allowedCommands.map((v) => `/${v}s`).join('|')}`, 'gi');

      // If the message starts with a command and is not in allowed commands, return original data.
      if (data.message[0] === '/' && !data.message.match(regex)) {
        return { intercept: false, data: data, meta: meta };
      }

      // Replace the text with the emojis and return the data
      for (const [key, value] of Object.entries(emojis)) {
        const regex = new RegExp(key, 'gi');
        data.message = data.message.replaceAll(regex, value);
      }

      return { intercept: false, data: data, meta: meta };
    }

    // Return original packet data without intercepting.
    return { intercept: false, data: data, meta: meta };
  };
}
