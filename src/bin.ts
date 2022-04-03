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

  const { code } = await h(command, args);
  process.exit(code);
}
