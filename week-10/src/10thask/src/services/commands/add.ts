import { type Command } from "../types"
import { TaskManager } from "../../../../9thask/9thaskManager.ts"

export const add: Command = {
    accept(...argv: string[]) {
        const [command] = argv;
        return command === 'add';
    },
    async run(tm: TaskManager, ...argv: string[]) {
        const title = argv.slice(1).join(" ");
        
        if (!title) {
            console.log("❌ Ошибка: укажите текст задачи");
            return false;
        }
        
        const allTasks = tm.getAllTasks(true);
        const nextId = allTasks.length > 0 ? Math.max(...allTasks.map(t => t.id)) + 1 : 1;
        
        const newTask = tm.addTask(title, nextId);
        console.log(`✅ Добавлена задача ${newTask.id}: "${title}"`);
        return true;
    },
    description: "add [long title]: add new task",
}