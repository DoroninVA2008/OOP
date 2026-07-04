// src/tests/ContactManager.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { ContactManager } from '../3 ContactManager.ts';
import type { CreateContact } from '../../12thask/types.ts';

describe('ContactManager', () => {
  let manager: ContactManager;

  beforeEach(() => {
    manager = new ContactManager(false, 'test_contacts.json');
  });

  describe('Добавление контактов', () => {
    it('должен корректно добавлять новый контакт', () => {
      const testContact: CreateContact = {
        firstName: 'Иван',
        lastName: 'Петров',
        phone: '+7 999 123-45-67',
        email: 'ivan@example.com',
        tags: ['работа']
      };

      const result = manager.addContact(testContact);
      expect(result.success).toBe(true);
      expect(result.contact).toBeDefined();
      expect(result.contact?.firstName).toBe('Иван');
      expect(result.contact?.lastName).toBe('Петров');
      expect(result.contact?.phone).toBe('+7 999 123-45-67');
      expect(result.contact?.email).toBe('ivan@example.com');
      expect(result.contact?.tags).toEqual(['работа']);
      expect(result.contact?.isFavorite).toBe(false);
    });

    it('должен возвращать ошибку при добавлении контакта без имени', () => {
      const testContact: CreateContact = {
        firstName: '',
        lastName: 'Петров',
        phone: '+7 999 123-45-67',
        email: 'ivan@example.com'
      };

      const result = manager.addContact(testContact);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Имя обязательно для заполнения');
      expect(manager.getAllContacts()).toHaveLength(0);
    });

    it('должен предотвращать добавление дубликата по телефону', () => {
      const testContact: CreateContact = {
        firstName: 'Иван',
        lastName: 'Петров',
        phone: '+7 999 123-45-67',
        email: 'ivan@example.com'
      };

      manager.addContact(testContact);
      
      const duplicateContact: CreateContact = {
        firstName: 'Петр',
        lastName: 'Сидоров',
        phone: '+7 999 123-45-67',
        email: 'petr@example.com'
      };

      const result = manager.addContact(duplicateContact);
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
        phone: '+7 999 123-45-67',
        email: 'ivan@example.com',
        tags: ['работа', 'важный']
      });
      
      manager.addContact({
        firstName: 'Мария',
        lastName: 'Иванова',
        phone: '+7 999 987-65-43',
        email: 'maria@example.com',
        tags: ['личное']
      });

      manager.addContact({
        firstName: 'Алексей',
        lastName: 'Смирнов',
        phone: '+7 999 111-22-33',
        email: 'alex@example.com',
        tags: ['работа']
      });
    });

    it('должен искать контакты по ключевому слову', () => {
      const results = manager.searchContacts({ searchTerm: 'Петров' });
      expect(results).toHaveLength(1);
      expect(results[0].firstName).toBe('Иван');
      expect(results[0].lastName).toBe('Петров');
    });

    it('должен искать контакты по тегу', () => {
      const results = manager.searchContacts({ tags: ['работа'] });
      expect(results[0].tags).toContain('работа');
    });

    it('должен искать контакты по имени', () => {
      const results = manager.searchContacts({ firstName: 'Иван' });
      expect(results).toHaveLength(1);
      expect(results[0].firstName).toBe('Иван');
    });

    it('должен искать контакты по фамилии', () => {
      const results = manager.searchContacts({ lastName: 'Иванова' });
      expect(results).toHaveLength(1);
      expect(results[0].lastName).toBe('Иванова');
    });

    it('должен искать контакты по телефону', () => {
      const results = manager.searchContacts({ phone: '987-65-43' });
      expect(results).toHaveLength(1);
      expect(results[0].phone).toBe('+7 999 987-65-43');
    });
  });

  describe('Изменение и удаление', () => {
    let contactId: string;

    beforeEach(() => {
      const result = manager.addContact({
        firstName: 'Иван',
        lastName: 'Петров',
        phone: '+7 999 123-45-67',
        email: 'ivan@example.com'
      });
      contactId = result.contact!.id;
    });

    it('должен обновлять контакт', () => {
      const updateResult = manager.updateContact(contactId, {
        firstName: 'Петр',
        phone: '+7 999 111-22-33'
      } as any);

      expect(updateResult.success).toBe(true);
      expect(updateResult.contact?.firstName).toBe('Петр');
      expect(updateResult.contact?.phone).toBe('+7 999 111-22-33');
    });

    it('должен добавлять в избранное', () => {
      const result = manager.toggleFavorite(contactId);
      expect(result.success).toBe(true);
      expect(result.isFavorite).toBe(true);

      const contact = manager.getContactById(contactId);
      expect(contact?.isFavorite).toBe(true);
    });

    it('должен удалять контакт', () => {
      const deleteResult = manager.deleteContact(contactId);
      expect(deleteResult).toBe(true);
      expect(manager.getContactById(contactId)).toBeUndefined();
      expect(manager.getAllContacts()).toHaveLength(0);
    });
  });
});