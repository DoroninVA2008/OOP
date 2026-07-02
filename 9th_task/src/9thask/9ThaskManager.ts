// src/models/TaskManager.ts
//
import { Task, type STask } from "./9Thask"; // @ts-ignore
import { readFile, writeFile } from "fs/promises";

interface TaskManagerActions {
  load: (filename: string) => Promise<void>;
  save: (filename: string) => Promise<void>;
  addTask: (title: string) => number;
  findTask: (id: number) => Task | null;
  closeTask: (id: number) => void;
  // Задания, для которых isComplete() => false
  availableTasks: () => Task[];
}
    
export class TaskManager implements TaskManagerActions {
    private tasks: Task[] = [];

    async load(filename: string): Promise<void> {
        const JSon = await readFile(filename, 'utf-8')
        const dataArr: STask[] = JSON.parse(JSon)
            this.tasks = []
        dataArr.forEach((data) => {
            const task = Task.fromJSon(data)
            this.tasks.push(task)
        })
    }

    async save(filename: string): Promise<void> {
        const dataArr: STask[] = Array.from(this.tasks.values()).map(t => t.toJSon())
        await writeFile(filename, JSON.stringify(dataArr, null, 2))
    }

    addTask(title: string): number {
        const task = new Task({ title, complete: false, id: Date.now() });
        this.tasks.push(task);
        return task.id
    }

    findTask(id: number): Task | null {
        return this.tasks.find((t) => t.id === id) ?? null;
    }

    closeTask(id: number): void {
        const task = this.findTask(id);
        if(task) {
            task.close()
        }
    }

    availableTasks(): Task[] {
        return this.tasks.filter((t) => !t.isComplete())
    }
}