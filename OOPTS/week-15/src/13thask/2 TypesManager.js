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
exports.TypesManager = void 0;
var TypesManager = /** @class */ (function () {
    function TypesManager() {
        this.transactions = [];
        this.tasks = [];
        this.contacts = [];
    }
    TypesManager.prototype.addTransaction = function (transaction) {
        this.transactions.push(transaction);
    };
    TypesManager.prototype.updateTransaction = function (id, updates) {
        var transaction = this.transactions.find(function (t) { return t.id === id; });
        if (!transaction)
            return false;
        Object.assign(transaction, updates);
        return true;
    };
    TypesManager.prototype.getTransactionSummary = function (id) {
        var transaction = this.transactions.find(function (t) { return t.id === id; });
        if (!transaction)
            return null;
        var amount = transaction.amount, date = transaction.date, category = transaction.category;
        return { amount: amount, date: date, category: category };
    };
    TypesManager.prototype.calculateComplexReport = function () {
        var total = this.transactions.reduce(function (sum, t) { return sum + t.amount; }, 0);
        return { total: total, tax: total * 0.2 };
    };
    TypesManager.prototype.getAnnualReport = function () {
        return this.calculateComplexReport();
    };
    TypesManager.prototype.addTask = function (data) {
        var task = __assign(__assign({}, data), { id: crypto.randomUUID(), createdAt: new Date() });
        this.tasks.push(task);
        return task;
    };
    TypesManager.prototype.updateTask = function (id, updates) {
        var task = this.tasks.find(function (t) { return t.id === id; });
        if (!task)
            return false;
        Object.assign(task, updates);
        return true;
    };
    TypesManager.prototype.getTaskPreview = function (id) {
        var task = this.tasks.find(function (t) { return t.id === id; });
        if (!task)
            return null;
        var title = task.title, completed = task.completed, priority = task.priority;
        return { title: title, completed: completed, priority: priority };
    };
    TypesManager.prototype.addContact = function (contact) {
        this.contacts.push(contact);
    };
    TypesManager.prototype.updateContact = function (id, updates) {
        var contact = this.contacts.find(function (c) { return c.id === id; });
        if (!contact)
            return false;
        Object.assign(contact, updates);
        return true;
    };
    TypesManager.prototype.getContactPreview = function (id) {
        var contact = this.contacts.find(function (c) { return c.id === id; });
        if (!contact)
            return null;
        var name = contact.name, completed = contact.completed, priority = contact.priority;
        return { name: name, completed: completed, priority: priority };
    };
    TypesManager.prototype.updateContactStatus = function (id, updates) {
        var contact = this.contacts.find(function (c) { return c.id === id; });
        if (!contact)
            return false;
        Object.assign(contact.status, updates);
        return true;
    };
    TypesManager.prototype.getContactStatusSummary = function (id) {
        var contact = this.contacts.find(function (c) { return c.id === id; });
        if (!contact)
            return null;
        var _a = contact.status, status = _a.status, favored = _a.favored, filtered = _a.filtered;
        return { status: status, favored: favored, filtered: filtered };
    };
    return TypesManager;
}());
exports.TypesManager = TypesManager;
