// Define an interface for location information.
export interface Location {
  server: string | null;
  gametype: string | null;
  lobbyname: string | null;
  mode: string | null;
  map: string | null;
}

// Define an interface for player information.
export interface Player {
  username: string | null;
  location: Location; // Embed location information.
  lastGame: string | null;
}

// Create an empty player object as a constant.
export const EmptyPlayer: Player = {
  username: null,
  location: {
    server: null,
    gametype: null,
    lobbyname: null,
    mode: null,
    map: null,
  },
  lastGame: null,
};
