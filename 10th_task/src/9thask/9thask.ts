// src/models/Task.ts
//
export interface ITask {
  title: string;
  complete: boolean;
  id: number;
  createdAt: Date;
}

export type STask = Omit<ITask, 'createdAt'> & { createdAt: string };

export interface TaskActions {
  close: () => void;
  isComplete: () => boolean;
}

export class Task implements ITask, TaskActions {
  public title: string;
  public complete: boolean;
  public id: number;
  public createdAt: Date;

  constructor(init: Partial<ITask>) {
    this.id = init.id ?? Date.now()
    this.title = init.title ?? ''
    this.complete = init.complete ?? false
    this.createdAt = init.createdAt ? new Date(init.createdAt) : new Date()
}

  close() {
    this.complete = true
  }

  isComplete() {
    return this.complete
  }

  toJSon(): STask {
    return {
      id: this.id,
      title: this.title,
      complete: this.complete,
      createdAt: this.createdAt.toUTCString(), // Узнал про toUTCString() у ChatGPT: Используется, когда нужно явно указать, что дата и время в универсальном времени (UTC)
    }
  }

  static fromJSon(data: STask): Task {
    const task = new Task({
      id: data.id,
      title: data.title,
      complete: data.complete,
      createdAt: new Date(data.createdAt),
    })
    return task
  }
}