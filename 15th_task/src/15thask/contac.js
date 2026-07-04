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
exports.ContactStorage = void 0;
// core/contac.ts
var fs_1 = require("fs");
var path_1 = require("path");
var ContactStorage = /** @class */ (function () {
    function ContactStorage(fileName) {
        if (fileName === void 0) { fileName = 'contacts.json'; }
        this.filePath = (0, path_1.join)(process.cwd(), fileName);
    }
    ContactStorage.prototype.saveContacts = function (contacts) {
        try {
            var data = JSON.stringify(contacts, function (_key, value) {
                if (value instanceof Date) {
                    return value.toISOString();
                }
                return value;
            }, 2);
            fs_1.default.writeFileSync(this.filePath, data, 'utf-8');
            return true;
        }
        catch (error) {
            console.error('Ошибка при сохранении контактов:', error);
            return false;
        }
    };
    ContactStorage.prototype.loadContacts = function () {
        try {
            if (!fs_1.default.existsSync(this.filePath)) {
                return [];
            }
            var data = fs_1.default.readFileSync(this.filePath, 'utf-8');
            var parsed = JSON.parse(data);
            return parsed.map(function (contact) { return (__assign(__assign({}, contact), { createdAt: new Date(contact.createdAt), updatedAt: new Date(contact.updatedAt), birthDate: contact.birthDate ? new Date(contact.birthDate) : undefined })); });
        }
        catch (error) {
            console.error('Ошибка при загрузке контактов:', error);
            return [];
        }
    };
    ContactStorage.prototype.getFilePath = function () {
        return this.filePath;
    };
    return ContactStorage;
}());
exports.ContactStorage = ContactStorage;
