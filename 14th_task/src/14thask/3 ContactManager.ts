// core/ContactManager.ts
import type { Contact, CreateContact, UpdateContact, ContactFilter } from '../12thask/types.ts';

export class ContactManager {
  private contacts: Map<string, Contact> = new Map();

  // Добавление контакта
  addContact(data: CreateContact): { success: boolean; contact?: Contact; error?: string } {
    try {
      // Валидация
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

      // Проверка на уникальность телефона и email
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
        name: '',
        status: undefined,
        completed: false
      };

      this.contacts.set(contact.id, contact);
      return { success: true, contact };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Неизвестная ошибка' };
    }
  }

  // Получение всех контактов
  getAllContacts(): Contact[] {
    return Array.from(this.contacts.values());
  }

  // Получение контакта по ID
  getContactById(id: string): Contact | undefined {
    return this.contacts.get(id);
  }

  // Обновление контакта
  updateContact(id: string, data: UpdateContact): { success: boolean; contact?: Contact; error?: string } {
    const existingContact = this.contacts.get(id);
    
    if (!existingContact) {
      return { success: false, error: 'Контакт не найден' };
    }

    // Проверка уникальности при обновлении
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
    return { success: true, contact: updatedContact };
  }

  // Удаление контакта
  deleteContact(id: string): boolean {
    return this.contacts.delete(id);
  }

  // Добавление/удаление из избранного
  toggleFavorite(id: string): { success: boolean; isFavorite?: boolean; error?: string } {
    const contact = this.contacts.get(id);
    
    if (!contact) {
      return { success: false, error: 'Контакт не найден' };
    }

    const newFavoriteStatus = !contact.isFavorite;
    contact.isFavorite = newFavoriteStatus;
    contact.updatedAt = new Date();
    this.contacts.set(id, contact);
    
    return { success: true, isFavorite: newFavoriteStatus };
  }

  // Поиск контактов по фильтру
  searchContacts(filter: ContactFilter): Contact[] {
    let results = Array.from(this.contacts.values());

    if (filter.searchTerm) {
      const term = filter.searchTerm.toLowerCase();
      results = results.filter(contact =>
        contact.firstName.toLowerCase() === term ||
        contact.lastName.toLowerCase() === term ||
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

  // Получение всех уникальных тегов
  getAllTags(): string[] {
    const tagsSet = new Set<string>();
    for (const contact of this.contacts.values()) {
      contact.tags.forEach(tag => tagsSet.add(tag));
    }
    return Array.from(tagsSet);
  }

  // Получение избранных контактов
  getFavoriteContacts(): Contact[] {
    return Array.from(this.contacts.values()).filter(contact => contact.isFavorite);
  }

  // Статистика
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