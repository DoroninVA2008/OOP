import type { Transaction, Task, NewTask, Contact, ContactStatus } from '../12thask/types.ts';

export class TypesManager {
  private transactions: Transaction[] = [];
  private tasks: Task[] = [];
  private contacts: Contact[] = [];

  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
  }

  updateTransaction(id: string, updates: Partial<Omit<Transaction, 'id'>>) {
    const transaction = this.transactions.find(t => t.id === id);
    if (!transaction) return false;
    Object.assign(transaction, updates);
    return true;
  }

  getTransactionSummary(id: string): Pick<Transaction, 'amount' | 'date' | 'category'> | null {
    const transaction = this.transactions.find(t => t.id === id);
    if (!transaction) return null;
    const { amount, date, category } = transaction;
    return { amount, date, category };
  }

  private calculateComplexReport(): { total: number; tax: number } {
    const total = this.transactions.reduce((sum, t) => sum + t.amount, 0);
    return { total, tax: total * 0.2 };
  }

  getAnnualReport(): ReturnType<TypesManager['calculateComplexReport']> {
    return this.calculateComplexReport();
  }

  addTask(data: NewTask): Task {
    const task: Task = { ...data, id: crypto.randomUUID(), createdAt: new Date() };
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return false;
    Object.assign(task, updates);
    return true;
  }

  getTaskPreview(id: string): Pick<Task, 'title' | 'completed' | 'priority'> | null {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return null;
    const { title, completed, priority } = task;
    return { title, completed, priority };
  }

  addContact(contact: Contact) {
    this.contacts.push(contact);
  }

  updateContact(id: string, updates: Partial<Omit<Contact, 'id' | 'createdAt'>>) {
    const contact = this.contacts.find(c => c.id === id);
    if (!contact) return false;
    Object.assign(contact, updates);
    return true;
  }

  getContactPreview(id: string): Pick<Contact, 'name' | 'completed' | 'priority'> | null {
    const contact = this.contacts.find(c => c.id === id);
    if (!contact) return null;
    const { name, completed, priority } = contact;
    return { name, completed, priority };
  }

  updateContactStatus(id: string, updates: Partial<ContactStatus>) {
    const contact = this.contacts.find(c => c.id === id);
    if (!contact) return false;
    Object.assign(contact.status, updates);
    return true;
  }

  getContactStatusSummary(id: string): Pick<ContactStatus, 'status' | 'favored' | 'filtered'> | null {
    const contact = this.contacts.find(c => c.id === id);
    if (!contact) return null;
    const { status, favored, filtered } = contact.status;
    return { status, favored, filtered };
  }
}