import { log } from "./logger.js";
import { spawnAsync, SpawnAsyncResult } from "./process.js";

export type RunOptions = {
  skipTestRun?: boolean;
};

export type RunResult = SpawnAsyncResult;

export async function run(
  command: string,
  args: string[],
  options: RunOptions = {}
): Promise<RunResult> {
  const { skipTestRun } = options;

  log("run", [command, ...args], { options });

  if (skipTestRun) {
    return await spawnAsync(command, args, { stdio: "inherit" });
  }

  // Test run that doesn't print out any result.
  const result = await spawnAsync(command, args, { stdio: "ignore" });
  if (result.code !== 0) return result;

  // Execute the command again when test run was succeeded.
  return await spawnAsync(command, args, { stdio: "inherit" });
}
