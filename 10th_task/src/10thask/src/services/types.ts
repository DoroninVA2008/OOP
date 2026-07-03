import type { TaskManager } from "../../../9thask/9thaskManager.ts";

export interface Command {
  accept(...argv: string[]): boolean;
  run(taskManager: TaskManager, ...argv: string[]): Promise<boolean> | boolean;
  description: string | null;
}