import { MinecraftColor } from '../interfaces/minecraftColors.js';

// CREDITS: Ansi Escape Codes are taken from Lilith.
export const minecraftColors: MinecraftColor[] = [
  { mcName: 'black', colorCode: '§0', modernColorCode: '&0', ansiEscapeCode: '\u001b[38;5;240m', hex: '#000000' },
  { mcName: 'dark_blue', colorCode: '§1', modernColorCode: '&1', ansiEscapeCode: '\u001b[38;5;19m', hex: '#0000AA' },
  { mcName: 'dark_green', colorCode: '§2', modernColorCode: '&2', ansiEscapeCode: '\u001b[38;5;34m', hex: '#00AA00' },
  { mcName: 'dark_aqua', colorCode: '§3', modernColorCode: '&3', ansiEscapeCode: '\u001b[38;5;37m', hex: '#00AAAA' },
  { mcName: 'dark_red', colorCode: '§4', modernColorCode: '&4', ansiEscapeCode: '\u001b[38;5;124m', hex: '#AA0000' },
  { mcName: 'dark_purple', colorCode: '§5', modernColorCode: '&5', ansiEscapeCode: '\u001b[38;5;127m', hex: '#AA00AA' },
  { mcName: 'gold', colorCode: '§6', modernColorCode: '&6', ansiEscapeCode: '\u001b[38;5;214m', hex: '#FFAA00' },
  { mcName: 'gray', colorCode: '§7', modernColorCode: '&7', ansiEscapeCode: '\u001b[38;5;250m', hex: '#AAAAAA' },
  { mcName: 'dark_gray', colorCode: '§8', modernColorCode: '&8', ansiEscapeCode: '\u001b[38;5;245m', hex: '#555555' },
  { mcName: 'blue', colorCode: '§9', modernColorCode: '&9', ansiEscapeCode: '\u001b[38;5;63m', hex: '#5555FF' },
  { mcName: 'green', colorCode: '§a', modernColorCode: '&a', ansiEscapeCode: '\u001b[38;5;83m', hex: '#55FF55' },
  { mcName: 'aqua', colorCode: '§b', modernColorCode: '&b', ansiEscapeCode: '\u001b[38;5;87m', hex: '#55FFFF' },
  { mcName: 'red', colorCode: '§c', modernColorCode: '&c', ansiEscapeCode: '\u001b[38;5;203m', hex: '#FF5555' },
  // eslint-disable-next-line prettier/prettier
  { mcName: 'light_purple', colorCode: '§d', modernColorCode: '&d', ansiEscapeCode: '\u001b[38;5;207m', hex: '#FF55FF' },
  { mcName: 'yellow', colorCode: '§e', modernColorCode: '&e', ansiEscapeCode: '\u001b[38;5;227m', hex: '#FFFF55 ' },
  { mcName: 'white', colorCode: '§f', modernColorCode: '&f', ansiEscapeCode: '\u001b[97m', hex: '#FFFFFF' },
  { mcName: 'bold', colorCode: '§l', modernColorCode: '&l', ansiEscapeCode: '\u001b[1m' },
  { mcName: 'italic', colorCode: '§o', modernColorCode: '&o', ansiEscapeCode: '\u001b[3m' },
  { mcName: 'underline', colorCode: '§n', modernColorCode: '&n', ansiEscapeCode: '\u001b[4m' },
  { mcName: 'strikethrough', colorCode: '§m', modernColorCode: '&m', ansiEscapeCode: '\u001b[9m' },
  { mcName: 'obfuscated', colorCode: '§k', modernColorCode: '&k', ansiEscapeCode: '\u001b[6m' },
  { mcName: 'reset', colorCode: '§r', modernColorCode: '&r', ansiEscapeCode: '\u001b[0m' },
];
