// core/ContactManager.ts
import type { Contact, CreateContact, UpdateContact, ContactFilter } from '../12thask/types.ts';
import { ContactStorage } from '../15thask/contac.ts';

export class ContactManager {
  private contacts: Map<string, Contact> = new Map();
  private storage: ContactStorage;
  private autoSave: boolean;

  constructor(autoSave: boolean = true, storageFileName?: string) {
    this.storage = new ContactStorage(storageFileName);
    this.autoSave = autoSave;
    
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const savedContacts = this.storage.loadContacts();
    savedContacts.forEach(contact => {
      this.contacts.set(contact.id, contact);
    });
    
    if (savedContacts.length > 0) {
      console.log(`📂 Загружено ${savedContacts.length} контактов из файла: ${this.storage.getFilePath()}`);
    }
  }

  private saveToStorage(): void {
    if (!this.autoSave) return;
    
    const contacts = Array.from(this.contacts.values());
    const success = this.storage.saveContacts(contacts);
    
    if (success && contacts.length > 0) {
      console.log(`💾 Сохранено ${contacts.length} контактов в файл: ${this.storage.getFilePath()}`);
    }
  }

  forceSave(): boolean {
    const contacts = Array.from(this.contacts.values());
    return this.storage.saveContacts(contacts);
  }

  forceLoad(): void {
    this.contacts.clear();
    this.loadFromStorage();
  }

  addContact(data: CreateContact): { success: boolean; contact?: Contact; error?: string } {
    try {
      if (!data.firstName || data.firstName.trim() === '') {
        return { success: false, error: 'Имя обязательно для заполнения' };
      }
      
      if (!data.lastName || data.lastName.trim() === '') {
        return { success: false, error: 'Фамилия обязательна для заполнения' };
      }

      if (!data.phone || data.phone.trim() === '') {
        return { success: false, error: 'Телефон обязателен для заполнения' };
      }

      if (!data.email || data.email.trim() === '') {
        return { success: false, error: 'Email обязателен для заполнения' };
      }

      for (const contact of this.contacts.values()) {
        if (contact.phone === data.phone) {
          return { success: false, error: 'Контакт с таким номером телефона уже существует' };
        }
        if (contact.email === data.email) {
          return { success: false, error: 'Контакт с таким email уже существует' };
        }
      }

      const contact: Contact = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        phone: data.phone.trim(),
        email: data.email.trim().toLowerCase(),
        birthDate: data.birthDate,
        address: data.address,
        isFavorite: false,
        tags: data.tags || [],
        createdAt: new Date(),
        updatedAt: new Date(),
        name: '', // @ts-ignore
        status: undefined,
        completed: false
      };

      this.contacts.set(contact.id, contact);
      this.saveToStorage(); 
      return { success: true, contact };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Неизвестная ошибка' };
    }
  }

  getAllContacts(): Contact[] {
    return Array.from(this.contacts.values());
  }

  getContactById(id: string): Contact | undefined {
    return this.contacts.get(id);
  }

  updateContact(id: string, data: UpdateContact): { success: boolean; contact?: Contact; error?: string } {
    const existingContact = this.contacts.get(id);
    
    if (!existingContact) {
      return { success: false, error: 'Контакт не найден' };
    }

    if (data.phone && data.phone !== existingContact.phone) {
      for (const contact of this.contacts.values()) {
        if (contact.id !== id && contact.phone === data.phone) {
          return { success: false, error: 'Контакт с таким номером телефона уже существует' };
        }
      }
    }

    if (data.email && data.email !== existingContact.email) {
      for (const contact of this.contacts.values()) {
        if (contact.id !== id && contact.email === data.email) {
          return { success: false, error: 'Контакт с таким email уже существует' };
        }
      }
    }

    const updatedContact: Contact = {
      ...existingContact,
      ...data,
      updatedAt: new Date()
    };

    this.contacts.set(id, updatedContact);
    this.saveToStorage();
    return { success: true, contact: updatedContact };
  }

  deleteContact(id: string): boolean {
    const result = this.contacts.delete(id);
    if (result) {
      this.saveToStorage();
    }
    return result;
  }

  toggleFavorite(id: string): { success: boolean; isFavorite?: boolean; error?: string } {
    const contact = this.contacts.get(id);
    
    if (!contact) {
      return { success: false, error: 'Контакт не найден' };
    }

    const newFavoriteStatus = !contact.isFavorite;
    contact.isFavorite = newFavoriteStatus;
    contact.updatedAt = new Date();
    this.contacts.set(id, contact);
    this.saveToStorage();
    
    return { success: true, isFavorite: newFavoriteStatus };
  }

  searchContacts(filter: ContactFilter): Contact[] {
    let results = Array.from(this.contacts.values());

    if (filter.searchTerm) {
      const term = filter.searchTerm.toLowerCase();
      results = results.filter(contact =>
        contact.firstName.toLowerCase().includes(term) ||
        contact.lastName.toLowerCase().includes(term) ||
        contact.phone.includes(term) ||
        contact.email.toLowerCase().includes(term)
      );
    }

    if (filter.isFavorite !== undefined) {
      results = results.filter(contact => contact.isFavorite === filter.isFavorite);
    }

    if (filter.firstName) {
      results = results.filter(contact => 
        contact.firstName.toLowerCase().includes(filter.firstName!.toLowerCase())
      );
    }

    if (filter.lastName) {
      results = results.filter(contact => 
        contact.lastName.toLowerCase().includes(filter.lastName!.toLowerCase())
      );
    }

    if (filter.phone) {
      results = results.filter(contact => contact.phone.includes(filter.phone!));
    }

    if (filter.email) {
      results = results.filter(contact => 
        contact.email.toLowerCase().includes(filter.email!.toLowerCase())
      );
    }

    if (filter.tags && filter.tags.length > 0) {
      results = results.filter(contact => 
        filter.tags!.some(tag => contact.tags.includes(tag))
      );
    }

    return results;
  }

  getAllTags(): string[] {
    const tagsSet = new Set<string>();
    for (const contact of this.contacts.values()) {
      contact.tags.forEach(tag => tagsSet.add(tag));
    }
    return Array.from(tagsSet);
  }

  getFavoriteContacts(): Contact[] {
    return Array.from(this.contacts.values()).filter(contact => contact.isFavorite);
  }

  getStoragePath(): string {
    return this.storage.getFilePath();
  }

  getStatistics(): {
    total: number;
    favorites: number;
    withEmail: number;
    withPhone: number;
    withAddress: number;
    uniqueTags: string[];
  } {
    const contacts = Array.from(this.contacts.values());
    return {
      total: contacts.length,
      favorites: contacts.filter(c => c.isFavorite).length,
      withEmail: contacts.filter(c => c.email).length,
      withPhone: contacts.filter(c => c.phone).length,
      withAddress: contacts.filter(c => c.address).length,
      uniqueTags: this.getAllTags()
    };
  }
}