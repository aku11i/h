# h

Commonize the commands which show documentation.

## Why

There are so many CLI tools in the world, and they have different methods for printing documentation.

For example:

- `man <command>`
- `<command> [...subcommand] --help`
- `<command> help [...subcommand]`
- `<command> [...subcommand] help` (It's rare case. I only know aws-cli.)

`h` does commonize them to `h <command> [...subcommand]` .

## Install

```sh
npm install --global @aku11i/h
```

## Usage

```sh
h <command> [<args>]
```

Examples:

```sh
# execute `man sed`
h sed
# execute `git help clone`
h git clone
# execute `docker images list --help`
h docker images list
# execute `aws s3 help`
h aws s3
```

### I want to know which command is executed.

````sh
NODE_ENV=development h <command> [...subcommand]
```

## Development

```sh
git clone https://github.com/aku11i/h
npm install
npm run --silent dev -- <command> [...subcommand]
````
