// @ts-ignore Так можно сохранить todo.json
import { TaskManager } from "./9ThaskManager";

const tm = new TaskManager();

const id = tm.addTask("Hello");
tm.addTask("Goodbye");
tm.closeTask(id);

await tm.load("todo.json");
console.log(tm.availableTasks());