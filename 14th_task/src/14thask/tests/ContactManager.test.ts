import { describe, it, expect, beforeEach } from 'vitest';
import { ContactManager } from '../3 ContactManager.ts';
import type { CreateContact } from '../../12thask/types.ts';

describe('ContactManager', () => {
  let manager: ContactManager;

  beforeEach(() => {
    manager = new ContactManager();
  });

  describe('Добавление контактов', () => {
    it('должен корректно добавлять новый контакт', () => {
      const testContact: CreateContact = {
        firstName: 'Иван',
        lastName: 'Петров',
        phone: '+7 (999) 123-45-67',
        email: 'ivan@example.com'
      };

      const result = manager.addContact(testContact);

      expect(result.success).toBe(true);
      expect(result.contact).toBeDefined();
      expect(result.contact?.firstName).toBe('Иван');
      expect(result.contact?.lastName).toBe('Петров');
      expect(result.contact?.phone).toBe(testContact.phone);
      expect(result.contact?.email).toBe(testContact.email);
      expect(manager.getAllContacts()).toHaveLength(1);
    });

    it('должен возвращать ошибку при добавлении контакта без имени', () => {
      const testContact: CreateContact = {
        firstName: '',
        lastName: 'Петров',
        phone: '+7 (999) 123-45-67',
        email: 'ivan@example.com'
      };

      const result = manager.addContact(testContact);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Имя обязательно для заполнения');
      expect(manager.getAllContacts()).toHaveLength(0);
    });

    it('должен предотвращать добавление дубликата по телефону', () => {
      const contact1: CreateContact = {
        firstName: 'Иван',
        lastName: 'Петров',
        phone: '+7 (999) 123-45-67',
        email: 'ivan@example.com'
      };

      const contact2: CreateContact = {
        firstName: 'Петр',
        lastName: 'Иванов',
        phone: '+7 (999) 123-45-67',
        email: 'petr@example.com'
      };

      manager.addContact(contact1);
      const result = manager.addContact(contact2);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Контакт с таким номером телефона уже существует');
      expect(manager.getAllContacts()).toHaveLength(1);
    });
  });

  describe('Поиск и фильтрация', () => {
    beforeEach(() => {
      manager.addContact({
        firstName: 'Иван',
        lastName: 'Петров',
        phone: '+7 (999) 111-22-33',
        email: 'ivan@example.com',
        tags: ['работа', 'коллега']
      });
      manager.addContact({
        firstName: 'Мария',
        lastName: 'Иванова',
        phone: '+7 (999) 444-55-66',
        email: 'maria@example.com',
        tags: ['друзья']
      });
      manager.addContact({
        firstName: 'Алексей',
        lastName: 'Сидоров',
        phone: '+7 (999) 777-88-99',
        email: 'alex@example.com'
      });
    });

    it('должен искать контакты по ключевому слову', () => {
      const results = manager.searchContacts({ searchTerm: 'Иван' });
      expect(results).toHaveLength(1);
      expect(results[0].firstName).toBe('Иван');
    });

    it('должен искать контакты по тегу', () => {
      const results = manager.searchContacts({ tags: ['работа'] });
      expect(results).toHaveLength(1);
      expect(results[0].firstName).toBe('Иван');
    });

    it('должен искать контакты по имени', () => {
      const results = manager.searchContacts({ firstName: 'Мария' });
      expect(results).toHaveLength(1);
      expect(results[0].lastName).toBe('Иванова');
    });
  });

  describe('Изменение и удаление', () => {
    let contactId: string;

    beforeEach(() => {
      const result = manager.addContact({
        firstName: 'Иван',
        lastName: 'Петров',
        phone: '+7 (999) 123-45-67',
        email: 'ivan@example.com'
      });
      contactId = result.contact!.id;
    });

    it('должен обновлять контакт', () => {
      const result = manager.updateContact(contactId, {
        firstName: 'Иван',
        lastName: 'Иванов'
      });

      expect(result.success).toBe(true);
      expect(result.contact?.lastName).toBe('Иванов');
    });

    it('должен добавлять в избранное', () => {
      const result = manager.toggleFavorite(contactId);
      
      expect(result.success).toBe(true);
      expect(result.isFavorite).toBe(true);
      
      const favorites = manager.getFavoriteContacts();
      expect(favorites).toHaveLength(1);
    });

    it('должен удалять контакт', () => {
      const deleted = manager.deleteContact(contactId);
      
      expect(deleted).toBe(true);
      expect(manager.getAllContacts()).toHaveLength(0);
    });
  });

});