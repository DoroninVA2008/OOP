import { type Command } from "../types.ts";
import { TaskManager } from "../../../../9thask/9thaskManager.ts";

export const rm: Command = {
  accept(...argv: string[]) {
    const [command] = argv;
    return command === 'rm' || command === 'delete';
  },
  
  async run(tm: TaskManager, ...argv: string[]) {
    const idStr = argv[1];

    if (!idStr) {
      console.log("❌ Ошибка: укажите ID задачи");
      console.log("Пример: todo rm 1");
      return false;
    }

    const id = parseInt(idStr);

    if (isNaN(id)) {
      console.log("❌ Ошибка: ID должен быть числом");
      return false;
    }

    const success = tm.removeTask(id);
    return success;
  },
  
  description: "rm [task-id]: remove task",
};