// Import libraries
import { readdirSync } from 'fs';

// Import structures
import { Module } from '../structures/moduleBase.js';

// Helper function to recursively import files from a directory
export async function importRecursively(path: string, imports: Array<any> = []) {
  // Read the contents of the specified directory
  const files = readdirSync(path, { withFileTypes: true });

  // Iterate through the files in the directory
  for (const file of files) {
    if (file.isDirectory()) {
      // If the file is a directory, recursively import files from it
      const res = await importRecursively(`${path}/${file.name}`);
      imports.push(...res); // Add the imported modules to the 'imports' array
    } else {
      if (file.name.match('Base')) continue; // Skip files with 'Base' in their names
      // Import the default export from the file using a dynamic import
      const { default: defaultExport } = await import(`file://${path.replace('/dist', '')}/${file.name}`);

      imports.push(defaultExport as Module); // Add the imported module to the 'imports' array
    }
  }

  return imports; // Return the array of imported modules
}
