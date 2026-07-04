// src/types.ts
// TypeScript-код для week-12:
export interface Task {
  id: string;         // Уникальный идентификатор
  title: string;      // Название задачи
  description?: string; // Описание (необязательное поле)
  completed: boolean; // Статус выполнения
  createdAt: Date;    // Дата создания
  priority?: 'low' | 'medium' | 'high'; // Приоритет (необяз., литеральный тип)
}

export type NewTask = Omit<Task, 'id' | 'createdAt'>;
// NewTask содержит только title, description, completed, priority

// Главная сущность моего проекта
export interface Contact {
  id: string;
  name: string;
  status: ContactStatus;
  createdAt: Date;
  title?: string;
  description?: string;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate?: Date;
  address?: string;
  isFavorite: boolean;
  tags: string[];
  updatedAt: Date;
}

export type NewContact = Omit<Contact, 'status' | 'priority?'>;

export interface ContactList {
  contact: number;
  createdAt: NewContact;
  description?: string;
}

export type NewContactList = Omit<ContactList, 'contact' | 'createdAt'>;

export interface ContactStatus {
  added: string;
  deleted: string;
  finded: number;
  changed: number;
  favored?: boolean;
  filtered: boolean;
  status: string;
}

export type NewContactStatus = Partial<Record<keyof ContactStatus, string>>;
// TypeScript-код для week-13:
export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: Date;
  description?: string;
  type: 'income' | 'expense';
}
// TypeScript-код для week-14:
export interface CreateContact {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate?: Date;
  address?: string;
  tags?: string[];
}

export interface UpdateContact {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  birthDate?: Date;
  address?: string;
  isFavorite?: boolean;
  tags?: string[];
}

export interface ContactFilter {
  searchTerm?: string;
  isFavorite?: boolean;
  tags?: string[];
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
}