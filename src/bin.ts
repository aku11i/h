#!/usr/bin/env node

import { h } from "./h.js";
import { log } from "./utils/logger.js";

await main();

async function main(): Promise<void> {
  log("launch", process.argv);

  const [, , command, ...args] = process.argv;

  if (!command) {
    printHelp();
    process.exit(1);
  }

  if (["-h", "--help", "help"].includes(command)) {
    printHelp();
    process.exit(0);
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

function printHelp() {
  const helpText = [
    "usage:",
    "  h <command> [...subcommand]            : Execute help for the command",
    "  h [-h, --help, help]                   : Show this help.",
  ].join("\n");

  console.log(helpText);
}
