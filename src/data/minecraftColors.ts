/* eslint-disable prettier/prettier */
import { MinecraftColor } from '../interfaces/minecraftColors.js';

// CREDITS: Ansi Escape Codes are taken from Lilith.
export const minecraftColors: MinecraftColor[] = [
  { mcName: 'black', beautifiedName: 'Black', colorCode: '§0', modernColorCode: '&0', ansiEscapeCode: '\u001b[38;5;240m', hex: '#000000' },
  { mcName: 'dark_blue', beautifiedName: 'Dark Blue', colorCode: '§1', modernColorCode: '&1', ansiEscapeCode: '\u001b[38;5;19m', hex: '#0000AA' },
  { mcName: 'dark_green', beautifiedName: 'Dark Green', colorCode: '§2', modernColorCode: '&2', ansiEscapeCode: '\u001b[38;5;34m', hex: '#00AA00' },
  { mcName: 'dark_aqua', beautifiedName: 'Dark Aqua', colorCode: '§3', modernColorCode: '&3', ansiEscapeCode: '\u001b[38;5;37m', hex: '#00AAAA' },
  { mcName: 'dark_red', beautifiedName: 'Dark Red', colorCode: '§4', modernColorCode: '&4', ansiEscapeCode: '\u001b[38;5;124m', hex: '#AA0000' },
  { mcName: 'dark_purple', beautifiedName: 'Dark Purple', colorCode: '§5', modernColorCode: '&5', ansiEscapeCode: '\u001b[38;5;127m', hex: '#AA00AA' },
  { mcName: 'gold', beautifiedName: 'Gold', colorCode: '§6', modernColorCode: '&6', ansiEscapeCode: '\u001b[38;5;214m', hex: '#FFAA00' },
  { mcName: 'gray', beautifiedName: 'Gray', colorCode: '§7', modernColorCode: '&7', ansiEscapeCode: '\u001b[38;5;250m', hex: '#AAAAAA' },
  { mcName: 'dark_gray', beautifiedName: 'Dark Gray', colorCode: '§8', modernColorCode: '&8', ansiEscapeCode: '\u001b[38;5;245m', hex: '#555555' },
  { mcName: 'blue', beautifiedName: 'Blue', colorCode: '§9', modernColorCode: '&9', ansiEscapeCode: '\u001b[38;5;63m', hex: '#5555FF' },
  { mcName: 'green', beautifiedName: 'Green', colorCode: '§a', modernColorCode: '&a', ansiEscapeCode: '\u001b[38;5;83m', hex: '#55FF55' },
  { mcName: 'aqua', beautifiedName: 'Aqua', colorCode: '§b', modernColorCode: '&b', ansiEscapeCode: '\u001b[38;5;87m', hex: '#55FFFF' },
  { mcName: 'red', beautifiedName: 'Red', colorCode: '§c', modernColorCode: '&c', ansiEscapeCode: '\u001b[38;5;203m', hex: '#FF5555' },
  { mcName: 'light_purple', beautifiedName: 'Light Purple', colorCode: '§d', modernColorCode: '&d', ansiEscapeCode: '\u001b[38;5;207m', hex: '#FF55FF' },
  { mcName: 'yellow', beautifiedName: 'Yellow', colorCode: '§e', modernColorCode: '&e', ansiEscapeCode: '\u001b[38;5;227m', hex: '#FFFF55 ' },
  { mcName: 'white', beautifiedName: 'White', colorCode: '§f', modernColorCode: '&f', ansiEscapeCode: '\u001b[97m', hex: '#FFFFFF' },
  { mcName: 'bold', beautifiedName: 'Bold', colorCode: '§l', modernColorCode: '&l', ansiEscapeCode: '\u001b[1m' },
  { mcName: 'italic', beautifiedName: 'Italic', colorCode: '§o', modernColorCode: '&o', ansiEscapeCode: '\u001b[3m' },
  { mcName: 'underline', beautifiedName: 'Underline', colorCode: '§n', modernColorCode: '&n', ansiEscapeCode: '\u001b[4m' },
  { mcName: 'strikethrough', beautifiedName: 'Strikethrough', colorCode: '§m', modernColorCode: '&m', ansiEscapeCode: '\u001b[9m' },
  { mcName: 'obfuscated', beautifiedName: 'Obfuscated', colorCode: '§k', modernColorCode: '&k', ansiEscapeCode: '\u001b[6m' },
  { mcName: 'reset', beautifiedName: 'Reset', colorCode: '§r', modernColorCode: '&r', ansiEscapeCode: '\u001b[0m' },
];
