"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactManager = void 0;
var contac_ts_1 = require("../15thask/contac.ts");
var ContactManager = /** @class */ (function () {
    function ContactManager(autoSave, storageFileName) {
        if (autoSave === void 0) { autoSave = true; }
        this.contacts = new Map();
        this.storage = new contac_ts_1.ContactStorage(storageFileName);
        this.autoSave = autoSave;
        this.loadFromStorage();
    }
    ContactManager.prototype.loadFromStorage = function () {
        var _this = this;
        var savedContacts = this.storage.loadContacts();
        savedContacts.forEach(function (contact) {
            _this.contacts.set(contact.id, contact);
        });
        if (savedContacts.length > 0) {
            console.log("\uD83D\uDCC2 \u0417\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E ".concat(savedContacts.length, " \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432 \u0438\u0437 \u0444\u0430\u0439\u043B\u0430: ").concat(this.storage.getFilePath()));
        }
    };
    ContactManager.prototype.saveToStorage = function () {
        if (!this.autoSave)
            return;
        var contacts = Array.from(this.contacts.values());
        var success = this.storage.saveContacts(contacts);
        if (success && contacts.length > 0) {
            console.log("\uD83D\uDCBE \u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E ".concat(contacts.length, " \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432 \u0432 \u0444\u0430\u0439\u043B: ").concat(this.storage.getFilePath()));
        }
    };
    ContactManager.prototype.forceSave = function () {
        var contacts = Array.from(this.contacts.values());
        return this.storage.saveContacts(contacts);
    };
    ContactManager.prototype.forceLoad = function () {
        this.contacts.clear();
        this.loadFromStorage();
    };
    ContactManager.prototype.addContact = function (data) {
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
            for (var _i = 0, _a = this.contacts.values(); _i < _a.length; _i++) {
                var contact_1 = _a[_i];
                if (contact_1.phone === data.phone) {
                    return { success: false, error: 'Контакт с таким номером телефона уже существует' };
                }
                if (contact_1.email === data.email) {
                    return { success: false, error: 'Контакт с таким email уже существует' };
                }
            }
            var contact = {
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
            return { success: true, contact: contact };
        }
        catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Неизвестная ошибка' };
        }
    };
    ContactManager.prototype.getAllContacts = function () {
        return Array.from(this.contacts.values());
    };
    ContactManager.prototype.getContactById = function (id) {
        return this.contacts.get(id);
    };
    ContactManager.prototype.updateContact = function (id, data) {
        var existingContact = this.contacts.get(id);
        if (!existingContact) {
            return { success: false, error: 'Контакт не найден' };
        }
        if (data.phone && data.phone !== existingContact.phone) {
            for (var _i = 0, _a = this.contacts.values(); _i < _a.length; _i++) {
                var contact = _a[_i];
                if (contact.id !== id && contact.phone === data.phone) {
                    return { success: false, error: 'Контакт с таким номером телефона уже существует' };
                }
            }
        }
        if (data.email && data.email !== existingContact.email) {
            for (var _b = 0, _c = this.contacts.values(); _b < _c.length; _b++) {
                var contact = _c[_b];
                if (contact.id !== id && contact.email === data.email) {
                    return { success: false, error: 'Контакт с таким email уже существует' };
                }
            }
        }
        var updatedContact = __assign(__assign(__assign({}, existingContact), data), { updatedAt: new Date() });
        this.contacts.set(id, updatedContact);
        this.saveToStorage();
        return { success: true, contact: updatedContact };
    };
    ContactManager.prototype.deleteContact = function (id) {
        var result = this.contacts.delete(id);
        if (result) {
            this.saveToStorage();
        }
        return result;
    };
    ContactManager.prototype.toggleFavorite = function (id) {
        var contact = this.contacts.get(id);
        if (!contact) {
            return { success: false, error: 'Контакт не найден' };
        }
        var newFavoriteStatus = !contact.isFavorite;
        contact.isFavorite = newFavoriteStatus;
        contact.updatedAt = new Date();
        this.contacts.set(id, contact);
        this.saveToStorage();
        return { success: true, isFavorite: newFavoriteStatus };
    };
    ContactManager.prototype.searchContacts = function (filter) {
        var results = Array.from(this.contacts.values());
        if (filter.searchTerm) {
            var term_1 = filter.searchTerm.toLowerCase();
            results = results.filter(function (contact) {
                return contact.firstName.toLowerCase().includes(term_1) ||
                    contact.lastName.toLowerCase().includes(term_1) ||
                    contact.phone.includes(term_1) ||
                    contact.email.toLowerCase().includes(term_1);
            });
        }
        if (filter.isFavorite !== undefined) {
            results = results.filter(function (contact) { return contact.isFavorite === filter.isFavorite; });
        }
        if (filter.firstName) {
            results = results.filter(function (contact) {
                return contact.firstName.toLowerCase().includes(filter.firstName.toLowerCase());
            });
        }
        if (filter.lastName) {
            results = results.filter(function (contact) {
                return contact.lastName.toLowerCase().includes(filter.lastName.toLowerCase());
            });
        }
        if (filter.phone) {
            results = results.filter(function (contact) { return contact.phone.includes(filter.phone); });
        }
        if (filter.email) {
            results = results.filter(function (contact) {
                return contact.email.toLowerCase().includes(filter.email.toLowerCase());
            });
        }
        if (filter.tags && filter.tags.length > 0) {
            results = results.filter(function (contact) {
                return filter.tags.some(function (tag) { return contact.tags.includes(tag); });
            });
        }
        return results;
    };
    ContactManager.prototype.getAllTags = function () {
        var tagsSet = new Set();
        for (var _i = 0, _a = this.contacts.values(); _i < _a.length; _i++) {
            var contact = _a[_i];
            contact.tags.forEach(function (tag) { return tagsSet.add(tag); });
        }
        return Array.from(tagsSet);
    };
    ContactManager.prototype.getFavoriteContacts = function () {
        return Array.from(this.contacts.values()).filter(function (contact) { return contact.isFavorite; });
    };
    ContactManager.prototype.getStoragePath = function () {
        return this.storage.getFilePath();
    };
    ContactManager.prototype.getStatistics = function () {
        var contacts = Array.from(this.contacts.values());
        return {
            total: contacts.length,
            favorites: contacts.filter(function (c) { return c.isFavorite; }).length,
            withEmail: contacts.filter(function (c) { return c.email; }).length,
            withPhone: contacts.filter(function (c) { return c.phone; }).length,
            withAddress: contacts.filter(function (c) { return c.address; }).length,
            uniqueTags: this.getAllTags()
        };
    };
    return ContactManager;
}());
exports.ContactManager = ContactManager;
