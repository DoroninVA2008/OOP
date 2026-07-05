import { type Command } from "../types";

export const createHelpCommand = (commands: Command[]): Command => {
  return {
    accept(...argv: string[]) {
      const [name] = argv;
      return !name || name === "h" || name === "help";
    },
    async run(_tm: any, ..._argv: string[]) {
      console.log("\n*** Commands list ***");
      commands
        .filter((c) => Boolean(c.description))
        .forEach((c) => {
          console.log(` * ${c.description}`);
        });
      console.log("");
      return false;
    },
    description: null,
  };
};