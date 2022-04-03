export function log(tag: string, ...args: unknown[]): void {
  if (process.env["NODE_ENV"] !== "development") return;

  console.log(`[h:${tag}]`, ...args.map((arg) => serialize(arg)));
}

export function error(tag: string, ...args: unknown[]): void {
  if (process.env["NODE_ENV"] !== "development") return;

  console.error(`[h:${tag}]`);
  console.error(...args);
}

function serialize(arg: unknown): string {
  if (typeof arg === "string") return arg;
  return JSON.stringify(arg);
}
