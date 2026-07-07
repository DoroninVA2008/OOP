// core/contac.ts
import fs from 'fs';
import {join} from 'path';
import type { Contact } from '../12thask/types.ts';

export class ContactStorage {
  private filePath: string;

  constructor(fileName: string = 'contacts.json') {
    this.filePath = join(process.cwd(), fileName);
  }

  saveContacts(contacts: Contact[]): boolean {
    try {
      const data = JSON.stringify(contacts, (_key, value) => {
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      }, 2);
      
      fs.writeFileSync(this.filePath, data, 'utf-8');
      return true;
    } catch (error) {
      console.error('Ошибка при сохранении контактов:', error);
      return false;
    }
  }
  loadContacts(): Contact[] {
    try {
      if (!fs.existsSync(this.filePath)) {
        return [];
      }

      const data = fs.readFileSync(this.filePath, 'utf-8');
      const parsed = JSON.parse(data);
      
      return parsed.map((contact: any) => ({
        ...contact,
        createdAt: new Date(contact.createdAt),
        updatedAt: new Date(contact.updatedAt),
        birthDate: contact.birthDate ? new Date(contact.birthDate) : undefined
      }));
    } catch (error) {
      console.error('Ошибка при загрузке контактов:', error);
      return [];
    }
  }

  getFilePath(): string {
    return this.filePath;
  }
}