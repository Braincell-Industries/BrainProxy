// @ts-ignore - Technically not allowed to import those but who cares :)
import type { PacketMeta, ServerClient } from 'prismarine-proxy';
import { ModuleBase, Module } from '../../utils/structures/moduleBase.js';

let timeStarted: number | null;
let timeStartedCheckpoint: number | null;
let checkpoint: number | null;

function parseTime(ms: number) {
  let minutes: string | number = Math.floor(ms / 60000);
  ms = ms - minutes * 60000;
  let seconds: string | number = Math.floor(ms / 1000);
  ms = ms - seconds * 1000;

  minutes = minutes.toString();
  seconds = seconds.toString();
  let milliseconds = ms.toString();

  while (minutes.length < 2) minutes = '0' + minutes;
  while (seconds.length < 2) seconds = '0' + seconds;
  while (milliseconds.length < 3) milliseconds = '0' + milliseconds;

  return `§a${minutes}§f:§a${seconds}§f.§a${ms}`;
}

// Define a class that implements the Module interface.
export default class extends ModuleBase implements Module {
  constructor() {
    // Call the constructor of the parent class with module settings.
    super({
      name: 'parkourTimer',
      description: 'Automatic live parkour timer',
      enabled: true,
    });
  }

  // Implement the 'parseIncoming' function required by the Module interface.
  parseIncoming = async (data: any, meta: PacketMeta, toClient: ServerClient) => {
    // Check if player has started a parkour
    if (data.message?.includes('Parkour challenge started!' || 'Reset your timer to 00:00!')) {
      timeStarted = Date.now();
      timeStartedCheckpoint = timeStarted;
      checkpoint = 1;
    }

    // Check if the player failed a parkour
    if (data.message?.includes('cancelled' || 'failed' || 'completed' || 'record')) {
      timeStarted = null;
      timeStartedCheckpoint = null;
      checkpoint = null;
    }

    // Check if they reached any checkpoints
    if (data.message?.match(/You reached Checkpoint #[0-9]+ after [0-9][0-9]:[0-9][0-9].[0-9][0-9][0-9]/)) {
      timeStartedCheckpoint = Date.now();
      const res = data.message.match(/Checkpoint #[0-9]+/);
      checkpoint = parseInt(res[0].substring(res.index)) + 1;
    }

    if (timeStarted && timeStartedCheckpoint && checkpoint) {
      const time = Date.now() - timeStarted;
      const checkpointTime = Date.now() - timeStartedCheckpoint;
      // Send the message to the client.
      toClient.write('chat', {
        message: JSON.stringify({
          text: `§2Total§f: ${parseTime(time)} §f| §2Checkpoint #§6${checkpoint}§f: ${parseTime(checkpointTime)}`,
        }),
        position: 2,
      });
    }

    // Return original packet data without intercepting.
    return { intercept: false, data: data, meta: meta };
  };

  // Implement the 'parseOutgoing' function required by the Module interface.
  parseOutgoing = async (data: any, meta: PacketMeta) => {
    // Return original packet data without intercepting.
    return { intercept: false, data: data, meta: meta };
  };
}
