import { MinecraftColor } from '../interfaces/minecraftColors.js';

//TODO - Fix Obfuscated, Bold, Strikethrough, underline, italic.

export const minecraftColorCodes: MinecraftColor[] = [
  { mcName: 'black', colorCode: '§0', ansiEscapeCode: '\u001b[0;30m', hex: '#000000' },
  { mcName: 'dark_blue', colorCode: '§1', ansiEscapeCode: '\u001b[0;34m', hex: '#0000AA' },
  { mcName: 'dark_green', colorCode: '§2', ansiEscapeCode: '\u001b[0;32m', hex: '#00AA00' },
  { mcName: 'dark_aqua', colorCode: '§3', ansiEscapeCode: '\u001b[0;36m', hex: '#00AAAA' },
  { mcName: 'dark_red', colorCode: '§4', ansiEscapeCode: '\u001b[0;31m', hex: '#AA0000' },
  { mcName: 'dark_purple', colorCode: '§5', ansiEscapeCode: '\u001b[0;35m', hex: '#AA00AA' },
  { mcName: 'gold', colorCode: '§6', ansiEscapeCode: '\u001b[0;33m', hex: '#FFAA00' },
  { mcName: 'gray', colorCode: '§7', ansiEscapeCode: '\u001b[0;37m', hex: '#AAAAAA' },
  { mcName: 'dark_gray', colorCode: '§8', ansiEscapeCode: '\u001b[0;90m', hex: '#555555' },
  { mcName: 'blue', colorCode: '§9', ansiEscapeCode: '\u001b[0;94m', hex: '#5555FF' },
  { mcName: 'green', colorCode: '§a', ansiEscapeCode: '\u001b[0;92m', hex: '#55FF55' },
  { mcName: 'aqua', colorCode: '§b', ansiEscapeCode: '\u001b[0;96m', hex: '#55FFFF' },
  { mcName: 'red', colorCode: '§c', ansiEscapeCode: '\u001b[0;91m', hex: '#FF5555' },
  { mcName: 'light_purple', colorCode: '§d', ansiEscapeCode: '\u001b[0;95m', hex: '#FF55FF' },
  { mcName: 'yellow', colorCode: '§e', ansiEscapeCode: '\u001b[0;93m', hex: '#FFFF55 ' },
  { mcName: 'white', colorCode: '§f', ansiEscapeCode: '\u001b[0;97m', hex: '#FFFFFF' },
];
