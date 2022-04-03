#!/usr/bin/env node

import { h } from "./h.js";
import { log } from "./utils/logger.js";

await main();

async function main(): Promise<void> {
  log("launch", process.argv);

  const [, , command, ...args] = process.argv;

  if (!command) {
    console.error("usage: h <command> [<args>]");
    process.exit(1);
  }

  try {
    const { code } = await h(command, args);
    process.exit(code);
  } catch (e) {
    if ((e as any)?.code === "ENOENT") {
      console.error(`Command "${command}" is not found.`);
      process.exit(1);
    }
    throw e;
  }
}
