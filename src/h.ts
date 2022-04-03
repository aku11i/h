import { run, RunResult } from "./utils/runner.js";

export type HResult = RunResult;

export async function h(command: string, args: string[]): Promise<HResult> {
  const queue: Parameters<typeof run>[] = [];

  if (command === "aws") {
    // Try `{command} {...args} help` for aws-cli
    queue.push([command, [...args, "help"], { skipTestRun: true }]);
  }

  if (args.length === 0) {
    // Try `man {command}`
    queue.push(["man", [command]]);
  }

  // Try `{command} help {...args}` for command that has subcommand "help"
  queue.push([command, ["help", ...args]]);

  for (const task of queue) {
    const result = await run(...task);
    if (result.code === 0) {
      return result;
    }
  }

  // Try the most common pattern `{command} {...args} --help` finally
  return await run(command, [...args, "--help"], { skipTestRun: true });
}
