// Helper function to parse time in milliseconds into a formatted string
export async function parseTime(ms: number) {
  // Calculate minutes, seconds, and remaining milliseconds
  let minutes: string | number = Math.floor(ms / 60000);
  ms = ms - minutes * 60000;
  let seconds: string | number = Math.floor(ms / 1000);
  ms = ms - seconds * 1000;

  // Convert values to strings
  minutes = minutes.toString();
  seconds = seconds.toString();
  let milliseconds = ms.toString();

  // Pad values with leading zeros if necessary
  while (minutes.length < 2) minutes = '0' + minutes;
  while (seconds.length < 2) seconds = '0' + seconds;
  while (milliseconds.length < 3) milliseconds = '0' + milliseconds;

  // Construct and return the formatted time string
  return `§a${minutes}§f:§a${seconds}§f.§a${ms}`;
}
