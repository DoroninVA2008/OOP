import { TaskManager } from "../../../9thask/9thaskManager.ts";
import { createHelpCommand } from "./commands/help";
import type { Command } from "./types";

import { list } from "./commands/list";
import { add } from "./commands/add";
import { done } from "./commands/done";
import { rm } from "./commands/rm";

const withTaskManager = async (fn: (m: TaskManager) => Promise<boolean>) => {
  const todoPath = "./src/9thask/todo.json";
  const tm = new TaskManager();
  await tm.load(todoPath);
  const needSave = await fn(tm);
  if (needSave) {
    await tm.save(todoPath);
  }
};

export const applyCli =
  (commands: Command[]) =>
  async (...argv: string[]) => {
    if (argv.length === 0 || argv[0] === 'h' || argv[0] === 'help') {
      const helpCmd = commands.find(c => c.accept('help'));
      if (helpCmd) {
        await withTaskManager(async (tm) => {
          await helpCmd.run(tm, ...argv);
          return false;
        });
      }
      return;
    }

    const cmd = commands.find((c) => c.accept(...argv));

    if (cmd) {
      await withTaskManager(async (tm) => {
        const result = await cmd.run(tm, ...argv);
        return result;
      });
    } else {
      console.log(`Unknown command: ${argv.join(" ")}`);
    }
  };

const commands: Command[] = [list, add, done, rm];
const help = createHelpCommand(commands);
commands.push(help);

export const cliService = applyCli(commands);