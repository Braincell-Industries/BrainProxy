// Define an interface for the application settings.
export interface Settings {
  proxy: {
    host: string;
    version: string;
    port: number;
  };

  settings: {
    prefix: string;
    locale: string;
    motd: string;
    autoGG: {};
  };

  modules: {
    [key: string]: boolean; // A dictionary-like structure for module settings.
  };

  commands: {
    [key: string]: boolean; // A dictionary-like structure for command settings.
  };
}
