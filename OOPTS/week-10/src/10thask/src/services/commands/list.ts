import { type Command } from "../types"
import { TaskManager } from "../../../../9thask/9thaskManager.ts"

export const list: Command = {
    accept(...argv: string[]) {
        const [command] = argv;
        return command === 'list' || command === 'ls';
    },
    async run(tm: TaskManager, ...argv: string[]) {
        const flag = argv[1];
        const showAll = flag === "-a";
        
        const tasks = tm.getAllTasks(showAll);
        
        if (tasks.length === 0) {
            console.log("No tasks found");
            return false;
        }
        
        tasks.forEach(task => {
            const status = task.done ? "[DONE]" : "[TODO]";
            console.log(` ${task.id} ${status} ${task.title}`);
        });
        return false;
    },
    description: "ls, list [-a]: list available [all] todo tasks"
}