// Define an interface for Minecraft colors.
export interface MinecraftColor {
  mcName: string;
  beautifiedName: string;
  colorCode: string;
  modernColorCode: string;
  ansiEscapeCode: string;
  hex?: string;
}
