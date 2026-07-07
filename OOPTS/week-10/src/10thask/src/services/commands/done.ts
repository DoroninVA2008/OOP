import { type Command } from "../types.js";
import { TaskManager } from "../../../../9thask/9thaskManager.ts";

export const done: Command = {
  accept(...argv: string[]) {
    const [command] = argv;
    return command === 'done';
  },
  
  async run(tm: TaskManager, ...argv: string[]) {
    const idStr = argv[1];

    if (!idStr) {
      console.log("❌ Ошибка: укажите ID задачи");
      console.log("Пример: todo done 1");
      return false;
    }

    const id = parseInt(idStr);

    if (isNaN(id)) {
      console.log("❌ Ошибка: ID должен быть числом");
      return false;
    }

    const success = tm.completeTask(id);
    return success;
  },
  
  description: "done [task-id]: complete task",
};