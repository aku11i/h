import { spawn as _spawn, SpawnOptions } from "node:child_process";
import { error, log } from "./logger.js";

export type SpawnAsyncResult = {
  code: number;
};

export function spawnAsync(
  command: string,
  args: string[],
  options: SpawnOptions
): Promise<SpawnAsyncResult> {
  log("spawn", [command, ...args], { options });

  return new Promise<SpawnAsyncResult>((resolve, reject) => {
    const process = _spawn(command, args, options);

    process.on("exit", (code) => {
      log("spawn:exit", { code });
      if (typeof code !== "number") {
        reject(new Error("Command was not exited successfully."));
        return;
      }
      resolve({ code });
    });

    process.on("error", (err) => {
      error("spawn:error", err);
      reject(err);
    });
  });
}
